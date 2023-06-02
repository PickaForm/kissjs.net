# Production server documentation for Docx2pdf + Pickaform

This document details all information needed to deploy and manage the docx2pdf production server on a **VPS** running on a **ubuntu server 22.04** distribution. The server embeds an alternative emergency pickaform instance.

**Keep in mind that the current document assumes that the main user on the said server is *ubuntu*. If it's not the case for whatever reason, you MUST adapt all commands accordingly. That said, the logic remains the same and should not change, even for future versions of ubuntu server.**

Updated by Jordan Breton, on November 3, 2022

## Summary

- [Installation](#installation)
    - [Connection and ubuntu upgrade](#connection-and-ubuntu-upgrade)
    - [Installing needed packages](#installing-needed-packages)
    - [NVM & node](#nvm--node)
    - [Pickaform](#pickaform-install)
- [Configuration](#configuration)
    - [Automatic updates](#automatic-updates)
    - [Apache2](#apache2)
    - [Pickaform](#pickaform)
    - [Systemctl](#systemctl)
    - [Logrotate](#logrotate)
    - [Certbot](#certbot)
    - [Iptables](#iptables)
    - [Fail2ban](#fail2ban)
- [Maintenance](#maintenance)
    - [Github actions](#github-actions)
    - [Command line + SSH](#command-line--ssh)
- [Additional notes](#additional-notes)
    - [LibreOffice](#libreoffice)
    - [Iptables](#iptables-firewall)
    - [Netdata](#netdata)
    - [Github automation](#github-automation)

## Installation

This document details the pickaform production server installation process on a fresh VM with **ubuntu 22.04 server** distribution through **SSH**.

### Connection and ubuntu upgrade

Connection to the server in **SSH** with the command `ssh [user]@[ip]`. For the current VPS, the exact command is:

```
ssh ubuntu@54.36.180.55
```

**Note:** The first time, it will print you a warning because of self-signed certificate, just accepts it.

Then type the server password.

Once logged in, starts by updating *ubuntu*:

```bash
sudo apt-get update
sudo apt-get upgrade
sudo reboot
``` 

**Note:** rebooting may or may not be mandatory, so we just go with it anyway.

### Installing needed packages

Let's install what we need to run pikcaform behind an apache proxy:

```bash
sudo apt-get install -y apache2 npm certbot python3-certbot-apache fail2ban iptables-persistent
```

**Note:** The package iptables-persistent may ask you if you want to save the current `ipv4` or `ìpv6` config. The answer doesn't matter, since we will redefine them later anyway.

### NVM & node

Then we'll need nvm to manage nodejs versions on the same machine, it will ease switching version later if needed:

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

**Note:** This command downloads the last `nvm` version **at the moment this document has been written**, to install the last version, please read the [install section of their github](https://github.com/nvm-sh/nvm#install--update-script)

Then we install the version of node that will run our server. `Hydrogen` is the last **LTS** (v16.7.1) version at the moment this document have been written:

```bash
nvm install Hydrogen
```

While writing this doc, **Hydrogen** downloads the **v18.12.0**.

**Note:** you can use `nvm ls-remote` to print all available versions of node, and use `nvm ls-remote | grep LTS` to see all LTS versions only.

It will be set to `default`, you can check node version with `node -v`. If it doesn't print the version you installed, run the commands:

```bash
ǹvm alias default v18.12.0
nvm use v18.12.0
```

Then, `node -v` should print `v18.12.0`

⚠️ **IMPORTANT NOTE**: if a Github Action is configured for the current server, you must follow [additional instructions](#github-automation)
for this version change to take effect when the action will run `npm install` !


### Pickaform (install)

We start by creating a folder in ubuntu's home folder `/home/ubuntu`:

```bash
cd ~
mkdir KissJS
cd KissJS
git init
git remote add origin git@github.com:PickaForm/KissJS.git
git config core.fileMode false
```

**Note:** the command `git config core.fileMode false` is mandatory to avoid git to track local file system permissions changes. If you don't run this command, the git hooks that we will setup below will change group ownership of all files and git will prevent to checkout/pull before stashing or committing.

Now, we need to create a `deploy token` to be able to pull, since the repository is private (do not change generated file path/name, you don't need a passphrase):

```bash
ssh-keygen -t rsa -b 4096 -C david.grossi@pickaform.com
```

Then we will configure the key for git:

```bash
cd ../.ssh
mv id_rsa KissJS.deploy.pem
chmod 400 KissJS.deploy.pem
nano config
```

Type this into the file editor:

```
Host KissJS
Hostname github.com
IdentityFile ~/.ssh/KissJS.deploy.pem
```

Then type `ctrl` + `s` to save and `ctrl` + `x` to exit.

We want to adapt permissions to this file as well:

```bash
chmod 770 config
```

Now, you need to copy the content of `id_rsa.pub`. You can use the linux `scp` command from another terminal to download it, or just print it to the console to be able to copy it into your clipboard:

```bash
cat id_rsa.pub
``` 

The public key must be set as `deploy key` on `GitHub`. To do so, go the the project repository, click on the `settings` in the top tabs, then choose `Deploy Keys` in the left panel, and click the `Add deploy key` button, top right.

Type a meaningful name as `Public production key on OVH VPS` as title, and paste the previously copied `ìd_rsa.pub` file content into the `key` field. **Do not check the `Allow write access` checkbox** for security sakes.

Once done, come back to your **SSH** terminal and type :

```bash
cd ~/KissJS
git config core.sshCommand 'ssh -i /home/ubuntu/.ssh/KissJS.deploy.pem'
git pull
git checkout release
```

We're now ready for the configuration process.

## Configuration

In this section we will configure `apache2`, `certbot`, `systemctl`, `logrotate`, `iptables` and `pickaform` to get a fully operational production server. If it has not been done by then, read carefully the [installation section](#installation) before trying to follow below instructions.

For security sakes, we will create a specific user and a specific group to restrain our server ability to access the file system:

```bash
sudo addgroup pickaform
sudo useradd -g pickaform pickaform
```

Some permissions must be setup for `pickaform` to be able to access the folder and run node:

```bash
cd ~
chmod o+x .
chmod o+x -R .nvm
```

Now, we need to add our main user `ubuntu` to the newly created group `pickaform`:

```bash
sudo usermod -aG pickaform ubuntu
```

**IMPORTANT: Before continuing, you *MUST* run the `exit` command and reconnect through *SSH* for this change to take effects now.**

For git to automatically setup right permissions/ownership to all files when we pull/checkout, let's create a script in `/home/ubuntu/tools`:

```bash
cd ~
mkdir tools
nano tools/gitHook.sh
```

Then, past this content to the editor:

```bash
#!/bin/bash

PATH="/home/ubuntu/KissJS"
/bin/chmod -R 770 "$PATH"
/bin/chown -R :pickaform "$PATH"
```

Type `ctrl` + `s` to save and `ctrl` + `x` to exit.

Then give the execution permission to the script:

```bash
chmod +x tools/gitHook.sh
```

Now, we will create two hooks in `/home/ubuntu/KissJS/.git/hooks` by symlinking our script:

```bash
ln -s /home/ubuntu/tools/gitHook.sh /home/ubuntu/KissJS/.git/hooks/post-checkout
ln -s /home/ubuntu/tools/gitHook.sh /home/ubuntu/KissJS/.git/hooks/post-merge
```

Test it by checkout to the master branch and checkout back to the release branch, then use `ls` to check all files and folders belongs to the `pickaform` group:

```bash
cd KissJS
git checkout master
git checkout release
ls -al
```

The `ls -al` command should print something like this:

```
total 220
drwxrwx---  8 ubuntu pickaform   4096 Oct 12 17:42 .
drwxr-x---  9 ubuntu ubuntu      4096 Oct 13 07:20 ..
-rwxrwx---  1 ubuntu pickaform     88 Oct 12 17:41 appspec.yml
drwxrwx--- 20 ubuntu pickaform   4096 Oct 12 17:41 client
drwxrwx---  2 ubuntu pickaform   4096 Oct 13 07:21 convertToPdf
drwxrwx---  3 ubuntu pickaform   4096 Oct 12 17:41 doc
drwxrwx---  2 ubuntu pickaform   4096 Oct 12 17:41 docker
drwxrwx---  8 ubuntu pickaform   4096 Oct 13 07:21 .git
-rwxrwx---  1 ubuntu pickaform     77 Oct 12 17:41 .gitignore
-rwxrwx---  1 ubuntu pickaform   1814 Oct 12 17:42 package.json
-rwxrwx---  1 ubuntu pickaform 175160 Oct 12 17:42 package-lock.json
-rwxrwx---  1 ubuntu pickaform     19 Oct 12 17:41 Procfile
drwxrwx---  8 ubuntu pickaform   4096 Oct 12 23:03 server
```

### Automatic updates

We don't want to connect every day just to update the server to get security fixes.

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install unattended-upgrades
```

Then we must enable unattended-upgrades:

```bash
sudo dpkg-reconfigure -plow unattended-upgrades
```

Just choose `yes` and press enter.

We **do not** turn on automatic reboot, because we may want to reboot at a specific time.

### Apache2

Let's start by enabling required modules:

```bash
sudo a2enmod proxy proxy_http proxy_wstunnel ssl
```

Then, we will create the file `/etc/apache2/sites-available/alt.pickaform.com.conf` :

```apache
<VirtualHost *:80>
        ServerName alt.pickaform.com
        ServerAlias alt.pickaform.fr

        ProxyRequests Off
        ProxyPreserveHost On
        ProxyVia Full
        <Proxy *>
                Require all granted
        </Proxy>

        ProxyPass / http://127.0.0.1:7000/
        ProxyPassReverse / http://127.0.0.1:7000/
</VirtualHost>
```

Then, we will create the file `/etc/apache2/sites-available/sleeping-alt.pickaform.com.conf` :

```apache
<VirtualHost *:80>
        ServerName alt.pickaform.com
        ServerAlias alt.pickaform.fr

        RedirectMatch ^/(.*)$ https://alt.pickaform.com/$1
</VirtualHost>
```

And finally, we create the file `/etc/apache2/sites-available/docx2pdf.pickaform.com.conf` :

```apache
<VirtualHost *:80>
        ServerName docx2pdf.pickaform.com
        ServerAlias docx2pdf.pickaform.fr

        ProxyRequests Off
        ProxyPreserveHost On
        ProxyVia Full
        <Proxy *>
                Require all granted
        </Proxy>
        
        ProxyPass / http://127.0.0.1:3000/
        ProxyPassReverse / http://127.0.0.1:3000/
</VirtualHost>
```

**Important note:** For now, SSL related config is ignored, certbot will edit this file for us. We just need to provide him a working config on an insecure VirtualHost.

Now we want to enable our website:

```bash
sudo a2ensite alt.pickaform.com.conf
sudo a2ensite docx2pdf.pickaform.com.conf
sudo systemctl reload apache2
```

But before running certbot, we need a running server.


### Pickaform

For now, the `KissJS/server/.env.production` file is shipped with the code. So... there is nothing to do.

Just check that, according to the previous installation process and `apache2` config, you run the server with the following config values:

- `SERVER_MODE=insecure` because we configure pickaform behind a proxy
- `PORT=7000` private ports on 127.0.0.1
- `WS_PORT=7001` private port on 127.0.0.1
- `WS_SERVER=uWebSocket`
- `WS_PROXY=1`
- `WS_PROXY_PORT=4430` publicly exposed port for websockets
- `INSTANCE=PROD_OVH_VPS1` to properly identify any instance in automatically reported errors.

### Systmectl

This is a service manager used to manage the lifecycle of our `pickaform` instance. We will create four files in `/etc/systemd/system/`:

- `pickaform@.service`: a templated unit that will allow us, later, to run multiple instances of pickaform on the same server. When horizontal scaling will be supported.
- `pickaform.target`: the service unit that will decide how much instances to run at a time and manage them for us. Systemd will ensure pickaform is running from server startup to server shutdown and relaunch it if it crashes.
- `docx2pdf@.service`: a templated unit that will allow us, later, to run multiple instances of docx2pdf on the same server if needed.
- `docx2pdf.target`: the service unit that will decide how much instances to run at a time and manage them for us. Systemd will ensure docx2pdf is running from server startup to server shutdown and relaunch it if it crashes.

Let's start by `/etc/systemd/system/pickaform@.service`.

We will need to know the path to the node binaries:

```bash
which node
```

Should print something like `/home/ubuntu/.nvm/versions/node/v18.12.0/bin/node`. We will use it to define the first systemctl unit in `ExecStart`. So, do not forget to replace this path if it is different in your environment.

#### Pickaform

Then create the file by typing `sudo nano /etc/systemd/system/pickaform@.service` and pasting the following content into the editor:

```systemd
[Unit]
Description = "Pickaform instance %i"
Requires = network.target
After = network.target
PartOf = pickaform.target

[Service]
User = pickaform
Restart = always
WorkingDirectory = /home/ubuntu/KissJS
ExecStart = env NODE_ENV=production /home/ubuntu/.nvm/versions/node/v18.12.0/bin/node kissjs/server/index
StandardOutput = append:/var/log/pickaform.%i.instance.log
StandardError = append:/var/log/pickaform.err.%i.instance.log

[Install]
WantedBy = multi-user.target
```

Type `ctrl` + `s` to save and `ctrl` + `x` to exit.

Then we will create `/etc/systemd/system/pickaform.target` by typing `sudo nano /etc/systemd/system/pickaform.target`:

```systemd
[Unit]
Description=Pickaform instance(s)
# To add more instances, just add a new service in the list by increasing the service number:
# Requires=pickaform@1.service pickaform@2.service picakform@3.service ...
Requires=pickaform@1.service

[Install]
WantedBy=multi-user.target
```

Again, type `ctrl` + `s` to save and `ctrl` + `x` to exit.

Our services are ready, we just need to activate them:

```bash
sudo systemctl enable pickaform.target
sudo systemctl start pickaform.target
```

To manage Pickaform now, you can:

- run `sudo systemctl start pickaform.target`
- run `sudo systemctl status pickaform.target`
- run `sudo systemctl stop pickaform.target`
- run `sudo systemctl restart pickaform.target`

But you can also use those commands to manage each instance individually (if there is several instances in the future):

- run `sudo systemctl start pickaform@1`
- run `sudo systemctl status pickaform@1`
- run `sudo systemctl stop pickaform@1`
- run `sudo systemctl restart pickaform@1`

#### Docx2pdf

Then create the file by typing `sudo nano /etc/systemd/system/docx2pdf@.service` and pasting the following content into the editor:

```systemd
[Unit]
Description = "Docx2pdf instance %i"
Requires = network.target
After = network.target
PartOf = docx2pdf.target

[Service]
User = pickaform
Restart = always
WorkingDirectory = /home/ubuntu/KissJS
ExecStart = env NODE_ENV=production-docx2pdf PDF_CONVERTER_API_ENABLED=true /home/ubuntu/.nvm/versions/node/v18.12.0/bin/node kissjs/server/index
StandardOutput = append:/var/log/docx2pdf.%i.instance.log
StandardError = append:/var/log/docx2pdf.err.%i.instance.log

[Install]
WantedBy = multi-user.target
```

Type `ctrl` + `s` to save and `ctrl` + `x` to exit.

Then we will create `/etc/systemd/system/docx2pdf.target` by typing `sudo nano /etc/systemd/system/docx2pdf.target`:

```systemd
[Unit]
Description=Pickaform instance(s)
# To add more instances, just add a new service in the list by increasing the service number:
# Requires=docx2pdf@1.service docx2pdf@2.service docx2pdf@3.service ...
Requires=docx2pdf@1.service

[Install]
WantedBy=multi-user.target
```

Again, type `ctrl` + `s` to save and `ctrl` + `x` to exit.

Our services are ready, we just need to activate them:

```bash
sudo systemctl enable docx2pdf.target
sudo systemctl start docx2pdf.target
```

To manage Docx2pdf now, you can:

- run `sudo systemctl start docx2pdf.target`
- run `sudo systemctl status docx2pdf.target`
- run `sudo systemctl stop docx2pdf.target`
- run `sudo systemctl restart docx2pdf.target`

But you can also use those commands to manage each instance individually (if there is several instances in the future):

- run `sudo systemctl start docx2pdf@1`
- run `sudo systemctl status docx2pdf@1`
- run `sudo systemctl stop docx2pdf@1`
- run `sudo systemctl restart docx2pdf@1`

### Logrotate

Logrotate will rotate our logs to compress them and remove them automatically after some delay.

To configure it, just run:

```bash
nano /etc/logrotate.d/pickaform
```

And paste the following content in the editor:

```
/var/log/pickaform.*.log {
       daily
       rotate 14
       delaycompress
       compress
       notifempty
       missingok
}
```

We also need it for the `docx2pdf` instance:

```bash
nano /etc/logrotate.d/docx2pdf
```

And paste the following content in the editor:

```
/var/log/docx2pdf.*.log {
       daily
       rotate 14
       delaycompress
       compress
       notifempty
       missingok
}
```

Then, type `ctrl` + `s` to save and `ctrl` + `x` to exit.

This configuration will rotate pickaform and docx2pdf logs daily and keep them 14 days before cleaning them up.

### Certbot

Now, we want to enable **SSL** for our proxy.

Just run:

```bash
sudo certbot --apache
```

Type the maintainer's mail address, select all domains and accepts terms and conditions.

Once certbot executed, we must edit the SSL config to ensure our websockets will be proxied too.

In our case, the apache file was `/etc/apache2/sites-available/alt.pickaform.com.conf`, so certbot will generate a file named `/etc/apache2/sites-available/alt.pickaform.com.conf-le-ssl.conf`:

```
sudo nano /etc/apache2/sites-available/alt.pickaform.com.conf-le-ssl.conf
```

You should see something like this:

```apache
<IfModule mod_ssl.c>
<VirtualHost *:443>
        ServerName alt.pickaform.com
        ServerAlias alt.pickaform.fr

        DocumentRoot /var/www/html

        ProxyRequests Off
        ProxyPreserveHost On
        ProxyVia Full
        <Proxy *>
                Require all granted
        </Proxy>

        RewriteEngine On
        RewriteCond %{HTTP:Upgrade} =websocket [NC]
        RewriteRule /(.*)           ws://127.0.0.1:7000/$1 [P,L]
        RewriteCond %{HTTP:Upgrade} !=websocket [NC]
        RewriteRule /(.*)           http://127.0.0.1:7000/$1 [P,L]

        ProxyPassReverse / http://127.0.0.1:7000/

        Include /etc/letsencrypt/options-ssl-apache.conf
        SSLCertificateFile /etc/letsencrypt/live/alt.pickaform.com/fullchain.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/alt.pickaform.com/privkey.pem
</VirtualHost>
</IfModule>
```

We need to add our websocket configuration just after the first `VirtualHost`:

```apache
Listen 4430
<VirtualHost *:4430>
        ServerName alt.pickaform.com
        ServerAlias alt.pickaform.fr

        DocumentRoot /var/www/html

        ProxyRequests Off
        ProxyPreserveHost On
        ProxyVia Full
        <Proxy *>
                Require all granted
        </Proxy>

        ProxyPass / ws://127.0.0.1:7001 retry=0
        ProxyPassReverse / ws://127.0.0.1:7001

        Include /etc/letsencrypt/options-ssl-apache.conf
        SSLCertificateFile /etc/letsencrypt/live/alt.pickaform.com/fullchain.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/alt.pickaform.com/privkey.pem
</VirtualHost>
```

The final file should be:

```apache
<IfModule mod_ssl.c>
<VirtualHost *:443>
        ServerName alt.pickaform.com
        ServerAlias alt.pickaform.fr

        DocumentRoot /var/www/html

        ProxyRequests Off
        ProxyPreserveHost On
        ProxyVia Full
        <Proxy *>
                Require all granted
        </Proxy>

        ProxyPass / http://127.0.0.1:7000/
        ProxyPassReverse / http://127.0.0.1:7000/

        Include /etc/letsencrypt/options-ssl-apache.conf
        SSLCertificateFile /etc/letsencrypt/live/alt.pickaform.com/fullchain.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/alt.pickaform.com/privkey.pem
</VirtualHost>
Listen 4430
<VirtualHost *:4430>
        ServerName alt.pickaform.com
        ServerAlias alt.pickaform.fr

        DocumentRoot /var/www/html

        ProxyRequests Off
        ProxyPreserveHost On
        ProxyVia Full
        <Proxy *>
                Require all granted
        </Proxy>

        ProxyPass / ws://127.0.0.1:7001 retry=0
        ProxyPassReverse / ws://127.0.0.1:7001

        Include /etc/letsencrypt/options-ssl-apache.conf
        SSLCertificateFile /etc/letsencrypt/live/alt.pickaform.com/fullchain.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/alt.pickaform.com/privkey.pem
</VirtualHost>
</IfModule>
```

Then, type `ctrl` + `s` to save and `ctrl` + `x` to exit.

Now, we need to edit the file `/etc/apache2/sites-available/sleeping-alit.pickaform.com.conf` to add SSL related config:

```apache
<VirtualHost *:80>
        ServerName alt.pickaform.com
        ServerAlias alt.pickaform.fr

        RedirectMatch ^/(.*)$ https://alt.pickaform.com/$1
</VirtualHost>
<VirtualHost *:443>
        ServerName alt.pickaform.com
        ServerAlias alt.pickaform.fr

        Include /etc/letsencrypt/options-ssl-apache.conf
        SSLCertificateFile /etc/letsencrypt/live/alt.pickaform.fr/fullchain.pem
        SSLCertificateKeyFile /etc/letsencrypt/live/alt.pickaform.fr/privkey.pem

        RedirectMatch ^/(.*)$ https://alt.pickaform.com/$1      
</VirtualHost>
```

Then, type `ctrl` + `s` to save and `ctrl` + `x` to exit.


```bash
sudo systemctl reload apache2
```

Pickaform is now reachable on two urls:

- https://alt.pickaform.com/client/pickaform/index.html#ui=authentication-login
- https://alt.pickaform.fr/client/pickaform/index.html#ui=authentication-login

But we want it to be disabled by default. Now that we now it does work well, we enter the sleeping mode:

```bash
sudo a2dissite alt.pickaform.com.conf
sudo a2dissite alt.pickaform.com-le-ssl.conf
sudo a2ensite sleeping-alt.pickaform.com.conf
```

Now, any request at `alt.pickaform.com` or `alit.pickaform.fr` will be redirected to `app.pickaform.com`.

Let's create a script to easily switch from sleep mode to wake mode in one command.

```bash
cd ~/tools
nano emergency.sh
```

Past the following content to the editor:

```bash
#!/bin/bash

# Exit on error
set -e

# Check if run as root
if [[ $(/usr/bin/id -u) -ne 0 ]]; then
    echo "Not running as root"
    exit 1
fi

case $1 in
        stop)
                echo "Disabling emergency mode. Stopping alt.pickaform.com instance..."

                # Disable apache config for the running pickaform instance
                a2dissite alt.pickaform.com.conf
                a2dissite alt.pickaform.com-le-ssl.conf

                # Enabling the sleeping mode (aka redirections)
                a2ensite sleeping-alt.pickaform.com.conf

                # Disabling pickaform service
                systemctl stop pickaform.target
                systemctl disable pickaform.target
                ;;
        start)
                echo "Enabling emergency mode. Waking up alt.pickaform.com instance..."

                # Disabling sleeping mode (aka redirections)
                a2dissite sleeping-alt.pickaform.com.conf

                # Enabling apache config for the running pickaform instance
                a2ensite alt.pickaform.com.conf
                a2ensite alt.pickaform.com-le-ssl.conf

                # Enabling pickaform service
                systemctl enable pickaform.target
                systemctl start pickaform.target
                ;;
        *)
                echo "Unknown command $1"
                echo "Usage:"
                echo "  emergency start - Iterrupts redirections and start a pickaform production instance."
                echo "  emergency stop - Stop the running pickaform production instance and re-enable redirections."
                exit 1
esac

systemctl reload apache2

echo "Done."
```

Then, type `ctrl` + `s` to save and `ctrl` + `x` to exit.

Now we want to install it as a bash command:

```bash
sudo ln -s /home/ubuntu/tools/emergency.sh /usr/local/bin/emergency
```

Let's test it:

```bash
sudo emergency start
```

Accessing `alt.pickaform.com` no longer redirect to `app.pickaform.com`.

```bash
sudo emergency stop
```

Redirections are re-enabled.


### Iptables

Now that we have a running server, let's secure it with ubuntu's `iptables` firewall.

We will create a file in `/home/ubuntu/tools` called `ìptables.config.sh`:

```bash
cd ~/tools
nano iptables.config.sh
``` 

Past this content into the editor:

```sh
#!/bin/bash

# Empty current tables
iptables -t filter -F

# Empty personal rules
iptables -t filter -X

# Deny all
iptables -t filter -P INPUT DROP
iptables -t filter -P FORWARD DROP
iptables -t filter -P OUTPUT DROP

# Do not break established connections
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -m state --state RELATED,ESTABLISHED -j ACCEPT

# Allow loopback
iptables -t filter -A INPUT -i lo -j ACCEPT
iptables -t filter -A OUTPUT -o lo -j ACCEPT

# ICMP (ping)
iptables -t filter -A INPUT -p icmp -j ACCEPT
iptables -t filter -A OUTPUT -p icmp -j ACCEPT

# SSH 
iptables -t filter -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -t filter -A OUTPUT -p tcp --dport 22 -j ACCEPT

# DNS (bind) needed by apt-get to update packages
iptables -t filter -A OUTPUT -p tcp --dport 53 -j ACCEPT
iptables -t filter -A OUTPUT -p udp --dport 53 -j ACCEPT
iptables -t filter -A INPUT -p tcp --dport 53 -j ACCEPT
iptables -t filter -A INPUT -p udp --dport 53 -j ACCEPT

# APACHE : HTTP + HTTPS
iptables -t filter -A OUTPUT -p tcp --dport 80 -j ACCEPT
iptables -t filter -A OUTPUT -p tcp --dport 443 -j ACCEPT
iptables -t filter -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -t filter -A INPUT -p tcp --dport 443 -j ACCEPT

# Pickaform websockets through apache's proxy
iptables -t filter -A OUTPUT -p tcp --dport 4430 -j ACCEPT
iptables -t filter -A INPUT -p tcp --dport 4430 -j ACCEPT

# Allow distant mongodb connection
iptables -t filter -A OUTPUT -p tcp --dport 27017 -j ACCEPT
iptables -t filter -A INPUT  -p tcp --dport 27017 -j ACCEPT

# SMTP Port
iptables -t filter -A OUTPUT -p tcp --dport 465 -j ACCEPT
iptables -t filter -A INPUT -p tcp --dport 465 -j ACCEPT
```

**Beware:** Modifying this file may lock you out the server. This is still temporary at this step, because those changes only happen in memory. If you mess it up, restart the server by using your provider's admin panel. If restart doesn't works because the restart command sent by your provider use a blocked port, you'll need to rely on your provider support or on any recovery procedure he planned.

Then, type `ctrl` + `s` to save and `ctrl` + `x` to exit.

Give execution permission to this newly created file and run it to apply:

```bash
chmod +x iptables.config.sh
sudo ./iptables.config.sh
```

**Before persisting those rules in the next step, it is very important to test that everything is working fine:**

1) Exit and reconnect in `SSH` to ensure it is still possible
2) Try to reach pickaform and make it send a mail to one of your addresses (ensure that you receive it)
3) Login to pickaform and check that your websocket is successfully connected.
4) Try to run `sudo apt-get update` and `sudo apt-get upgrade` to ensure that the firewall rules do not prevent those commands to execute.

Once all is ok, we can persist iptables configuration:

```bash
sudo iptables-save > rules.v4
sudo mv rules.v4 /etc/iptables
```

Check that  `iptables-persistent` is running:

```bash
sudo systemctl status netfilter-persistent.service
```

Should print something like:

```
● netfilter-persistent.service - netfilter persistent configuration
     Loaded: loaded (/lib/systemd/system/netfilter-persistent.service; enabled; vendor preset: enabled)
    Drop-In: /etc/systemd/system/netfilter-persistent.service.d
             └─iptables.conf
     Active: active (exited) since Thu 2022-10-13 23:43:04 UTC; 19h ago
       Docs: man:netfilter-persistent(8)
   Main PID: 518 (code=exited, status=0/SUCCESS)
        CPU: 7ms

Oct 13 23:43:04 vps-6e61d811 systemd[1]: Starting netfilter persistent configuration...
Oct 13 23:43:04 vps-6e61d811 netfilter-persistent[522]: run-parts: executing /usr/share/netfilter-persistent/plugin>
Oct 13 23:43:04 vps-6e61d811 netfilter-persistent[524]: Warning: skipping IPv4 (no rules to load)
Oct 13 23:43:04 vps-6e61d811 netfilter-persistent[522]: run-parts: executing /usr/share/netfilter-persistent/plugin>
Oct 13 23:43:04 vps-6e61d811 netfilter-persistent[526]: Warning: skipping IPv6 (no rules to load)
Oct 13 23:43:04 vps-6e61d811 systemd[1]: Finished netfilter persistent configuration.
lines 1-15/15 (END)
```

If it is not running, you must enable it by hand:

```bash
sudo systemctl enable netfilter-persistent.service
sudo systemctl start netfilter-persistent.service
```

### Fail2ban

Fail2ban is a tool to prevent intrusions by watching different services logs. We will use it to watch `apache` logs and to protect our `SSH` from brute force attacks.

We must start by enabling it:

```bash
sudo systemctl enable fail2ban --now
```

Now we need to create a local jail and start editing it:

```bash
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local
```

Starts by uncommenting the following lines (to find them quickly type `ctrl` + `w`, then type the string you search, then type `enter`):

- `bantime.increment = true`
- `bantime.multipliers = 1 2 4 8 16 32 64`
- `ignoreip = 127.0.0.1/8 ::1`

Now, we will enable some jails.

A jail looks like this:

```
[sshd]

# To use more aggressive sshd modes set filter parameter "mode" in jail.local:
# normal (default), ddos, extra or aggressive (combines all).
# See "tests/files/logs/sshd" or "filter.d/sshd.conf" for usage example and details.
#mode   = normal
port    = ssh
logpath = %(sshd_log)s
backend = %(sshd_backend)s
```

By default, they are disabled. To enable a jail, just add `enabled = true` after the last parameter:

```
[sshd]

# To use more aggressive sshd modes set filter parameter "mode" in jail.local:
# normal (default), ddos, extra or aggressive (combines all).
# See "tests/files/logs/sshd" or "filter.d/sshd.conf" for usage example and details.
#mode   = normal
port    = ssh
logpath = %(sshd_log)s
backend = %(sshd_backend)s
enabled = true
```

There is the list of jails we want to enable:

- `[sshd]`
- `[apache-auth]`
- `[apache-badbots]`
- `[apache-botsearch]`
- `[apache-fakegooglebot]`
- `[apache-modsecurity]`

When you're done, type `ctrl` + `s` to save and `ctrl` + `x` to exit.

Then you need to reload fail2ban for those changes to take effect:

```bash
sudo systemctl restart fail2ban
```

Our server is now fully configured.


# Maintenance

The maintenance is minimal, since `certbot` auto renew all needed certificate automatically and reload `apache2` by its own.

We may want to login to reboot the server every month or so to apply some pending security updates.

The only other real maintenance you would want to do is to deploy a new pickaform version.

To deploy a new update, you must sync the server with the main repository `release` branch. So, first, you must ensure your changes have been pushed to the `release` branch, then all you have to do is a `git pull` on the `VPS`.

To do so, you have two choices :

1) Github action
2) Command line + `SSH`

## Github actions

The easy way.

Go to the main repository. In the `Actions` tab, selects `Deploy to VPS1 (production)`, then click the `run workflow` button, then the second `run workflow` button.

Wait for a minute or two for the process to end and... voilà. The server has been synchronized with the `release` branch.

## Command line + `SSH`

You will just do what the **Github Action** would have done, but by hand:

```bash
ssh ubuntu@54.36.180.55
cd KissJS
rm -rf node_modules
git checkout release # to be sure we are on the right branch
git pull
npm install
sudo systemctl restart pickaform.target
```

Check that both the target service and the pickaform instance are running:

```bash
sudo systemctl status pickaform.target
sudo systemctl status pickaform@1.service
```

Then you can logout with `exit`.

# Additional notes

This section contains other configuration tips and reminders.

## LibreOffice

Installing LibreOffice for `docx` to `pdf` conversion is straightforward:

```bash
sudo apt-get install libreoffice --no-install-recommends
sudo apt-get install libreoffice-java-common
```

**Note:** the `--no-install-recommends` avoid us to download to many packages, especially GUI related ones.

Since LibreOffice requires the running user to have a home folder, let's create one for `pickaform`:

```bash
cd /home
sudo mkdir pickaform
sudo chown pickaform:pickaform pickaform
```
And that's it. You can test that pickaform can run LibreOffice without problem:

```bash
sudo su -l pickaform -s /bin/bash
soffice --headless
```

If the command just hang without printing any error, it's ok. Just type `ctrl` + `c` then `exit` and voilà.

## Iptables (firewall)

If you add a new service that must be reached by the pickaform server or any software that you install on this server, **do not forget to check if a new rule must be added to iptables to open a new port**.

There is the exhaustive list of all open ports (**PLEASE KEEP IT UP TO DATE !**):
- `22`    SSH
- `53`    apt-get
- `80`    HTTP
- `443`   HTTPS
- `465`   SSMTP
- `4430`  Websockets
- `27017` MongoDB

## Netdata

Netdata is a powerful monitoring tool that even comes with a panel. Fairly simple to install, just run:

```bash
wget -O /tmp/netdata-kickstart.sh https://my-netdata.io/kickstart.sh && sh /tmp/netdata-kickstart.sh
```

By default, the panel is publicly available at `http://[server ip]:19999` but our firewall rules will hopefully block it. Since it's a useless config, we will use `apache2` to create a new proxy especially for `netdata`.

Let's start by issuing some self-signed certificates:

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt
```

Now we need to create a new `apache2` configuration:

```bash
sudo nano /etc/apache2/sites-available/vps1-ovh.docx2pdf.netdata.pickaform.com.conf
```

Paste this content into the editor:

```apache
<VirtualHost *:443>
    ServerName vps1-ovh.docx2pdf.netdata.pickaform.com

    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/apache-selfsigned.crt
    SSLCertificateKeyFile /etc/ssl/private/apache-selfsigned.key

    ProxyRequests Off
    ProxyPreserveHost On

    <Proxy *>
        AllowOverride None
        AuthType Basic
        AuthName "Protected site"
        AuthUserFile /etc/apache2/.htpasswd
        Require valid-user
    </Proxy>

    ProxyPass "/" "http://localhost:19999/" connectiontimeout=5 timeout=30 keepalive=on
    ProxyPassReverse "/" "http://localhost:19999/"

    ErrorLog ${APACHE_LOG_DIR}/netdata-error.log
    CustomLog ${APACHE_LOG_DIR}/netdata-access.log combined
</VirtualHost>
```

Then, type `ctrl` + `s` to save and `ctrl` + `x` to exit.

We will need to create a user and a password:

```bash
sudo htpasswd -c /etc/apache2/.htpasswd netdata
```

We now need to enable this new website and reload `apache2`:

```bash
sudo a2ensite vps1-ovh.docx2pdf.netdata.pickaform.com.conf
sudo systemctl reload apache2
```

You can now browse [https://vps1-ovh.netdata.pickaform.com](https://vps1-ovh.netdata.pickaform.com) (once your domain have been setup to point to the server IP, obviously).

Accept the security exception regarding the self signed certificate, specify your username (in our case `netdata`) and the password you typed at the previous step and... voilà.

Metrics everywhere!


## Github automation

To allow for deployment directly from the main github repository in tab `Actions`, you must start by creating three secrets into `Settings` -> `Secrets`.

You must adapt their names to try to describe the new server instance with a meaningful name, **they must be different for each server**):

- `OVH_VPS1_DOCX2PDF_HOST` : host ip or domain (for us it is `54.36.180.55`)
- `OVH_VPS1_DOCX2PDF_USER` : main ssh user (for us it is `ubuntu`)
- `OVH_VPS1_DOCX2PDF_PWD` : ssh pwd for the above user

Then you must create a new file in the `master` branch of the main repository in `.github/workflows`, let's call it `ovh_vps1.prod-docx2pdf.yml` with the following content:

```yaml
# This is a basic workflow that is manually triggered

name: Deploy to VPS1 (production-docx2pdf)

on: workflow_dispatch

jobs:
  deploy_OVH_VPS1:
    runs-on: ubuntu-latest
    steps:
      - name: SSH Remote Commands
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.OVH_VPS1_DOCX2PDF_HOST }}
          username: ${{ secrets.OVH_VPS1_DOCX2PDF_USER  }}
          password: ${{ secrets.OVH_VPS1_DOCX2PDF_PWD }}
          script: |
            cd ~/KissJS
            rm -rf node_modules
            git checkout release
            git pull
            npm install
            sudo chown -R :pickaform node_modules
            sudo systemctl restart pickaform.target
            sudo systemctl status pickaform.target
```

**⚠️ VERY IMPORTANT NOTE**: For the GithubAction to be able to run `npm install` with the right version of node, 
you **MUST** provide to the system a way to locate the good `node` binary to execute. 

To do so, please follow these few steps:

1) Run the command `which node` to get the current used node path. There, it should be `/home/ubuntu/.nvm/versions/node/v18.12.0/bin/node`
2) Edit the file `/etc/envrionment` by running `nano /etc/environment`
3) Add **the path** to the node binary by adding **at the beginning** of the `PATH` variable value `/home/ubuntu/.nvm/versions/node/v18.12.0/bin:`
4) Type `ctrl` + `s` to save and `ctrl` + `x` to exit.

---------

Now, let's create some more actions juste to start and stop the emergency mode:

### Start emergency mode

```yaml
# This is a basic workflow that is manually triggered

name: Start emergency on VPS1 (production-docx2pdf)

on: workflow_dispatch

jobs:
  deploy_OVH_VPS1:
    runs-on: ubuntu-latest
    steps:
      - name: SSH Remote Commands
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.OVH_VPS1_DOCX2PDF_HOST }}
          username: ${{ secrets.OVH_VPS1_DOCX2PDF_USER  }}
          password: ${{ secrets.OVH_VPS1_DOCX2PDF_PWD }}
          script: |
            sudo emergency start
```

### Stop emergency mode

```yaml
# This is a basic workflow that is manually triggered

name: Stop emergency on VPS1 (production-docx2pdf)

on: workflow_dispatch

jobs:
  deploy_OVH_VPS1:
    runs-on: ubuntu-latest
    steps:
      - name: SSH Remote Commands
        uses: appleboy/ssh-action@v0.1.5
        with:
          host: ${{ secrets.OVH_VPS1_DOCX2PDF_HOST }}
          username: ${{ secrets.OVH_VPS1_DOCX2PDF_USER  }}
          password: ${{ secrets.OVH_VPS1_DOCX2PDF_PWD }}
          script: |
            sudo emergency stop
```

**Think to replace the main name, and secrets names by the one you defined !**

Commit to the master branch, and voilà, you'll be able to [use your new GitHub Action as explained in the maintenace section](#github-actions), except you obviously want to select the action you just added.
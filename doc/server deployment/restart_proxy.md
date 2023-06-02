# Restart Apache proxy

    ssh ubuntu@app.pickaform.com


accept certificate (Y)

enter password

To reload:

    sudo systemctl reload apache2

To restart:

    sudo systemctl restart apache2

To restart pickaform:

    sudo systemctl restart pickaform.target
    exit
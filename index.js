const texts = {}

// Load styles
kiss.loader.loadStyles([
    "./resources/lib/kissjs/kissjs",
    "./resources/lib/kissjs/styles/geometry/default",
    "./resources/lib/kissjs/styles/colors/dark",
    "./resources/lib/kissjs/webfonts/fontawesome-all.min",
    "./resources/lib/highlight/highlight.atom-one-dark", // Atom
    "./app"
])

kiss.loader.loadScripts([
    "./resources/lib/marked/marked.min", // Markdown parser
    "./resources/lib/highlight/highlight.min",
    "./resources/lib/highlight/highlight.javascript"
])

window.onload = async function () {
    marked.setOptions({
        highlight: function (code, language) {
            return hljs.highlight("javascript", code).value;
        }
    })

    kiss.db.mode = "memory"
    kiss.theme.set({color: "light"})
    await kiss.loader.loadScript("./app.min")
    await kiss.app.init()
    kiss.router.navigateTo("landing-page")
};
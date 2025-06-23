const texts = {}

// Load styles
kiss.loader.loadStyles([
    "./resources/lib/kissjs/kissjs",
    "./resources/lib/kissjs/webfonts/fontawesome-all.min",
    "./resources/lib/highlight/highlight.atom-one-dark", // Atom
    "./build"
])

// Markdown parser
kiss.loader.loadScripts([
    "./resources/lib/marked/marked.min",
    "./resources/lib/highlight/highlight.min",
])
.then(() => kiss.loader.loadScripts([
    "./resources/lib/highlight/highlight.javascript"
]))


window.onload = async function () {
    await kiss.loader.loadScript("./build.min")

    await kiss.app.init({
        debug: true,
        name: "kissjs",
        mode: "memory",
        startRoute: "landing-page",
        loader: async function() {
            marked.setOptions({
                highlight: function (code, language) {
                    return hljs.highlight("javascript", code).value;
                }
            })
            return true
        }
    })
};
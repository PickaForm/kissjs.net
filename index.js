const texts = {}

// Init "marked.js" library to highlight javascript keywords with "highlight.js"
marked.setOptions({
    highlight: function (code, language) {
        return hljs.highlight("javascript", code).value;
    }
})

window.onload = async function () {
    kiss.db.mode = "memory"
    
    await kiss.loader.loadScript("./app.min")

    await kiss.app.init()

    kiss.router.navigateTo("landing-page")

    $("splash").remove()
};
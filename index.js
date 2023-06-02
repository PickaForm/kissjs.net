const texts = {}

// Init "marked.js" library to highlight javascript keywords with "highlight.js"
marked.setOptions({
    highlight: function (code, language) {
        return hljs.highlight("javascript", code).value;
    }
})

window.onload = async function () {
    kiss.db.mode = "memory"
    
    // Load application scripts dynamically
    await kiss.loader.loadScript("./app.min")

    // Init the KissJS app
    await kiss.app.init()

    // Remove the splash screen
    $("splash").remove()
};
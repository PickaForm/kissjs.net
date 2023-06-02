
const texts = {}

// Load application scripts
kiss.loader.loadScripts([
    "views/common/topbar",
    "views/common/logo",
    "views/common/buy",
    "views/common/showcase",
    "views/landing/page",
    "views/landing/hero",
    "views/landing/sample-code",
    "views/landing/demo-panel",
    "views/landing/features",
    "views/home/start",
    "views/home/menu",
    "views/home/content",
    "views/home/content.markdown",
    "views/components/menu",
    "views/components/content",
    "views/components/content.markdown",
    "views/containers/menu",
    "views/containers/content",
    "views/containers/content.markdown",
    "views/datatables/menu",
    "views/datatables/content",
    "views/datatables/content.markdown",
    "views/tutorials/menu",
    "views/tutorials/content",
    "views/tutorials/content.markdown"
])

// Load application styles
kiss.loader.loadStyles([
    "views/common/all",
    "views/common/topbar",
    "views/landing/hero",
])

// Init "marked.js" library to highlight javascript keywords with "highlight.js"
marked.setOptions({
    highlight: function (code, language) {
        return hljs.highlight("javascript", code).value;
    }
})

window.onload = async function () {
    kiss.db.mode = "memory"
    kiss.app.init()
};
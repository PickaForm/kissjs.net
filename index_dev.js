const texts = {}

// Load application scripts
kiss.loader.loadScripts([
    "views/common/model",
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
    "views/datatable/menu",
    "views/datatable/content",
    "views/datatable/content.markdown",
    "views/calendar/menu",
    "views/calendar/content",
    "views/calendar/content.markdown",
    "views/kanban/menu",
    "views/kanban/content",
    "views/kanban/content.markdown",
    "views/timeline/menu",
    "views/timeline/content",
    "views/timeline/content.markdown",
    "views/gallery/menu",
    "views/gallery/content",
    "views/gallery/content.markdown",
    "views/tutorials/menu",
    "views/tutorials/content",
    "views/tutorials/content.markdown",
    "views/cheatsheet/menu",
    "views/cheatsheet/content",
    "views/cheatsheet/content.markdown",
    "views/live/code_fields",
    "views/live/code_panel",
    "views/live/code_layout",
    "views/live/code_datatable",
    "views/live/code_kanban",
    "views/live/code_calendar",
    "views/live/code_timeline",
    "views/live/code_gallery",
    "views/live/content"
])

// Load application styles
kiss.loader.loadStyles([
    "views/common/all",
    "views/common/topbar",
    "views/landing/hero",
])

// Load styles
kiss.loader.loadStyles([
    "./resources/lib/kissjs/kissjs",
    "./resources/lib/kissjs/webfonts/fontawesome-all.min",
    "./resources/lib/highlight/highlight.atom-one-dark" // Atom
])

// Markdown
kiss.loader.loadScripts([
    "./resources/lib/marked/marked.min",
    "./resources/lib/highlight/highlight.min"
])
.then(() => kiss.loader.loadScripts([
    "./resources/lib/highlight/highlight.javascript"
]))

window.onload = async function () {
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
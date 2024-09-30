/**
 * KissJS provides a loader to load scripts and stylesheets dynamically.
 * Here, we load the scripts of the model, view, and controller of the todo list app.
 */
kiss.loader.loadScripts([
    "model",
    "view",
    "controller"
])

window.onload = function () {
    // Once the scripts are loaded, we show the view
    kiss.views.show("todo")
}
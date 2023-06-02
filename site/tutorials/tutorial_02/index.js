/**
 * Demonstrates how to build a view with KissJS.
 * In KissJS, a view is just a function that returns a DOM HTMLElement.
 * That's all.
 */
window.onload = function () {

    // 1. Register your view
    kiss.app.defineView("dummy", function (id, target) {

        // Create your HTMLElement
        const myDummyElement = document.createElement("div")
        myDummyElement.id = id
        myDummyElement.target = target

        myDummyElement.innerHTML =
            `<center>
                <h1><b>HELLO WORLD</b></h1>
            </center>`

        return myDummyElement
    })

    // 2. Display your view
    kiss.views.show("dummy")
};
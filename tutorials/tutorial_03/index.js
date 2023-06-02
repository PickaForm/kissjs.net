/**
 * Example of how to combine views and components to build a bigger app.
 * 
 * In this example, the 2 views are defined in the same file,
 * but a good practice is to have one file per view.
 */
window.onload = function () {

    /**
     * Let's define a view 1
     */
    kiss.app.defineView("view1", function (id, target) {

        const myPanel = createPanel({
            id: id,
            title: "VIEW 1",
            position: "absolute",
            draggable: true,
            align: "center",
            boxShadow: "0px 0px 64px #223344",
    
            items: [
                {
                    type: "html",
                    html: "I'm the VIEW 1",
                    padding: "20px",
                    style: "text-align: center; font-size: 32px; color: #00aaee;"
                },
                {
                    type: "button",
                    text: "Click to jump to view 2",
                    icon: "fas fa-rocket",
                    iconSize: "32px",
                    fontSize: "32px",
                    padding: "20px",
                    iconPadding: "0px 50px 0px 0px",
                    
                    // The button click event will replace view1 by view2
                    events: {
                        click: function() {
                            kiss.views.replaceBy("view2")
                        }
                    }
                }
            ]
        })

        // The view can return a KissJS Component
        // (KissJS components derive from HTMLElement, so, they're considered as standard DOM elements)
        return myPanel
    })

    /**
     * Let's define a view 2
     */
    kiss.app.defineView("view2", function (id, target) {
        return createPanel({
            id: id,
            title: "VIEW 2",
            position: "absolute",
            draggable: true,
            align: "center",
            headerBackgroundColor: "#7112FC",
            boxShadow: "0px 0px 64px #223344",
    
            items: [
                {
                    type: "html",
                    html: "I'm the VIEW 2",
                    padding: "20px",
                    styles: {
                        "this": "text-align: center; font-size: 32px; color: #7112FC"
                    }                    
                },
                {
                    type: "button",
                    text: "Go back to view 1",
                    icon: "fas fa-arrow-left",
                    iconSize: "32px",
                    fontSize: "32px",
                    padding: "20px",
                    iconPadding: "0px 50px 0px 0px",
                    
                    // Same as before, but using "action" as a shortcut to replace "events > click"
                    // and also using arrow functions syntax (javascript ES6)
                    // This is much shorter!
                    action: () => kiss.views.replaceBy("view1")
                }
            ]
        })
    })

    // Start by showing the view 1
    kiss.views.show("view1")
};
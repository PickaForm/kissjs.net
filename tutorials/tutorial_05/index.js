/**
 * In this example, will now use the KissJS client router to switch between views.
 * 
 * The client router is started (among other things) using: kiss.app.init()
 * The router makes a connection between the application URL #hash and the application state.
 * 
 * That means that:
 * - changing the url #hash will change the application state
 * - changing the application state will update the url #hash
 * 
 * This has a few advantages:
 * - the browser history works fine
 * - you can implement deep linking
 * - you can use the router to update your application state
 * - routing can be triggered automatically by external events (for example a websocket incoming message)
 * 
 * But let's see how it's working...
 */
window.onload = function () {

    // Will display the application context in the console
    function showContext() {
        const currentContext = kiss.router.getRoute()
        log(`URL #hash param2 = ${currentContext.your_param2}`)
        log(`URL #hash param3 = ${currentContext.your_param3}`)
    }

    /**
     * VIEW 1
     */
    kiss.app.defineView({
        id: "page1",
        renderer: function (id, target) {
            return createPanel({
                id: id,
                title: "PAGE 1",
                position: "absolute",
                align: "center",

                items: [{
                    type: "button",
                    text: "Jump to page #2",
                    icon: "fas fa-rocket",

                    // This time, we don't explicitly display views, but we will instead change the application state
                    action: () => {
                        kiss.router.navigateTo({
                                ui: "page2", // ui parameter is *REQUIRED* to display a KissJS view
                                your_param2: "Hello", // You can add as many parameters as you wish to your routing...
                                your_param3: "World!"
                            })
                            .then(showContext)
                    }
                }]
            })
        }
    })

    /**
     * VIEW 2
     */
    kiss.app.defineView({
        id: "page2",
        renderer: function (id, target) {
            return createPanel({
                id: id,
                title: "PAGE 2",
                position: "absolute",
                align: "center",

                items: [{
                        type: "button",
                        text: "Go back to page #1",
                        icon: "fas fa-arrow-left",
                        margin: "0px 20px 0px 0px",

                        // The router will replace view2 by view1
                        action: () => {
                            kiss.router.navigateTo({
                                    ui: "page1",
                                    your_param2: "Planet",
                                    your_param3: "Earth"
                                })
                                .then(showContext)
                        }
                    },
                    {
                        type: "button",
                        text: "Go to page #3",
                        icon: "fas fa-arrow-right",

                        // The router will replace view2 by view3
                        action: () => {
                            kiss.router.navigateTo({
                                    ui: "page3",
                                    your_param2: "Foo",
                                    your_param3: "Bar"
                                })
                                .then(showContext)
                        }
                    }
                ]
            })
        }
    })

    /**
     * VIEW 3
     */
    kiss.app.defineView({
        id: "page3",
        renderer: function (id, target) {
            return createPanel({
                id: id,
                title: "PAGE 3",
                position: "absolute",
                align: "center",

                items: [{
                    type: "button",
                    text: "Go back to page #2",
                    icon: "fas fa-arrow-left",

                    // The router will replace view2 by view1
                    action: () => {
                        kiss.router.navigateTo({
                                ui: "page2",
                                your_param2: "Planet",
                                your_param3: "Earth"
                            })
                            .then(showContext)
                    }
                }]
            })
        }
    })

    // Init the application to init the client router
    kiss.app.init()

    // Route to the first view
    kiss.router.navigateTo({
        ui: "page1",
        your_param2: "Well",
        your_param3: "done!"
    })
};
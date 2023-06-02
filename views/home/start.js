kiss.app.defineView("start", function (id, target) {
    return createBlock({
        id: id,
        target,

        fullscreen: true,
        width: "100%",
        margin: "auto",
        layout: "vertical",

        items: [
            // Top bar
            {
                id: "site-topbar",
                items: [{
                    type: "view",
                    id: "topbar"
                }]
            },
            // Main
            {
                flex: 1,
                layout: "horizontal",
                items: [
                    // Left navigation
                    {
                        id: "site-west",
                        class: "navigation-panel",
                        height: "100%",
                        layout: "vertical",

                        items: [
                            // Logo
                            {
                                type: "view",
                                id: "logo",
                            },
                            // Menu
                            {
                                id: "site-navigation",
                                overflowY: "auto"
                            }
                        ]
                    },
                    // Content
                    {
                        id: "site-content",
                        flex: 1,
                        height: "100%",
                        overflowY: "auto"
                    }
                ]
            }
        ],

        // The website reacts to 2 events :
        // - when a new route is fired, it shows the corresponding views / subviews
        // - when the window is resized, it shows/hides the left navigation panel
        subscriptions: {

            // Display a new section of the website according to the "section" parameter of the url #hash
            // and scroll down to a specific anchor according to the "anchor" parameter of the #hash.
            // @note: this also demonstrates how to easily manage deep linking with KissJS
            EVT_ROUTE_UPDATED: (msgData) => {

                // Check that we are on the documentation start page
                if (kiss.router.getRoute().ui == "start") {
                    let newSection = msgData.section
                    let newAnchor = decodeURI(msgData.anchor)

                    if (newSection) {
                        let navigation = kiss.views.show(newSection + "-menu", "site-navigation", true)
                        let content = kiss.views.show(newSection + "-content", "site-content", true)

                        // Animate the content (fade) and the navigation (slide)
                        if (content) content.setAnimation("fadeIn")
                        if (navigation && (kiss.context.navigation != "hidden")) navigation.setAnimation("slideInLeft")

                        // Scroll down to the anchor after the section is rendered
                        if ($(newAnchor)) $(newAnchor).scrollIntoView({behavior: "smooth"})
                    }

                    if (kiss.context.navigation == "hidden") $("site-west").hide()
                }
            },

            // Make the left navigation responsive:
            // transform it as a menu if the screen is not wide enough
            EVT_WINDOW_RESIZED: (msgData) => {
                // Check that we are on the documentation start page
                if (kiss.router.getRoute().ui == "start") {
                    if (msgData.current.width < 1650) {
                        kiss.context.navigation = "hidden"
                        $("side-menu").show()
                        $("site-west").style.position = "fixed"
                        $("site-west").style.zIndex = 1000
                        $("site-west").hide()
                    }
                    else {
                        kiss.context.navigation = "visible"
                        $("side-menu").hide()
                        $("site-west").style.position = "relative"
                        $("site-west").show()
                    }
                }
            }
        }
    })
})

;
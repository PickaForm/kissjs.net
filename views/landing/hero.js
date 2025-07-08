kiss.app.defineView({
    id: "landing-hero",
    renderer: function (id, target) {
        const isMobile = kiss.tools.isMobile()

        return createBlock({
            id: id,
            target,

            layout: "vertical",
            alignItems: "center",
            animation: "rotateIn",
            height: "100%",

            items: [{
                    type: "spacer",
                    flex: 1
                },
                // TITLE / SUBTITLE
                {
                    type: "html",
                    flex: 1,
                    html:
                        `<div class="spacer"></div>
                        <div class="home-title">KISS JS</div>
                        <div class="home-pitchline">
                            Keep It Simple Stupid Javascript
                            <br><br>
                            A simple library
                            <br>
                            to build real business apps
                        </div>
                        `.removeExtraSpaces()
                },
                // BUTTONS
                {
                    defaultConfig: {
                        color: "#ffffff",
                        fontSize: "2.5vh",
                        margin: "2% 0% 0% 0%",
                        padding: "2vh 2vh",
                        height: "5vh",
                        borderWidth: "1px",
                        borderRadius: "6vh",
                        animation: "zoomIn",
                        backgroundColor: "#00aaee",
                        backgroundColorHover: "#61cef9"
                    },

                    layout: "horizontal",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "100%",
                    items: [
                        // BUTTON: QUICK OVERVIEW
                        {
                            hidden: isMobile,
                            type: "button",
                            text: "Quick overview",
                            action: () => {
                                $("code-example").scrollIntoView({
                                    behavior: "smooth"
                                })

                                if (!$("demo-panel")) kiss.views.show("demo-panel")
                            }
                        },
                        {
                            type: "spacer",
                            width: "2vh"
                        },
                        // BUTTON: QUICK GUIDE
                        {
                            type: "button",
                            text: "Quick guide",
                            action: () => {
                                kiss.router.navigateTo({
                                    ui: "start",
                                    section: "home"
                                })
                            }
                        },
                        {
                            type: "spacer",
                            width: "2vh"
                        },
                        // BUTTON: API DOCUMENTATION
                        {
                            type: "button",
                            text: "API documentation",
                            action: () => document.location = "./doc/out/kiss.html"
                        }                    
                    ]
                },
                // BUTTONS
                {
                    defaultConfig: {
                        color: "#ffffff",
                        fontSize: "1.3vh",
                        margin: "2% 0% 0% 0%",
                        padding: "1.5vh 1.5vh",
                        height: "2vh",
                        borderWidth: "1px",
                        borderRadius: "6vh",
                        animation: "zoomIn",
                        backgroundColor: "#345678",
                        backgroundColorHover: "#789abc"
                    },

                    layout: "horizontal",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "100%",
                    items: [
                        // BUTTON: DATATABLE
                        {
                            hidden: isMobile,
                            type: "button",
                            text: "Datatable example",
                            action: () => {
                                kiss.router.navigateTo({
                                    ui: "start",
                                    section: "datatable"
                                })
                            }
                        },
                        {
                            type: "spacer",
                            width: "2vh"
                        },
                        // BUTTON: CALENDAR
                        {
                            hidden: isMobile,
                            type: "button",
                            text: "Calendar example",
                            action: () => {
                                kiss.router.navigateTo({
                                    ui: "start",
                                    section: "calendar"
                                })
                            }
                        },
                        {
                            type: "spacer",
                            width: "2vh"
                        },
                        // BUTTON: KANBAN
                        {
                            hidden: isMobile,
                            type: "button",
                            text: "Kanban example",
                            action: () => {
                                kiss.router.navigateTo({
                                    ui: "start",
                                    section: "kanban"
                                })
                            }
                        },
                        {
                            type: "spacer",
                            width: "2vh"
                        },
                        // BUTTON: TIMELINE
                        {
                            hidden: isMobile,
                            type: "button",
                            text: "Timeline example",
                            action: () => {
                                kiss.router.navigateTo({
                                    ui: "start",
                                    section: "timeline"
                                })
                            }
                        },
                        {
                            type: "spacer",
                            width: "2vh"
                        },
                        // BUTTON: GALLERY
                        {
                            hidden: isMobile,
                            type: "button",
                            text: "Gallery example",
                            action: () => {
                                kiss.router.navigateTo({
                                    ui: "start",
                                    section: "gallery"
                                })
                            }
                        }                        
                    ]
                },                
                {
                    type: "spacer",
                    flex: 1
                }
            ]
        })
    }
})

;
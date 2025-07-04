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
                        margin: "5% 0% 0% 0%",
                        padding: "2vh 2vh",
                        height: "5vh",
                        borderWidth: "1px",
                        borderRadius: "6vh",
                        animation: "zoomIn"
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
                            backgroundColor: "#2e1d80",
                            backgroundColorHover: "#4e3da0",
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
                            backgroundColor: "#8c4bff",
                            backgroundColorHover: "#bc7bff",
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
                            backgroundColor: "#ed3757",
                            backgroundColorHover: "#ff5777",
                            action: () => document.location = "./doc/out/kiss.html"
                        },
                        {
                            type: "spacer",
                            width: "2vh"
                        },
                        // BUTTON: DATATABLE
                        {
                            hidden: isMobile,
                            type: "button",
                            text: "Datatable example",
                            backgroundColor: "#00aaee",
                            backgroundColorHover: "#30dafe",
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
                            backgroundColor: "#ffaa00",
                            backgroundColorHover: "#ffcc33",
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
                            backgroundColor: "#75c900",
                            backgroundColorHover: "#56ef05",
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
                            backgroundColor: "#006c5d",
                            backgroundColorHover: "#009c86",
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
                            backgroundColor: "#9c5940",
                            backgroundColorHover: "#d87957",
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
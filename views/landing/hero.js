kiss.app.defineView({
    id: "landing-hero",
    renderer: function (id, target) {
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
                    html: `<div class="spacer"></div>
                            <div class="home-title">KISS JS</div>
                            <div class="home-pitchline">Simple Javascript UI library</div>`.removeExtraSpaces()
                },
                // BUTTONS
                {
                    defaultConfig: {
                        color: "#ffffff",
                        fontSize: "2.5vh",
                        icon: "fas fa-chevron-down",
                        iconHover: "fas fa-paper-plane",
                        iconSize: "2.5vh",
                        iconColor: "#ffffff",
                        margin: "5% 0% 0% 0%",
                        padding: "3vh 1vh",
                        height: "5vh",
                        borderWidth: "1px",
                        borderRadius: "6vh",
                        animation: "zoomIn",
                        minWidth: "20vw"
                    },

                    layout: "horizontal",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "100%",
                    items: [
                        // BUTTON: QUICK OVERVIEW
                        {
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
                        // BUTTON: DATATABLE
                        {
                            type: "button",
                            text: "Datatable and forms",
                            backgroundColor: "#00aaee",
                            backgroundColorHover: "#30dafe",
                            action: () => {
                                kiss.router.navigateTo({
                                    ui: "start",
                                    section: "datatables"
                                })
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
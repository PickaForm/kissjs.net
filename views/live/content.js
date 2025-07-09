kiss.app.defineView({
    id: "live-test",
    renderer: function (id) {

        const defaultCode = code_panel

        return createPanel({
            id,
            layout: "horizontal",
            height: "100vh",
            title: "Live test",
            icon: "fas fa-code",
            padding: 0,
            border: 0,
            borderRadius: "0 0 0 0",

            styles: {
                "panel-header": "background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(50,9,121,1) 35%, rgba(0,212,255,1) 100%);"
            },

            events: {
                close: () => kiss.router.navigateTo("landing-page")
            },

            items: [{
                    layout: "vertical",
                    flex: 1,
                    height: "100%",
                    items: [
                        {
                            layout: "horizontal",
                            alignItems: "center",

                            defaultConfig: {
                                type: "button",
                                flex: 1,
                                margin: "5px 0px 5px 5px",
                                background: "#00aaee",
                                color: "white",
                                iconColor: "white"
                            },

                            items: [
                                {
                                    icon: "fas fa-arrow-left",
                                    maxWidth: "45px",
                                    height: 34,
                                    action: () => kiss.router.navigateTo({
                                        ui: "landing-page"
                                    })
                                },                                
                                {
                                    text: "Save code",
                                    icon: "fas fa-save",
                                    action: function () {
                                        const code = $("code").getValue()
                                        localStorage.setItem("code", code)
                                        this.setAnimation({
                                            name: "zoomIn",
                                            speed: "faster"
                                        })
                                    }
                                },
                                {
                                    text: "Restore saved code",
                                    icon: "fas fa-share",
                                    action: () => {
                                        const lastCode = localStorage.getItem("code")
                                        $("code").setValue(lastCode)
                                    }
                                },
                                {
                                    text: "Reset",
                                    icon: "fas fa-bolt",
                                    action: () => {
                                        $("code").setValue("{\n    type: 'text',\n    label: 'Hello world'\n}")
                                    }
                                },
                                {
                                    type: "select",
                                    minWidth: 150,
                                    fieldWidth: "100%",
                                    margin: "0 5px 0 0",
                                    options: [
                                        {
                                            label: "Simple panel with fields",
                                            value: "code_panel",
                                            color: "var(--green)"
                                        },
                                        {
                                            label: "Complete layout",
                                            value: "code_layout",
                                            color: "var(--purple)"
                                        }
                                    ],
                                    value: "code_panel",
                                    events: {
                                        change: function() {
                                            const newCode = this.getValue()
                                            $("code").setValue(eval(newCode))
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            id: "code",
                            type: "codeEditor",
                            height: "calc(100vh - 85px)",
                            fieldHeight: "calc(100vh - 85px)",
                            width: "100%",
                            fieldWidth: "100%",
                            value: defaultCode,
                            events: {
                                change: () => $(id).updateOutput()
                            }
                        }
                    ]
                },
                {
                    id: "output",
                    type: "html",
                    flex: 1,
                    overflow: "auto",
                    margin: "0 0 0 10px",
                    boxShadow: "var(--shadow-4)"
                }
            ],

            methods: {
                load() {
                    this.updateOutput()
                },

                updateOutput() {
                    try {
                        const codeAsAstring = $("code").getValue()
                        const code = Function('"use strict"; return (' + codeAsAstring + ')')()

                        $("output").innerHTML = ""

                        createBlock({
                            target: "output",
                            width: "100%",
                            height: "100%",
                            items: [code]
                        }).render()

                        $(id).panelHeader.style.background = "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(50,9,121,1) 35%, rgba(0,212,255,1) 100%)"
                        $(id).setTitle("Live test - All good 🙂")

                    } catch (err) {
                        $(id).panelHeader.style.background = "var(--red)"
                        $(id).setTitle("Live test - Error 😢")
                    }
                }
            }
        })
    }
})

;
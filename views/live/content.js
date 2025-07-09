kiss.app.defineView({
    id: "live-test",
    renderer: function (id) {

        const defaultCode = code_fields

        return createPanel({
            id,
            layout: "horizontal",
            height: "100vh",
            title: "Live test",
            icon: "fas fa-code",
            padding: 0,
            border: 0,
            borderRadius: "0 0 0 0",
            headerHeight: "6rem",

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
                        // TOP BAR
                        {
                            layout: "horizontal",
                            alignItems: "center",
                            minHeight: "6rem",

                            defaultConfig: {
                                type: "button",
                                flex: 1,
                                margin: "0.5rem 0 0.5rem 0.5rem",
                                background: "#00aaee",
                                color: "white",
                                iconColor: "white",
                                height: "3.5rem"
                            },

                            items: [
                                {
                                    icon: "fas fa-arrow-left",
                                    maxWidth: "4.5rem",
                                    action: () => kiss.router.navigateTo({
                                        ui: "landing-page"
                                    })
                                },
                                {
                                    type: "select",
                                    label: "Examples",
                                    minWidth: "15rem",
                                    fieldWidth: "100%",
                                    height: "4rem",
                                    margin: "0 0.5rem 0 0",
                                    options: [
                                        {
                                            label: "Field types",
                                            value: "code_fields",
                                            color: "var(--blue)"
                                        },
                                        {
                                            label: "Simple panel",
                                            value: "code_panel",
                                            color: "var(--purple)"
                                        },
                                        {
                                            label: "Complete layout",
                                            value: "code_layout",
                                            color: "var(--red)"
                                        }
                                    ],
                                    value: "code_fields",
                                    events: {
                                        change: function() {
                                            const newCode = this.getValue()
                                            $("code").setValue(eval(newCode))
                                        }
                                    }
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
                                }
                            ]
                        },
                        // CODE
                        {
                            id: "code",
                            type: "codeEditor",
                            height: "calc(100vh - 8.5rem)",
                            fieldHeight: "calc(100vh - 8.5rem)",
                            width: "100%",
                            fieldWidth: "100%",
                            value: defaultCode,
                            events: {
                                change: () => $(id).updateOutput()
                            }
                        }
                    ]
                },
                // OUTPUT
                {
                    id: "output",
                    type: "html",
                    flex: 1,
                    overflow: "auto",
                    margin: "0 0 0 1rem",
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
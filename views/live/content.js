kiss.app.defineView({
    id: "live-test",
    renderer: function (id) {

        const defaultCode = code_fields
        let lastComponent = null

        return createPanel({
            id,
            layout: "vertical",
            height: "100vh",
            title: "Live test",
            icon: "fas fa-code",
            padding: 0,
            border: 0,
            borderRadius: "0 0 0 0",
            headerHeight: "6rem",
            headerColor: "white",

            events: {
                close: () => kiss.router.navigateTo("landing-page")
            },

            items: [
                // TOP BAR
                {
                    layout: "horizontal",
                    alignItems: "center",
                    minHeight: "6rem",
                    gap: "1rem",
                    background: "var(--body-background-alt)",
                    borderStyle: "solid",
                    borderWidth: "0 0 1px 0",
                    borderColor: "var(--field-border)",

                    defaultConfig: {
                        type: "button",
                        height: "3.5rem"
                    },

                    items: [{
                            icon: "fas fa-arrow-left",
                            maxWidth: "4.5rem",
                            margin: "0 0 0 1rem",
                            action: () => kiss.router.navigateTo({
                                ui: "landing-page"
                            })
                        },
                        {
                            type: "select",
                            label: "Pick an example to start with",
                            width: "50rem",
                            labelWidth: "50%",
                            fieldWidth: "50%",
                            height: "4rem",
                            options: [{
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
                                },
                                {
                                    label: "Datatable view",
                                    value: "code_datatable",
                                    color: "var(--pink)"
                                },
                                {
                                    label: "Kanban board",
                                    value: "code_kanban",
                                    color: "var(--orange)"
                                },
                                {
                                    label: "Calendar view",
                                    value: "code_calendar",
                                    color: "var(--yellow)"
                                },
                                {
                                    label: "Timeline view",
                                    value: "code_timeline",
                                    color: "var(--green)"
                                },
                                {
                                    label: "Gallery view",
                                    value: "code_gallery",
                                    color: "var(--gray)"
                                },
                                {
                                    label: "Map view",
                                    value: "code_map",
                                    color: "var(--alt-gray)"
                                },
                                {
                                    label: "Database & ORM",
                                    value: "code_ORM",
                                    color: "#000000"
                                },
                                {
                                    label: "Relationships",
                                    value: "code_relationships",
                                    color: "#000000"
                                }
                            ],
                            value: "code_fields",
                            events: {
                                change: function () {
                                    const newCode = this.getValue()
                                    $("code").setValue(eval(newCode))
                                }
                            }
                        },
                        // Buttons
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
                // MAIN CONTENT
                {
                    layout: "horizontal",
                    flex: 1,
                    items: [
                        // CODE
                        {
                            id: "code",
                            type: "codeEditor",
                            height: "calc(100vh - 12rem)",
                            fieldHeight: "calc(100vh - 12rem)",
                            width: "100%",
                            fieldWidth: "100%",
                            value: defaultCode,
                            flex: 1,
                            events: {
                                change: () => $(id).updateOutput()
                            }
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
                    ]
                }

            ],

            methods: {
                load() {
                    this.updateOutput()
                },

                updateOutput() {
                    try {
                        if (lastComponent) lastComponent.deepDelete()
                        $("output").innerHTML = ""

                        const codeAsAstring = $("code").getValue()
                        const code = Function('"use strict"; return (' + codeAsAstring + ')')()

                        lastComponent = createBlock({
                            target: "output",
                            width: "100%",
                            height: "100%",
                            items: [code]
                        }).render()

                        $(id).panelHeader.style.background = "var(--blue)"
                        $(id).setTitle("Live test - All good 🙂")

                    } catch (err) {
                        $(id).panelHeader.style.background = "var(--red)"
                        $(id).setTitle("Live test - Error")
                    }
                }
            }
        })
    }
})

;
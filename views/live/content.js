kiss.app.defineView({
    id: "live-test",
    renderer: function (id) {

        const defaultCode =
            `// Creates a panel, which is one of the 2 kinds of containers
{
    id: "my-panel",
    type: "panel",
    title: "This is a live code test",
    icon: "fas fa-code",
    closable: true,
    layout: "vertical",
    width: 600,
    margin: "20px auto",

    // Default config is applied to all items of the container
    defaultConfig: {
        labelPosition: "top",
        width: "100%"
    },
    
    items: [
        // Dropdown list field
        {
            id: "dropdown",
            type: "select",
            label: "List of options",
            multiple: true,
            allowClickToDelete: true,
            value: "B",
            options: [{
                    color: "#00aaee",
                    label: "Blue",
                    value: "B"
                },
                {
                    color: "#a1ed00",
                    label: "Green",
                    value: "G"  
                }
            ],
            
            // Manage events
            events: {
                change: function() {
                    const newColors = this.getValue()

                    // Publish a message on the "COLOR_CHANGED" channel
                    if (newColors.includes("B")) {
                        publish("COLOR_CHANGED", "#00aaee")
                    }
                    else if (newColors.includes("G")) {
                        publish("COLOR_CHANGED", "#a1ed00")
                    }
                    else {
                        publish("COLOR_CHANGED", "#123456")
                    }
                }
            }
        },
        
        // Checkbox field
        {
            id: "cb",
            type: "checkbox",
            label: "Check me",
            shape: "switch",
            value: true,
            iconColorOn: "red"
        },
        
        // Rating field
        {
            id: "rating",
            type: "rating",
            label: "Note",
            value: 3
        },
        
        // Button bar (block container with horizontal layout)
        {
            layout: "horizontal",

            defaultConfig: {
                type: "button",
                flex: 1,
                margin: 5
            },
            
            items: [
                {
                    text: "Set random values",
                    icon: "fas fa-random",
                    action: () => {
                        const newCheckboxState = !$("cb").getValue()
                        $("cb").setValue(newCheckboxState)
                        
                        const newRating = ($("rating").getValue() + 1) % 6
                        $("rating").setValue(newRating)
                        
                        const currentColors = $("dropdown").getValue()
                        const newColors = (currentColors.includes("G")) ? ["B"] : ["G"]
                        $("dropdown").setValue(newColors)
                        
                        const formValues = $("my-panel").getData()
                        console.log(formValues)
                    }
                }
            ]
        }
    ],
    
    subscriptions: {
        // Subscribe the panel to the "COLOR_CHANGED" channel
        COLOR_CHANGED: function(messageData) {
            $("my-panel").setHeaderBackgroundColor(messageData)
        }
    }
}`
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
                                        $("code").setValue(defaultCode)
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
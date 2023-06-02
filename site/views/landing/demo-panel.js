kiss.app.defineView("demo-panel", function (id, target) {
    return createPanel({
        id: id,
        target,

        title: "I'm a demo panel",
        icon: "fas fa-check",
        boxShadow: "4px 4px 16px #aaaaaa",
        closable: true,
        closeMethod: "hide",
        draggable: true,
        headerBackgroundColor: "linear-gradient(45deg, rgba(98,9,255,1) 0%, rgba(140,75,255,1) 100%)",
        width: 550,
        left: "50%",
        verticalAlign: "center",
        layout: "vertical",

        defaultConfig: {
            labelPosition: "left",
            labelWidth: "250px",
            fieldWidth: "100%"
        },

        items: [{
                id: "First name",
                type: "text",
                label: "First name",
                placeholder: "Enter your first name",
                events: {
                    change: () => publish("DATA_HAS_CHANGED")
                }
            },
            {
                id: "Last name",
                type: "text",
                label: "Last name",
                value: "SMITH (just a default value)",
                events: {
                    change: () => publish("DATA_HAS_CHANGED")
                }
            },
            {
                id: "Today is...",
                type: "date",
                label: "Today is...",
                value: new Date().toISO(),
                events: {
                    change: () => publish("DATA_HAS_CHANGED")
                }
            },
            {
                id: "Your favorite addictions",
                type: "select",
                label: "Your favorite addictions",
                allowClickToDelete: true,
                allowSwitchOnOff: true,
                multiple: true,
                value: ["Kissing"],
                options: [{
                        value: "Angularing",
                        color: "#00aaee"
                    },
                    {
                        value: "Reacting",
                        color: "#3bc48c"
                    },
                    {
                        value: "Vueing",
                        color: "#cc3300"
                    },
                    {
                        value: "Kissing",
                        color: "#ff9955"
                    }
                ],
                events: {
                    change: () => publish("DATA_HAS_CHANGED")
                }
            },
            {
                id: "Show random text",
                type: "checkbox",
                label: "Show random text",
                iconColorOn: "#00aaee",
                shape: "switch",

                events: {
                    change: function () {
                        let dumbHtml = $("dumb-text")
                        let dumbText = kiss.db.faker("description")

                        if (this.getValue() == true) {
                            dumbHtml.setInnerHtml(dumbText)
                            dumbHtml.setAnimation("zoomIn").show()
                        } else dumbHtml.hide()

                        publish("DATA_HAS_CHANGED")
                    }
                }
            },                      
            {
                id: "dumb-text",
                type: "html",
                hidden: true
            },
            {
                id: "data",
                type: "textarea",
                label: "Form data",
                rows: 10,
                subscriptions: {
                    DATA_HAS_CHANGED: function() {
                        const formData = $(id).getData(true)
                        delete formData.data
                        const formDataAsString = JSON.stringify(formData, null, 4)
                        this.setValue(formDataAsString)
                    }
                }
            },
            {
                layout: "horizontal",
                margin: "20px 0px 0px 0px",
                width: "100%",

                defaultConfig: {
                    flex: 1,
                    margin: "5px",
                    borderRadius: "32px",
                    color: "#ffffff",
                    iconColor: "#ffffff",
                    iconSize: "14px",
                    padding: "8px 10px 8px 10px"
                },

                items: [
                    {
                        type: "button",
                        text: "Click to swing!",
                        backgroundColor: "#2e1d80",
                        backgroundColorHover: "#4e3da0",
                        icon: "fas fa-sync-alt",
        
                        action: (event) => {
                            if (! $("demo-panel")) kiss.views.show("demo-panel")
                            $("demo-panel").setAnimation({name: "swing", speed: "fast"})
                        }
                    },
                    {
                        type: "button",
                        text: "Click to shake!",
                        backgroundColor: "#8c4bff",
                        backgroundColorHover: "#bc7bff",
                        icon: "fas fa-arrows-alt-h",
        
                        action: (event) => {
                            if (! $("demo-panel")) kiss.views.show("demo-panel")
                            $("demo-panel").setAnimation({name: "shakeX", speed: "fast"})
                        }
                    },
                    {
                        type: "button",
                        text: "Squeeze that code",
                        backgroundColor: "#00aaee",
                        backgroundColorHover: "#30dafe",
                        icon: "fas fa-star",
        
                        action: (event) => {
                            $("code-example").scrollIntoView({
                                behavior: "smooth"
                            })
                            $("code-example").setAnimation({name: "jello", speed: "slow"})
                        }
                    }
                ]
            }
        ]        
    })
})

;
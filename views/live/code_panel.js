const code_panel = `// Creates a panel, which is one of the 2 kinds of containers
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
                },
                {
                    type: "button",
                    text: "Shake the panel",
                    icon: "fas fa-check",
                    iconPosition: "right",
                    action: () => $("my-panel").setAnimation("jello")
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

;
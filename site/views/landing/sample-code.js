kiss.app.defineView("landing-sample-code", function (id, target) {
    // Pieces of code (re-arranged for lisibility)
    texts.showPanelConfig = `<span id="help-simple-api" class="code-help">createPanel</span>({
        id: "demo-panel",
        title: "I'm a demo panel",
        icon: "fas fa-check",
        draggable: true,
        closable: true,
        <span id="help-items" class="code-help">items:</span> [<div class="code-block">
            {
                type: "text",
                label: "First name",
                placeholder: "Enter your first name",
                <span id="help-events" class="code-help">events: {
                    onchange:</span> () => publish("DATA_HAS_CHANGED")
                }                
            },</div><div class="code-block">
            <span id="help-fields" class="code-help">{
                type: "text",
                label: "Last name",
                value: "SMITH (just a default value)",
                events: {
                    onchange: () => publish("DATA_HAS_CHANGED")
                }                
            }</span>,</div><div class="code-block">
            {
                type: "date",
                label: "Today is...",
            },</div><div class="code-block">
            {
                <span id="help-select" class="code-help">type: "select",</span>
                label: "Your favorite addictions",
                multiple: true,
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
                    onchange: () => <span id="help-pubsub" class="code-help">publish("DATA_HAS_CHANGED")</span>
                }                
            },</div><div class="code-block">
            {
                type: "checkbox",
                label: "Random text",
                <span id="help-checkbox" class="code-help">shape: "switch",</span>
                iconColorOn: "#00aaee",
                <span id="help-events" class="code-help">events: {
                    onchange:</span> function() {
                        let dumbHtml = $("dumb-text")
                        let dumbText = kiss.db.faker("description")
    
                        if (this.getValue() == true) {
                            dumbHtml.setValue(dumbText)
                            dumbHtml.setAnimation("zoomIn").show()
                        }
                        else dumbHtml.hide()

                        publish("DATA_HAS_CHANGED")
                    }
                }
            },</div><div class="code-block">
            {
                id: "dumb-text",
                type: "html",
                <span id="help-W3C" class="code-help">hidden: true</span>
            },</div><div class="code-block">
            {
                id: "data",
                type: "textarea",
                label: "Form data",
                rows: 10,
                <span id="help-subscriptions" class="code-help">subscriptions: {
                    DATA_HAS_CHANGED:</span> function() {
                        const formData = $(id).getData(true)
                        delete formData.data
                        const formDataAsString = JSON.stringify(formData, null, 4)
                        this.setValue(formDataAsString)
                    }
                }
            },

            // Block of 3 buttons aligned horizontally
            {
                type: "block",
                <span id="help-layout" class="code-help">display: "flex",
                flexFlow: "row",</span>

                // This config applies to the container's items
                <span id="help-defaults" class="code-help">defaultConfig: {
                    flex: 1,
                    margin: "5px",
                    borderRadius: "32px",
                    color: "#ffffff",
                    iconColor: "#ffffff",
                    iconSize: "14px",
                    padding: "8px 10px 8px 10px"
                },</span>
                
                items: [
                    {
                        <span id="help-button" class="code-help">type: "button",</span>
                        text: "Click to swing!",
                        backgroundColor: "#2e1d80",
                        backgroundColorHover: "#4e3da0",
                        <span id="help-font-awesome" class="code-help">icon: "fas fa-sync-alt",</span>
                        events: {
                            onclick: () => {
                                const demoPanel = $("demo-panel")
                                <span id="help-animation" class="code-help">demoPanel.setAnimation("swing")</span>
                            }
                        }
                    },</div><div class="code-block">
                    {
                        type: "button",
                        text: "Click to shake!!",
                        color: "#ffffff",
                        backgroundColor: "#8c4bff",
                        backgroundColorHover: "#bc7bff",
                        icon: "fas fa-arrows-alt-h",
                        iconColor: "#ffffff",
                        iconSize: "1vw",
                        events: {
                            onclick: () => {
                                $("demo-panel").setAnimation("shakeX")
                            }
                        }                 
                    },</div><div class="code-block">
                    {
                        type: "button",
                        text: "Squeeze that code",
                        backgroundColor: "#00aaee",
                        backgroundColorHover: "#30dafe",
                        icon: "fas fa-star",
                        events: {
                            onclick: () => {
                                $("code-example").scrollIntoView({behavior: "smooth"})
                                $("code-example").setAnimation({name: "jello", speed: "fast"})
                            }
                        }
                    }</div>
                ]
            }
        ]
    })`

    // Tips
    const tip = (txt) => `<div class="code-tip">` + txt + `</div>`
    texts.helpSimpleApi = tip(`To create a panel like the one opposite, just write <b>createPanel</b> and set a few options.<br><br>KissJS allows to create components with simple functions like:<br>- createTextField<br>- createCheckbox<br>- createSelect<br>- createButton<br>- createPanel<br>- etc...<br><br>Not too complex?`)
    texts.helpItems = tip(`Containers like this panel can embed items, or other containers.<br><br>Containers are:<br>- block (= a simple div block used for layout purpose)<br>- panel (like the one floating on the right)<br>`)
    texts.helpEvents = tip(`You can attach any W3C event to your components`)
    texts.helpFields = tip(`You can create your form fields like this.<br><br>KissJS supports all common field types like:<br>- text<br>- textarea<br>- number<br>- date<br>- checkbox<br>- select...</b>`)
    texts.helpSelect = tip(`A field of type Select has a bunch of cool features, like: <br>- auto-complete<br>- single or multiple values<br>- option colors<br>- deleting values with the mouse<br>- switching values on and off<br>- ...`)
    texts.helpCheckbox = tip(`A Checkbox can have many shapes, like checkbox, switch, star...`)
    texts.helpLayout = tip(`Containers like <b>block</b> and <b>panel</b> can be nested and use flex layout to organize the contained items.`)
    texts.helpButton = tip(`Creating a button with an icon is as simple as that...`)
    texts.helpW3C = tip(`We follow W3C conventions whenever it's possible, so you just have to know Javascript, HTML and CSS.`)
    texts.helpFontAwesome = tip(`At the moment, we like to use <b>Font Awesome</b> for our icons classes.<br>We might support other libraries in the future.`)
    texts.helpAnimation = tip(`Out-of-the-box CSS animations`)
    texts.helpDefaults = tip(`It's possible to set default settings for all the items of a container. Here, it's applied to the 3 buttons.`)
    texts.helpPubsub = tip(`KissJS provides a native PubSub mechanism to broadcast events and data on channels.`)
    texts.helpSubscriptions = tip(`A component can be subscribed to one or more PubSub channels and react accordingly`)

    return createBlock({
        id: id,
        target,

        class: "craft-background",

        layout: "vertical",
        items: [
            // CODE EXAMPLE
            {
                id: "code-example",
                type: "html",
                class: "code-feature",

                html: `<div class="stripe-title">Write dumb code.<br>Get results.</div>
                <pre id="demo-code" class="code-sample"></pre>
                `
            }
        ]
    })
})

;
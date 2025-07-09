const code_layout = `// Sample layout using nested blocks
// ~200 lines of code => complete working layout with interactions
{
    layout: "vertical",
    height: "100%",
    items: [
        // Top bar
        {
            id: "top-bar",
            height: 64,
            background: "#fafafa",
            layout: "horizontal",
            alignItems: "center",
            width: "100%",
            items: [
                // Logo
                {
                    id: "logo",
                    type: "image",
                    src: "https://kissjs.net/resources/img/KissJS%20logo.png",
                    height: "100%",
                    margin: "0 20px"
                },
                // Empty div used to space elements in flex layouts
                {
                    type: "spacer",
                    flex: 1
                },
                // Button
                {
                    type: "button",
                    icon: "fas fa-bars",
                    text: "Menu",
                    height: 32,
                    margin: "0 10px",
                    // The button generates a menu
                    action: (event) => createMenu({
                        items: [
                            {
                                text: "Notification",
                                icon: "far fa-comment",
                                // Creates a notification
                                action: () => createNotification({
                                    message: "Item 2",
                                    left: "75vw"
                                })
                            },
                            {
                                text: "Dialog",
                                icon: "fas fa-square",
                                iconColor: "#00aaee",
                                // Creates a simple dialog box
                                action: () => createDialog({
                                    title: "Sample title",
                                    icon: "fas fa-check",
                                    message: "This is a sample dialog message",
                                    left: "calc(75vw - 200px)",
                                    action: () => console.log("OK")
                                })
                            }
                        ]
                    })
                    .render() // Must be rendered to show up on the screen
                    .showAt(event.clientX, event.clientY + 10) // Show the menu at the mouse position
                }
            ]
        },
        // Main
        {
            layout: "horizontal",
            height: "100%",

            items: [
                // Navigation
                {
                    id: "nav",
                    width: 300,
                    background: "#f0f0f0",
                    layout: "vertical",
                    alignItems: "center",

                    // Default config applies to all container's items
                    defaultConfig: {
                        width: 250,
                        height: 40,
                        margin: "0 0 20px 0"
                    },
                    
                    items: [
                        // You can insert html using "html" component
                        {
                            type: "html",
                            html: "<center><h2>Left navigation</h2></center>",
                            margin: "20px 0 50px 0"
                        },
                        // Array of buttons generated on the fly
                        ...["A", "B", "C", "D", "E"].map(label => {
                            return {
                                id: label,
                                type: "button",
                                text: "Open view " + label,
                                icon: "fas fa-chevron-right",
                                action: () => {
                                    
                                    $("content").showItemById("view-" + label)
                                    
                                    createNotification({
                                        message: "Show view " + label,
                                        left: "75vw"
                                    })
                                }
                            }
                        }),
                        // Push the last item to the bottom
                        {
                            type: "spacer",
                            flex: 1
                        },
                        // Custom button
                        {
                            id: "F",
                            type: "button",
                            icon: "fas fa-power-off",
                            width: 40,
                            iconSize: 27,
                            margin: "0 0 50px 0",
                            borderRadius: 20,
                            iconColor: "white",
                            iconColorHover: "red",
                            backgroundColor: "red",
                            backgroundColorHover: "white",
                            boxShadow: "0 0 32px red",
                            boxShadowHover: "0 0 32px blue",
                            border: "solid 3px white",
                            borderColorHover: "red"
                        }
                    ],
                    
                    // Events can be delegated to the container
                    events: {
                        click: (e) => {
                            const clickedButton = e.target.closest("a-button")
                            if (!clickedButton) return
                            
                            const anims = {
                                A: "shakeX",
                                B: "rotateIn",
                                C: "zoomIn",
                                D: "pulse",
                                E: "jello",
                                F: "rotateOut"
                            }
                            
                            // Any HTML element can be animated
                            clickedButton.setAnimation({
                                name: anims[clickedButton.id],
                                speed: "fast"
                            })
                        }
                    }
                },
                // Content
                {
                    id: "content",
                    flex: 1,
                    multiview: true, // Allow to display items one at a time
                    overflow: "auto", // Allow larger content to scroll in the container
                    
                    defaultConfig: {
                        type: "html",
                        padding: "150px 0 0 0",
                        height: 2000
                    },
                    
                    items: [
                        {
                            id: "view-A",
                            html: "<center><h1>😊 View A</h1></center>"
                        },
                        {
                            id: "view-B",
                            html: "<center><h1>😂 View B</h1></center>"
                        },
                        {
                            id: "view-C",
                            html: "<center><h1>🤗 View C</h1></center>"
                        },
                        {
                            id: "view-D",
                            html: "<center><h1>😉 View D</h1></center>"
                        },
                        {
                            id: "view-E",
                            html: "<center><h1>😎 View E</h1></center>"
                        }
                    ]
                }
            ]
        }
    ]
}`

;
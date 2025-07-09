const code_layout = `// Sample layout using nested blocks
// ~200 lines of code => complete working layout with interactions
{
    layout: "vertical",
    height: "100%",
    items: [
        // Top bar
        {
            id: "top-bar",
            height: "6.4rem",
            background: "var(--body-background-alt)",
            layout: "horizontal",
            alignItems: "center",
            width: "100%",
            borderStyle: "solid",
            borderWidth: "0 0 1px 0",
            borderColor: "var(--body-background)",
            items: [
                // Logo
                {
                    id: "logo",
                    type: "image",
                    src: "https://kissjs.net/resources/img/KissJS%20logo.png",
                    height: "100%",
                    margin: "0 2rem"
                },
                // Empty div used to space elements in flex layouts
                {
                    type: "spacer",
                    flex: 1
                },
                // Button to change the theme
                {
                    type: "button",
                    text: "Themes",
                    icon: "fas fa-palette",
                    action: () => kiss.theme.select()
                },
                // Button
                {
                    type: "button",
                    icon: "fas fa-bars",
                    text: "Menu",
                    margin: "0 1rem",
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
                                    left: "calc(75vw - 20rem)",
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
                    width: "30rem",
                    background: "var(--body-background-alt)",
                    layout: "vertical",
                    alignItems: "center",

                    // Default config applies to all container's items
                    defaultConfig: {
                        width: "25rem",
                        height: "4rem",
                        margin: "0 0 2rem 0"
                    },
                    
                    items: [
                        // You can insert html using "html" component
                        {
                            type: "html",
                            html: "<center><h2>Left navigation</h2></center>",
                            margin: "2rem 0 5rem 0"
                        },
                        // Array of buttons generated on the fly
                        ...["A", "B", "C", "D", "E"].map(label => {
                            return {
                                id: label,
                                type: "button",
                                text: "Button " + label,
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
                            width: "4rem",
                            iconSize: "2.7rem",
                            iconPosition: "top",
                            margin: "0 0 5rem 0",
                            borderRadius: "2rem",
                            iconColor: "white",
                            iconColorHover: "red",
                            backgroundColor: "red",
                            backgroundColorHover: "white",
                            boxShadow: "0 0 3.2rem red",
                            boxShadowHover: "0 0 3.2rem blue",
                            border: "solid 0.3rem white",
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
                        padding: "15rem 0 0 0",
                        height: "150vh"
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
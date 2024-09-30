kiss.app.defineView({
    id: "todo",
    renderer: function(id) {
        return createPanel({
            id,
            layout: "vertical",
            header: false,
            width: 600,
            align: "center",
            top: 100,

            subscriptions: {
                "EVT_DB_INSERT:TASK": () => $("todo").load(),
                "EVT_DB_UPDATE:TASK": () => $("todo").load(),
                "EVT_DB_DELETE:TASK": () => $("todo").load()
            },

            items: [
                // Title
                {
                    type: "html",
                    html: "<h1>The super todo list app</h1>"
                },
                {
                    layout: "horizontal",
                    items: [
                        // Task name
                        {
                            id: "taskName",
                            type: "text",
                            width: "100%",
                            fieldWidth: "100%",
                            events: {
                                keyup: (event) => {
                                    if (event.key == "Enter") $("todo").addTask()
                                }
                            }
                        },
                        // Button to add a new task
                        {
                            type: "button",
                            text: "Ajouter",
                            color: "#ffffff",
                            icon: "fas fa-plus",
                            iconColor: "#ffffff",
                            backgroundColor: "var(--green)",
                            action: () => $("todo").addTask()
                        }                    
                    ]
                },
                // Block that will contain the list of tasks
                {
                    layout: "horizontal",
                    
                    defaultConfig: {
                        type: "panel",
                        flex: 1,
                        margin: "10px 5px 10px 5px",
                        boxShadow: "var(--shadow-1)"
                    },

                    items: [
                        // To do
                        {
                            title: "To do",
                            id: "tasks-todo",
                            headerBackgroundColor: "var(--red)",
                            layout: "vertical"
                        },
                        // Done
                        {
                            title: "Done",
                            id: "tasks-done",
                            headerBackgroundColor: "var(--blue)",
                            layout: "vertical"
                        }
                    ]
                }
            ]
        })
    }
})
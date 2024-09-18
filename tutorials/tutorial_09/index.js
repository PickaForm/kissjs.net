/**
 * 
 * Small example to check how KissJS compares to other libraries to build a simple TODO list application,
 * like the one demonstrated on TodoMVC website: http://todomvc.com/
 * 
 * Please note that without all the comments, the program is less than 200 lines.
 */
window.onload = function () {

    const id = "todo-mvc"
    
    /**
     * Build a single task in our todo list application
     * 
     * @param {string} taskName
     * @returns {HTMLElement} - A block containing all the task elements:
     * 1 - a checkbox to check / uncheck the task
     * 2 - a task name
     * 3 - a text field to edit the task name
     * 4 - a button to delete the task
     */
    const createTask = (taskName) => {

        // kiss.tools.shortUid() is a KissJS helper function to generate a unique id for the task.
        // Note: uid() generates a longer id which is compliant with RFC 4122
        const taskId = kiss.tools.shortUid()

        // Our Task will be a KissJS "block" element.
        // In KissJS, a "block" element is a simple container for other sub-items (here: a checkbox, a task name, a text field, a delete button)
        return createBlock({

            id: taskId,

            // If this optional <target> parameter is provided, the view will be injected at this location in the DOM.
            // Each task will be inserted into the target element "block-tasks" at rendering time
            target: "tasks",

            // We want a flex / row layout to display our task items horizontally
            display: "flex",
            flexFlow: "row",
            alignItems: "center",
            margin: "8px",

            // Here, we style the bottom border of our Task block.
            // In KissJS, we can apply inline styles and classes
            style: `
                border-color: #dddddd;
                border-style: solid;
                border-width: 0px 0px 1px 0px;
                vertical-align: middle;`,

            // We attach a "task" CSS class to our block element to easily find all the tasks later (using "querySelectorAll")
            class: "task",

            // We inject sub-items into our Task block
            items: [
                // 1. Checkbox to check / uncheck a Task
                {
                    id: "task-checkbox-" + taskId,
                    type: "checkbox",
                    label: " ",
                    checked: false,
                    shape: "circle",

                    // When we check / uncheck a Task, we display the updated status of our todo list. For example: "7 item(s) left"
                    events: {
                        change: function () {
                            // Note that $(id) is the main element returned as our KissJS view.
                            // Here, it's the DOM Element which represents the main panel containing our complete Todo application.
                            // It also holds our application methods, like addTask(), deleteTask(), updateStatus(), ...
                            $(id).updateTask(taskId, this.getValue())
                            $(id).updateStatus()
                        }
                    }
                },
                // 2. Html item to display our task name
                {
                    id: "task-name-" + taskId,
                    type: "html",

                    // We adjust the size and line height of our html item
                    width: "100%",
                    style: "line-height: 37px;",

                    // By default, the html inserted is simply the task name
                    html: taskName
                },
                // 3. Text field to edit the task name (initially hidden)
                {
                    id: "task-name-edit-" + taskId,
                    type: "text",
                    hidden: true,
                    value: taskName, // The text field has the task name as the default value
                    fieldWidth: 510,

                    // When the field value is changed, we update the content of the previous item (here, our "html" item)
                    // then hide the text field
                    events: {
                        change: function () {
                            const taskNameElement = $("task-name-" + taskId)
                            taskNameElement.setInnerHtml(this.getValue())
                            taskNameElement.show()
                            this.hide()
                        },
                        mouseleave: function() {
                            const taskNameElement = $("task-name-" + taskId)
                            taskNameElement.setInnerHtml(this.getValue())
                            taskNameElement.show()
                            this.hide()
                        }
                    }
                },
                // 4. Button to delete the task
                {
                    type: "button",
                    icon: "fas fa-times", // We use Font Awesome icons. Here, just a simple "cross"
                    height: "32px",

                    // When we click on the button, we delete the task
                    action: () => $(id).deleteTask(taskId)
                }
            ],

            // When we double-click on a task name, we switch to "edit mode" so that we can change the task name
            events: {
                dblclick: function () {
                    this.edit()
                }
            },

            // We define the methods for our Task block
            methods: {
                // Get the task name
                getTaskName: function () {
                    return $("task-name-edit-" + taskId).getValue()
                },

                // Get the task value
                getValue: function () {
                    return $("task-checkbox-" + taskId).getValue()
                },

                // Switch to edit mode: hide the "Html" item, and show the "text field" instead
                edit: function () {
                    $("task-name-edit-" + taskId).show().focus()
                    $("task-name-" + taskId).hide()
                }
            }
        })
    }

    /**
     * Build the Panel that contains our todo list application.
     * The panel contains:
     * - a text field to enter a new task
     * - the list of tasks
     * - a footer that contains:
     *      . the status. For example: "7 items(s) left"
     *      . the buttons:
     *          . show All tasks
     *          . show Active tasks
     *          . show Completed tasks
     *          . clear Completed tasks
     *          . show all the tasks as JSON
     */
    const myToDoList = createPanel({
        id: "todo-mvc",
        title: "Todos",

        // Layout params (W3C compliant)
        width: "650px",
        position: "absolute",
        align: "center",
        margin: "10px",
        padding: "10px",
        boxShadow: "5px 5px 10px #aaaaaa",
        display: "flex",
        flexFlow: "column",

        items: [
            // Text field to enter a new task name
            {
                type: "text",
                placeholder: "Enter a task name then hit ENTER",
                fieldWidth: "100%",
                flex: 1,

                // When the text field value is changed, we insert a new task and reset the text field.
                events: {
                    change: function () {
                        const taskName = this.getValue()
                        $(id).addTask(taskName)
                        this.setValue("")
                    }
                }
            },
            // Block container that will contains the tasks (initially empty)
            {
                type: "block",
                id: "tasks"
            },
            // Block container that contains the footer items
            {
                id: "footer",
                type: "block",
                display: "flex",
                flexFlow: "row",
                items: [
                    // Block that will contain the status. Example: "7 item(s) left"
                    {
                        id: "status",
                        type: "block",
                        styles: {
                            "this": "line-height: 32px; margin-right: 10px"
                        }
                    },
                    // Buttons
                    {
                        items: [
                            // Button to display all the tasks
                            {
                                type: "button",
                                text: "All",
                                margin: "0px 5px 0px 0px",
                                action: function () {
                                    $("todo-mvc").showAll()
                                }
                            },
                            // Button to filter Active tasks
                            {
                                type: "button",
                                text: "Active",
                                margin: "0px 5px 0px 0px",
                                action: function () {
                                    $("todo-mvc").filterTasks(false)
                                }
                            },
                            // Button to filter Completed tasks
                            {
                                type: "button",
                                text: "Completed",
                                margin: "0px 5px 0px 0px",
                                action: function () {
                                    $("todo-mvc").filterTasks(true)
                                }
                            },
                            // Button to remove all the Completed tasks from the list
                            {
                                type: "button",
                                text: "Clear completed",
                                margin: "0px 5px 0px 0px",
                                action: function () {
                                    $("todo-mvc").clearCompleted()
                                }
                            },
                            // BONUS! Button to show the list of tasks as JSON in a popup window
                            {
                                type: "button",
                                text: "Show JSON",
                                margin: "0px 5px 0px 0px",
                                action: function () {
                                    // Create a modal window to display the JSON as string
                                    createDialog({
                                        type: "message",
                                        title: "My todos",
                                        message: JSON.stringify($(id).showJSON()).replace(/},{/g, ",<br>").replace("[", "[<br>").replace("]", "<br>]")
                                    })
                                }
                            }
                        ]
                    }
                ]
            }
        ],

        // Methods for our todo list application...
        methods: {

            // Create a new Task element and render it into the "tasks" block
            addTask: function (taskName) {
                createTask(taskName).render()
                this.updateStatus()
            },

            // Mark a task as checked / unchecked
            updateTask: function (taskId, status) {
                const newTaskStyle = (status) ? "line-through" : "none"
                $("task-name-" + taskId).style.textDecoration = newTaskStyle
            },

            // Delete the Task element.
            // The method "deepDelete" is a KissJS feature which takes care of cleaning all the dependencies,
            // like sub-items, subscriptions, listeners... in order to avoid memory leaks. Well. Theorically :)
            deleteTask: function (id) {
                $(id).deepDelete()
                this.updateStatus()
            },

            getTasks: () => Array.from($(id).querySelectorAll(".task")),

            showAll: () => $(id).getTasks().forEach(task => task.show()),

            // Show only a subset of the tasks (either completed or not)
            filterTasks: (completed) => $(id).getTasks().forEach(task => {
                if (task.getValue() != completed) task.hide()
                else task.show()
            }),

            // Delete all the tasks that have been completed
            clearCompleted: () => $(id).getTasks().forEach(task => {
                if (task.getValue()) task.deepDelete()
                $(id).updateStatus()
            }),

            // Bonus! Export everything as JSON
            showJSON: () => {
                return $(id).getTasks().map(task => {
                    return {
                        id: task.id,
                        name: task.getTaskName(),
                        value: task.getValue()
                    }
                })
            },

            // Update the number of remaining tasks. Example: "7 item(s) left"
            updateStatus: () => {
                // Selector that retrieve all the unchecked checkboxes having the class ".task" 
                const listOfActiveTasks = $(id).querySelectorAll(".task input[type=checkbox]:not(:checked)")
                const numberOfActiveTasks = Array.from(listOfActiveTasks).length

                // Inject the status into the "status" DOM element
                const statusElement = $("status")
                statusElement.innerText = numberOfActiveTasks + " item(s) left"
            }
        }
    })
    
    myToDoList.render()
};
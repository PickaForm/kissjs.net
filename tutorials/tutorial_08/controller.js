kiss.app.defineViewController("todo", {
    /**
     * The **load** method is called automatically when the view is first displayed,
     * then each time the view needs to be rebuilt (for example, after a change in the database)
     */
    async load() {
        const tasks = await kiss.app.collections.task.find()

        let tasksTodo = []
        let tasksDone = []

        tasks.forEach(task => {
            const newTaskElement = this.createTaskElement(task)

            if (task.status == false) {
                tasksTodo.push(newTaskElement)
            }
            else {
                tasksDone.push(newTaskElement)                
            }
        })

        $("tasks-todo").setItems(tasksTodo)
        $("tasks-done").setItems(tasksDone)
    },

    /**
     * - Creates a new task from the "task" Model
     * - Saves it into the database
     */
    async addTask() {
        const taskName = $("taskName").getValue()
        if (!taskName) return createNotification("A task must have a name, please!")

        $("taskName").setValue("") // Reset the value

        // Create the task
        const newTask = kiss.app.models.task.create({
            id: kiss.tools.uid(),
            name: taskName,
            status: false
        })

        // Save the task into the database
        await newTask.save()
    },

    /**
     * - Update the status of a task in the database
     */
    async updateTaskStatus(taskId) {
        const task = kiss.app.collections.task.getRecord(taskId)
        await task.update({
            status: !task.status
        })
    },

    /**
     * - Update the name of a task in the database
     */
    async updateTaskName(taskId, newName) {
        const task = kiss.app.collections.task.getRecord(taskId)
        await task.update({
            name: newName
        })
    },    

    /**
     * - Remove a task from the database
     */
    async deleteTask(taskId) {
        await kiss.app.collections.task.deleteOne(taskId)
    },

    /**
     * Generates the elements for a task
     */
    createTaskElement(task) {
        const newTask = {
            id: task.id,
            layout: "horizontal",
            margin: 5,
            items: [{
                    type: "checkbox",
                    shape: "circle",
                    value: task.status,
                    events: {
                        change: () => $("todo").updateTaskStatus(task.id)
                    }
                },
                {
                    type: "text",
                    placeholder: "Task name",
                    width: "100%",
                    fieldWidth: "100%",
                    value: task.name,
                    events: {
                        change: function () {
                            const newName = this.getValue()
                            $("todo").updateTaskName(task.id, newName)   
                        }
                    }                    
                },
                {
                    type: "button",
                    icon: "fas fa-trash",
                    iconColor: "#ff0000",
                    action: () => $("todo").deleteTask(task.id)
                }
            ]
        }
        return newTask
    }
})
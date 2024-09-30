/**
 * KissJS embeds an ORM (Object-Relational Mapping) and an offline database.
 * 
 * Defining a Task model like this automatically gives you:
 * - A Model instance to create new task Record (kiss.app.models.task)
 * - A collection (a set of records) to manage the tasks (kiss.app.collections.task)
 * 
 * The model has two fields:
 * - name: the name of the task
 * - status: the status of the task (true if done, false otherwise)
 * 
 * The model is defined in offline mode, which means that the data is stored in the browser's local storage.
 * It provides a straightforward way to manage the data locally in a prototype or a small application.
 * The generated collection supports NoSQL operations using the MongoDB syntax for common operations.
 */
kiss.app.defineModel({
    id: "task",
    name: "Task",
    mode: "offline",
    items: [
        {
            id: "name",
            type: "text",
            dataType: String
        },
        {
            id: "status",
            type: "checkbox",
            dataType: Boolean,
            value: false
        }
    ]
})
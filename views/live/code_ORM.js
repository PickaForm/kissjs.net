const code_ORM = `{
    layout: "vertical",
    alignItems: "center",
    
    defaultConfig: {
        width: 400,
        margin: "5px 0"
    },
    
    items: [
        // PAGE TITLE
        {
            type: "html",
            html: "<center><h1>Using KissJS ORM</h1></center>",
            margin: "20px 0 0 0"
        },
        // DESCRIPTION
        {
            type: "html",
            html: \`KissJS has an embedded Object Relational Mapping
            to simplify the interactions with the database.
            The result is that you don't have to manually perform database requests,
            especially for all CRUD operations.
            <br><br>
            Here, we use KissJS embedded in-memory NoSQL database that mimics
            MongoDB API.\`,
            margin: "0 0 20px 0"
        },
        // FORM TO ENTER CONTACT INFOS
        {
            type: "panel",
            title: "Contact",
            icon: "fas fa-user",
            layout: "vertical",
            boxShadow: "var(--shadow-2)",
            items: [
                // First name
                {
                    id: "firstName",
                    type: "text",
                    label: "First name",
                    labelPosition: "top",
                    value: "Bob"
                },
                // Last name
                {
                  id: "lastName",
                  type: "text",
                  label: "Last name",
                  labelPosition: "top",
                  value: "Wilson"
                },
                // Birth date
                {
                  id: "birthDate",
                  type: "date",
                  label: "Birth date",
                  labelPosition: "top",
                  value: "1984-01-01"
                }
            ]        
        },
        // BUTTON TO CREATE A NEW RECORD
        {
            type: "button",
            icon: "fas fa-plus",
            text: "Create new contact into the database",
            action: async () => {
                const firstName = $("firstName").getValue()
                const lastName = $("lastName").getValue()
                const birthDate = $("birthDate").getValue()
                
                // Get the Model
                const contactModel = kiss.app.models.contact
                
                // Creates a new Record using this Model
                const newContact = contactModel.create({
                    firstName,
                    lastName,
                    birthDate
                })
                
                // Saves the Record into the db (technically doing a POST request)
                await newContact.save()
                
                // Get the Collection of Records associated with the model
                const contactCollection = kiss.app.collections.contact
                console.log("Contacts after insertion: ", contactCollection.records.length)
            } 
        },
        // FINDING ALL RECORDS
        {
            type: "button",
            icon: "fas fa-search",
            text: "Find all contacts in the database",
            action: async () => {
                const contacts = await kiss.app.collections.contact.find({}, true)
                createNotification({
                    message: "Found " + contacts.length + " contact(s)",
                    left: "75vw"
                })
            } 
        },
        // QUERYING THE DATABASE
        {
            type: "button",
            icon: "fas fa-search",
            text: "Find all contacts which first name is Bob",
            action: async () => {
                const contacts = await kiss.app.collections.contact.find({
                    filterSyntax: "mongo",
                    filter: {
                        firstName: "Bob"
                    }
                }, true)
                
                createNotification({
                    message: "Found " + contacts.length + " contact(s)",
                    left: "75vw"
                })
            } 
        },
        // INSERT 20 FAKE CONTACTS
        // KissJS has a random generator to simulate records in development phase
        {
            type: "button",
            icon: "fas fa-plus",
            text: "Insert 20 fake contacts into the database",
            action: async () => {
                const collection = kiss.app.collections.contact
                await collection.insertFakeRecords(20)
                console.log("Contacts after insertion: ", collection.records.length)
            } 
        },
        // DELETE ALL THE CONTACTS
        {
            type: "button",
            icon: "fas fa-trash",
            text: "Delete all records",
            action: async () => {
                const collection = kiss.app.collections.contact
                await collection.deleteMany({})
                console.log("Contacts after deletion: ", collection.records.length)
            } 
        },
        // SHOW ALL THE CONTACTS IN A MODAL WINDOW
        {
            type: "button",
            icon: "fas fa-users",
            text: "Show contacts",
            action: async () => {
                // Get the Collection of Records
                const collection = kiss.app.collections.contact
                
                // Build some simple HTML out of the list of contacts
                const datatable = collection.records.map(rec => {
                    return {
                        type: "html",
                        width: "100%",
                        display: "flex",
                        html:
                            \`<div style="width: 20rem">
                                \${rec.firstName}
                            </div>
                            <div style="width: 20rem">
                                \${rec.lastName}
                            </div>
                            <div style="width: 20rem">
                                \${rec.birthDate}
                            </div>\`
                    }
                })
                
                // Create a floating panel
                createPanel({
                    title: "CONTACTS",
                    icon: "fas fa-users",
                    draggable: true,
                    closable: true,
                    modal: true,
                    align: "center",
                    verticalAlign: "center",
                    width: 600,
                    height: 400,
                    zIndex: 10,
                    overflow: "auto",
                    items: datatable
                }).render()
            } 
        },          
        // Simple html
        {
            type: "html",
            margin: "40px 0 0 0",
            html: "Current number of contacts:",
        },
        // Anchor to insert the number of contacts
        {
            type: "html",
            color: "#00aaee",
            fontSize: "50px",
            id: "number-of-contacts"
        }
    ],
    
    // A component can be subscribed to any kinds of events.
    // Database events can be:
    // - EVT_DB_INSERT:MODEL_ID
    // - EVT_DB_UPDATE:MODEL_ID
    // - EVT_DB_DELETE:MODEL_ID
    // - EVT_DB_INSERT_MANY:MODEL_ID
    // - EVT_DB_UPDATE_MANY:MODEL_ID
    // - EVT_DB_DELETE_MANY:MODEL_ID
    subscriptions: {
        "EVT_DB_INSERT:CONTACT": function() {
            this.updateNumberOfContacts()
        },
        "EVT_DB_INSERT_MANY:CONTACT": function() {
            this.updateNumberOfContacts()
        },
        "EVT_DB_DELETE_MANY:CONTACT": function() {
            this.updateNumberOfContacts()
        }
    },
    
    // All KissJS components can have custom methods to control their behavior
    methods: {
        // Here, we add a method to get all the contacts
        async getContacts() {
            return await kiss.app.collections.contact.find({}, true)
        },
        
        // Update the number of contacts in the UI
        async updateNumberOfContacts() {
            const contacts = await this.getContacts()
            $("number-of-contacts").innerHTML = contacts.length
        },
        
        // The "load" method is automatically called when initializing a component
        // In this example, it creates a database Model and its associated Collection.
        // You can access all the Models and Collections of a KissJS application using:
        // - kiss.app.models
        // - kiss.app.collections
        async load() {
            // Defining a model
            const modelConfig = {
                id: "contact",
                name: "Contact",
                namePlural: "Contacts",
                items: [
                    {
                        id: "firstName",
                        type: "text",
                        label: "First name"
                    },
                    {
                        id: "lastName",
                        type: "text",
                        label: "Last name"
                    },
                    {
                        id: "birthDate",
                        type: "date",
                        label: "Birth date"
                    }
                ]
            }
            
            // Declares the model in the application.
            // This automatically generates a Collection
            // that will hold all the Records created from this Model
            const contactModel = kiss.app.defineModel(modelConfig)
            
            // Getting the Collection of Records for this Model
            const contactCollection = kiss.app.collections.contact
            
            // Resetting the records of the collection
            await contactCollection.deleteMany({})
        }
    }
}`

;
const code_kanban = `{
    id: "view-container",
    width: "100%",
    height: "100%",
    methods: {
        async load() {
            // Creates a fake Model
            let fakeModelTemplate = createFakeModel()
            fakeModelTemplate.id = kiss.tools.uid()
            
            // Register the Model into the application
            let fakeModel = kiss.app.defineModel(fakeModelTemplate)
            
            // Get the Collection of records auto-generated for the Model
            let fakeCollection = fakeModel.collection

            // Insert fake records into the collection
            fakeCollection.insertFakeRecords(50)
            
            // Restrict displayed columns
            let columns = fakeModel.getFieldsAsColumns()
            columns.forEach(col => {
                col.hidden = !([
                    "gameName",
                    "category",
                    "ratingIGN",
                    "duration",
                    "percentFinished"
                ].includes(col.id))
            })
            
            // Build a Kanban board and render it at the right DOM insertion point
            createKanban({
                target: "view-container", // Insertion point into the DOM
                collection: fakeCollection,
                columns,
                group: ["platform"]
            }).render()
        }
    }
}`

;
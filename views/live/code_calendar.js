const code_calendar = `{
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
                    "ratingMetacritic"
                ].includes(col.id))
            })

            // Build a Calendar and render it at the right DOM insertion point
            createCalendar({
                id: "my-calendar",
                target: "view-container", // Insertion point into the DOM
                collection: fakeCollection,
                columns,
                date: new Date(kiss.formula.TODAY())
            }).render()
        }
    }
}`

;
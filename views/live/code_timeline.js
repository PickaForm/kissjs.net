const code_timeline = `{
    id: "view-container",
    width: "100%",
    height: "100%",
    methods: {
        async load() {
            // Creates a fake Model
            let modelId = kiss.tools.uid()
            let fakeModelTemplate = createFakeModel()
            fakeModelTemplate.id = modelId

            // Register the Model into the application
            let fakeModel = kiss.app.defineModel(fakeModelTemplate)

            // Generates some fake records
            const fields = fakeModel.getFields()
            let fakeRecords = kiss.db.faker.generate(fields, 20) 

            // Review date is a random date between release date and release date + 30 days
            fakeRecords.forEach(record => {
                const releaseDate = new Date(record.releaseDate)
                const delay = Math.floor(Math.random() * 30) + 1
                record.reviewDate = kiss.formula.ADJUST_DATE(releaseDate, 0, 0, delay, 0, 0, 0)
            })       
            
            // Insert the fake records into the collection
            let fakeCollection = fakeModel.collection
            await fakeCollection.insertMany(fakeRecords)
            
            // Restrict displayed columns
            let columns = fakeModel.getFieldsAsColumns()
            
            columns.forEach(col => {
                col.hidden = !([
                    "gameName",
                    "category",
                    "ratingMetacritic"
                ].includes(col.id))
            })

            // Build a Timeline and render it at the right DOM insertion point
            createTimeline({
                target: "view-container", // Insertion point into the DOM
                collection: fakeCollection,
                columns,

                // Setup specific to the timeline
                firstColumnWidth: 25,
                date: new Date(kiss.formula.TODAY()),
                colorField: "category",
                startDateField: "releaseDate",
                endDateField: "reviewDate"
            }).render()
        }
    }
}`

;
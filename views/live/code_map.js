const code_map = `{
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

            // Add fake GPS coordinates to each record
            fakeRecords.forEach((record, index) => {
                const longitude = 55.5 + Math.random(index)/2 * Math.pow(-1, index)
                const latitude = -21 + Math.random(index)/2 * Math.pow(-1, index)
                record.GPS = longitude + "," + latitude
            })
            
            // Insert the fake records into the collection
            let fakeCollection = fakeModel.collection
            await fakeCollection.insertMany(fakeRecords)
        
            // Build a Timeline and render it at the right DOM insertion point
            createMapView({
                target: "view-container", // Insertion point into the DOM
                collection: fakeCollection,
                coordinatesField: "GPS",
                coordinatesFormat: "longitude,latitude",
                labelField: "gameName"
            }).render()
        }
    }
}`

;
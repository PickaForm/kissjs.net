const code_gallery = `{
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
        
            // Generates some fake records
            const fields = fakeModel.getFields()
            let fakeRecords = kiss.db.faker.generate(fields, 20) 
            
            // Generates a fake attachment field with images
            let fakeAttachmentField = '[{"id":"01887414-3775-7443-81bc-260a9539d7e4","filename":"cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.png","size":1279664,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.64x64.png","size":6106},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.256x256.png","size":87845},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.512x512.png","size":332583}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-379e-701e-b4dc-15301d8b4560","filename":"cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.png","size":1360256,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.64x64.png","size":6080},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.256x256.png","size":89129},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.512x512.png","size":337313}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-378a-759d-b17d-762b4dd33b72","filename":"cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.png","size":1301698,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.64x64.png","size":6193},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.256x256.png","size":89664},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.512x512.png","size":331588}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-506f-7707-a529-20a36858b1a8","filename":"cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.png","size":1357025,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.64x64.png","size":6136},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.256x256.png","size":89761},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.512x512.png","size":339784}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"}]';
            fakeAttachmentField = JSON.parse(fakeAttachmentField)
            fakeRecords.forEach(record => record.attachment = fakeAttachmentField)

            // Insert the fake records into the collection
            let fakeCollection = fakeModel.collection
            await fakeCollection.insertMany(fakeRecords)

            // Restrict displayed columns
            let columns = fakeModel.getFieldsAsColumns()
            columns.forEach(col => {
                col.hidden = !([
                    "gameName",
                    "category",
                    "ratingMetacritic",
                    "duration",
                    "percentFinished"
                ].includes(col.id))
            })
            
            // Build a Gallery view and render it at the right DOM insertion point
            createGallery({
                target: "view-container", // Insertion point into the DOM
                collection: fakeCollection,
                columns,
                showActions: false,
                canSelect: false,
                showImage: true,
                imageFieldId: "attachment"
            }).render()
        }
    }
}`

;
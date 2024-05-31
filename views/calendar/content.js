kiss.app.defineView({
    id: "calendar-content",
    renderer: function (id, target) {
        // Build a fake collection
        let fakeModelTemplate = createFakeModel()
        fakeModelTemplate.id = "fakeCalendar"
        let fakeModel = new kiss.data.Model(fakeModelTemplate)
        let fakeCollection = fakeModel.collection

        // A calendar needs columns definition.
        // Here, we use a special method of the model to use the field definitions as columns
        let columns = fakeModel.getFieldsAsColumns()
        columns.forEach(column => {
            column.hidden = !(["gameName", "category", "platform", "reviewed", "ratingMetacritic"].includes(column.id))
        })

        //
        // Create the calendar
        //
        let calendar = createCalendar({
            id: "myCalendar",
            color: "#00aaee",
            collection: fakeCollection,
            period: "1 week + details",
            columns,

            // Options
            canEdit: true,
            canAddField: false,
            canEditField: false,
            canCreateRecord: true,
            dateField: "releaseDate",
            height: () => kiss.screen.current.height - 50,

            // openRecord method is triggered when you click at the beginning of a row
            methods: {
                selectRecord: async (record) => createForm(record, fakeModel),

                async createRecord(model) {
                    record = model.create()
                    const success = await record.save()
                    if (!success) return
                    createForm(record)
                }
            }
        })

        return createBlock({
            id: id,
            target,

            style: "user-select: none; background: #ffffff;",
            height: "100%",

            items: [
                calendar
            ],

            methods: {
                load: () => {
                    if (fakeCollection.records.length > 0) return
                    fakeCollection.insertFakeRecords(200)
                }
            }
        })
    }
})

;
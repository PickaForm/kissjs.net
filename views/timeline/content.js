kiss.app.defineView({
    id: "timeline-content",
    renderer: function (id, target) {
        // Build a fake collection
        let fakeModelTemplate = createFakeModel("timeline")
        fakeModelTemplate.id = "fakeTimeline"
        let fakeModel = new kiss.data.Model(fakeModelTemplate)
        let fakeCollection = fakeModel.collection

        // A timeline needs columns definition.
        // Here, we use a special method of the model to use the field definitions as columns
        let columns = fakeModel.getFieldsAsColumns()
        columns.forEach(column => {
            column.hidden = !(["gameName", "category", "platform", "reviewed"].includes(column.id))
        })

        //
        // Create the timeline
        //
        let timeline = createTimeline({
            id: "myTimeline",
            color: "#00aaee",
            collection: fakeCollection,
            columns,
            colorField: "category",
            startDateField: "releaseDate",
            endDateField: "reviewDate",

            // Options
            canEdit: true,
            canAddField: false,
            canEditField: false,
            canCreateRecord: true,
            height: () => kiss.screen.current.height - 50,

            // Define the menu of actions
            actions: [
                "-",
                {
                    text: "Sort by Category (asc) and Platform (desc)",
                    icon: "fas fa-sort",
                    action: () => {
                        $("myTimeline").sortBy([{
                                category: "asc"
                            },
                            {
                                platform: "desc"
                            }
                        ])
                    }
                },
                {
                    text: "Group by Category and Platform",
                    icon: "far fa-clone",
                    action: () => {
                        $("myTimeline").groupBy(["category", "platform"])
                    }
                }, {
                    text: "Add 200 records...",
                    icon: "fas fa-database",
                    action: () => {
                        fakeCollection.hasChanged = true
                        fakeCollection.insertFakeRecords(200)
                        createNotification("Records inserted!")
                    }
                }
            ],

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
                timeline
            ],

            methods: {
                load: () => {
                    if (fakeCollection.records.length > 0) return

                    // Insert some fake records
                    const fields = fakeModel.getFields()
                    let fakeRecords = kiss.db.faker.generate(fields, 200)

                    // Review date is a random date between release date and release date + 30 days
                    fakeRecords.forEach(record => {
                        const releaseDate = new Date(record.releaseDate)
                        const delay = Math.floor(Math.random() * 30) + 1
                        record.reviewDate = kiss.formula.ADJUST_DATE(releaseDate, 0, 0, delay, 0, 0, 0)
                    })
                    kiss.db.insertMany("fakeTimeline", fakeRecords)
                }
            }
        })
    }
})

;
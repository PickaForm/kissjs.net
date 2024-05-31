kiss.app.defineView({
    id: "kanban-content",
    renderer: function (id, target) {
        // Build a fake collection
        let fakeModelTemplate = createFakeModel()
        fakeModelTemplate.id = "fakeKanban"
        let fakeModel = new kiss.data.Model(fakeModelTemplate)
        let fakeCollection = fakeModel.collection

        // A kanban needs columns definition.
        // Here, we use a special method of the model to use the field definitions as columns
        let columns = fakeModel.getFieldsAsColumns()
        columns.forEach(column => {
            column.hidden = !(["gameName", "category", "platform", "reviewed", "ratingMetacritic"].includes(column.id))
        })

        //
        // Create the kanban
        //
        let kanban = createKanban({
            id: "myKanban",
            color: "#00aaee",
            collection: fakeCollection,
            columns,
            group: ["platform"],

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
                        $("myKanban").sortBy([{
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
                        $("myKanban").groupBy(["category", "platform"])
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
                kanban
            ],

            methods: {
                load: () => {
                    if (fakeCollection.records.length > 0) return
                    fakeCollection.insertFakeRecords(1000)
                }
            }
        })
    }
})

;
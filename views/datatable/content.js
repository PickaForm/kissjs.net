kiss.app.defineView({
    id: "datatable-content",
    renderer: function (id, target) {
        // Set default layout for attachments
        localStorage.setItem("config-layout-attachment", "thumbnails-large")

        // Because each view needs its own data, we will proxy the data using a "Collection".
        // kiss.data.Collection class acts as a proxy for the database,
        // and adds some useful methods to work with your data (like multi-level grouping).
        // To build a Collection, we also need a Model to structure the data. So, we do:
        let fakeModelTemplate = createFakeModel()
        fakeModelTemplate.id = "fake"
        let fakeModel = new kiss.data.Model(fakeModelTemplate)

        // Get the collection auto-generated for the "fake" model
        let fakeCollection = fakeModel.collection

        // A datatable needs columns definition.
        // Here, we use a special method of the model to use the field definitions as columns
        let columns = fakeModel.getFieldsAsColumns()

        // Sample button 1
        columns.push({
            type: "button",
            text: "View",
            width: 50,
            button: {
                tip: "Custom button example",
                icon: "fas fa-eye",
                action: (rowIndex, colIndex, recordId, record) => {
                    log(record)
                    let recordToHtml = `<h2>Record clicked</h2><font style="font-family: sans-serif">` + toHTML(record) + "</font>"
                    createNotification({
                        message: recordToHtml,
                        width: 1000,
                        duration: 2000
                    })
                }
            }
        })

        // Sample button 2
        columns.push({
            type: "button",
            width: 140,
            button: {
                text: "Other button",
                action: (rowIndex, colIndex, recordId, record) => {
                    createNotification({
                        message: "Record id: " + recordId
                    })
                }
            }
        })

        // Reset the selection
        kiss.selection.reset("myDatatable")

        //
        // Create the datatable
        //
        let datatable = createDatatable({
            id: "myDatatable",
            color: "#00aaee",
            collection: fakeCollection,
            columns,

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
                        $("myDatatable").sortBy([{
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
                        $("myDatatable").groupBy(["category", "platform"])
                    }
                }, {
                    text: "Add 1000 records...",
                    icon: "fas fa-database",
                    action: () => {
                        fakeCollection.hasChanged = true
                        fakeCollection.insertFakeRecords(1000)
                        createNotification("Records inserted!")
                    }
                }, {
                    text: "Show selection in the console",
                    icon: "fas fa-check",
                    action: () => {
                        log("pickaform - Selected records:", 0, $("myDatatable").getSelectedRecords())
                    }
                },
                {
                    icon: "fa fa-download",
                    text: txtTitleCase("Download selection as JSON"),
                    action: async () => {
                        let selectedRecords = $("myDatatable").getSelectedRecords()

                        // Convert field ids to field labels to have a human readable export
                        let exportRecords = []
                        for (let record of selectedRecords) exportRecords.push(await record.getData())

                        // Export data as a blob
                        let textFile = JSON.stringify(exportRecords)
                        let blob = new Blob([textFile], {
                            type: "application/json"
                        })

                        // Create a URL to download the blob
                        let url = URL.createObjectURL(blob)
                        let sourceUrl = `<br><br><center><a href="${url}" download="export.json">${txtTitleCase("download file")}</a></center>`

                        createDialog({
                            type: "message",
                            title: txtTitleCase("Download selection as JSON"),
                            message: txtTitleCase("Click on the link to download your JSON file") + sourceUrl,
                            buttonOKText: txtTitleCase("Done")
                        })
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
                datatable
            ],

            methods: {
                load: () => {
                    if (fakeCollection.records.length > 0) return
                    fakeCollection.insertFakeRecords(5000)
                }
            }
        })
    }
})

;
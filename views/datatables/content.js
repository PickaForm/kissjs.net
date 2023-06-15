kiss.app.defineView({
    id: "datatables-content",
    renderer: function (id, target) {

        // Get some images for inactive attachment field
        let fakeAttachmentField = '[{"id":"01887414-3775-7443-81bc-260a9539d7e4","filename":"cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.png","size":1279664,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.64x64.png","size":6106},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.256x256.png","size":87845},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.512x512.png","size":332583}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-379e-701e-b4dc-15301d8b4560","filename":"cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.png","size":1360256,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.64x64.png","size":6080},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.256x256.png","size":89129},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.512x512.png","size":337313}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-378a-759d-b17d-762b4dd33b72","filename":"cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.png","size":1301698,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.64x64.png","size":6193},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.256x256.png","size":89664},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.512x512.png","size":331588}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-506f-7707-a529-20a36858b1a8","filename":"cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.png","size":1357025,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.64x64.png","size":6136},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.256x256.png","size":89761},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.512x512.png","size":339784}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"}]';
        fakeAttachmentField = JSON.parse(fakeAttachmentField)

        // Set default layout for attachments
        localStorage.setItem("config-layout-attachment", "thumbnails-large")

        // Because each view needs its own data, we will proxy the data using a "Collection".
        // kiss.data.Collection class acts as a proxy for the database,
        // and adds some useful methods to work with your data (like multi-level grouping).
        // To build a Collection, we also need a Model to structure the data. So, we do:
        let fakeModel = new kiss.data.Model({
            id: "fake",
            name: "Computer game",
            namePlural: "Computer games",
            icon: "fas fa-rocket",

            items: [{
                    type: "panel",
                    title: "General informations",
                    icon: "fas fa-info-circle",
                    collapsible: true,

                    defaultConfig: {
                        labelPosition: "left",
                        fieldWidth: "100%",
                        labelWidth: "30%"
                    },

                    items: [{
                            primary: true,
                            id: "gameName",
                            label: "Video game name",
                            type: "text",
                            value: "Cyberpunk"
                        },
                        {
                            id: "releaseDate",
                            label: "Release date",
                            type: "date",
                            value: "today"
                        },
                        {
                            id: "reviewed",
                            label: "Reviewed",
                            type: "checkbox",
                            checked: true
                        },
                        {
                            id: "category",
                            label: "Category",
                            type: "select",
                            multiple: true,
                            value: "RPG",
                            options: [{
                                    value: "Adventure",
                                    color: "#00aaee"
                                },
                                {
                                    value: "Action",
                                    color: "#00eeaa"
                                },
                                {
                                    value: "Strategy",
                                    color: "#88cc00"
                                },
                                {
                                    value: "TPS",
                                    color: "#aa00ee"
                                },
                                {
                                    value: "FPS",
                                    color: "#eeaa00"
                                },
                                {
                                    value: "RPG",
                                    color: "#ee00aa"
                                },
                                {
                                    value: "RTS",
                                    color: "#00aaee"
                                },
                                {
                                    value: "Simulation",
                                    color: "#2bc48c"
                                }
                            ]
                        },
                        {
                            id: "platform",
                            label: "Platform",
                            type: "select",
                            value: "PS4",
                            options: [{
                                    value: "PS5",
                                    color: "#0075ff"
                                }, {
                                    value: "PS4",
                                    color: "#00aaee"
                                },
                                {
                                    value: "PS3",
                                    color: "#00eeaa"
                                },
                                {
                                    value: "Xbox",
                                    color: "#aaee00"
                                },
                                {
                                    value: "Switch",
                                    color: "#aa00ee"
                                },
                                {
                                    value: "Xbox one",
                                    color: "#eeaa00"
                                },
                                {
                                    value: "PC",
                                    color: "#000000"
                                },
                                {
                                    value: "IOS",
                                    color: "#999999"
                                }
                            ]
                        },
                        {
                            id: "description",
                            label: "Description",
                            type: "textarea",
                            rows: 10
                        },
                        {
                            id: "attachment",
                            label: "Game screenshots",
                            type: "attachment",
                            value: fakeAttachmentField,
                            tip: {
                                text: "Sorry, attachment field is not enabled in demo mode",
                                maxWidth: 500
                            }
                        }
                    ]
                },
                {
                    type: "panel",
                    title: "Details",
                    icon: "fas fa-star",
                    collapsible: true,

                    defaultConfig: {
                        labelPosition: "left",
                        fieldWidth: "100%",
                        labelWidth: "30%"
                    },

                    items: [{
                            id: "duration",
                            label: "Duration",
                            type: "number",
                            min: 1,
                            max: 100,
                            unit: "hour",
                            precision: 0,
                            tip: "Duration must be between 1 and 100"
                        },
                        {
                            id: "ratingMetacritic",
                            label: "Metacritic",
                            type: "rating",
                            shape: "star",
                            max: 5
                        },
                        {
                            id: "ratingIGN",
                            label: "IGN",
                            type: "rating",
                            shape: "thumb",
                            max: 8,
                            iconColorOn: "#00aaee"
                        },
                        {
                            id: "ratingGameSpot",
                            label: "GameSpot",
                            type: "rating",
                            shape: "heart",
                            max: 3,
                            iconColorOn: "var(--red)"
                        },
                        {
                            id: "percentFinished",
                            label: "Game finished",
                            type: "slider",
                            unit: "%",
                            value: 50
                        },
                        {
                            id: "color",
                            label: "Color code",
                            type: "color",
                            value: "#00aaee"
                        },
                        {
                            id: "icon",
                            label: "Icon code",
                            type: "icon",
                            value: "fab fa-apple"
                        }
                    ]
                }
            ]
        })

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
                        fakeCollection.insertFakeRecords(1000).then(() => kiss.pubsub.publish("EVT_RECORDS_LOADED"))
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
            },

            subscriptions: {
                // When the datatable receives the PubSub event "EVT_RECORDS_LOADED", it re-render
                EVT_RECORDS_LOADED: async function () {
                    await this.collection.find()
                    this._renderTable()

                    // Display the actual number of records
                    createDialog({
                        type: "message",
                        title: "Records inserted!",
                        message: "This datatable has " + this.collection.count + " rows (including group rows)"
                    })
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
                    // Insert fake records then reload the datatable
                    fakeCollection.insertFakeRecords(5000).then(() => kiss.pubsub.publish("EVT_RECORDS_LOADED"))
                }
            }
        })
    }
})

;
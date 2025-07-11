function createFakeModel(component) {

    // Set default layout for attachments
    localStorage.setItem("config-layout-attachment", "thumbnails-large")

    // Get some images for inactive attachment field
    let fakeAttachmentField = '[{"id":"01887414-3775-7443-81bc-260a9539d7e4","filename":"cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.png","size":1279664,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.64x64.png","size":6106},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.256x256.png","size":87845},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.512x512.png","size":332583}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-379e-701e-b4dc-15301d8b4560","filename":"cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.png","size":1360256,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.64x64.png","size":6080},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.256x256.png","size":89129},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.512x512.png","size":337313}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-378a-759d-b17d-762b4dd33b72","filename":"cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.png","size":1301698,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.64x64.png","size":6193},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.256x256.png","size":89664},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.512x512.png","size":331588}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-506f-7707-a529-20a36858b1a8","filename":"cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.png","size":1357025,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.64x64.png","size":6136},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.256x256.png","size":89761},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.512x512.png","size":339784}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"}]';
    fakeAttachmentField = JSON.parse(fakeAttachmentField)

    // Release date field
    let releaseDateField = {
        id: "releaseDate",
        label: "Release date",
        // labelPosition: "left",
        // width: "100%",
        // fieldWidth: "70%",
        // labelWidth: "30%",
        type: "date",
        year: (new Date()).getFullYear(),
    }

    if (component == "timeline") {
        releaseDateField.month = (new Date()).getMonth() + 1
    }

    return {
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
                    width: "100%",
                    fieldWidth: "70%",
                    labelWidth: "30%"
                },

                items: [{
                        primary: true,
                        id: "gameName",
                        label: "Video game name",
                        type: "text",
                        value: "Cyberpunk"
                    },
                    releaseDateField,
                    {
                        id: "reviewed",
                        label: "Reviewed",
                        type: "checkbox",
                        checked: true
                    },
                    {
                        id: "reviewDate",
                        label: "Review date",
                        type: "date"
                    },
                    {
                        id: "reviewTime",
                        label: "Review time",
                        type: "select",
                        template: "time"
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
                        label: "Description (rich text)",
                        type: "richTextField",
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
                    width: "100%",
                    fieldWidth: "70%",
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
    }
}

;
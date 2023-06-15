kiss.app.defineView({
    id: "containers-content",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            styles: {
                "this": "user-select: none; background: #ffffff"
            },

            items: [
                // CONCEPTS
                showCase("Introduction about containers", kiss.doc.containers),

                // BLOCK
                showCase("Block", kiss.doc.block, {
                    id: "container-block",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderRadius: "20px",
                    borderColor: "#ffffff",
                    background: "linear-gradient(129deg, rgba(0,215,238,1) 0%, rgba(148,45,253,1) 100%)",
                    boxShadow: "5px 5px 10px #dddddd",
                    padding: "32px",

                    items: [{
                            type: "text",
                            label: "Field 01",
                            styles: {
                                "field-label": "color: #ffffff; font-weight: bold"
                            }
                        },
                        {
                            type: "text",
                            label: "Field 02",
                            styles: {
                                "field-label": "color: #ffffff; font-weight: bold"
                            }
                        }
                    ]
                }, {
                    id: "container-block-layout",

                    height: 400,
                    boxShadow: "5px 5px 10px #8aa2c8",
                    style: "color: #ffffff;",

                    layout: "vertical",
                    items: [{
                            id: "top-bar",
                            type: "block",
                            flex: 1,
                            height: "20px",
                            background: "#8aa2c8",
                            items: [{
                                type: "html",
                                html: "top-bar"
                            }]
                        },
                        {
                            id: "main",
                            layout: "horizontal",
                            flex: 5,
                            items: [{
                                    id: "nav-bar",
                                    type: "block",
                                    flex: 1,
                                    background: "#00aaee",
                                    items: [{
                                        type: "html",
                                        html: "nav-bar"
                                    }]
                                },
                                {
                                    id: "content-container",
                                    flex: 3,
                                    overflow: "auto",
                                    items: [{
                                            id: "content",
                                            type: "block",
                                            background: "#8c4bff",
                                            height: 400,
                                            items: [{
                                                type: "html",
                                                html: "content",
                                            }]
                                        },
                                        {
                                            id: "content-footer",
                                            type: "block",
                                            height: 100,
                                            background: "#aa0088",
                                            items: [{
                                                type: "html",
                                                html: "content-footer"
                                            }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }),

                // PANEL
                showCase("Panel", kiss.doc.panel, {
                    id: "container-panel",
                    type: "panel",
                    title: "I'm a Panel",
                    icon: "fas fa-rocket",
                    closable: true,
                    collapsible: true,
                    boxShadow: "5px 5px 10px #000000",
                    items: [{
                            type: "text",
                            label: "Field 03"
                        },
                        {
                            type: "text",
                            label: "Field 04"
                        }
                    ]
                }),

                // FORM
                showCase("Form", kiss.doc.form, {
                    id: "my-form",
                    type: "panel",
                    title: "I'm a panel containing fields",
                    border: "solid 1px #cccccc",
                    borderRadius: "16px 0px 16px 0px",
                    layout: "vertical",

                    defaultConfig: {
                        labelWidth: 150,
                        fieldWidth: 150
                    },

                    items: [{
                            type: "text",
                            id: "firstName",
                            label: "First name",
                            value: "Bob"
                        },
                        {
                            type: "text",
                            id: "lastName",
                            label: "Last name",
                            value: "Wilson"
                        },
                        {
                            type: "date",
                            id: "birthDate",
                            label: "Birth date",
                            value: new Date().toISO()
                        },
                        {
                            type: "button",
                            float: "right",
                            icon: "fas fa-check",
                            text: "Submit!",
                            action: () => {
                                createDialog({
                                    type: "message",
                                    title: "Your form values are...",
                                    message: JSON.stringify($("my-form").getData())
                                }).render()
                            }
                        }
                    ]
                })
            ]
        })
    }
})

;
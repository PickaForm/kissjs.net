kiss.app.defineView("components-content", function (id, target) {
    return createBlock({
        id: id,
        target,

        styles: {
            "this": "user-select: none;"
        },

        items: [{
            background: "#ffffff",

            defaultConfig: {
                labelWidth: 200,
                labelPosition: "left"
            },

            items: [

                // COMPONENTS
                showCase("Introduction about KissJS components", kiss.doc.components),

                // TEXT FIELD
                showCase(
                    "Text field", kiss.doc.textField, {
                        id: "field-text",
                        type: "text",
                        label: "This is a simple text field"
                    }, {
                        id: "field-text-dimensions",
                        type: "text",
                        label: "This is a text field with a placeholder and a maximum length",
                        placeholder: "Enter something up to 10 characters",
                        labelPosition: "top",
                        labelWidth: 300,
                        maxLength: 10,
                        fieldWidth: 300
                    }
                ),

                // TEXTAREA FIELD
                showCase(
                    "Textarea field", kiss.doc.textareaField, {
                        id: "field-textarea",
                        type: "textarea",
                        label: "Textarea field",
                        labelPosition: "top",
                        value: "I'm a multiline text.\nAnd here is the proof.",
                        rows: 5,
                        width: "100%"
                    }
                ),

                // NUMBER FIELD
                showCase(
                    "Number field", kiss.doc.numberField, {
                        id: "field-number",
                        type: "number",
                        label: "Number field",
                        fieldWidth: 150,
                        events: {
                            change: function() {
                                createNotification({
                                    message: this.getValue()
                                })
                            }
                        }
                    },
                    {
                        id: "field-number-range",
                        type: "number",
                        label: "With min and max",
                        fieldWidth: 150,
                        value: 12.34,
                        min: 0,
                        max: 100
                    }                    
                ),

                // DATE FIELD
                showCase(
                    "Date field", kiss.doc.dateField, {
                        id: "field-date",
                        type: "date",
                        label: "Birth date",
                        value: new Date().toISO(),
                        events: {
                            change: function() {
                                createNotification({
                                    message: this.getValue()
                                })
                            }
                        }
                    }
                ),

                // CHECKBOX FIELD
                showCase(
                    "Checkbox field", kiss.doc.checkbox, {
                        id: "field-checkbox",
                        type: "checkbox",
                        label: "This is a standard checkbox",
                    }, {
                        id: "field-checkbox-switch",
                        type: "checkbox",
                        label: "This is a checkbox which looks like a switch",
                        shape: "switch",
                        iconColorOff: "#888888",
                        iconColorOn: "#00aaee"
                    }, {
                        id: "field-checkbox-star",
                        type: "checkbox",
                        label: "This is a checkbox which looks like a star",
                        shape: "star",
                        iconColorOff: "#888888",
                        iconColorOn: "#cc3300",
                        checked: true
                    }, {
                        id: "field-checkbox-custom",
                        type: "checkbox",
                        label: "This is a totally custom checkbox!",
                        labelPosition: "top",
                        tip: "Open the lock, please",
                        fontSize: "16px",
                        iconSize: "32px",
                        iconOff: "fas fa-lock",
                        iconOn: "fas fa-lock-open",
                        iconColorOff: "#888888",
                        iconColorOn: "#00aaee"
                    },
                    {
                        borderStyle: "dashed",
                        borderColor: "#dfdfdf",
                        borderRadius: "10px",
                        padding: "20px",

                        items: [
                            {
                                type: "html",
                                html: "What programming languages are you familiar with?",
                                margin: "0 0 10px 0"                            
                            },
                            {
                                type: "checkbox",
                                label: "Javascript",
                                labelPosition: "right"
                            },
                            {
                                type: "checkbox",
                                label: "C++",
                                labelPosition: "right"
                            },
                            {
                                type: "checkbox",
                                label: "LUA",
                                labelPosition: "right"
                            }
                        ]
                    }
                ),

                // SELECT FIELD
                showCase(
                    "Select field", kiss.doc.selectField, {
                        id: "field-select",
                        type: "select",
                        label: "Simple select with auto-complete (by default)",
                        fieldWidth: "300px",
                        labelPosition: "top",
                        options: [{
                                value: "Bob Wilson"
                            },
                            {
                                value: "John Smith"
                            }
                        ]
                    }, {
                        id: "field-select-multiple",
                        type: "select",
                        label: "Multiple select with colors and other options",
                        fieldWidth: "300px",
                        labelPosition: "top",
                        multiple: true,
                        allowClickToDelete: true,
                        allowSwitchOnOff: true,
                        allowDuplicates: false,
                        options: [{
                                value: "Bob Wilson",
                                color: "#00aaee"
                            },
                            {
                                value: "John Smith",
                                color: "#88cc33"
                            },
                            {
                                value: "Julia Angelina",
                                color: "#3bc48c"
                            },
                            {
                                value: "Johanna Sandra",
                                color: "#8aa2c8"
                            },
                            {
                                value: "disabled option!",
                                color: "#000000",
                                disabled: true
                            }
                        ]
                    }
                ),

                // COLOR PICKER
                showCase(
                    "Color picker", kiss.doc.colorPicker, {
                        id: "color_picker",
                        type: "colorPicker",
                        value: "#0088CC",
                        columns: 20,
                        //width: 410,
                        selectorSize: "20px",
                        action: (color) => createDialog({
                            type: "message",                            
                            title: "Your selection",
                            headerBackgroundColor: color,
                            message: "You've selected the color <b>" + color,
                            buttonOKText: "Ok, thanks!",
                            icon: "fas fa-exclamation-triangle"
                        })
                    }, {
                        id: "color_picker_custom",
                        type: "colorPicker",
                        icon: "fas fa-paint-brush",
                        iconSize: "16px",
                        columns: 10,
                        selectorSize: "40px",
                        selectorBorderRadius: "20px",
                        value: "#008833",
                        palette: [
                            '00CCEE',
                            '00AAEE',
                            '0088CC',
                            '0055CC',
                            '004499',
                            '007766',
                            '008833',
                            '00AA99',
                            '55CC00',
                            '88CC00'
                        ],
                        action: (color) => createDialog({
                            type: "message",
                            title: "Your selection",
                            headerBackgroundColor: color,
                            message: "You've selected the color <b>" + color,
                            buttonOKText: "Ok, thanks!",
                            icon: "fas fa-exclamation-triangle"
                        })
                    }
                ),

                // ICON PICKER
                showCase(
                    "Icon picker", kiss.doc.iconPicker, {
                        id: "icon_picker",
                        type: "iconPicker",
                        height: 300,
                        action: (icon) => createDialog({
                            type: "message",
                            title: "Your selection",
                            message: "You've selected the icon <b>" + icon,
                            buttonOKText: "Ok, thanks!",
                            icon: "fas fa-exclamation-triangle"
                        })
                    }, {
                        id: "icon_picker_small",
                        type: "iconPicker",
                        columns: 10,
                        height: 200,
                        value: "fas fa-burn",
                        color: "#ffffff",
                        iconSize: "18px",
                        selectorSize: "40px",
                        selectorBorderRadius: "20px",
                        backgroundColor: "#00aaee",
                        backgroundColorSelected: "#a1ed00",
                        action: (icon) => createDialog({
                            type: "message",
                            title: "Your selection",
                            message: "You've selected the icon <b>" + icon,
                            buttonOKText: "Ok, thanks!",
                            icon: "fas fa-exclamation-triangle"
                        })
                    }),

                // BUTTONS
                showCase("Buttons", kiss.doc.button, {
                    id: "button-1",
                    type: "button",
                    text: "I have some blue text",
                    color: "#00aaee"
                }, {
                    id: "button-2",
                    type: "button",
                    text: "I have an icon and rounded borders",
                    icon: "fas fa-check",
                    borderRadius: "24px"
                }, {
                    id: "button-3",
                    type: "button",
                    text: "Icon at the top",
                    icon: "fas fa-pause",
                    iconPosition: "top"
                },{
                    id: "button-4",
                    type: "button",
                    iconSize: "32px",
                    width: "60px",
                    height: "60px",
                    icon: "fas fa-rocket",
                    tip: "Launch the rocket!",
                    borderRadius: "0px 32px 0px 32px",
                    color: "#00aaee",
                    iconColor: "#00aaee",
                    iconColorHover: "#ffffff",
                    backgroundColorHover: "#00aaee",
                    boxShadow: "5px 5px 10px #bbbbbb",
                    boxShadowHover: "0px 0px"
                }),

                // HTML
                showCase("Html", kiss.doc.html),

                // VALIDATION RULES
                showCase(
                    "Field validation rules", kiss.doc.validationRules, {
                        id: "field-text-email",
                        type: "text",
                        label: "Email field",
                        fieldWidth: "300px",
                        labelPosition: "top",
                        placeholder: "Please enter your email",
                        validationType: "email"
                    }
                ),

                // POSITIONING AND SIZING
                showCase(
                    "Sizing and positionning", kiss.doc.componentSizeAndPosition, {
                        id: "field-size",
                        type: "text",
                        label: "Custom field size",
                        labelWidth: 150,
                        fieldWidth: 200
                    }
                )
            ]
        }]
    })
})

;
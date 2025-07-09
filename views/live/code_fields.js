const code_fields = `// Example of field types
{
    layout: "vertical",
    height: "100%",
    overflow: "auto",
    alignItems: "center",

    defaultConfig: {
        labelPosition: "top",
        margin: 10,
        width: 400,
    },
    
    items: [
        {
            type: "html",
            html: "<h1>Examples of field types</h1>"
        },
        {
            type: "text",
            label: "Simple text",
            value: "Hello world"
        },
        {
            type: 'text',
            label: 'Email',
            validationType: "email",
            value: "bob@wilson.com"
        },
        {
            type: 'text',
            label: 'URL',
            validationType: "url",
            value: "https://pickaform.fr/en"
        },
        {
            type: 'text',
            label: "Custom validation field. Enter a phone number like: 01 23 45 67 89",
            validationType: "regex",
            validationRegex: "^d{2} d{2} d{2} d{2} d{2}$",
        },        
        {
            type: "textarea",
            label: "Paragraph",
            rows: 5,
            value: "Lorem\\nIpsum"
        },
        {
            type: "number",
            label: "Number",
            value: 100
        },
        {
            type: "number",
            label: "Number with min and max authorized values",
            min: 50,
            max: 200,
            value: 100
        },        
        {
            type: "date",
            label: "Date",
            value: kiss.formula.TODAY()
        },
        {
            type: "select",
            label: "Time (range from 8 to 18, 30mn interval)",
            template: "time",
            min: 8,
            max: 18,
            interval: 30
        },        
        {
            type: "select",
            label: "Simple dropdown list",
            options: ["A", "B", "C"]
        },
        {
            type: "select",
            label: "Dropdown list with colors",
            options: [
                {
                    label: "A",
                    value: "a",
                    color: "blue"
                },
                {
                    label: "B",
                    value: "b",
                    color: "purple"
                },
                {
                    label: "C",
                    value: "c",
                    color: "red"
                }
            ],
            value: "a"
        },        
        {
            type: "select",
            label: "Dropdown list with multiple values and colors",
            multiple: true,
            options: [
                {
                    label: "A",
                    value: "a",
                    color: "blue"
                },
                {
                    label: "B",
                    value: "b",
                    color: "purple"
                },
                {
                    label: "C",
                    value: "c",
                    color: "red"
                }                
            ],
            value: ["b", "c"]
        },
        {
            type: "select",
            label: "Dropdown list with multiple values and delete icons",
            multiple: true,
            allowClickToDelete: true,
            options: [
                {
                    label: "A",
                    value: "a",
                    color: "blue"
                },
                {
                    label: "B",
                    value: "b",
                    color: "purple"
                },
                {
                    label: "C",
                    value: "c",
                    color: "red"
                }                
            ],
            value: ["a", "b", "c"]
        },        
        {
            type: "select",
            label: "Dropdown list that allows values which are not in the list",
            options: ["A", "B", "C"],
            allowValuesNotInList: true,
            value: "Other value"
        },
        {
            type: "select",
            label: "Dropdown list with custom renderer",
            options: [
                {
                    label: "Option A",
                    value: "a",
                    customProperty: "This is the custom property of A"
                },
                {
                    label: "Option B",
                    value: "b",
                    customProperty: "This is the custom property of B"
                }
            ],
            valueRenderer: (option) => "<div class='field-select-value'>😊" + option.label + "</div>",
            optionRenderer: (option) => "✅ " + option.customProperty,
            value: "a"
        },
        {
            type: "checkbox",
            label: "Checkbox"
        },
        {
            type: "checkbox",
            label: "Checkbox like a switch",
            shape: "switch",
            value: true
        },
        {
            type: "checkbox",
            label: "Checkbox like a circle",
            shape: "circle"
        },
        {
            type: "checkbox",
            label: "Checkbox like a star",
            shape: "star"
        },
        {
            type: "checkbox",
            label: "Checkbox with custom color and size",
            shape: "star",
            iconColorOn: "orange",
            iconSize: 32,
            value: true
        },
        {
            type: "rating",
            label: "Rating field",
            value: 3
        },
        {
            type: "rating",
            label: "Custom rating field (thumb)",
            shape: "thumb",
            max: 10,
            value: 7,
            iconColorOn: "#00aaee"
        },
        {
            type: "rating",
            label: "Custom rating field (heart)",
            shape: "heart",
            max: 20,
            value: 14,
            iconColorOn: "red",
        },        
        {
            type: "slider",
            label: "Slider field (with min, max and step)",
            min: 100,
            max: 200,
            step: 10,
            value: 150
        },
        {
            type: "icon",
            label: "Icon field (Font Awesome)",
            value: "fas fa-check"
        },
        {
            type: "icon",
            label: "Icon field without the icon code",
            value: "fas fa-check",
            fieldWidth: 28,
            hideCode: true
        },        
        {
            type: "html",
            html: "Icon picker",
            class: "field-label",
            margin: "10px 0 0 5px"
        },
        {
            type: "iconPicker",
            value: "fas fa-check",
            minHeight: 150,
            selectorSize: "34px",
            iconSize: "26px"
        },
        {
            type: "color",
            label: "Color field",
            value: "#00aaee"
        },
        {
            type: "color",
            label: "Color field without the color code",
            value: "#00aaee",
            fieldWidth: 28,
            hideCode: true
        },         
        {
            type: "html",
            html: "Color picker",
            class: "field-label",
            margin: "10px 0 0 5px"
        },
        {
            type: "colorPicker",
            value: "#00aaee",
            minHeight: 150,
            selectorSize: "18px",
            iconSize: "10px"
        }
    ]
}`

;
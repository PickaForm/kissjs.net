/**
 * INTRODUCTION
 */
kiss.doc.components = /*html*/
    `KissJS components are the small pieces of UI elements that we need to build a web application, like text fields, checkboxes, buttons...

They can be created directly by a function, or indirectly by their container (like blocks or panels).
To create a new component directly with a function, use one of the following functions:

Component type | Function to create the component | Class | API
-|-|-|-
**CONTAINERS**|
Block | createBlock | kiss.ui.Block | [(link)](./doc/out/kiss.ui.Block.html)
Panel | createPanel | kiss.ui.Panel | [(link)](./doc/out/kiss.ui.Panel.html)
**FIEDS**|
Text | createTextField | kiss.ui.Field | [(link)](./doc/out/kiss.ui.Field.html)
Textarea | createTextareaField | kiss.ui.Field | [(link)](./doc/out/kiss.ui.Field.html)
Number | createTextField | kiss.ui.Field | [(link)](./doc/out/kiss.ui.Field.html)
Date | createDateField | kiss.ui.Field | [(link)](./doc/out/kiss.ui.Field.html)
Checkbox | createCheckboxFeld | kiss.ui.Checkbox | [(link)](./doc/out/kiss.ui.Checkbox.html)
Select | createSelectFeld | kiss.ui.Select | [(link)](./doc/out/kiss.ui.Select.html)
Slider | createSlider | kiss.ui.Slider | [(link)](./doc/out/kiss.ui.Slider.html)
Rating | createRating | kiss.ui.Rating | [(link)](./doc/out/kiss.ui.Rating.html)
Color | createColorField | kiss.ui.Color | [(link)](./doc/out/kiss.ui.Color.html)
Color picker | createColorPicker | kiss.ui.ColorPicker | [(link)](./doc/out/kiss.ui.ColorPicker.html)
Icon | createIconField | kiss.ui.Icon | [(link)](./doc/out/kiss.ui.Icon.html)
Icon picker | createIconPicker | kiss.ui.IconPicker | [(link)](./doc/out/kiss.ui.IconPicker.html)
Attachment | createAttachment | kiss.ui.Attachment | [(link)](./doc/out/kiss.ui.Attachment.html)
**ELEMENTS**|
Html | createHtml | kiss.ui.Html | [(link)](./doc/out/kiss.ui.Html.html)
Button | createButton | kiss.ui.Button | [(link)](./doc/out/kiss.ui.Button.html)
Image | createImage | kiss.ui.Image | [(link)](./doc/out/kiss.ui.Image.html)
Menu | createMenu | kiss.ui.Menu | [(link)](./doc/out/kiss.ui.Menu.html)
Dialog | createDialog | kiss.ui.Dialog | [(link)](./doc/out/kiss.ui.Dialog.html)
Notification | createNotification | kiss.ui.Notification | [(link)](./doc/out/kiss.ui.Notification.html)
Tip | createTip | kiss.ui.Tip | [(link)](./doc/out/kiss.ui.Tip.html)
**DATA COMPONENTS**|
Datatable | createDatatable | kiss.ui.Datatable | [(link)](./doc/out/kiss.ui.Datatable.html)
Calendar | createCalendar | kiss.ui.Calendar | [(link)](./doc/out/kiss.ui.Calendar.html)
Kanban | createKanban | kiss.ui.Kanban | [(link)](./doc/out/kiss.ui.Kanban.html)
Timeline | createTimeline | kiss.ui.Timeline | [(link)](./doc/out/kiss.ui.Timeline.html)
**EXTENSIONS**|
aiTextarea | createAiTextareaField | kiss.ux.aiTextarea | [(link)](./doc/out/kiss.ux.aiTextarea.html)
aiImage | createAiImageField | kiss.ux.aiImage | [(link)](./doc/out/kiss.ux.aiImage.html)
codeEditor | createCodeEditor | kiss.ux.CodeEditor | [(link)](./doc/out/kiss.ux.codeEditor.html)
qrCode | createQRCode | kiss.ux.QrCode | [(link)](./doc/out/kiss.ux.qrcode.html)
wizardPanel | createWizardPanel | kiss.ux.WizardPanel | [(link)](./doc/out/kiss.ux.wizardPanel.html)


Like this:


    let myTextField = createTextField({
        label: "My text field"
    })


When we do that, the component's HTML markup has been generated, but it's not yet attached to the DOM, which means it's not visible.
To render the component and make it visible, call its **render()** method, like this:

    myTextField.render()


Creation functions are chainable.
It means that you can create the component **and** render it directly, like this:

    let myTextField = createTextField({
        label: "My text field"
    }).render()

Components can be **containers** too.
To know more about containers, <a href="javascript:kiss.router.navigateTo({ui: 'start', section: 'containers', anchor: 'Introduction%20about%20containers'})">click here</a>.

To create a component within a **container** component (block or panel), just integrate its JSON configuration within the **items** property of the container.
In this case, you will also have to specify the component's **type** property, so that KissJS knows what kind of component you want.
Like this:


    // Create a container with 2 fields and a button:
    let myForm = createBlock({
        items: [
            // Creates a text field
            {
                type: "text",
                label: "My text field"
            },
            // Creates a date field
            {
                type: "date",
                label: "My date field"
            },
            // Creates a button
            {
                type: "button",
                text: "Click me",
                action: () => console.log("Click!")
            }
        ]
    })

The nested components will be rendered at the same time as their container:

    myForm.render()


Important: if no **type** has been specified for a container's item, it defaults to a **Block** container:

    let myPanel = createPanel({
        title: "I'm a panel",
        items: [
            {
                type: "html",
                html: "<a href="www.pickaform.com"></a>"
            },
            // No type is specified, so, it defaults to a **block** element which can contain other items
            {
                padding: 20,                    
                boxShadow: "5px 5px 10px #cccccc",
                items: [
                    // ... Some nested items      
                ]
            }
        ]
    })`

/**
 * TEXT FIELD
 */
kiss.doc.textField = /*html*/
    `KissJS generates automatically a label and an input field:

    createTextField(jsonConfig)

Or if you include it in a container (Block or Panel):

    createBlock({
        items: [
            {
                type: "text",
                label: "First name"
                // ...other options
            },
            {
                type: "text",
                label: "Last name"
                // ...other options
            }
        ]
    })

`


/**
 * TEXTAREA
 */
kiss.doc.textareaField = /*html*/
    `A textarea is a multiline text.

    createTextareaField(jsonConfig)

Or if you include it in a container:

    createBlock({
        items: [
            {
                type: "textarea",
                label: "Description"
                // ...other options
            }
        ]
    })`

/**
 * NUMBER FIELD
 */
kiss.doc.numberField = /*html*/
    `Same principle for number fields:

    createNumberField(jsonConfig)

Or if you include it in a container:

    createBlock({
        items: [
            {
                type: "number",
                label: "Amount"
                // ...other options
            }
        ]
    })
`

/**
 * DATE FIELD
 */
kiss.doc.dateField = /*html*/
    `Date fields are created with:

    createDateField(jsonConfig)

Or if you include it in a container:

    createBlock({
        items: [
            {
                type: "date",
                label: "Birth date"
                // ...other options
            }
        ]
    })
    
Date fields work with ISO strings internaly (2020-12-24T18:50:30.123Z).
KissJS extends the Date prototype with a method toISO() which extracts the date part only:

    new Date().toISO() // returns 2021-03-04
`

/**
 * CHECKBOX FIELD
 */
kiss.doc.checkbox = /*html*/
    `To create a checkbox field, write this:

    createCheckbox(jsonConfig)

Or if you include it in a container:

    createBlock({
        items: [
            {
                type: "checkbox",
                label: "Check me"
                // ...other options
            }
        ]
    })

The checkbox can have different shapes, using the <b>shape</b> property:
- "check"
- "square"
- "circle"
- "switch"
- "star"`

/**
 * SELECT FIELD
 */
kiss.doc.selectField = /*html*/
    `Select fields are very powerful fields that have a bunch of cool options:
- single or multiple values
- auto-complete
- possible to disable some options
- possible to update the list of options afterward
- keyboard navigation up and down within options
- selection with mouse or Enter
- can delete existing entries with Backspace
- option to add values which are not in list
- option to prevent duplicates
- option to add entries using a separator, comma by default (useful for email-like inputs)
- possibility to have a custom renderer for options
- possibility to have a custom renderer for values
- option to delete values by clicking on them
- option to switch a value on/off by clicking on it in the dropdown list
- possible to use labels, to display something different than the field values

To create a Select field, use the syntax:

    createSelect(jsonConfig)

Or if you include it in a container:

    createBlock({
        items: [
            {
                type: "select",
                label: "Job"
                // ...other options
            }
        ]
    })    
`

/**
 * SLIDER
 */
kiss.doc.sliderField = /*html*/
    `A slider field can be created with:

    createSliderField(jsonConfig)

Or if you include it in a container:

    createBlock({
        items: [
            {
                type: "slider",
                label: "Slide me",
                // ...other options
            }
        ]
    })

`

/**
 * RATING
 */
kiss.doc.ratingField = /*html*/
    `A rating field can be created with:

    createRatingField(jsonConfig)

Or if you include it in a container:

    createBlock({
        items: [
            {
                type: "rating",
                label: "Rate me",
                // ...other options
            }
        ]
    })

`

/**
 * COLOR PICKER
 */
kiss.doc.colorPicker = /*html*/
    `A color picker is a component to pick a color. To create a color picker, you write:

    createColorPicker(jsonConfig)

Or if you include it in a container:

    createBlock({
        items: [
            {
                type: "colorPicker",
                // ...other options
            }
        ]
    })

It's possible to define a default value, and also custom colors for the palette, like this:

    let myColorPicker = createColorPicker({
        value: "#00CCEE",
        palette: ["00CCEE", "00AAEE", "0088CC", "0055CC", "004499"]
    })

*Note that colors in the custom palette must be hexa colors without the # sign (because it was boring to repeat # so many times)*

To capture the selected color, add an **action** property callback. Like this:

    let myColorPicker = createColorPicker({
        action: (color) => {
            console.log("The selected color is " + color) // #00aaee
        }
    })
`

/**
 * ICON PICKER
 */
kiss.doc.iconPicker = /*html*/
    `The icon picker is a component to pick an icon from the [Font Awesome](https://fontawesome.com/) library.
Create one with this syntax:

    createIconPicker(jsonConfig)

Or if you include it in a container:

    createBlock({
        items: [
            {
                type: "iconPicker",
                // ...other options
            }
        ]
    })

To capture the selected icon, add an **action** property callback. Like this:

    let myIconPicker = createIconPicker({
        action: (iconClass) => {
            console.log("The selected icon class is " + iconClass) // "fas fa-check"
        }
    })
`

/**
 * BUTTONS
 */
kiss.doc.button = /*html*/
    `A button can be created with:

    createButton(jsonConfig)

Or if you include it in a container:

    createBlock({
        items: [
            {
                type: "button",
                text: "click me!",
                action: function() {
                    alert("click!")
                }
            }
        ]
    })

`

/**
 * HTML
 */
kiss.doc.html = /*html*/
    `In some situations, it's useful to be able to embed HTML into your components.
You can create an Html component like this:

    let myHtmlComponent = createHtml({
        html: "<div>Hello world</div>"
    })

    myHtmlComponent.render()

You can also insert some HTML into a container element, like this:

    createPanel({
        items: [
            // Here is your html component
            {
                type: "html",
                html: "Please, enter your <u>first name</u> <b>below</b>..."
            },
            // ... and a text field
            {
                type: "text",
                label: "First name"
            }
        ]
    })
`

/**
 * COMPONENT SIZING
 */
kiss.doc.componentSizeAndPosition = /*html*/
    `You can use any CSS valid syntax (px, vw, ...) to define your width, height, top, left, and right parameters.
If you just use numbers, it will be converted to pixel unit:

    createPanel({
        id: "my-panel",
        width: 500, // => converted to "500px"
        items: [
            // ...
        ]
    })

If you use a function instead of a static value, the size will be recalculated each time there is a window resize event.
For example:

    createPanel({
        id: "my-panel",
        modal: true,
        top: () => (kiss.screen.current.height - 200) / 2,
        width: () => kiss.screen.current.width - 200) / 2,
        items: [
            // ...
        ]
    })
`

/**
 * VALIDATION RULES
 */
kiss.doc.validationRules = /*html*/
    `
Using the **validationType** property, you can use pre-defined validation types like:
- "alpha"
- "alphanumeric"
- "email"
- "url"
- "ip"

If you need specific validation rules, use a regular expression within the **validation** property.

For example:

    {
        type: "text",
        label: "Hexadecimal field",
        validation: /^[0-9a-fA-F]+$/
    }
`

;
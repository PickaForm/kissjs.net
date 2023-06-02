/**
 * Example of how to use pre-built components with KissJS
 * 
 * KissJS comes with a few pre-built components that will help you build a user interface *programmatically*.
 * Below is an example to create a "Hello World" modal window, containing a form with some fields and a button.
 */
window.onload = function () {

    // Build a text field
    const myTextField = createTextField({
        label: "I'm a text field",
        placeholder: "Enter something",
        labelWidth: 200,
        fieldWidth: 300,
    })

    // Build a date field
    const myDateField = createDateField({
        label: "I'm a date field",
        labelWidth: 200,
        fieldWidth: 300,
    })

    // Build a checkbox field
    const myCheckbox = createCheckbox({
        label: "I'm a checkbox",
        shape: "switch", // Try "check", "square", "circle", "star"
        iconColorOn: "#3bc48c",
        iconColorOff: "#cccccc",
        labelWidth: 200,
        fieldWidth: 300,
        
        // Easy HTML tooltips with string litterals
        tip: `<div style="margin: 10px">
                I'm a tooltip but...<br>
                ...I can contain HTML<br>
                <span style="color: #00aaee; font-weight: bold">... and even styling!</span>
            </div>`
    })

    // Build a block containing the previous fields
    //
    // Note:
    // All containers have an "items" property which is just an array of contained items.
    // Containers can have nested containers too, allowing you to split your layout hierarchically.
    const myForm = createBlock({
        id: "sample-form-id",

        // The array of contained items
        items: [
            myTextField,
            myDateField,
            myCheckbox,

            // We can also add components directly by inserting their configuration inline.
            // Here, we create a "Select" field (= dropdown list = combobox)
            {
                type: "select",
                label: "I'm a select field",
                value: ["Option A", "Option C"], // Default values

                // "multiple: true" allows to select multiple values
                multiple: true,

                // Try to uncomment some other options below:
                allowClickToDelete: true,
                //autocomplete: "off",
                //allowValuesNotInList: true,
                //allowSwitchOnOff: true,
                //allowDuplicates: true,

                options: [{
                        value: "Option A",
                        color: "#00aaee"
                    },
                    {
                        value: "Option B",
                        color: "#3bc48c"
                    },
                    {
                        value: "Option C",
                        color: "#aa4422"
                    }
                ],
                labelWidth: 200,
                fieldWidth: 300
            }
        ]
    })

    // Create a button
    const myButton = createButton({
        text: "Shake me to get the form values (check the console, too)",
        icon: "fas fa-thumbs-up", // Font awesome icons
        iconSize: "24px",
        iconColor: "#00aaee",
        
        // CSS properties can be applied directly on the component
        width: "100%",
        margin: "20px 0px 0px 0px",
        padding: 10,
        borderRadius: "20px 0px 20px 0px",

        // The components can have an "events" property to manage all the W3C DOM events
        events: {

            // Here, we want to capture the button "click" event.
            // Note: you can use various conventions for event names because the event name is normalized internally: click, onclick, onClick
            // You should always prioritize W3C standards, though
            click: (event) => {
                // Retrieves the form fields using the method "getFields"
                const formFields = $("sample-form-id").getFields()
                console.log(formFields)

                // Retrieve only the form data using the method "getData"
                const formData = $("sample-form-id").getData()
                console.log(formData)

                // Show JSON data inside a notification
                const formDataAsJSON = JSON.stringify(formData, null, 4)
                createNotification(formDataAsJSON)

                // ... then shake the modal window, thanks to the embedded animation library
                $("sample-draggable-window").setAnimation("shakeX")
            }
        }
    })

    // Now build a draggable modal window containing the form and the button
    const myModal = createPanel({
        id: "sample-draggable-window",
        title: "Drag me",
        draggable: true,
        expandable: true,
        closable: true,

        // W3C styles properties
        top: "25%",
        width: "550px",
        align: "center",
        boxShadow: "10px 10px 10px #555555",

        // It's also possible to target specific classes to style components and sub-components
        styles: {
            "this": "border-radius: 20px 5px 20px 5px", // Styling the base component (this)
            "panel-header": "border-radius: 20px 5px 0px 0px" // Styling a sub-component
        },

        // ... and if you don't like having inline style in your component, you can just apply classes at any level
        classes: {
            "this": "my-panel-class",
            "panel-header": "my-panel-header",
            "panel-body": "my-panel-body"
        },  

        items: [
            myForm,
            myButton
        ]
    })

    // Using the method "createPanel" generates an HTMLElement which is *detached* from the DOM.
    // To render the HTMLElement, we must attach it to the DOM, which is done using the "render" method, like this:
    myModal.render()
};
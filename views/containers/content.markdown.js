kiss.doc.containers = /*html*/
    `KissJS containers are components that can contain other components, thanks to their **items** property.
A container can also contain other containers, and nesting containers is how we build complex layouts with KissJS.`

kiss.doc.block = /*html*/
    `The **Block** is the simplest container.

    let myBlock = createBlock({
        items: [
            // Your items here...
        ]
    })
    
You can build complex layouts by nesting blocks, and you can arrange them vertically or horizontally using their **display** and **flexFlow** CSS rules.
To build a layout which is split **horizontally**, use a **row** layout:

    {
        id: "horizontal-layout",
        display: "flex",
        flexFlow: "row",
        items: [
            {
                type: "html",
                html: "LEFT",
                width: "200px"
            },
            {
                type: "html",
                html: "RIGHT",
                width: "200px"
            }
        ]
    }
    
    
To build a layout which is split **vertically**, use a **column** layout:

    {
        id: "vertical-layout",
        display: "flex",
        flexFlow: "column",
        items: [
            {
                type: "html",
                html: "TOP",
                height: "200px"
            },
            {
                type: "html",
                html: "BOTTOM",
                height: "200px"
            }
        ]
    }


And to sum up:

    // Horizontal layout
    {
        display: "flex",
        flexFlow: "row",
        items: [
            // Your items organized horizontally
        ]
    }

    // Vertical layout
    {
        display: "flex",
        flexFlow: "column",
        items: [
            // Your items organized vertically
        ]
    }

In general, we do prefer following W3C standards so that it's not necessary to learn extra framework jargon.
Nevertheless, building layouts is a recurring tasks and we've introduced a shortcut property called "layout".
So, you can also build a vertical or horizontal layout using this syntax:

    // Horizontal layout
    {
        layout: "horizontal",
        items: [
            // Your items organized horizontally
        ]
    }

    // Vertical layout
    {
        layout: "vertical",
        items: [
            // Your items organized vertically
        ]
    }    
`

kiss.doc.panel = /*html*/
    `The **Panel** is a container with a header and few other properties (like **closable**, **draggable**, **collapsible**, **expandable**, ...)
    
    let myPanel = createPanel({
        title: "My title",
        icon: "fas fa-check", // <= A Font Awesome icon class here
        closable: true,
        draggable: true,
        modal: true,
        items: [
            // Your items here...
        ]
    })`

kiss.doc.form = /*html*/
    `To create a form, just use a standard container (block or panel) with fields.
Every container has a **getData()** method which returns the values of all the contained fields (including within nested containers):

    let myForm = createBlock({
        items: [
            {
                type: "text",
                label: "First name"
            },
            {
                type: "text",
                label: "Last name"
            },
            {
                type: "date",
                label: "Birth date"
            },
            {
                type: "button",
                text: "Submit",
                action: () => {
                    let myFormData = myForm.getData()
                    console.log(myFormData)
                }
            }
        ]
    })
`

;
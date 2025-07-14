kiss.app.defineView({
    id: "calendar-content",
    renderer: function (id, target) {
        // Build a fake collection
        let fakeModelTemplate = createFakeModel()
        fakeModelTemplate.id = "fakeCalendar"
        let fakeModel = new kiss.data.Model(fakeModelTemplate)
        let fakeCollection = fakeModel.collection

        // A calendar needs columns definition.
        // Here, we use a special method of the model to use the field definitions as columns
        let columns = fakeModel.getFieldsAsColumns()
        columns.forEach(column => {
            column.hidden = !(["gameName", "category", "platform", "reviewed", "ratingMetacritic"].includes(column.id))
        })

        //
        // Create the calendar
        //
        let calendar = createCalendar({
            id: "myCalendar",
            color: "#00aaee",
            collection: fakeCollection,
            period: "1 week + details",
            columns,

            // Options
            canEdit: true,
            canAddField: false,
            canEditField: false,
            canCreateRecord: true,
            dateField: "releaseDate",
            height: () => kiss.screen.current.height - 50,

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
                calendar
            ],

            methods: {
                load: () => {
                    if (fakeCollection.records.length > 0) return
                    fakeCollection.insertFakeRecords(200)
                }
            }
        })
    }
})

;kiss.doc.calendar = /*html*/
`
KissJS calendars are simple components to display your data using one of their date field.
`

;kiss.app.defineView({
    id: "calendar-menu",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            defaultConfig: {
                height: 40,
                textAlign: "left",
                iconSize: "18px",
                iconColor: "#8aa2c8",
                borderColor: "#e3e5ec",
                borderWidth: "1px 0px 0px 0px",
                borderRadius: "0px",
                backgroundColor: "#f3f5f7",
                colorHover: "#00aaee",
                iconColorHover: "#00aaee",
                backgroundColorHover: "#e5e9ec"
            },

            layout: "vertical",
            items: [{
                    type: "html",
                    html: "Calendar",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: "Example with 200 records",
                    icon: "fas fa-info",
                    action: () => kiss.router.navigateTo({
                        anchor: "Introduction about KissJS calendars"
                    })
                },
                {
                    type: "button",
                    text: "Back to Home",
                    icon: "fas fa-arrow-left",
                    fontWeight: "bold",
                    action: () => kiss.router.navigateTo({
                        ui: "start",
                        section: "home"
                    })
                }
            ]
        })
    }
})

;kiss.app.defineView({
    id: "cheatsheet-content",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            styles: {
                "this": "user-select: none; background: #ffffff"
            },

            items: [
                showCase("General", kiss.doc.cheatsheetGeneral),
                showCase("Building UI", kiss.doc.cheatsheetUI),
                showCase("Building application views", kiss.doc.cheatsheetViews),
                showCase("Manipulating data", kiss.doc.cheatsheetData),
                showCase("ACL and Permissions", kiss.doc.cheatsheetACL),
                showCase("Localization", kiss.doc.cheatsheetLocalization),
                showCase("Miscellaneous tools", kiss.doc.cheatsheetMiscTools),
                showCase("Javascript prototypes", kiss.doc.cheatsheetPrototypes)
            ]
        })
    }
})

;/**
 * CHEAT SHEET
 */
kiss.doc.cheatsheetGeneral = /*html*/
`
| Method or property | Description
| --- | ---
| <hr> **kiss.app** <hr>
| kiss.app.defineView() | Defines a view
| kiss.app.defineViewController() | Defines a view controller
| kiss.app.defineModel() | Defines a model
| kiss.app.defineTexts() | Defines translations
| kiss.app.models | Contains all application models
| kiss.app.collections | Contains all application collections
| <hr> **kiss.router** <hr>
| kiss.router.navigateTo() | Navigates to a view
| kiss.router.getRoute() | Gets the current route
| <hr> **kiss.ajax** <hr>
| kiss.ajax.request() | Sends an AJAX request
| kiss.ajax.setHost() | Sets the default host for AJAX requests
| <hr> **kiss.screen** <hr>
| kiss.screen.current.width | Current screen width
| kiss.screen.current.height | Current screen height
| kiss.screen.isTouch() | Returns true if the screen is touch
| kiss.screen.getOrientation() | Returns the screen orientation "horizontal" or "vertical"
| <hr> **kiss.pubsub** <hr>
| kiss.pubsub.subscribe() | Subscribes to a topic
| kiss.pubsub.unsubscribe() | Unsubscribes from a topic
| kiss.pubsub.publish() | Publishes a message to a topic
| <hr> **kiss.theme** <hr>
| kiss.theme.set() | Sets the application theme
| kiss.theme.get() | Gets the application theme
| kiss.theme.select() | Displays a theme selection dialog
| <hr> **kiss.language** <hr>
| kiss.language.set() | Sets the application language
| kiss.language.get() | Gets the application language
| kiss.language.select() | Displays a language selection dialog
| <hr> **kiss.session** <hr>
| **(works only with KissJS server)** |
| kiss.session.isOnline() | Returns true if the user is online
| kiss.session.showLogin() | Displays the login dialog
| kiss.session.logout() | Logs out the user
| kiss.session.getUserId() | Current user id (email)
| kiss.session.getUserName() | Current user name
| kiss.session.setHost() | Sets session host and ports for http and websocket
| kiss.session.getHttpHost() | Returns protocol, host and port (https:// your-host.com:443)
| kiss.session.getWebsocketHost() | Returns protocol, host and port (wss:// your-host.com:443)
`

kiss.doc.cheatsheetUI = /*html*/
`
## Primitive elements

| Function | Description
| --- | ---
| <hr> **Containers** <hr>
| createBlock() | Creates a simple block container (= div)
| createPanel() | Creates a panel container
| <hr> **Elements** <hr>
| createDialog() | Creates a dialog box
| createMenu() | Creates a menu
| createNotification() | Displays a notification
| <hr> **Form** <hr>
| createForm() | Creates a form from an instanciated Record (see Data & ORM section)

## How to build your UI

Generally, you create a container (block or panel) and add elements to it.
For example, to create a panel with a title and a button:

    const myPanel = createPanel({
        title: "My panel",
        items: [
            {
                type: "button", // Each element has a type
                text: "Click me",
                icon: "fas fa-check",
                action: () => createNotification("Button clicked")
            }
        ]
    })

    myPanel.render() // To insert the panel into the DOM

## Elements types

| Type | Description
| --- | ---
| <hr> **Containers** <hr>
| block | A simple block container
| panel | A panel container
| wizardPanel | A multi-view panel to create a wizard
| <hr> **Elements** <hr>
| button | A clickable button
| dialog | A dialog box
| html | A raw HTML element
| image | An image
| menu | A menu
| notification | A notification
| tip | A tooltip
| spacer | A space between elements (useful to fill space in flex layouts)
| <hr> **Fields** <hr>
| field | A generic field for text, textarea, number or date
| select | A select field (dropdown list with options)
| checkbox | A checkbox
| rating | A rating field
| slider | A slider
| color | A color field
| colorPicker | A color picker
| icon | An icon field
| iconPicker | An icon picker
| attachment | A file attachment field
| <hr> **Data components** <hr>
| datatable | A table to display data
| calendar | A calendar
| kanban | A kanban board
| timeline | A timeline
| gallery | A gallery view
| chartView | A chart view (encapsulates Chart.js)
| dashboard | A dashboard composed of multiple charts
| <hr> **UI Extensions** (need to be imported separately for KissJS core)<hr>
| aiImage | An image with AI generation
| aiTextarea | A textarea with AI generation
| codeEditor | A code editor (encapsulates Ace editor)
| directory | A select field that displays people and groups of the address book
| map | A map (encapsulates OpenLayers)
| mapField | A map field (combo of a map and a text field to set the adress)
| qrCode | A QR code generator
| richTextField | A rich text field (encapsulates Quill editor)

## Layouts

When you build a UI, you split your screen into regions vertically or horizontally.
For this, you can use containers and their **layout** property:

    createPanel({
        title: "My panel",
        layout: "horizontal", // or "vertical"
        items: [
            {
                type: "button",
                text: "Click me",
                icon: "fas fa-check",
                action: () => createNotification("Button clicked")
            },
            {
                type: "button",
                text: "Click me too",
                icon: "fas fa-check",
                action: () => createNotification("Another button clicked")
            }
        ]
    }).render()

Internally, this is the same as setting the CSS flex property to "row" or "column".

Complex layouts can be achieved by **nesting containers**:

    createPanel({
        title: "My main panel",
        layout: "vertical",
        items: [
            // Block 1
            {
                // When the type is not specified, it is a block by default
                layout: "horizontal",
                items: [
                    {
                        type: "button",
                        text: "Click me",
                        icon: "fas fa-check",
                        action: () => createNotification("Button clicked")
                    },
                    {
                        type: "button",
                        text: "Click me too",
                        icon: "fas fa-check",
                        action: () => createNotification("Another button clicked")
                    }
                ]
            },
            // Block 2
            {
                layout: "horizontal",
                items: [
                    {
                        type: "button",
                        text: "Click me",
                        icon: "fas fa-check",
                        action: () => createNotification("Button clicked")
                    },
                    {
                        type: "button",
                        text: "Click me too",
                        icon: "fas fa-check",
                        action: () => createNotification("Another button clicked")
                    }
                ]
            }
        ]
    }).render()

## Styling

Components can be styled using main CSS properties directly in their configuration, using Javascript conventions:

    createBlock({
        width: 500, // Convert to "500px"
        height: "30%",
        margin: "10px 0",
        padding: 20,
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: 10,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
        items: [
            ...
        ]
    })

You can also use the **style** property to define the CSS inline style:

    createBlock({
        style: "width: 500px; height: 30%; margin: 10px 0; border-radius: 10px;",
        items: [
            ...
        ]
    })    

Nevertheless, it's generally recommanded to minimize the use of inline styles.
Instead, use the **class** property to define your styles:

    createBlock({
        class: "my-bloc-style",
        items: [
            ...
        ]
    })

## Applying a default configuration to all items of a container

Sometimes, it's useful to be able to style all items at once, to avoid repeating the same style for each element.
KissJS allows that using the "defaultConfig" property:

    createBlock({
        defaultConfig: {
            margin: 10,
            padding: 10,
            borderColor: "#00aaee"
        },
        items: [
            ...
        ]
    })

In this example, all items will have a margin, padding and border color set to the default values. Those values can be overridden by the specific values of each item.

## Events

You can attach any DOM events to a KissJS component adding an "events" property:

    createPanel({
        title: "My panel",
        items: [
            ...
        ],
        events: {
            click: () => createNotification("Panel clicked"),
            mouseover: () => createNotification("Panel hovered")
        }
    })

To minimize the syntax errors, event names are automatically standardized, so you can use whatever you want:
    - onclick
    - onClick
    - click
    - onMouseOver
    - onmouseover
    - mouseover
    - etc...

## Methods

You can add custom methods to your components, like this:

    const myPanel = createPanel({
        title: "My panel",
        items: [
            ...
        ],
        methods: {
            myMethod1() {
                createNotification("Method 1 called")
            },
            myMethod2() {
                createNotification("Method 2 called")
            }
        }
    })

    myPanel.myMethod1() // To call the method 1

## **Load** method

You can add a **load()** method if you need to load data into the component, or build/rebuild it dynamically.

The **load()** method is called:
- at the component initialization
- each time the component is displayed

The **load()** method can be asynchronous:

    const myPanel = createPanel({
        title: "My panel",
        methods: {
            async load() {
                // Load your data
                const data = await kiss.ajax.request(...) // [{name: "a"}, {name: "b"}, ...]

                // Do whatever you want to build UI from your data
                const items = data.map(item => {
                    return {
                        type: "button",
                        text: item.name,
                        action: () => createNotification(item.name)
                    }
                })

                // Inject the result into your component
                this.setItems(items)
            }
        }
    }).render()

## Default methods

All components have some default methods you can use:

| Method | Description
| --- | ---
| **render()** | **Required** to insert the component into the DOM
| show() | To show the component
| showAt() | To show the component at a specific x, y position on the screen
| hide() | To hide the component
| toggle() | To toggle the visibility of the component
| showLoading() | To display a loading spinner inside the component
| hideLoading() | To hide the loading spinner
| attachTip() | To attach a tooltip to the component
| detachTip() | To detach the tooltip from the component
| setSize() | To set the size of the component
| setAnimation() | To set the animation of the component
| moveToViewport() | To move the component back into the viewport, in case it was outside
| deepDelete() | To remove the component from the DOM and clean all its references in memory

## Referencing components

Once they are rendered in the DOM, KissJS components can be referenced by their id:

    createPanel({
        id: "myPanel",
        title: "My panel",
        items: [
            ...
        ]
    }).render()

    let myPanel = document.getElementById("myPanel")
    
    // Or using an alias for document.getElementById:
    let myPanel = $("myPanel")

Note: if you don't define an id, KissJS will generate one automatically, but it will be difficult to track the component later.
`
kiss.doc.cheatsheetViews = /*html*/
`
## Building application views

KissJS provides a simple way to define views, to structure your application in a modular way.
Example using a panel:

    // Build the application view in cache
    kiss.app.defineView({
        id: "myView",
        renderer: function(id) {
            return createPanel({
                id, // Important: the returned element must have the id of the view
                title: "My panel",
                items: [
                    ...
                ]
            })
        }
    })

**Important**: The renderer of the view can be **any function** returning an HTMLElement with the view id.
This gives a lot of flexibility to build your application views, and you can use KissJS components or any other HTML elements.

## Displaying the views

Using kiss.views:

    kiss.views.show("myView1")
    kiss.views.replaceBy("myView2") // Replace the current view by another one

Using kiss.router:

    kiss.router.init() // Must be called once at the application startup
    kiss.router.navigateTo("myView1")
    kiss.router.navigateTo("myView2")

The main difference is that **kiss.views** is a simple way to manage views, while **kiss.router** provides a complete routing system with history management, and the "back" button of the browser will work as expected.

`

kiss.doc.cheatsheetData = /*html*/
`
KissJS provides an ORM to manipulate data:
- It is based on **Models** and **Collections** of **Records**
- Models define the structure of a Record, while Collections manage lists of Records
- Models can have relationships with other Models, like one-to-one, one-to-many, or many-to-many

## Models and Collections

Accessing the models and collections of your application:

    kiss.app.models // Hash of all models
    kiss.app.collections // Hash of all collections
    
    // Accessing a specific Model
    kiss.app.models.spy
    kiss.app.models.mission

    // Accessing a specific Collection
    kiss.app.collections.spy
    kiss.app.collections.mission

    // Accessing the Records of a Collection (only if they are already loaded)
    kiss.app.collections.spy.records
    kiss.app.collections.mission.records

## Defining a Model and its Fields

    let spyModel = kiss.app.defineModel({
        id: "spy",
        items: [
            {id: "codeName", type: "text"},
            {id: "numberOfMissions", type: "number"},
            {id: "birthDate", type: "date"},
            {id: "email", type: "text", validationType: "email"}
        ]
    })

## CRUD operations on a Record created from a Model

    const record = yourModel.create({name: "John"})
    await record.save()
    await record.update({name: "John Doe"})
    await record.delete()

## Using Collections of Records

    const collection = yourModel.collection
    
    // Insert
    await collection.insertOne({id: "abcdef", name: "Bob"})
    await collection.insertMany([{name: "Will"}, {name: "Sam"}])
    
    // Update
    await collection.updateOne("abcdef", {name: "Bobby"})
    await collection.updateMany({country: "USA"}, {country: "United States"})
    
    // Delete
    await collection.deleteOne("abcdef")
    await collection.deleteMany({country: "United States"})
        
    // Getting a single record
    const record = await collection.findOne("abcdef") // Asynchronous, fetches from server or cache if available
    const record = collection.getRecord("abcdef") // Synchronous, necessarily uses cache. No result if the collection is not loaded

    // Getting multiple records
    const records = await collection.find() // All records
    
    const records = await collection.find({
        $and: [
            {yearOfBirth: 1980},
            {country: "USA"}
        ]
    })

    const records = await collection.findById(["abcdef", "uvw", "xyz"])

## Filtering and sorting data

For these operations, we can use 2 distinct syntaxes:
- normalized: default, specific to KissJS
- mongo: respecting the MongoDB syntax
    
Here is a filtering example, using "mongo" syntax:

    collection.filterSyntax = "mongo"

    await collection.filterBy({yearOfBirth: 1980})
    
    await collection.filterBy({
        $and: [
            {yearOfBirth: 1980},
            {country: "USA"}
        ]
    })


Here is a sorting example, using "normalized" syntax:

    collection.sortSyntax = "normalized"

    await collection.sortBy([
        {firstName: "asc"},
        {birthDate: "desc"}
    ])
    
## Grouping

KissJS provides a method to group records by one or more fields:

    await collection.groupBy(["country", "city", "age"])

This is generally used in conjunction with components that support grouping, like datatable, kanban, and timeline.

## Prototyping

KissJS can generate fake records when prototyping applications.
This is specially useful when displaying data components like datatable, calendar, kanban, or timeline:

    await collection.insertFakeRecords(100)
    await collection.deleteFakeRecords()

## Relationships between Models

We can define relationships between models, thanks to specific field types:
- **link**: defines a relationship (one-to-one, one-to-many, many-to-many)
- **lookup**: get the value from a foreign record
- **summary**: summarize values of multiple foreign records (ex: SUM, AVG, COUNT)

For example, a spy can have missions:

    /**
    /* SPY MODEL
    */
    const spyModel = kiss.app.defineModel({
        id: "spy",
        items: [
            {id: "codeName", type: "text"},
            {id: "numberOfMissions", type: "number"},
            {id: "birthDate", type: "date"},
            {id: "email", type: "text", validationType: "email"},

            // Defines a link to the mission model
            {
                id: "linkToMissions",
                type: "link",
                multiple: true, // A Spy can have multiple missions
                link: {
                    modelId: "mission", // Foreign model id
                    fieldId: "linkToSpy" // Foreign link field id
                }
            },

            // A field can summarize multiple values from foreign records, using a "summary" field:
            // COUNT the number of missions
            {
                id: "totalMissions",
                type: "summary",
                summary: {
                    linkId: "linkToMissions", // Local link field id
                    operation: "COUNT"
                }
            },

            // AVERAGE the mission scores
            {
                id: "averageScore",
                type: "summary",
                summary: {
                    linkId: "linkToMissions", // Local link field id
                    fieldId: "missionScore", // Foreign field id to summarize
                    operation: "AVG" // Operation to perform
                }
            }
        ]
    })

    /**
    /* MISSION MODEL
    */
    const missionModel = kiss.app.defineModel({
        id: "mission",
        items: [
            {id: "missionName", type: "text"},
            {id: "location", type: "text"},
            {id: "startDate", type: "date"},
            {id: "missionScore", type: "number"},

            // Defines a link to the spy model
            {
                id: "linkToSpy",
                type: "link",
                multiple: false, // A mission belongs to a single spy
                link: {
                    modelId: "spy", // Foreign model id
                    fieldId: "linkToMissions" // Foreign link field id
                }
            },

            // A field can retrieve a value from a foreign record, using a "lookup" field:
            // Get the codeName of the spy linked to this mission
            {
                id: "spyCodeName",
                type: "lookup",
                lookup: {
                    linkId: "linkToSpy", // Local link field id
                    fieldId: "codeName" // Foreign field id to retrieve
                }
            }
        ]
    })

**REMEMBER**: the relationship must be defined in both models with a symmetrical link field:

    // SPY => MISSIONS                   // MISSION => SPY
    {                                   {
        id: "linkToMissions",               id: "linkToSpy",
        type: "link",                       type: "link",
        multiple: true,                     multiple: false,
        link: {                             link: {
            modelId: "mission",                 modelId: "spy",
            fieldId: "linkToSpy",               fieldId: "linkToMissions",
        }                                   }
    }                                   }

## Computed fields

Fields can compute their value from other fields of the same record, using a formula:

    // A user whose "fullname" is the concatenation of "firstName" and "lastName"
    const userModel = kiss.app.defineModel({
        id: "employee",
        items: [
            {id: "firstName", type: "text"},
            {id: "lastName", type: "text"},
            {
                id: "fullName",
                type: "text",
                computed: true,
                formula: "{{firstName}} + ' ' + {{lastName}}"
            }
        ]
    }

    // An invoice which "totalIncludingVAT" is computed from the VAT
    const invoiceModel = kiss.app.defineModel({
        id: "invoice",
        items: [
            {id: "totalExcludingVAT", type: "number"},
            {id: "VAT", type: "number"},
            {
                id: "totalIncludingVAT",
                type: "number",
                computed: true,
                formula: "{{totalExcludingVAT}} * (1 + {{VAT}} / 100)"
            }
        ]
    }

## Models can have custom methods, used by their instanciated Records

    const userModel = kiss.app.defineModel({
        id: "employee",
        items: [
            {id: "firstName", type: "text"},
            {id: "lastName", type: "text"}
        ],
        methods: {
            getFullName() {
                return this.firstName + " " + this.lastName
            },
            getInitials() {
                return this.firstName[0] + this.lastName[0]
            }
        }
    })

    const userBob = userModel.create({firstName: "Bob", lastName: "Wilson"})
    const userJohn = userModel.create({firstName: "John", lastName: "Doe"})
    
    console.log(userBob.getFullName()) // Bob Wilson
    console.log(userBob.getInitials()) // BW
    console.log(userJohn.getFullName()) // John Doe
`

kiss.doc.cheatsheetACL = /*html*/
`
KissJS provides a simple and **highly flexible** way to manage permissions and access control lists (ACL). For this, simply add an "acl" attribute to your models, composed of:
    - **permissions**
    - **validators**

    const userModel = kiss.app.defineModel({
        id: "employee",
        items: [
            {id: "firstName", type: "text"},
            {id: "lastName", type: "text"}
        ],
        acl: {
            permissions: {
                // CRUD operations
                create: [...],
                read: [...],
                update: [...],
                delete: [...],

                // Non-CRUD operations
                doThis: [...],
                doThat: [...],
                ...
            },
            validators: {
                async validatorFunction1() {},
                async validatorFunction2() {},
                async validatorFunction3() {},
                ...
            }
        }
    })

## Setting permissions

Permissions can be defined for one or more CRUD operation (create, read, update, delete) or **any other non-CRUD action**:

    permissions: {
        // CRUD operations
        create: [
            // Group 1 validators
            {
                isOwner: true,
                quotaNotExceeded: true
            },
            // Group 2 validators
            {
                isManager: true,
                quotaNotExceeded: true
            },
            // Group 3 validators
            {
                isWorkspaceDesigner: true,
                quotaNotExceeded: true
            }
        ],
        read: [{
            isManager: true
        }],
        update: [{
            validatorFunction2: false,
            validatorFunction3: 123
        }],
        delete: [{
            validatorFunction3: 456
        }],

        // Non-CRUD operations
        doThis: [{
            validatorFunction3: "hello",
            validatorFunction4: "world"
        }],
        doThat: [{
            validatorFunction5: true
        }]
    }

The permission to perform the action is granted if **all the validator functions of a group return their expected value**.
If one group of validators fails, the ACL system tries the next group, until a group succeeds.
If no group pass the tests, the permission is denied.

**IMPORTANT**: it's not necessary to define all the CRUD operations. If a permission is not defined, it is considered as granted by default.

## Defining validator functions

ACL system is isomorphic and works on both the KissJS server and the KissJS client.

Validator functions used for creation and mutations (create, patch, delete) receive an object with 4 properties:
    - **req**: the server request object (in the NodeJS/Express context)
    - **userACL**: an array of string containing all the names that identify a user, including groups.
    - **record**: the record we're trying to access
    - **model**: the record's model

A validator function used for the "read" action receives an object with 3 properties:
    - **req**: the server request object
    - **userACL**
    - **record**: the record to evaluate.

The validator returns true if the record matches the requirements.

For the "read" operation, the validators are evaluated against **each** record to filter data according to the user's permissions.

When executed on the CLIENT, the **req** property is not sent (the srever request doesn't exist here).
Validators must be **asynchronous** because they sometimes need to retrieve database objects.

Example of a validator functions:

    // Only the creator of the record can update it
    async isAuthor({req, userACL, record, model}) {
        const userId = kiss.session.getUserId()
        if (userId == record.createdBy) return true
        return false
    }

## Checking the permission to perform an action on a record

Once the ACL are defined, you can check if a user can perform an **action** on a **record**:

    const record = collection.getRecord("123456")
    
    const canUpdate = await kiss.acl.check({
        action: "update",
        record
    })
    console.log(canUpdate) // true or false

    const canDoThat = await kiss.acl.check({
        action: "doThat",
        record
    })
    console.log(canDoThat) // true or false    

`

kiss.doc.cheatsheetLocalization = /*html*/
`
Applications generally needs to be localized in different languages.
KissJS provides a simple way to manage translations, using kiss.app.defineTexts():

    kiss.app.defineTexts({
        "general": {
            "fr": "général",
            "es": "general"
        },
        "#loading": {
            "en": "loading data... Please wait",
            "fr": "chargement des données... Merci de patienter",
            "es": "cargando datos... Por favor espera"
        },
        "top": {
            "fr": "haut",
            "es": "alto"
        },
        ...
    })

The English is the pivot language:
- if an English translation (en) is defined in the object, the value is taken from there (example with "#loading")
- otherwise, the English value is the object key itself (example with "top")

Once your texts are defined, you can use them in your UI using the kiss.language.txt() functions:

    kiss.language.txt("top") // "top", or "haut" in French, or "alto" in Spanish
    kiss.language.txtTitleCase("top") // "Top", or "Haut", or "Alto"
    kiss.language.txtUpperCase("top") // "TOP", or "HAUT", or "ALTO"

    // You can also use shorter aliases:
    txt("top")
    txtTitleCase("top")
    txtUpperCase("top")

To define the available languages of your application, use kiss.language.setAvailable():

    kiss.language.setAvailable([
        {
            code: "en",
            name: "English"
        },
        {
            code: "fr",
            name: "Français"
        },
        {
            code: "es",
            name: "Español"
        }
    ])

To set the current language of your application, use kiss.language.set():

    kiss.language.set("fr")

`

kiss.doc.cheatsheetMiscTools = /*html*/
`
| Method or property | Description
| --- | ---
| <hr> **ID generators** <hr>
| kiss.tools.uid() | Generates a unique identifier, like "5f4d3e2c-1b2a-4c3d-8e7f-6a5b4c3d2e1f"
| kiss.tools.nanoId() | Generates a nano identifier, like "5f4d3e2c1b2a4c3d8e7f6"
| kiss.tools.shortUid() | Generates a short unique identifier like "5GN0XBF6"
| <hr> **Testing** <hr>
| kiss.tools.isMobile() | Checks if the user agent is a mobile device
| kiss.tools.isUid() | Checks if a string is a valid unique identifier
| kiss.tools.isNumber() | Checks if a value is a number
| kiss.tools.isISODate() | Checks if a value is an ISO date (YYYY-MM-DD)
| kiss.tools.intersects() | Checks if two arrays intersect
| kiss.tools.isEventInElement() | Check if an event occurred inside an element
| <hr> **Geolocation** <hr>
| kiss.tools.getGeolocation() | Gets the current geolocation
| kiss.tools.distanceInKm() | Calculates the distance between two geolocations
| kiss.tools.isInRange() | Check if 2 geolocation points are in a given range of kilometers
| <hr> **Colors** <hr>
| kiss.tools.getRandomColor() | Generates a random color
| kiss.tools.adjustColor() | Adjusts the brightness of a color
| kiss.tools.CSSGradient() | Generates a CSS gradient
| <hr> **DOM and animations** <hr>
| kiss.tools.highlight() | Highlight an element buy building an overlay around it and a legend under it
| kiss.tools.highlightElements() | Highlight a sequence of elements. Useful to create a quick tutorial.
| kiss.tools.moveToViewport() | Move an element inside the viewport
| kiss.tools.outlineDOM() | Outline all DOM elements in the page, mainly to debug the layout
| kiss.tools.animateElement() | Animate an element with a sequence of animations
| kiss.tools.waitForElement() | (async) Waits for an element to appear in the DOM

`

kiss.doc.cheatsheetPrototypes = /*html*/
`
KissJS adds some methods to Javascript prototypes:

| String.prototype | Description
| --- | ---
| <hr>
| leftString | Return the left part of a string
| rightString | Return the right part of a string
| toTitleCase | Capitalize the first letter of each word
| removeExtraSpaces | Reduce every extra spaces to a single space character
| isNumeric | Check if the string can be converted to a number
| hashCode | Return a hash code of the string

Examples:

    let str = "Hello, World!"
    str.leftString(",") // "Hello"
    str.rightString(",") // " World!"

| Number.prototype | Description
| --- | ---
| <hr>
| round | Round a number to a given number of decimals
| toFileSize | Convert a number of bytes to a human-readable file size
| format | Formats a number as a string with a fixed number of digits
| pad | Formats a number as a string with a fixed number of characters, leading zeros

Examples:

    let num = 1234
    num.toFileSize() // "1.21 KB"
    num.format(2) // "123.00"
    num.pad(6) // "001234"

| Date.prototype | Description
| --- | ---
| <hr>
| toISO | Convert a date to an ISO string like "2020-12-31"
| toISODateTime | Convert a date to an ISO string like "2020-12-31 23:59:59"
| addDays | Add days to a date
| toTime | Get the time part of a date, like hh:mm

Examples:

    let date = new Date()
    date.toISO() // "2020-12-31"
    date.toISODateTime() // "2020-12-31 23:59:59"
    date.toTime() // "23:59"

| Array.prototype | Description
| --- | ---
| <hr>
| swap | Swap two elements in an array
| unique | Remove all duplicates from an array
| remove | Remove the first given element
| intersect | Returns the intersection of two arrays
| sortAlpha | Return the array sorted alphabetically

Examples:

    let arr = ["a", "b", "c", "c", "c", "d"]
    arr.swap(0, 3) // ["c", "b", "c", "a", "c", "d"]
    arr.unique() // ["a", "b", "c", "d"]
    arr.remove("b") // ["a", "c", "c", "c", "d"]
    arr.intersect(["a", "c", "e"]) // ["a", "c"]

| Array.prototype | Description
| --- | ---
| <hr>
| uniqueObjectId | Remove all the objects with a duplicate id
| uniqueObject | Remove all the objects with a duplicate property
| get | Return the object with the resquested id
| removeById | Remove the object with the requested id
| sortBy | Return the array sorted by property name
| includesObject | Check if an array of objects contains a specific object

Examples:

    let arr = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}, {id: 1, name: "Bob"}]
    arr.uniqueObjectId() // [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]
    arr.uniqueObject("name") // [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}]
    arr.get(2) // {id: 2, name: "Bob"}
    arr.removeById(2) // [{id: 1, name: "Alice"}, {id: 1, name: "Bob"}]

`
;kiss.app.defineView({
    id: "cheatsheet-menu",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            defaultConfig: {
                height: 30,
                textAlign: "left",
                fontSize: "1.3rem",
                iconSize: "1.3rem",
                iconColor: "#8aa2c8",
                borderColor: "#e3e5ec",
                borderWidth: "1px 0px 0px 0px",
                borderRadius: "0px",
                backgroundColor: "#f3f5f7",
                colorHover: "#00aaee",
                iconColorHover: "#00aaee",
                backgroundColorHover: "#e5e9ec"
            },

            layout: "vertical",
            items: [{
                    type: "html",
                    html: "Cheat sheet",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: "General",
                    icon: "fas fa-info",
                    action: () => kiss.router.navigateTo({
                        anchor: "General"
                    })
                },
                {
                    type: "button",
                    text: "Building UI",
                    icon: "far fa-object-group",
                    action: () => kiss.router.navigateTo({
                        anchor: "Building UI"
                    })
                },
                {
                    type: "button",
                    text: "Building application views",
                    icon: "far fa-window-restore",
                    action: () => kiss.router.navigateTo({
                        anchor: "Building application views"
                    })
                },
                {
                    type: "button",
                    text: "Data & ORM",
                    icon: "fas fa-database",
                    action: () => kiss.router.navigateTo({
                        anchor: "Manipulating data"
                    })
                },
                {
                    type: "button",
                    text: "ACL & Permissions",
                    icon: "fas fa-key",
                    action: () => kiss.router.navigateTo({
                        anchor: "ACL and Permissions"
                    })
                },
                {
                    type: "button",
                    text: "Localization",
                    icon: "fas fa-globe",
                    action: () => kiss.router.navigateTo({
                        anchor: "Localization"
                    })
                },
                {
                    type: "button",
                    text: "Tools",
                    icon: "fas fa-wrench",
                    action: () => kiss.router.navigateTo({
                        anchor: "Miscellaneous tools"
                    })
                },
                {
                    type: "button",
                    text: "Prototypes",
                    icon: "fab fa-js-square",
                    action: () => kiss.router.navigateTo({
                        anchor: "Javascript prototypes"
                    })
                },                
                {
                    type: "button",
                    text: "Back to Home",
                    icon: "fas fa-arrow-left",
                    fontWeight: "bold",
                    action: () => kiss.router.navigateTo({
                        section: "home",
                        anchor: "What is KissJS?"
                    })
                }
            ]
        })
    }
})

;kiss.app.defineView({
    id: "buy",
    renderer: function (id, target) {
        return createPanel({
            id: id,
            target,

            modal: true,
            closable: true,
            draggable: true,
            align: "center",
            top: 200,
            width: "50%",
            height: () => kiss.screen.getHeightMinus(400),
            title: "Why should you buy this?",
            animation: "zoomIn",

            items: [{
                    type: "html",
                    html: `<pre class="showcase-description">Seriously.

Why should you buy a javascript library when you can find *tons* of free libraries like React, Vue, or Angular. Why should you buy something that has *no* community at all?
Well, there are few reasons for that.

Mainstream frameworks are simple to do simple stuff, but get highly complicated when you want to build bigger stuff. In short, you'll probably do your first app in minutes, but then you'll need 2-3 months to really master the framework.
That's also why a lot of people mastering a framework can't afford to invest time in mastering another one: it's just too long, with too many concepts to grab.

KissJS is the simplest library you'll find to build fast and complex UI. It has no dependencies at all, not event JQuery. It's very easy to customize your components, or to build new ones. It also has a great datatable, which works perfectly smoothly with tens of thousands of records loaded.

I've spent a year fulltime to build this library so that people can save a *lot* of time to build web applications without (too much) headakes.
If you decide to buy KissJS for you or your company, you also help the library to get better and better.

Click on the Paypal button and I'll send you a zip.
Contact me if you have questions: david@pickaform.com
</pre>
`
                },
                {
                    type: "html",
                    html: `
                <center><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_s-xclick">
                    <input type="hidden" name="hosted_button_id" value="W3JTUL4QAJ2T6">
                    <table>
                    <tr><td><input type="hidden" name="on0" value="KissJS bundles"></td></tr>
                    <tr><td><select class="buy-options" name="os0">
                        <option value="KissJS - 1 seat">KissJS - 1 seat $59,00 USD</option>
                        <option value="KissJS - 2 seats">KissJS - 2 seats $99,00 USD</option>
                        <option value="KissJS - 3 seats">KissJS - 3 seats $149,00 USD</option>
                        <option value="KissJS - 5 seats">KissJS - 5 seats $249,00 USD</option>
                        <option value="KissJS - 10 seats">KissJS - 10 seats $499,00 USD</option>
                        <option value="KissJS - 20 seats">KissJS - 20 seats $999,00 USD</option>
                    </select></td></tr>
                    </table>
                    <input type="hidden" name="currency_code" value="USD">
                    <input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal, le réflexe sécurité pour payer en ligne">
                    <img alt="" border="0" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" width="1" height="1">
                </form></center>
            `
                }
            ]
        })
    }
})

;kiss.app.defineView({
    id: "logo",
    renderer: function (id, target) {
        return createHtml({
            id: id,
            target,
            height: 120,
            html: `<img src="./resources/img/KissJS logo.png" alt="KissJS logo" width=300 height=120>`,

            style: "cursor: pointer",

            events: {
                click: () => {
                    kiss.router.navigateTo({
                        ui: "landing-page"
                    })
                },

                mouseenter: function () {
                    this.setAnimation("pulse")
                }
            }
        })
    }
})

;function createFakeModel(component) {

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

;/**
 * Build a standard "showCase" widget, which contains:
 * - colored margin
 * - title
 * - description
 * - optional sample code
 * 
 * @param {string} title 
 * @param {string} description 
 * @param  {...any} config
 * @returns {HTMLElement} A kissJS Block element
 */
function showCase(title, description, ...examples) {
    let exampleBlock = examples.map(itemConfig => showCaseExample(itemConfig))

    return createBlock({
        layout: "horizontal",
        padding: "16px 0px 16px 0px",
        items: [
            // Margin
            {
                type: "html",
                html: "",
                class: "showcase-margin"
            },
            // Show case block
            {
                width: "100%",
                items: [
                    // Title
                    {
                        id: title,
                        type: "html",
                        html: `<div class="showcase-title">${title}</div>`
                    },
                    // Description
                    {
                        type: "html",
                        html: `<div class="showcase-description"><pre>${marked(description)}</pre></div>`
                    },
                    // Example and code
                    ...exampleBlock
                ]
            }
        ]
    })
}

/**
 * Show an example and its corresponding JSON config, or a demo
 * 
 * @param {object} itemConfig 
 * @returns {HTMLElement} A KissJS Block element
 */
function showCaseExample(itemConfig) {

    // Include a demo within an iframe
    if (itemConfig.demo == true) {
        return createBlock({
            id: "showcase-" + kiss.tools.shortUid(),
            items: [{
                type: "html",
                class: "showcase-description",
                html: `<iframe style="border: none" width=100% height=${itemConfig.height || 500} src="${itemConfig.url}">`
            }]
        })
    }

    // Include a code example
    const isMobile = kiss.tools.isMobile()

    return createBlock({
        id: "showcase-" + itemConfig.id,
        layout: (isMobile) ? "vertical" : "horizontal",
        flexWrap: "wrap",

        items: [
            // Example
            {
                flex: 1,
                class: "showcase-example",
                items: [itemConfig]
            },
            // Code
            {
                type: "html",
                flex: 1,
                class: "code-sample",
                html: toHTML(itemConfig)
            }
        ]
    })
}

/**
 * Transform a JSON object configuration into a clean HTML string, for code examples
 * 
 * @param {object} config
 * @returns {string}
 */
function toHTML(config) {
    let jsonConfig = kiss.tools.snapshot(config)
    for (prop of ["id", "target", "events"]) delete jsonConfig[prop]
    let objectAsHtml = JSON.stringify(jsonConfig, undefined, 4).replace(/"(\w+)"\s*:/g, '$1:')
    return "<pre>" + hljs.highlight("javascript", objectAsHtml).value + "</pre>"
}

;kiss.app.defineView({
    id: "topbar",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            layout: "horizontal",
            height: 50,

            items: [{
                    id: "side-menu",
                    hidden: true,

                    type: "button",
                    icon: "fas fa-bars",
                    iconColor: "#7799bb",
                    iconColorHover: "#00aaee",
                    iconSize: "24px",
                    backgroundColor: "transparent",
                    borderWidth: "0px",
                    margin: "6px",
                    action: () => $("site-west").setAnimation("slideInLeft").toggle()
                },
                {
                    type: "spacer",
                    flex: 1
                },
                {
                    type: "html",
                    html: `<a href="https://pickaform.fr/en"><img src="./resources/img/pickaform.png"</a>`
                },
                {
                    hidden: true,
                    type: "button",
                    text: "Download",
                    borderRadius: "32px",
                    icon: "fas fa-coffee",
                    iconSize: "18px",
                    margin: "10px",
                    padding: "10px",
                    action: () => kiss.views.show("buy")
                }
            ]
        })
    }
})

;kiss.app.defineView({
    id: "components-content",
    renderer: function (id, target) {
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
                                change: function () {
                                    createNotification({
                                        message: this.getValue()
                                    })
                                }
                            }
                        }, {
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
                                change: function () {
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
                        }, {
                            borderStyle: "dashed",
                            borderColor: "#dfdfdf",
                            borderRadius: "10px",
                            padding: "20px",

                            items: [{
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

                    // SLIDER FIELD
                    showCase(
                        "Slider field", kiss.doc.sliderField, {
                            id: "field-slider",
                            type: "slider",
                            label: "Slide me!",
                            value: 50,
                            events: {
                                change: function () {
                                    createNotification({
                                        message: "The new value is " + this.getValue()
                                    })
                                }
                            }
                        }
                    ),

                    // RATING FIELD
                    showCase(
                        "Rating field", kiss.doc.ratingField, {
                            id: "field-rating-1",
                            type: "rating",
                            label: "Rate me!",
                            value: 3,
                            events: {
                                change: function () {
                                    createNotification({
                                        message: "The new rate is " + this.getValue()
                                    })
                                }
                            }
                        }, {
                            id: "field-rating-2",
                            type: "rating",
                            label: "Rate me!",
                            value: 3,
                            max: 10,
                            shape: "heart",
                            iconColorOn: "#ff0000",
                            events: {
                                change: function () {
                                    createNotification({
                                        message: "The new rate is " + this.getValue()
                                    })
                                }
                            }
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
                    }, {
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
    }
})

;/**
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
WizardPanel | createWizardPanel | kiss.ui.WizardPanel | [(link)](./doc/out/kiss.ui.WizardPanel.html)
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
Gallery | createGallery | kiss.ui.Gallery | [(link)](./doc/out/kiss.ui.Gallery.html)
ChartView | createChartView | kiss.ui.ChartView | [(link)](./doc/out/kiss.ui.ChartView.html)
Dashboard | createDashboard | kiss.ui.Dashboard | [(link)](./doc/out/kiss.ui.Dashboard.html)
**EXTENSIONS**|
richTextField | createRichTextField | kiss.ux.RichTextField | [(link)](./doc/out/kiss.ux.RichTextField.html)
aiTextarea | createAiTextareaField | kiss.ux.AiTextarea | [(link)](./doc/out/kiss.ux.AiTextarea.html)
aiImage | createAiImageField | kiss.ux.AiImage | [(link)](./doc/out/kiss.ux.AiImage.html)
codeEditor | createCodeEditor | kiss.ux.CodeEditor | [(link)](./doc/out/kiss.ux.CodeEditor.html)
qrCode | createQRCode | kiss.ux.QrCode | [(link)](./doc/out/kiss.ux.QrCode.html)
map | createMap | kiss.ux.Map | [(link)](./doc/out/kiss.ux.Map.html)
map field | createMapField | kiss.ux.MapField | [(link)](./doc/out/kiss.ux.MapField.html)
chart | createChart | kiss.ux.Chart | [(link)](./doc/out/kiss.ux.Chart.html)


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
        width: () => (kiss.screen.current.width - 200) / 2,
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

;kiss.app.defineView({
    id: "components-menu",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            defaultConfig: {
                height: 30,
                textAlign: "left",
                fontSize: "1.3rem",
                iconSize: "1.3rem",
                iconColor: "#8aa2c8",
                borderColor: "#e3e5ec",
                borderWidth: "1px 0px 0px 0px",
                borderRadius: "0px",
                backgroundColor: "#f3f5f7",
                colorHover: "#00aaee",
                iconColorHover: "#00aaee",
                backgroundColorHover: "#e5e9ec"
            },

            layout: "vertical",
            items: [{
                    type: "view",
                    id: "logo"
                },
                {
                    type: "html",
                    html: "Components",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: "Introduction",
                    icon: "fas fa-star",
                    action: () => kiss.router.navigateTo({
                        anchor: "Introduction about KissJS components"
                    })
                },
                {
                    type: "button",
                    text: "Text field",
                    icon: "fas fa-font",
                    action: () => kiss.router.navigateTo({
                        anchor: "Text field"
                    })
                },
                {
                    type: "button",
                    text: "Textarea field",
                    icon: "fas fa-paragraph",
                    action: () => kiss.router.navigateTo({
                        anchor: "Textarea field"
                    })
                },
                {
                    type: "button",
                    text: "Number field",
                    icon: "fas fa-list-ol",
                    action: () => kiss.router.navigateTo({
                        anchor: "Number field"
                    })
                },
                {
                    type: "button",
                    text: "Date field",
                    icon: "fas fa-calendar",
                    action: () => kiss.router.navigateTo({
                        anchor: "Date field"
                    })
                },
                {
                    type: "button",
                    text: "Checkbox field",
                    icon: "fas fa-check-square",
                    action: () => kiss.router.navigateTo({
                        anchor: "Checkbox field"
                    })
                },
                {
                    type: "button",
                    text: "Select field",
                    icon: "fas fa-caret-square-down",
                    action: () => kiss.router.navigateTo({
                        anchor: "Select field"
                    })
                },
                {
                    type: "button",
                    text: "Slider field",
                    icon: "fas fa-sliders-h",
                    action: () => kiss.router.navigateTo({
                        anchor: "Slider field"
                    })
                },
                {
                    type: "button",
                    text: "Rating field",
                    icon: "fas fa-star",
                    action: () => kiss.router.navigateTo({
                        anchor: "Rating field"
                    })
                },
                {
                    type: "button",
                    text: "Color picker",
                    icon: "fas fa-paint-brush",
                    action: () => kiss.router.navigateTo({
                        anchor: "Color picker"
                    })
                },
                {
                    type: "button",
                    text: "Icon picker",
                    icon: "fas fa-rocket",
                    action: () => kiss.router.navigateTo({
                        anchor: "Icon picker"
                    })
                },
                {
                    type: "button",
                    text: "Buttons",
                    icon: "fas fa-square",
                    action: () => kiss.router.navigateTo({
                        anchor: "Buttons"
                    })
                },
                {
                    type: "button",
                    text: "Html",
                    icon: "fas fa-code",
                    action: () => kiss.router.navigateTo({
                        anchor: "Html"
                    })
                },
                {
                    type: "button",
                    text: "Back to Home",
                    icon: "fas fa-arrow-left",
                    fontWeight: "bold",
                    action: () => kiss.router.navigateTo({
                        section: "home",
                        anchor: "What is KissJS?"
                    })
                }
            ]
        })
    }
})

;kiss.app.defineView({
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
                    
                    defaultConfig: {
                        labelPosition: "top",
                        width: "50%",
                        fieldWidth: "100%",
                        flex: 1
                    },

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
                    width: 400,
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

;kiss.doc.containers = /*html*/
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

;kiss.app.defineView({
    id: "containers-menu",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            defaultConfig: {
                height: 30,
                textAlign: "left",
                fontSize: "1.3rem",
                iconSize: "1.3rem",
                iconColor: "#8aa2c8",
                borderColor: "#e3e5ec",
                borderWidth: "1px 0px 0px 0px",
                borderRadius: "0px",
                backgroundColor: "#f3f5f7",
                colorHover: "#00aaee",
                iconColorHover: "#00aaee",
                backgroundColorHover: "#e5e9ec"
            },

            layout: "vertical",
            items: [{
                    type: "html",
                    html: "Containers",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: "Introduction",
                    icon: "fas fa-info",
                    action: () => kiss.router.navigateTo({
                        anchor: "Introduction about containers"
                    })
                },
                {
                    type: "button",
                    text: "Block",
                    icon: "fas fa-code",
                    action: () => kiss.router.navigateTo({
                        anchor: "Block"
                    })
                },
                {
                    type: "button",
                    text: "Panel",
                    icon: "fas fa-window-maximize",
                    action: () => kiss.router.navigateTo({
                        anchor: "Panel"
                    })
                },
                {
                    type: "button",
                    text: "Form",
                    icon: "far fa-file-alt",
                    action: () => kiss.router.navigateTo({
                        anchor: "Form"
                    })
                },
                {
                    type: "button",
                    text: "Back to Home",
                    icon: "fas fa-arrow-left",
                    fontWeight: "bold",
                    action: () => kiss.router.navigateTo({
                        section: "home",
                        anchor: "What is KissJS?"
                    })
                }
            ]
        })
    }
})

;kiss.app.defineView({
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
                        setTimeout(() => {
                            $("myDatatable").collapseAll()
                            createNotification("Records grouped by Category and Platform")
                        }, 2000)
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

;kiss.doc.datatables = /*html*/
`
KissJS datatables are really powerful and fast components to display your data.
`

;kiss.app.defineView({
    id: "datatable-menu",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            defaultConfig: {
                height: 40,
                textAlign: "left",
                iconSize: "18px",
                iconColor: "#8aa2c8",
                borderColor: "#e3e5ec",
                borderWidth: "1px 0px 0px 0px",
                borderRadius: "0px",
                backgroundColor: "#f3f5f7",
                colorHover: "#00aaee",
                iconColorHover: "#00aaee",
                backgroundColorHover: "#e5e9ec"
            },

            layout: "vertical",
            items: [{
                    type: "html",
                    html: "Datatable",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: "Example with 5000 records",
                    icon: "fas fa-info",
                    action: () => kiss.router.navigateTo({
                        anchor: "Introduction about KissJS datatable"
                    })
                },
                {
                    type: "button",
                    text: "Back to Home",
                    icon: "fas fa-arrow-left",
                    fontWeight: "bold",
                    action: () => kiss.router.navigateTo({
                        ui: "start",
                        section: "home"
                    })
                }
            ]
        })
    }
})

;kiss.app.defineView({
    id: "gallery-content",
    renderer: function (id, target) {
        // Build a fake collection
        let fakeModelTemplate = createFakeModel()
        fakeModelTemplate.id = "fakeGallery"
        let fakeModel = new kiss.data.Model(fakeModelTemplate)
        let fakeCollection = fakeModel.collection

        let fakeAttachmentField = '[{"id":"01887414-3775-7443-81bc-260a9539d7e4","filename":"cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.png","size":1279664,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.64x64.png","size":6106},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.256x256.png","size":87845},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.512x512.png","size":332583}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-379e-701e-b4dc-15301d8b4560","filename":"cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.png","size":1360256,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.64x64.png","size":6080},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.256x256.png","size":89129},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.512x512.png","size":337313}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-378a-759d-b17d-762b4dd33b72","filename":"cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.png","size":1301698,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.64x64.png","size":6193},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.256x256.png","size":89664},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.512x512.png","size":331588}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-506f-7707-a529-20a36858b1a8","filename":"cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.png","size":1357025,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.64x64.png","size":6136},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.256x256.png","size":89761},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.512x512.png","size":339784}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"}]';
        fakeAttachmentField = JSON.parse(fakeAttachmentField)

        // A kanban needs columns definition.
        // Here, we use a special method of the model to use the field definitions as columns
        let columns = fakeModel.getFieldsAsColumns()
        columns.forEach(column => {
            column.hidden = !(["category", "description"].includes(column.id))
        })

        //
        // Create the gallery
        //
        let gallery = createGallery({
            id: "myGallery",
            color: "#00aaee",
            collection: fakeCollection,
            columns,

            // Options
            canCreateRecord: true,
            showImage: true,
            imageFieldId: "attachment",
            height: () => kiss.screen.current.height - 50,

            // Define the menu of actions
            actions: [
                "-",
                {
                    text: "Sort by Category (asc) and Platform (desc)",
                    icon: "fas fa-sort",
                    action: () => {
                        $("myGallery").sortBy([{
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
                        $("myGallery").groupBy(["category", "platform"])
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
            id,
            target,

            style: "user-select: none; background: #ffffff;",
            height: "100%",

            items: [
                gallery
            ],

            methods: {
                load: () => {
                    if (fakeCollection.records.length > 0) return
                    fakeCollection.insertFakeRecords(1000).then(() => {
                        setTimeout(() => {
                            fakeCollection.records.forEach(record => record.attachment = fakeAttachmentField)
                            $("myGallery")._renderDetailsOfVisibleCards()
                            $("myGallery")._renderGalleryBody()
                        }, 2000)
                    })
                }
            }
        })
    }
})

;kiss.doc.galleries = /*html*/
`
    KissJS galleries are great and simple components to manage your images.
`

;kiss.app.defineView({
    id: "gallery-menu",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            defaultConfig: {
                height: 40,
                textAlign: "left",
                iconSize: "18px",
                iconColor: "#8aa2c8",
                borderColor: "#e3e5ec",
                borderWidth: "1px 0px 0px 0px",
                borderRadius: "0px",
                backgroundColor: "#f3f5f7",
                colorHover: "#00aaee",
                iconColorHover: "#00aaee",
                backgroundColorHover: "#e5e9ec"
            },

            layout: "vertical",
            items: [{
                    type: "html",
                    html: "Gallery",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: "Example with 1000 records",
                    icon: "fas fa-info",
                    action: () => kiss.router.navigateTo({
                        anchor: "Introduction about KissJS gallery"
                    })
                },
                {
                    type: "button",
                    text: "Back to Home",
                    icon: "fas fa-arrow-left",
                    fontWeight: "bold",
                    action: () => kiss.router.navigateTo({
                        ui: "start",
                        section: "home"
                    })
                }
            ]
        })
    }
})

;kiss.app.defineView({
    id: "home-content",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            styles: {
                "this": "background: #ffffff"
            },

            items: [
                // CONCEPTS
                showCase("What is KissJS?", kiss.doc.concepts),

                // PHILOSOPHY
                showCase("Philosophy", kiss.doc.philosophy),

                // EFFICIENCY
                showCase("Efficiency", kiss.doc.efficiency),

                // DUMB CODE
                showCase("Dumb code", kiss.doc.dumbCode),

                // FEATURES
                showCase("Features", kiss.doc.features),

                // TECHNICALLY
                showCase("Technically", kiss.doc.technically),

                // QUICKSTART
                showCase("Quickstart", kiss.doc.quickstart),

                // LIBRARY RESOURCES
                showCase("Library resources", kiss.doc.libraryResources),

                // QUICKSTART
                showCase("Coding style", kiss.doc.codingStyle),

                // BELIEFS
                showCase("About the author's beliefs", kiss.doc.beliefs)
            ]
        })
    }
})

;/**
 * INTRODUCTION
 */
kiss.doc.concepts = /*html*/
`
KissJS is a simple javascript library to build web applications.
It stands for **Keep It Simple Stupid Javascript**, because it was built following the KISS principles.

KissJS was born from the frustration that all mainstream libraries (or frameworks) like Angular, React, Vue, ExtJS, Webix, ... are easy to learn, but very difficult to master.
We deeply believe that web development should be user friendly, and should not require mastering **anything beyond Javascript, HTML and CSS**.

KissJS was developed with the central idea that you should focus on **coding** your project rather than spending time reading tons of documentations and forums.
Javascript **fatigue** is a well-known phenomenon that has made good fellows feel depressed and exhausted because there is **so much** to learn and **so many new libraries every day** that you never know what to choose before writing your first line of code!

Oh, sure, a new library like KissJS also contributes to the Javascript fatigue...
But the library has been built to introduce as few concepts as possible, and anyone who knows Javascript, HTML and CSS can really **master** the library very quickly.
Then, you'll never have to go back to this **boring** documentation again.
`

kiss.doc.philosophy = /*html*/
`
- build your UI programmatically using only javascript
- no dependencies
- follow W3C standards as often as possible: pure HTML, CSS, and Javascript
- keep the library's "jargon" to the bare minimum
- explicit is better than implicit: hiding logic into a black box makes things harder to understand and to maintain
- don't add **super-proprietary-markup** into the HTML: it's ugly and requires ultra-specific framework knowledge
- data binding is like **implicit hidden stuff doing magic in your back**. Instead, KissJS uses an **explicit** PubSub mechanism
- works offline: **no web server needed** to start coding and testing your project. Launch any code editor and you're good to start immediately
- no magic tricks, no ninja concept where you need 2 months fulltime before mastering the library
- massively commented code so that beginners don't feel shy about reading the source code
- dumb code, for dummies
`

kiss.doc.efficiency = /*html*/
`
OK. Another JS library... Now what?
Can you really build something out of it?

Actually, yes: <a href="https://pickaform.fr/en" target="_new">pickaform</a>.

Pickaform is now used by several large companies - mostly with private on-premise installations or private cloud, as large company don't like the public cloud.
It delivers just what it says: it's a no-code platform for creating real-world workflows for people who need to collaborate with better processes.
Thanks to the simplicity of KissJS, we were able to build this complete no-code platform similar to AirTable and Infinity, but with features that are more focused on bigger companies.

For example:
- better form layout capabilities when there are many fields in a record (by many, we mean +200 fields in a single form. We have customers in Insurance and Banking business who do that)
- a real workflow engine, worklow in the sense of "business process", and not "workflow automation"
- ability to generate PDF documents by filling Microsoft Word templates with form data
- a good security layer which enables the users to fine tune the access for workspaces, apps, models, and views
- a more flexible architecture where models and views can be shared among multiple applications
- a speed that would require a lot of optimization efforts with React, Angular or Vue: those frameworks are fantastic to build web products and mobile apps, but not very well suited to build very fast business apps
- don't believe me about the speed? Load 100 000 records into Infinity (a Vue application), then compare their datatable performance with KissJS datatable, and don't forget to open the dev panel to check memory leaks...

This performance of KissJS is native: you don't have anything to optimize. It's just fast out-of-the-box.

As far as "business apps" are concerned, ExtJS was very good at building this, but then became this huge monster with so many tentacles (not to mention the price).
Webix is still probably one of the best out there, but a bit expensive compared to its non-existent community, and unfortunately we've sometimes been stuck with bugs that took months to be fixed.
In the end, we needed something "between" these worlds, able to build UIs quickly and mainly with JS, but requiring no complexity, no building process, no imposed and sometimes cumbersome architecture.
And on top of it, **something as standard as possible**: why should a field property be called "mandatory" (I'm looking at you, ExtJS) when the W3C has already defined a field property called "required"?

Well, in a nutshell: **something simple**.
`

kiss.doc.dumbCode = /*html*/
`KissJS is written in **Dumb Code**.

What does it mean?
Instead of writing this kind of ninja code:

    const mdls = ctx.apps[rt.get().appId].getMdls()

Dumb code achieves the same result like this:

    // Get the application id from the current route
    const route = router.getRoute()
    const applicationId = route.applicationId

    // Retrieve the current application and get its models
    const application = kiss.context.applications[applicationId]
    const models = application.getModels()

Sure, it's a bit longer to write!
As a result, the code is much easier to read and understand for humans.
And we **prefer (dumb) humans** to machines.

Dumb code is used everywhere in KissJS, except when it can impact rendering performances or user experience, because performance is a high priority of the framework.
`

kiss.doc.beliefs = /*html*/
`
As the founder and CEO of pickaform, I have a pretty good background in computer games - I started at 8 years old with [Donkey Kong Junior on an LCD screen](https://www.youtube.com/watch?v=qpf5gpQ0i28) - and since then, I've been amazed at the evolution in the video games industry.
I have probably seen, played, and enjoyed all the evolutions and revolutions in video games.
Video games led me to become a computer engineer at the end of the last millennium (yeah, I know...)

Although I spent 6 years in the video games industry as a project manager, my main activity was to create custom applications for all types of business, large and small, regardless of the technology available, but mainly using IBM software.
I have developed and delivered over 100 applications for my clients and eventually became an IBM Champion in 2019 for my collaboration platform called Pickaform, a no-code platform based on IBM technology, targeting non-technical people to create their own business applications.

I got this title not because of the technical side, but because of the product itself and the main philosophy behind it: building business applications using only very simple components.
With Pickaform, you can really build useful applications for your business using just a few forms and built-in features like "workflows", "Form to PDF", "file attachments", "comments", "tagging"...
Pickaform concepts were born before Podio, before Quickbase, before AirTable, before FormStack, before the so-called "no-code" era.

My ambition is the same for KissJS: providing a very simple javascript library for building great web applications without (too much) complexity.

Now that you know my background - gamer and developer - I can get to the point.
During all these years, I've followed the evolutions of web development and was particularly interested in the evolution of UI frameworks.
And I have to say that things have gotten overly complicated in this industry.

Due to my job, I had to use and test a lot of different frameworks, and at one point I realized that **I was litteraly spending more time in the documentations than coding the products for my clients**.

In today's world, it takes 2-3 months for an average coder to *master* a new framework.
I insist on the word *master*, because, sure, you can make this *TodoMVC* app in 5 minutes on whatever framework!
But in real-life situations you'll probably have to dive into the documentation and forums over and over again to figure out what is the best practice for *this* or *that*, and how to solve your problem in *this* particular framework.
It requires **months** of experience.

And **when such thing as a virtual DOM was born, I was definitely convinced that things were terribly wrong in web developement.**
Seriously: why should I need a virtual DOM to boost the performances of a simple webpage when I have a multi-core CPU and 16Gb RAM?
How to explain that, at the same time, on the same machine, I can render 3D video games displaying 60 million triangles per second, with texturing and ray-tracing?
So, yes, I'm pretty confident when I say something went wrong in web development...

My belief is that if you are an **average coder** with a good knowledge of HTML, CSS, and vanilla Javascript:
- you **should** be able to build a great web app without having to spend months before <u>mastering</u> your framework
- it **should** have good performances, because the DOM is not that slow if you are careful not to overload your markup

KissJS is our attempt to keep things as simple as possible.
I'm also clear-headed:
- we probably reinvented the wheel (again)
- we probably made the same mistakes other people have made before us

But in the end, the result is damn fast, fairly easy to use, we had fun building it, and now we're happy to share it!
`

kiss.doc.features = /*html*/
`
## UI Components
KissJS offers some useful <a href="javascript:kiss.router.navigateTo({ui: 'start', section: 'components', anchor: 'Introduction about KissJS components'})">UI components</a> out-of-the-box.
But it's also very easy to build a new component from scratch, because **anything** that returns an HTMLElement can be a component.

For example, you could create a small function that returns a div element with some custom content and decide to make it a reusable component.
KissJS would accept it as any other built-in component, **without any restrictions or constraints**.
Could you imagine something more flexible to build your UI?

## A word about KissJS datatable
KissJS <a href="javascript:kiss.router.navigateTo({ui: 'start', section: 'datatable'})">datatable</a> is highly capable.
Thanks to its virtual scrolling, it can handle tens of thousands of records without any problem.

The datatable built-in features are:
- column hiding
- column moving (drag&drop)
- column resizing
- multi-column sorting
- multi-column grouping which works with the virtual scrolling (thanks to state caching)
- virtual scrolling
- paging (which works together with virtual scrolling)
- custom column renderers
- column buttons, to perform actions at row level
- row selection
- cell editing
- customizable action menu

It also demonstrates that vanilla javascript and a simple DOM strategy lead to excellent performances.

## Bonus stuff
At the beginning of the project, KissJS was a pure **client-side UI library**.
Slowly but surely, it slept a bit outside its initial goal to become more than that.
Now, there is a bunch of cool stuff packaged in the library. Use it or don't use it, but it's here!

It includes (but not only):
- **view manager**, if you want to use KissJS not only for its UI Components, but also to build a complete application with multiple views
- **client router** which works 100% offline, without any web server and even with file:/// paths
- **pubsub** which is at the heart of the components reactivity
- **NoSQL database wrapper** which allows to work in memory, offline, or online
- **NoSQL data layer** to manage Models, Collections, Records, and automate the updates when records have relationships

... and now a **KissJS server** (Node/Mongo) is also on its way, and will apply the same KISS principles. Stay tuned!

`

kiss.doc.technically = /*html*/
`
KissJS components are Custom Web Components.
They all derive from HTMLElement, and therefore inherit all native DOM operations.

Most UI frameworks are encapsulating DOM elements with classes.
Instead of that, KissJS is directly attaching new properties and new methods to DOM elements.

Let's imagine a Panel component built with KissJS.
You can get your panel using native DOM operations, and manipulate it using its custom methods, like this:

    const myPanel = document.getElementById("my-panel")
    myPanel.expand()
    myPanel.setAnimation("shakeX")

This way of working directly with the DOM avoids the overhead of encapsulation, because there is no additional layer to cross.
It's also easier to keep the memory clean: when you destroy your DOM element, everything attached to it (states, events...) is flushed and can be garbage collected.
The only constraint is to not collide with native DOM methods, but it's easy enough and not really a problem.

KissJS components are also recognizable and easy to lookup in the DOM because their tag name always starts with "a-", like:
&lt;a-field>, &lt;a-button>, &lt;a-panel>, &lt;a-menu>, and so on...
`

kiss.doc.quickstart = /*html*/
`
1) **Right-click** the links below and download the files from our CDN:
    - <a href="./resources/doc/cdn/index.html" download>Sample index.html</a>
    - <a href="./resources/doc/cdn/index.js" download>Sample index.js</a>

2) Launch index.html (no web server needed)

3) Open index.js and start coding your own project using KissJS components!
`

kiss.doc.libraryResources = /*html*/
`
If you prefer having the resources locally, you can download them from the following links.

Insert this code into the **head** of your index.html file.
Don't forget to adjust the paths according to your project:

    <!-- FONT AWESOME -->
    <link rel="stylesheet" href="./webfonts/fontawesome-all.min.css"/>

    <!-- KISSJS CSS -->
    <link rel="stylesheet" href="./styles/kissjs.css">

    <!-- KISSJS -->
    <script type="text/javascript" src="./kissjs.min.js"></script>

    <!-- YOUR ROOT JAVASCRIPT FILE -->
    <script type="text/javascript" src="./index.js"></script>

In your index.js file

    // DOM needs to be loaded, so we put our code inside window.onload:
    window.onload = function () {

        // Build your UI with KissJS components
        const myButton = createButton({
            text: "Click me!",
            icon: "fas fa-check",
            action: () => alert("click!")
        })

        // Render your component
        myButton.render()
    }

Here are the download links to the resources:

1/ Webfonts:
- <a href="./resources/lib/kissjs/webfonts/fa-brands-400.woff2" download>Font Awesome brand icons</a>
- <a href="./resources/lib/kissjs/webfonts/fa-regular-400.woff2" download>Font Awesome regular icons</a>
- <a href="./resources/lib/kissjs/webfonts/fa-solid-900.woff2" download>Font Awesome solid icons</a>
- <a href="./resources/lib/kissjs/webfonts/fontawesome-all.min.css" download>Font Awesome style sheet</a>

2/ KissJS:
- <a href="./resources/lib/kissjs/kissjs.min.js" download>Javascript library</a>
- <a href="./resources/lib/kissjs/kissjs.css" download>Base CSS</a>

3/ Not required, but can help:
- <a href="./resources/doc/index.html" download>Sample index.html</a>
- <a href="./resources/doc/index.js" download>Sample index.js</a>

4/ Alternatives colors & geometry


COLORS:
- <a href="./resources/lib/kissjs/styles/colors/light.css" download>CSS for light color theme</a>
- <a href="./resources/lib/kissjs/styles/colors/dark.css" download>CSS for dark color theme</a>
- <a href="./resources/lib/kissjs/styles/colors/blue.css" download>CSS for blue color theme</a>
- <a href="./resources/lib/kissjs/styles/colors/green.css" download>CSS for green color theme</a>
- <a href="./resources/lib/kissjs/styles/colors/pink.css" download>CSS for pink color theme</a>
- <a href="./resources/lib/kissjs/styles/colors/purple.css" download>CSS for purple color theme</a>


GEOMETRIES:
- <a href="./resources/lib/kissjs/styles/geometry/default.css" download>CSS for default geometry</a>
- <a href="./resources/lib/kissjs/styles/geometry/sharp.css" download>CSS for sharp geometry</a>
- <a href="./resources/lib/kissjs/styles/geometry/round.css" download>CSS for round geometry</a>
- <a href="./resources/lib/kissjs/styles/geometry/mobile.css" download>CSS for mobile geometry</a>

In case you decide to use the sample **index.html** and sample **index.js** above, please copy all the webfonts and CSS resources inside subfolders, so that your project looks like:

    webfonts/fa-brands-400.woff2
    webfonts/fa-regular-400.woff2
    webfonts/fa-solid-900.woff2
    webfonts/fontawesome-all.min.css
    styles/kissjs.css
    index.html
    index.js
    kissjs.min.js
    
`

kiss.doc.codingStyle = /*html*/
`
KissJS has the following coding style, and you won't necessary agree with it.

**No semicolon**
Except the one at the end of a js file in order to avoid problems with minification. And that's it.
If you wonder why, it's because semicolons are unuseful extra characters that don't even always solve the [ASI problem](https://medium.com/@DanInProgress/javascript-semicolons-are-bad-actually-7c311195001c).
Why should we type extra characters, then?

**Expressive variable names:**

    // Nope
    const na = pa - d

    // Too much
    const newBillingAmount = previousBillingAmount - specialCustomerDiscountOfTheDay

    // OK
    const newAmount = previousAmount - discount

**Camel case for variable names, title case for class names:**

    class Car {
        constructor(config) {
            //...
        }
    }

    const myCar = new Car(config)

**Double-quote for strings**
Nearly every javascript library we know sticks to single quotes, but we're not really sure why.
Double quotes make it simpler to store "real-life" strings:

    // Boooooooooooooring
    myString = 'I don\\'t know if it\\'s John\\'s car or Sam\\'s. Let\\'s check!'

    // Obvious
    myString = "I don't know if it's John's car or Sam's car. Let's check!"

Some people might object that single quotes are better for storing HTML, but that's no longer true because string literals are better suited for that.

**JSDoc compatible headers for all functions + a line break just before the @example:**

    /**
     * Creates a new user
     * 
     * @async
     * @param {object} config
     * @param {string} config.firstName - The first name
     * @param {string} config.lastName - The last name
     * @returns {object} The created user
     * 
     * @example
     * const newUser = await createUser(config)
     */
    async function createUser(config) {
        return new User({
            firtName: config.firstName,
            lastName: config.lastName
        })
    }

Finally, we all know that clean code doesn't need comments because it's self explanatory.
Nevertheless, **good comments** can have a huge impact on the learning curve: they are important for beginners, and **we care about beginners**.

For this, a comment can't be something you throw in the face of the next developer to give him a hint about your code.
A comment should be carefully written, well spelled and accurate.

We also know that our brain is focused on the line immediately following a white line.
For this reason, a comment should be preceded by a single empty line.
    
Here are bad examples:

    //Nope: Leave a space after the slash
    let notStickOurComments

    // nope: don't start with lowercase
    let titleCaseOurComments
    // Leave a white line before
    let spaceOurComments



    // Nope: just one line before, not more
    let notSpaceTooMuch

    // Nope: be careful about how u spell ur comentz
    let checkTheSpell

    // NOpE: BE conSIstant about the CASe
    let doProperCase

Here is a clean example:

    // This is a comment
    let doThis

    // This is another one
    let doThat

    // Don't hesitate to write *real* sentences, with a verb...
    let writeUsefulComments    
`

;kiss.app.defineView({
    id: "home-menu",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            defaultConfig: {
                height: 30,
                color: "#667788",
                colorHover: "#00aaee",
                backgroundColor: "#f3f5f7",
                backgroundColorHover: "#e5e9ec",
                textAlign: "left",
                fontSize: "1.3rem",
                iconSize: "1.3rem",
                iconColor: "#8aa2c8",
                iconColorHover: "#00aaee",
                borderColor: "#e3e5ec",
                borderWidth: "1px 0px 0px 0px",
                borderRadius: "0px"
            },

            layout: "vertical",
            items: [{
                    type: "html",
                    html: "Home",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: "Introduction",
                    icon: "fas fa-star",
                    action: () => kiss.router.navigateTo({
                        anchor: "What is KissJS?"
                    })
                },
                {
                    type: "button",
                    text: "Philosophy",
                    icon: "fas fa-heart",
                    action: () => kiss.router.navigateTo({
                        anchor: "Philosophy"
                    })
                },
                {
                    type: "button",
                    text: "Efficiency",
                    icon: "fas fa-fighter-jet",
                    action: () => kiss.router.navigateTo({
                        anchor: "Efficiency"
                    })
                },
                {
                    type: "button",
                    text: "Dumb code",
                    icon: "fas fa-smile fa-rotate-180",
                    action: () => kiss.router.navigateTo({
                        anchor: "Dumb code"
                    })
                },
                {
                    type: "button",
                    text: "Features",
                    icon: "fas fa-list",
                    action: () => kiss.router.navigateTo({
                        anchor: "Features"
                    })
                },
                {
                    type: "button",
                    text: "Technically",
                    icon: "fas fa-wrench",
                    action: () => kiss.router.navigateTo({
                        anchor: "Technically"
                    })
                },
                {
                    type: "button",
                    text: "Quickstart",
                    icon: "fas fa-rocket",
                    action: () => kiss.router.navigateTo({
                        anchor: "Quickstart"
                    })
                },
                {
                    type: "button",
                    text: "Library resources",
                    icon: "fas fa-bolt",
                    action: () => kiss.router.navigateTo({
                        anchor: "Library resources"
                    })
                },
                {
                    type: "button",
                    text: "Coding style",
                    icon: "fas fa-thumbs-up",
                    action: () => kiss.router.navigateTo({
                        anchor: "Coding style"
                    })
                },
                {
                    type: "button",
                    text: "About the author's beliefs",
                    icon: "fas fa-eye",
                    action: () => kiss.router.navigateTo({
                        anchor: "About the author's beliefs"
                    })
                },
                {
                    type: "button",
                    text: "UI: Components",
                    icon: "fas fa-cube",
                    iconColor: "#8c4bff",
                    action: () => kiss.router.navigateTo({
                        section: "components",
                        anchor: "Introduction about KissJS components"
                    })
                },
                {
                    type: "button",
                    text: "UI: Containers",
                    icon: "far fa-clone",
                    iconColor: "#8c4bff",
                    action: () => kiss.router.navigateTo({
                        section: "containers",
                        anchor: "Introduction about KissJS containers"
                    })
                },
                {
                    type: "button",
                    text: "UI: Datatable",
                    icon: "fas fa-table",
                    iconColor: "#8c4bff",
                    action: () => kiss.router.navigateTo({
                        section: "datatable",
                        anchor: "Introduction about KissJS datatable"
                    })
                },
                {
                    type: "button",
                    text: "UI: Calendar",
                    icon: "fas fa-calendar-alt",
                    iconColor: "#8c4bff",
                    action: () => kiss.router.navigateTo({
                        section: "calendar",
                        anchor: "Introduction about KissJS calendar"
                    })
                },
                {
                    type: "button",
                    text: "UI: Kanban",
                    icon: "fab fa-trello",
                    iconColor: "#8c4bff",
                    action: () => kiss.router.navigateTo({
                        section: "kanban",
                        anchor: "Introduction about KissJS kanban"
                    })
                },
                {
                    type: "button",
                    text: "UI: Timeline",
                    icon: "fas fa-align-left",
                    iconColor: "#8c4bff",
                    action: () => kiss.router.navigateTo({
                        section: "timeline",
                        anchor: "Introduction about KissJS timeline"
                    })
                },
                {
                    type: "button",
                    text: "UI: Gallery",
                    icon: "fas fa-image",
                    iconColor: "#8c4bff",
                    action: () => kiss.router.navigateTo({
                        section: "gallery",
                        anchor: "Introduction about KissJS gallery"
                    })
                },                  
                {
                    type: "button",
                    text: "Tutorials",
                    icon: "fas fa-user-graduate",
                    iconColor: "#bb22ff",
                    action: () => kiss.router.navigateTo({
                        section: "tutorials"
                    })
                },
                {
                    type: "button",
                    text: "Cheat sheet",
                    icon: "fas fa-lightbulb",
                    iconColor: "#dd0000",
                    action: () => kiss.router.navigateTo({
                        section: "cheatsheet"
                    })
                },
                {
                    type: "button",
                    text: "Live test",
                    icon: "fas fa-code",
                    iconColor: "#00aaee",
                    action: () => kiss.router.navigateTo({
                        ui: "live-test"
                    })
                },                
                {
                    type: "button",
                    text: "<b><u>API DOCUMENTATION</u></b>",
                    color: "#8aa2c8",
                    icon: "fas fa-coffee",
                    action: () => document.location = "./doc/out/kiss.html"
                }
            ]
        })
    }
})

;kiss.app.defineView({
    id: "start",
    renderer: function (id, target) {
        const isMobile = kiss.tools.isMobile()

        return createBlock({
            id,
            target,

            fullscreen: true,
            width: "100%",
            margin: "auto",
            layout: "vertical",

            items: [
                // Top bar
                {
                    id: "site-topbar",
                    items: [{
                        type: "view",
                        id: "topbar"
                    }]
                },
                // Main
                {
                    flex: 1,
                    layout: "horizontal",
                    items: [
                        // Left navigation
                        {
                            id: "site-west",
                            class: "navigation-panel",
                            height: "100%",
                            width: (isMobile) ? "100%" : "",
                            layout: "vertical",

                            items: [
                                // Logo
                                {
                                    type: "view",
                                    id: "logo",
                                },
                                // Menu
                                {
                                    id: "site-navigation",
                                    autoSize: true,
                                    height: () => kiss.screen.current.height - 170,
                                    overflowY: "auto"
                                }
                            ]
                        },
                        // Content
                        {
                            id: "site-content",
                            flex: 1,
                            height: "100%",
                            overflowY: "auto"
                        }
                    ]
                }
            ],

            // The website reacts to 2 events :
            // - when a new route is fired, it shows the corresponding views / subviews
            // - when the window is resized, it shows/hides the left navigation panel
            subscriptions: {

                // Display a new section of the website according to the "section" parameter of the url #hash
                // and scroll down to a specific anchor according to the "anchor" parameter of the #hash.
                // @note: this also demonstrates how to easily manage deep linking with KissJS
                EVT_ROUTE_UPDATED: (msgData) => {

                    // Check that we are on the documentation start page
                    if (kiss.router.getRoute().ui == "start") {
                        let newSection = msgData.section
                        let newAnchor = decodeURI(msgData.anchor)

                        if (newSection) {
                            let navigation = kiss.views.show(newSection + "-menu", "site-navigation", true)
                            let content = kiss.views.show(newSection + "-content", "site-content", true)

                            // Animate the content (fade) and the navigation (slide)
                            if (content) content.setAnimation("fadeIn")
                            // if (navigation && (kiss.context.navigation != "hidden")) navigation.setAnimation("slideInLeft")

                            // Scroll down to the anchor after the section is rendered
                            if ($(newAnchor)) $(newAnchor).scrollIntoView({
                                behavior: "smooth"
                            })
                        }

                        if (kiss.context.navigation == "hidden") $("site-west").hide()
                    }
                },

                // Make the left navigation responsive:
                // transform it as a menu if the screen is not wide enough
                EVT_WINDOW_RESIZED: function() {
                    this.updateLayout()
                }
            },

            methods: {
                updateLayout() {
                    if (kiss.router.getRoute().ui == "start") {
                        if (kiss.screen.current.width < 900 || kiss.tools.isMobile()) {
                            $(id).showVertically()
                        } else {
                            $(id).showHorizontally()
                        }
                    }
                },
                showVertically() {
                    kiss.context.navigation = "hidden"
                    $("side-menu").show()
                    $("site-west").style.position = "fixed"
                    $("site-west").style.zIndex = 1000
                    $("site-west").hide()
                },
                showHorizontally() {
                    kiss.context.navigation = "visible"
                    $("side-menu").hide()
                    $("site-west").style.position = "relative"
                    $("site-west").show()
                }
            }
        })
    }
})

;kiss.app.defineView({
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

;kiss.doc.datatables = /*html*/
`
KissJS kanbans are great and simple components to manage your projects and tasks.
`

;kiss.app.defineView({
    id: "kanban-menu",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            defaultConfig: {
                height: 40,
                textAlign: "left",
                iconSize: "18px",
                iconColor: "#8aa2c8",
                borderColor: "#e3e5ec",
                borderWidth: "1px 0px 0px 0px",
                borderRadius: "0px",
                backgroundColor: "#f3f5f7",
                colorHover: "#00aaee",
                iconColorHover: "#00aaee",
                backgroundColorHover: "#e5e9ec"
            },

            layout: "vertical",
            items: [{
                    type: "html",
                    html: "Kanban",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: "Example with 1000 records",
                    icon: "fas fa-info",
                    action: () => kiss.router.navigateTo({
                        anchor: "Introduction about KissJS kanban"
                    })
                },
                {
                    type: "button",
                    text: "Back to Home",
                    icon: "fas fa-arrow-left",
                    fontWeight: "bold",
                    action: () => kiss.router.navigateTo({
                        ui: "start",
                        section: "home"
                    })
                }
            ]
        })
    }
})

;kiss.app.defineView({
    id: "demo-panel",
    renderer: function (id, target) {
        return createPanel({
            id: id,
            target,

            title: "I'm a demo panel",
            icon: "fas fa-check",
            boxShadow: "4px 4px 16px #aaaaaa",
            closable: true,
            closeMethod: "hide",
            draggable: true,
            headerBackgroundColor: "linear-gradient(45deg, rgba(98,9,255,1) 0%, rgba(140,75,255,1) 100%)",
            width: 550,
            left: "50%",
            verticalAlign: "center",
            layout: "vertical",

            defaultConfig: {
                labelPosition: "left",
                labelWidth: "250px",
                fieldWidth: "100%"
            },

            items: [{
                    id: "First name",
                    type: "text",
                    label: "First name",
                    placeholder: "Enter your first name",
                    events: {
                        change: () => publish("DATA_HAS_CHANGED")
                    }
                },
                {
                    id: "Last name",
                    type: "text",
                    label: "Last name",
                    value: "SMITH (just a default value)",
                    events: {
                        change: () => publish("DATA_HAS_CHANGED")
                    }
                },
                {
                    id: "Today is...",
                    type: "date",
                    label: "Today is...",
                    value: new Date().toISO(),
                    events: {
                        change: () => publish("DATA_HAS_CHANGED")
                    }
                },
                {
                    id: "Your favorite addictions",
                    type: "select",
                    label: "Your favorite addictions",
                    allowClickToDelete: true,
                    allowSwitchOnOff: true,
                    multiple: true,
                    value: ["Kissing"],
                    options: [{
                            value: "Angularing",
                            color: "#00aaee"
                        },
                        {
                            value: "Reacting",
                            color: "#3bc48c"
                        },
                        {
                            value: "Vueing",
                            color: "#cc3300"
                        },
                        {
                            value: "Kissing",
                            color: "#ff9955"
                        }
                    ],
                    events: {
                        change: () => publish("DATA_HAS_CHANGED")
                    }
                },
                {
                    id: "Show random text",
                    type: "checkbox",
                    label: "Show random text",
                    iconColorOn: "#00aaee",
                    shape: "switch",

                    events: {
                        change: function () {
                            let dumbHtml = $("dumb-text")
                            let dumbText = kiss.db.faker("description")

                            if (this.getValue() == true) {
                                dumbHtml.setInnerHtml(dumbText)
                                dumbHtml.setAnimation("zoomIn").show()
                            } else dumbHtml.hide()

                            publish("DATA_HAS_CHANGED")
                        }
                    }
                },
                {
                    id: "dumb-text",
                    type: "html",
                    hidden: true
                },
                {
                    id: "data",
                    type: "textarea",
                    label: "Form data",
                    labelPosition: "top",
                    rows: 10,
                    subscriptions: {
                        DATA_HAS_CHANGED: function () {
                            const formData = $(id).getData(true)
                            delete formData.data
                            const formDataAsString = JSON.stringify(formData, null, 4)
                            this.setValue(formDataAsString)
                        }
                    }
                },
                {
                    layout: "horizontal",
                    margin: "20px 0px 0px 0px",
                    width: "100%",

                    defaultConfig: {
                        flex: 1,
                        margin: "5px",
                        borderRadius: "32px",
                        color: "#ffffff",
                        iconColor: "#ffffff",
                        iconSize: "14px",
                        padding: "8px 10px 8px 10px"
                    },

                    items: [{
                            type: "button",
                            text: "Click to swing!",
                            backgroundColor: "#2e1d80",
                            backgroundColorHover: "#4e3da0",
                            icon: "fas fa-sync-alt",

                            action: (event) => {
                                if (!$("demo-panel")) kiss.views.show("demo-panel")
                                $("demo-panel").setAnimation({
                                    name: "swing",
                                    speed: "fast"
                                })
                            }
                        },
                        {
                            type: "button",
                            text: "Click to shake!",
                            backgroundColor: "#8c4bff",
                            backgroundColorHover: "#bc7bff",
                            icon: "fas fa-arrows-alt-h",

                            action: (event) => {
                                if (!$("demo-panel")) kiss.views.show("demo-panel")
                                $("demo-panel").setAnimation({
                                    name: "shakeX",
                                    speed: "fast"
                                })
                            }
                        },
                        {
                            type: "button",
                            text: "Squeeze that code",
                            backgroundColor: "#00aaee",
                            backgroundColorHover: "#30dafe",
                            icon: "fas fa-star",

                            action: (event) => {
                                $("code-example").scrollIntoView({
                                    behavior: "smooth"
                                })
                                $("code-example").setAnimation({
                                    name: "jello",
                                    speed: "slow"
                                })
                            }
                        }
                    ]
                }
            ]
        })
    }
})

;kiss.app.defineView({
    id: "landing_features",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            width: "100%",
            height: 500,
            margin: "0px 0px 50px 0px",

            defaultConfig: {
                padding: "32px",
                margin: "0px 32px 0px 32px",
                background: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0px 0px 20px #cccccc"
            },

            layout: "horizontal",
            items: [{
                    flex: 1,
                    type: "html",
                    html: "HELLO"
                },
                {
                    flex: 1,
                    type: "html",
                    html: "WORLD"
                }
            ]
        })
    }
})

;kiss.app.defineView({
    id: "landing-hero",
    renderer: function (id, target) {
        const isMobile = kiss.tools.isMobile()

        return createBlock({
            id: id,
            target,

            layout: "vertical",
            alignItems: "center",
            animation: "rotateIn",
            height: "100%",

            items: [{
                    type: "spacer",
                    flex: 1
                },
                // TITLE / SUBTITLE
                {
                    type: "html",
                    flex: 1,
                    html: `<div class="spacer"></div>
                        <div class="home-title">KISS JS</div>
                        <div class="home-pitchline">
                            Keep It Simple Stupid Javascript
                            <br><br>
                            A simple library
                            <br>
                            to build real business apps
                        </div>
                        `.removeExtraSpaces()
                },
                // BUTTONS
                {
                    defaultConfig: {
                        color: "#ffffff",
                        fontSize: "2.5vh",
                        margin: "1% 0%",
                        padding: "2vh 2vh",
                        height: "5vh",
                        borderWidth: "1px",
                        borderRadius: "6vh",
                        animation: "zoomIn",
                        backgroundColor: "transparent",
                        backgroundColorHover: "#00000055"
                    },

                    layout: "horizontal",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "100%",
                    items: [
                        // BUTTON: QUICK OVERVIEW
                        {
                            hidden: isMobile,
                            type: "button",
                            text: "Quick overview",
                            action: () => {
                                $("code-example").scrollIntoView({
                                    behavior: "smooth"
                                })

                                if (!$("demo-panel")) kiss.views.show("demo-panel")
                            }
                        },
                        {
                            type: "spacer",
                            width: "2vh"
                        },
                        // BUTTON: LIVE TEST
                        {
                            type: "button",
                            text: "Live test",
                            action: () => kiss.router.navigateTo({
                                ui: "live-test"
                            })
                        },
                        {
                            type: "spacer",
                            width: "2vh"
                        },
                        // BUTTON: QUICK GUIDE
                        {
                            type: "button",
                            text: "Quick guide",
                            action: () => {
                                kiss.router.navigateTo({
                                    ui: "start",
                                    section: "home"
                                })
                            }
                        },
                        {
                            type: "spacer",
                            width: "2vh"
                        },
                        // BUTTON: API DOCUMENTATION
                        {
                            type: "button",
                            text: "API",
                            action: () => document.location = "./doc/out/kiss.html"
                        }
                    ]
                },
                // BUTTONS
                {
                    defaultConfig: {
                        color: "#ffffff",
                        fontSize: "1.5vh",
                        margin: "1% 0%",
                        padding: "1.5vh 1.5vh",
                        height: "2.2vh",
                        borderWidth: "1px",
                        borderRadius: "6vh",
                        animation: "zoomIn",
                        backgroundColor: "transparent",
                        backgroundColorHover: "#00000055"
                    },

                    layout: "horizontal",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "100%",
                    items: [
                        // BUTTON: DATATABLE
                        {
                            hidden: isMobile,
                            type: "button",
                            text: "Datatable example",
                            action: () => kiss.router.navigateTo({
                                ui: "start",
                                section: "datatable"
                            })
                        },
                        {
                            type: "spacer",
                            width: "2vh"
                        },
                        // BUTTON: CALENDAR
                        {
                            hidden: isMobile,
                            type: "button",
                            text: "Calendar example",
                            action: () => {
                                kiss.router.navigateTo({
                                    ui: "start",
                                    section: "calendar"
                                })
                            }
                        },
                        {
                            type: "spacer",
                            width: "2vh"
                        },
                        // BUTTON: KANBAN
                        {
                            hidden: isMobile,
                            type: "button",
                            text: "Kanban example",
                            action: () => kiss.router.navigateTo({
                                ui: "start",
                                section: "kanban"
                            })
                        },
                        {
                            type: "spacer",
                            width: "2vh"
                        },
                        // BUTTON: TIMELINE
                        {
                            hidden: isMobile,
                            type: "button",
                            text: "Timeline example",
                            action: () => kiss.router.navigateTo({
                                ui: "start",
                                section: "timeline"
                            })
                        },
                        {
                            type: "spacer",
                            width: "2vh"
                        },
                        // BUTTON: GALLERY
                        {
                            hidden: isMobile,
                            type: "button",
                            text: "Gallery example",
                            action: () => kiss.router.navigateTo({
                                ui: "start",
                                section: "gallery"
                            })
                        }
                    ]
                },
                {
                    type: "spacer",
                    flex: 1
                }
            ]
        })
    }
})

;kiss.app.defineView({
    id: "landing-page",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            fullscreen: true,
            overflowY: "auto",

            items: [
                // Hero header
                {
                    type: "view",
                    id: "landing-hero"
                },
                // Framework layers
                {
                    hidden: true,
                    type: "html",
                    html: `
                        <div class="layer">kiss.router</div>
                        <div class="layer">kiss.ui</div>
                        <div class="layer">kiss.acl</div>
                        <div class="layer">kiss.data</div>
                        <div class="layer">kiss.pubsub</div>
                        <div class="layer">kiss.websocket</div>
                    `
                },
                // Sample code
                {
                    type: "view",
                    id: "landing-sample-code"
                }
            ],

            methods: {
                load: function () {
                    if (kiss.tools.isMobile()) return

                    // Load code into code zones
                    $("demo-code").innerHTML = texts.showPanelConfig

                    // Load tips
                    $("help-simple-api").attachTip(texts.helpSimpleApi)
                    $("help-items").attachTip(texts.helpItems)
                    $("help-events").attachTip(texts.helpEvents)
                    $("help-fields").attachTip(texts.helpFields)
                    $("help-select").attachTip(texts.helpSelect)
                    $("help-checkbox").attachTip(texts.helpCheckbox)
                    $("help-button").attachTip(texts.helpButton)
                    $("help-W3C").attachTip(texts.helpW3C)
                    $("help-font-awesome").attachTip(texts.helpFontAwesome)
                    $("help-layout").attachTip(texts.helpLayout)
                    $("help-animation").attachTip(texts.helpAnimation)
                    $("help-defaults").attachTip(texts.helpDefaults)
                    $("help-pubsub").attachTip(texts.helpPubsub)
                    $("help-subscriptions").attachTip(texts.helpSubscriptions)
                    $("help-override").attachTip(texts.helpOverride)

                    // Manage how the demo panel is displayed according to the scroll position
                    $(id).onscroll = (event) => {
                        let pagePosition = $(id).scrollTop
                        let demoPosition = $("landing-sample-code").offsetTop

                        if (pagePosition > (demoPosition - 512)) {
                            kiss.views.show("demo-panel")

                            if ($("demo-panel").isHidden()) $("demo-panel")?.show().setAnimation("zoomIn")

                        } else {

                            if ($("demo-panel") && !$("demo-panel").isHidden()) $("demo-panel").hide()

                        }
                    }
                }
            }
        })
    }
})

;kiss.app.defineView({
    id: "landing-sample-code",
    renderer: function (id, target) {
        // Pieces of code (re-arranged for lisibility)
        texts.showPanelConfig = `<span id="help-simple-api" class="code-help">createPanel</span>({
        id: "demo-panel",
        title: "I'm a demo panel",
        icon: "fas fa-check",
        draggable: true,
        closable: true,
        <span id="help-items" class="code-help">items:</span> [<div class="code-block">
            {
                type: "text",
                label: "First name",
                placeholder: "Enter your first name",
                <span id="help-events" class="code-help">events: {
                    onchange:</span> () => publish("DATA_HAS_CHANGED")
                }                
            },</div><div class="code-block">
            <span id="help-fields" class="code-help">{
                type: "text",
                label: "Last name",
                value: "SMITH (just a default value)",
                events: {
                    onchange: () => publish("DATA_HAS_CHANGED")
                }                
            }</span>,</div><div class="code-block">
            {
                type: "date",
                label: "Today is...",
            },</div><div class="code-block">
            {
                <span id="help-select" class="code-help">type: "select",</span>
                label: "Your favorite addictions",
                multiple: true,
                options: [{
                        value: "Angularing",
                        color: "#00aaee"
                    },
                    {
                        value: "Reacting",
                        color: "#3bc48c"
                    },
                    {
                        value: "Vueing",
                        color: "#cc3300"
                    },
                    {
                        value: "Kissing",
                        color: "#ff9955"
                    }
                ],
                events: {
                    onchange: () => <span id="help-pubsub" class="code-help">publish("DATA_HAS_CHANGED")</span>
                }                
            },</div><div class="code-block">
            {
                type: "checkbox",
                label: "Random text",
                <span id="help-checkbox" class="code-help">shape: "switch",</span>
                iconColorOn: "#00aaee",
                <span id="help-events" class="code-help">events: {
                    onchange:</span> function() {
                        let dumbHtml = $("dumb-text")
                        let dumbText = kiss.db.faker("description")
    
                        if (this.getValue() == true) {
                            dumbHtml.setValue(dumbText)
                            dumbHtml.setAnimation("zoomIn").show()
                        }
                        else dumbHtml.hide()

                        publish("DATA_HAS_CHANGED")
                    }
                }
            },</div><div class="code-block">
            {
                id: "dumb-text",
                type: "html",
                <span id="help-W3C" class="code-help">hidden: true</span>
            },</div><div class="code-block">
            {
                id: "data",
                type: "textarea",
                label: "Form data",
                rows: 10,
                <span id="help-subscriptions" class="code-help">subscriptions: {
                    DATA_HAS_CHANGED:</span> function() {
                        const formData = $(id).getData(true)
                        delete formData.data
                        const formDataAsString = JSON.stringify(formData, null, 4)
                        this.setValue(formDataAsString)
                    }
                }
            },

            // Block of 3 buttons aligned horizontally
            {
                type: "block",
                <span id="help-layout" class="code-help">display: "flex",
                flexFlow: "row",</span>

                // This config applies to the container's items
                <span id="help-defaults" class="code-help">defaultConfig: {
                    flex: 1,
                    margin: "5px",
                    borderRadius: "32px",
                    color: "#ffffff",
                    iconColor: "#ffffff",
                    iconSize: "14px",
                    padding: "8px 10px 8px 10px"
                },</span>
                
                items: [
                    {
                        <span id="help-button" class="code-help">type: "button",</span>
                        text: "Click to swing!",
                        backgroundColor: "#2e1d80",
                        backgroundColorHover: "#4e3da0",
                        <span id="help-font-awesome" class="code-help">icon: "fas fa-sync-alt",</span>
                        events: {
                            onclick: () => {
                                const demoPanel = $("demo-panel")
                                <span id="help-animation" class="code-help">demoPanel.setAnimation("swing")</span>
                            }
                        }
                    },</div><div class="code-block">
                    {
                        type: "button",
                        text: "Click to shake!!",
                        backgroundColor: "#8c4bff",
                        backgroundColorHover: "#bc7bff",
                        icon: "fas fa-arrows-alt-h",
                        <span id="help-override" class="code-help">iconSize: "1vw",</span>
                        events: {
                            onclick: () => {
                                $("demo-panel").setAnimation("shakeX")
                            }
                        }                 
                    },</div><div class="code-block">
                    {
                        type: "button",
                        text: "Squeeze that code",
                        backgroundColor: "#00aaee",
                        backgroundColorHover: "#30dafe",
                        icon: "fas fa-star",
                        events: {
                            onclick: () => {
                                $("code-example").scrollIntoView({behavior: "smooth"})
                                $("code-example").setAnimation({name: "jello", speed: "fast"})
                            }
                        }
                    }</div>
                ]
            }
        ]
    })`

        // Tips
        const tip = (txt) => `<div class="code-tip">` + txt + `</div>`
        texts.helpSimpleApi = tip(`To create a panel like the one opposite, just write <b>createPanel</b> and set a few options.<br><br>KissJS allows to create components with simple functions like:<br>- createTextField<br>- createCheckbox<br>- createSelect<br>- createButton<br>- createPanel<br>- etc...<br><br>Not too complex?`)
        texts.helpItems = tip(`Containers like this panel can embed items, or other containers.<br><br>Containers are:<br>- block (= a simple div block used for layout purpose)<br>- panel (like the one floating on the right)<br>`)
        texts.helpEvents = tip(`You can attach any W3C event to your components`)
        texts.helpFields = tip(`You can create your form fields like this.<br><br>KissJS supports all common field types like:<br>- text<br>- textarea<br>- number<br>- date<br>- checkbox<br>- select...</b>`)
        texts.helpSelect = tip(`A field of type Select has a bunch of cool features, like: <br>- auto-complete<br>- single or multiple values<br>- option colors<br>- deleting values with the mouse<br>- switching values on and off<br>- ...`)
        texts.helpCheckbox = tip(`A Checkbox can have many shapes, like checkbox, switch, star...`)
        texts.helpLayout = tip(`Containers like <b>block</b> and <b>panel</b> can be nested and use flex layout to organize the contained items.`)
        texts.helpButton = tip(`Creating a button with an icon is as simple as that...`)
        texts.helpW3C = tip(`We follow W3C conventions whenever it's possible, so you just have to know Javascript, HTML and CSS.`)
        texts.helpFontAwesome = tip(`At the moment, we like to use <b>Font Awesome</b> for our icons classes.<br>We might support other libraries in the future.`)
        texts.helpAnimation = tip(`Out-of-the-box CSS animations`)
        texts.helpDefaults = tip(`It's possible to set default settings for all the items of a container. Here, it's applied to the 3 buttons.`)
        texts.helpPubsub = tip(`KissJS provides a native PubSub mechanism to broadcast events and data on channels.`)
        texts.helpSubscriptions = tip(`A component can be subscribed to one or more PubSub channels and react accordingly`)
        texts.helpOverride = tip(`A default config can be overriden for a specific item`)

        return createBlock({
            hidden: kiss.tools.isMobile(),
            id: id,
            target,

            class: "craft-background",

            layout: "vertical",
            items: [
                // CODE EXAMPLE
                {
                    id: "code-example",
                    type: "html",
                    class: "code-feature",

                    html: `<div class="stripe-title">Write dumb code.<br>Get results.</div>
                <pre id="demo-code" class="code-sample"></pre>
                `
                }
            ]
        })
    }
})

;const code_calendar = `{
    id: "view-container",
    width: "100%",
    height: "100%",
    methods: {
        async load() {
            // Creates a fake Model
            let fakeModelTemplate = createFakeModel()
            fakeModelTemplate.id = kiss.tools.uid()

            // Register the Model into the application
            let fakeModel = kiss.app.defineModel(fakeModelTemplate)

            // Get the Collection of records auto-generated for the Model
            let fakeCollection = fakeModel.collection

            // Insert fake records into the collection
            fakeCollection.insertFakeRecords(50)
            
            // Restrict displayed columns
            let columns = fakeModel.getFieldsAsColumns()
            
            columns.forEach(col => {
                col.hidden = !([
                    "gameName",
                    "category",
                    "ratingMetacritic"
                ].includes(col.id))
            })

            // Build a Calendar and render it at the right DOM insertion point
            createCalendar({
                target: "view-container", // Insertion point into the DOM
                collection: fakeCollection,
                columns,
                date: new Date(kiss.formula.TODAY())
            }).render()
        }
    }
}`

;const code_datatable = `{
    id: "view-container",
    width: "100%",
    height: "100%",
    methods: {
        async load() {
            // Creates a fake Model
            let fakeModelTemplate = createFakeModel()
            fakeModelTemplate.id = kiss.tools.uid()
            
            // Register the Model into the application
            let fakeModel = kiss.app.defineModel(fakeModelTemplate)
            
            // Get the Collection of records auto-generated for the Model
            let fakeCollection = fakeModel.collection

            // Insert fake records into the collection
            fakeCollection.insertFakeRecords(50)
            
            // Build a datatable and render it at the right DOM insertion point
            createDatatable({
                target: "view-container", // Insertion point into the DOM
                collection: fakeCollection
            }).render()
        }
    }
}`

;const code_fields = `// Example of field types
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
            label: "Custom validation. Enter a phone number like: 01 23 45 67 89",
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

;const code_gallery = `{
    id: "view-container",
    width: "100%",
    height: "100%",
    methods: {
        async load() {
            // Creates a fake Model
            let fakeModelTemplate = createFakeModel()
            fakeModelTemplate.id = kiss.tools.uid()
            
            // Register the Model into the application
            let fakeModel = kiss.app.defineModel(fakeModelTemplate)
        
            // Generates some fake records
            const fields = fakeModel.getFields()
            let fakeRecords = kiss.db.faker.generate(fields, 20) 
            
            // Generates a fake attachment field with images
            let fakeAttachmentField = '[{"id":"01887414-3775-7443-81bc-260a9539d7e4","filename":"cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.png","size":1279664,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.64x64.png","size":6106},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.256x256.png","size":87845},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-ZEN6auDj.512x512.png","size":332583}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-379e-701e-b4dc-15301d8b4560","filename":"cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.png","size":1360256,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.64x64.png","size":6080},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.256x256.png","size":89129},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-RUyLqAZl.512x512.png","size":337313}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-378a-759d-b17d-762b4dd33b72","filename":"cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.png","size":1301698,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.64x64.png","size":6193},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.256x256.png","size":89664},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-vfNB7pxJ.512x512.png","size":331588}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"},{"id":"01887414-506f-7707-a529-20a36858b1a8","filename":"cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.png","path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.png","size":1357025,"type":"amazon_s3","mimeType":"image/png","thumbnails":{"s":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.64x64.png","size":6136},"m":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.256x256.png","size":89761},"l":{"path":"https://pickaform-europe.s3.eu-west-3.amazonaws.com/files/01844399-988f-7974-a68f-92d35fc702cc/2023/06/01/cyberpunk-cantina-Women-Cyberpunk-FjFuk2YX.512x512.png","size":339784}},"accessReaders":["*"],"createdAt":"2023-05-31T23:10:59.240Z","createdBy":"david.grossi@pickaform.com"}]';
            fakeAttachmentField = JSON.parse(fakeAttachmentField)
            fakeRecords.forEach(record => record.attachment = fakeAttachmentField)

            // Insert the fake records into the collection
            let fakeCollection = fakeModel.collection
            await fakeCollection.insertMany(fakeRecords)

            // Restrict displayed columns
            let columns = fakeModel.getFieldsAsColumns()
            columns.forEach(col => {
                col.hidden = !([
                    "gameName",
                    "category",
                    "ratingMetacritic",
                    "duration",
                    "percentFinished"
                ].includes(col.id))
            })
            
            // Build a Gallery view and render it at the right DOM insertion point
            createGallery({
                target: "view-container", // Insertion point into the DOM
                collection: fakeCollection,
                columns,
                showActions: false,
                canSelect: false,
                showImage: true,
                imageFieldId: "attachment"
            }).render()
        }
    }
}`

;const code_kanban = `{
    id: "view-container",
    width: "100%",
    height: "100%",
    methods: {
        async load() {
            // Creates a fake Model
            let fakeModelTemplate = createFakeModel()
            fakeModelTemplate.id = kiss.tools.uid()
            
            // Register the Model into the application
            let fakeModel = kiss.app.defineModel(fakeModelTemplate)
            
            // Get the Collection of records auto-generated for the Model
            let fakeCollection = fakeModel.collection

            // Insert fake records into the collection
            fakeCollection.insertFakeRecords(50)
            
            // Restrict displayed columns
            let columns = fakeModel.getFieldsAsColumns()
            columns.forEach(col => {
                col.hidden = !([
                    "gameName",
                    "category",
                    "ratingIGN",
                    "duration",
                    "percentFinished"
                ].includes(col.id))
            })
            
            // Build a Kanban board and render it at the right DOM insertion point
            createKanban({
                target: "view-container", // Insertion point into the DOM
                collection: fakeCollection,
                columns,
                group: ["platform"]
            }).render()
        }
    }
}`

;const code_layout = `// Sample layout using nested blocks
// ~200 lines of code => complete working layout with interactions
{
    layout: "vertical",
    height: "100%",
    items: [
        // Top bar
        {
            id: "top-bar",
            height: "6.4rem",
            background: "var(--body-background-alt)",
            layout: "horizontal",
            alignItems: "center",
            width: "100%",
            borderStyle: "solid",
            borderWidth: "0 0 1px 0",
            borderColor: "var(--body-background)",
            items: [
                // Logo
                {
                    id: "logo",
                    type: "image",
                    src: "https://kissjs.net/resources/img/KissJS%20logo.png",
                    height: "100%",
                    margin: "0 2rem"
                },
                // Empty div used to space elements in flex layouts
                {
                    type: "spacer",
                    flex: 1
                },
                // Button to change the theme
                {
                    type: "button",
                    text: "Themes",
                    icon: "fas fa-palette",
                    action: () => kiss.theme.select()
                },
                // Button
                {
                    type: "button",
                    icon: "fas fa-bars",
                    text: "Menu",
                    margin: "0 1rem",
                    // The button generates a menu
                    action: (event) => createMenu({
                        items: [
                            {
                                text: "Notification",
                                icon: "far fa-comment",
                                // Creates a notification
                                action: () => createNotification({
                                    message: "Item 2",
                                    left: "75vw"
                                })
                            },
                            {
                                text: "Dialog",
                                icon: "fas fa-square",
                                iconColor: "#00aaee",
                                // Creates a simple dialog box
                                action: () => createDialog({
                                    title: "Sample title",
                                    icon: "fas fa-check",
                                    message: "This is a sample dialog message",
                                    left: "calc(75vw - 20rem)",
                                    action: () => console.log("OK")
                                })
                            }
                        ]
                    })
                    .render() // Must be rendered to show up on the screen
                    .showAt(event.clientX, event.clientY + 10) // Show the menu at the mouse position
                }
            ]
        },
        // Main
        {
            layout: "horizontal",
            height: "100%",

            items: [
                // Navigation
                {
                    id: "nav",
                    width: "30rem",
                    background: "var(--body-background-alt)",
                    layout: "vertical",
                    alignItems: "center",

                    // Default config applies to all container's items
                    defaultConfig: {
                        width: "25rem",
                        height: "4rem",
                        margin: "0 0 2rem 0"
                    },
                    
                    items: [
                        // You can insert html using "html" component
                        {
                            type: "html",
                            html: "<center><h2>Left navigation</h2></center>",
                            margin: "2rem 0 5rem 0"
                        },
                        // Array of buttons generated on the fly
                        ...["A", "B", "C", "D", "E"].map(label => {
                            return {
                                id: label,
                                type: "button",
                                text: "Open view " + label,
                                icon: "fas fa-chevron-right",
                                action: () => {
                                    
                                    $("content").showItemById("view-" + label)
                                    
                                    createNotification({
                                        message: "Show view " + label,
                                        left: "75vw"
                                    })
                                }
                            }
                        }),
                        // Push the last item to the bottom
                        {
                            type: "spacer",
                            flex: 1
                        },
                        // Custom button
                        {
                            id: "F",
                            type: "button",
                            icon: "fas fa-power-off",
                            width: "4rem",
                            iconSize: "2.7rem",
                            iconPosition: "top",
                            margin: "0 0 5rem 0",
                            borderRadius: "2rem",
                            iconColor: "white",
                            iconColorHover: "red",
                            backgroundColor: "red",
                            backgroundColorHover: "white",
                            boxShadow: "0 0 3.2rem red",
                            boxShadowHover: "0 0 3.2rem blue",
                            border: "solid 0.3rem white",
                            borderColorHover: "red"
                        }
                    ],
                    
                    // Events can be delegated to the container
                    events: {
                        click: (e) => {
                            const clickedButton = e.target.closest("a-button")
                            if (!clickedButton) return
                            
                            const anims = {
                                A: "shakeX",
                                B: "rotateIn",
                                C: "zoomIn",
                                D: "pulse",
                                E: "jello",
                                F: "rotateOut"
                            }
                            
                            // Any HTML element can be animated
                            clickedButton.setAnimation({
                                name: anims[clickedButton.id],
                                speed: "fast"
                            })
                        }
                    }
                },
                // Content
                {
                    id: "content",
                    flex: 1,
                    multiview: true, // Allow to display items one at a time
                    overflow: "auto", // Allow larger content to scroll in the container
                    
                    defaultConfig: {
                        type: "html",
                        padding: "15rem 0 0 0",
                        height: "150vh"
                    },
                    
                    items: [
                        {
                            id: "view-A",
                            html: "<center><h1>😊 View A</h1></center>"
                        },
                        {
                            id: "view-B",
                            html: "<center><h1>😂 View B</h1></center>"
                        },
                        {
                            id: "view-C",
                            html: "<center><h1>🤗 View C</h1></center>"
                        },
                        {
                            id: "view-D",
                            html: "<center><h1>😉 View D</h1></center>"
                        },
                        {
                            id: "view-E",
                            html: "<center><h1>😎 View E</h1></center>"
                        }
                    ]
                }
            ]
        }
    ]
}`

;const code_ORM = `{
    layout: "vertical",
    alignItems: "center",
    
    defaultConfig: {
        width: 400,
        margin: "5px 0"
    },
    
    items: [
        // PAGE TITLE
        {
            type: "html",
            html: "<center><h1>Using KissJS ORM</h1></center>",
            margin: "20px 0 0 0"
        },
        // DESCRIPTION
        {
            type: "html",
            html: \`KissJS has an embedded Object Relational Mapping
            to simplify the interactions with the database.
            The result is that you don't have to manually perform database requests,
            especially for all CRUD operations.
            <br><br>
            Here, we use KissJS embedded in-memory NoSQL database that mimics
            MongoDB API.\`,
            margin: "0 0 20px 0"
        },
        // FORM TO ENTER CONTACT INFOS
        {
            type: "panel",
            title: "Contact",
            icon: "fas fa-user",
            layout: "vertical",
            boxShadow: "var(--shadow-2)",
            items: [
                // First name
                {
                    id: "firstName",
                    type: "text",
                    label: "First name",
                    labelPosition: "top",
                    value: "Bob"
                },
                // Last name
                {
                  id: "lastName",
                  type: "text",
                  label: "Last name",
                  labelPosition: "top",
                  value: "Wilson"
                },
                // Birth date
                {
                  id: "birthDate",
                  type: "date",
                  label: "Birth date",
                  labelPosition: "top",
                  value: "1984-01-01"
                }
            ]        
        },
        // BUTTON TO CREATE A NEW RECORD
        {
            type: "button",
            icon: "fas fa-plus",
            text: "Create new contact into the database",
            action: async () => {
                const firstName = $("firstName").getValue()
                const lastName = $("lastName").getValue()
                const birthDate = $("birthDate").getValue()
                
                // Get the Model
                const contactModel = kiss.app.models.contact
                
                // Creates a new Record using this Model
                const newContact = contactModel.create({
                    firstName,
                    lastName,
                    birthDate
                })
                
                // Saves the Record into the db (technically doing a POST request)
                await newContact.save()
                
                // Get the Collection of Records associated with the model
                const contactCollection = kiss.app.collections.contact
                console.log("Contacts after insertion: ", contactCollection.records.length)
            } 
        },
        // FINDING ALL RECORDS
        {
            type: "button",
            icon: "fas fa-search",
            text: "Find all contacts in the database",
            action: async () => {
                const contacts = await kiss.app.collections.contact.find({}, true)
                createNotification({
                    message: "Found " + contacts.length + " contact(s)",
                    left: "75vw"
                })
            } 
        },
        // QUERYING THE DATABASE
        {
            type: "button",
            icon: "fas fa-search",
            text: "Find all contacts which first name is Bob",
            action: async () => {
                const contacts = await kiss.app.collections.contact.find({
                    filterSyntax: "mongo",
                    filter: {
                        firstName: "Bob"
                    }
                }, true)
                
                createNotification({
                    message: "Found " + contacts.length + " contact(s)",
                    left: "75vw"
                })
            } 
        },
        // INSERT 20 FAKE CONTACTS
        // KissJS has a random generator to simulate records in development phase
        {
            type: "button",
            icon: "fas fa-plus",
            text: "Insert 20 fake contacts into the database",
            action: async () => {
                const collection = kiss.app.collections.contact
                await collection.insertFakeRecords(20)
                console.log("Contacts after insertion: ", collection.records.length)
            } 
        },
        // DELETE ALL THE CONTACTS
        {
            type: "button",
            icon: "fas fa-trash",
            text: "Delete all records",
            action: async () => {
                const collection = kiss.app.collections.contact
                await collection.deleteMany({})
                console.log("Contacts after deletion: ", collection.records.length)
            } 
        },
        // SHOW ALL THE CONTACTS IN A MODAL WINDOW
        {
            type: "button",
            icon: "fas fa-users",
            text: "Show contacts",
            action: async () => {
                // Get the Collection of Records
                const collection = kiss.app.collections.contact
                
                // Build some simple HTML out of the list of contacts
                const datatable = collection.records.map(rec => {
                    return {
                        type: "html",
                        width: "100%",
                        display: "flex",
                        html:
                            \`<div style="width: 20rem">
                                \${rec.firstName}
                            </div>
                            <div style="width: 20rem">
                                \${rec.lastName}
                            </div>
                            <div style="width: 20rem">
                                \${rec.birthDate}
                            </div>\`
                    }
                })
                
                // Create a floating panel
                createPanel({
                    title: "CONTACTS",
                    icon: "fas fa-users",
                    draggable: true,
                    closable: true,
                    modal: true,
                    align: "center",
                    verticalAlign: "center",
                    width: 600,
                    height: 400,
                    zIndex: 10,
                    overflow: "auto",
                    items: datatable
                }).render()
            } 
        },          
        // Simple html
        {
            type: "html",
            margin: "40px 0 0 0",
            html: "Current number of contacts:",
        },
        // Anchor to insert the number of contacts
        {
            type: "html",
            color: "#00aaee",
            fontSize: "50px",
            id: "number-of-contacts"
        }
    ],
    
    // A component can be subscribed to any kinds of events.
    // Database events can be:
    // - EVT_DB_INSERT:MODEL_ID
    // - EVT_DB_UPDATE:MODEL_ID
    // - EVT_DB_DELETE:MODEL_ID
    // - EVT_DB_INSERT_MANY:MODEL_ID
    // - EVT_DB_UPDATE_MANY:MODEL_ID
    // - EVT_DB_DELETE_MANY:MODEL_ID
    subscriptions: {
        "EVT_DB_INSERT:CONTACT": function() {
            this.updateNumberOfContacts()
        },
        "EVT_DB_INSERT_MANY:CONTACT": function() {
            this.updateNumberOfContacts()
        },
        "EVT_DB_DELETE_MANY:CONTACT": function() {
            this.updateNumberOfContacts()
        }
    },
    
    // All KissJS components can have custom methods to control their behavior
    methods: {
        // Here, we add a method to get all the contacts
        async getContacts() {
            return await kiss.app.collections.contact.find({}, true)
        },
        
        // Update the number of contacts in the UI
        async updateNumberOfContacts() {
            const contacts = await this.getContacts()
            $("number-of-contacts").innerHTML = contacts.length
        },
        
        // The "load" method is automatically called when initializing a component
        // In this example, it creates a database Model and its associated Collection.
        // You can access all the Models and Collections of a KissJS application using:
        // - kiss.app.models
        // - kiss.app.collections
        async load() {
            // Defining a model
            const modelConfig = {
                id: "contact",
                name: "Contact",
                namePlural: "Contacts",
                items: [
                    {
                        id: "firstName",
                        type: "text",
                        label: "First name"
                    },
                    {
                        id: "lastName",
                        type: "text",
                        label: "Last name"
                    },
                    {
                        id: "birthDate",
                        type: "date",
                        label: "Birth date"
                    }
                ]
            }
            
            // Declares the model in the application.
            // This automatically generates a Collection
            // that will hold all the Records created from this Model
            const contactModel = kiss.app.defineModel(modelConfig)
            
            // Getting the Collection of Records for this Model
            const contactCollection = kiss.app.collections.contact
            
            // Resetting the records of the collection
            await contactCollection.deleteMany({})
        }
    }
}`

;const code_panel = `// Creates a panel, which is one of the 2 kinds of containers
{
    id: "my-panel",
    type: "panel",
    title: "This is a live code test",
    icon: "fas fa-code",
    closable: true,
    layout: "vertical",
    width: 600,
    margin: "20px auto",

    // Default config is applied to all items of the container
    defaultConfig: {
        labelPosition: "top",
        width: "100%"
    },
    
    items: [
        // Dropdown list field
        {
            id: "dropdown",
            type: "select",
            label: "List of options",
            multiple: true,
            allowClickToDelete: true,
            value: "B",
            options: [{
                    color: "#00aaee",
                    label: "Blue",
                    value: "B"
                },
                {
                    color: "#a1ed00",
                    label: "Green",
                    value: "G"  
                }
            ],
            
            // Manage events
            events: {
                change: function() {
                    const newColors = this.getValue()

                    // Publish a message on the "COLOR_CHANGED" channel
                    if (newColors.includes("B")) {
                        publish("COLOR_CHANGED", "#00aaee")
                    }
                    else if (newColors.includes("G")) {
                        publish("COLOR_CHANGED", "#a1ed00")
                    }
                    else {
                        publish("COLOR_CHANGED", "#123456")
                    }
                }
            }
        },
        
        // Checkbox field
        {
            id: "cb",
            type: "checkbox",
            label: "Check me",
            shape: "switch",
            value: true,
            iconColorOn: "red"
        },
        
        // Rating field
        {
            id: "rating",
            type: "rating",
            label: "Note",
            value: 3
        },
        
        // Button bar (block container with horizontal layout)
        {
            layout: "horizontal",

            defaultConfig: {
                type: "button",
                flex: 1,
                margin: 5
            },
            
            items: [
                {
                    text: "Set random values",
                    icon: "fas fa-random",
                    action: () => {
                        const newCheckboxState = !$("cb").getValue()
                        $("cb").setValue(newCheckboxState)
                        
                        const newRating = ($("rating").getValue() + 1) % 6
                        $("rating").setValue(newRating)
                        
                        const currentColors = $("dropdown").getValue()
                        const newColors = (currentColors.includes("G")) ? ["B"] : ["G"]
                        $("dropdown").setValue(newColors)
                        
                        const formValues = $("my-panel").getData()
                        console.log(formValues)
                    }
                },
                {
                    type: "button",
                    text: "Shake the panel",
                    icon: "fas fa-check",
                    iconPosition: "right",
                    action: () => $("my-panel").setAnimation("jello")
                }
            ]
        }
    ],
    
    subscriptions: {
        // Subscribe the panel to the "COLOR_CHANGED" channel
        COLOR_CHANGED: function(messageData) {
            $("my-panel").setHeaderBackgroundColor(messageData)
        }
    }
}`

;const code_timeline = `{
    id: "view-container",
    width: "100%",
    height: "100%",
    methods: {
        async load() {
            // Creates a fake Model
            let modelId = kiss.tools.uid()
            let fakeModelTemplate = createFakeModel()
            fakeModelTemplate.id = modelId

            // Register the Model into the application
            let fakeModel = kiss.app.defineModel(fakeModelTemplate)

            // Generates some fake records
            const fields = fakeModel.getFields()
            let fakeRecords = kiss.db.faker.generate(fields, 20) 

            // Review date is a random date between release date and release date + 30 days
            fakeRecords.forEach(record => {
                const releaseDate = new Date(record.releaseDate)
                const delay = Math.floor(Math.random() * 30) + 1
                record.reviewDate = kiss.formula.ADJUST_DATE(releaseDate, 0, 0, delay, 0, 0, 0)
            })       
            
            // Insert the fake records into the collection
            let fakeCollection = fakeModel.collection
            await fakeCollection.insertMany(fakeRecords)
            
            // Restrict displayed columns
            let columns = fakeModel.getFieldsAsColumns()
            columns.forEach(col => {
                col.hidden = !([
                    "gameName",
                    "category",
                    "ratingMetacritic"
                ].includes(col.id))
            })

            // Build a Timeline and render it at the right DOM insertion point
            createTimeline({
                target: "view-container", // Insertion point into the DOM
                collection: fakeCollection,
                columns,
                firstColumnWidth: 25,
                date: new Date(kiss.formula.TODAY()),
                colorField: "category",
                startDateField: "releaseDate",
                endDateField: "reviewDate"
            }).render()
        }
    }
}`

;kiss.app.defineView({
    id: "live-test",
    renderer: function (id) {

        const defaultCode = code_fields
        let lastComponent = null

        return createPanel({
            id,
            layout: "horizontal",
            height: "100vh",
            title: "Live test",
            icon: "fas fa-code",
            padding: 0,
            border: 0,
            borderRadius: "0 0 0 0",
            headerHeight: "6rem",

            styles: {
                "panel-header": "background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(50,9,121,1) 35%, rgba(0,212,255,1) 100%);"
            },

            events: {
                close: () => kiss.router.navigateTo("landing-page")
            },

            items: [{
                    layout: "vertical",
                    flex: 1,
                    height: "100%",
                    items: [
                        // TOP BAR
                        {
                            layout: "horizontal",
                            alignItems: "center",
                            minHeight: "6rem",

                            defaultConfig: {
                                type: "button",
                                flex: 1,
                                margin: "0.5rem 0 0.5rem 0.5rem",
                                height: "3.5rem"
                            },

                            items: [
                                {
                                    icon: "fas fa-arrow-left",
                                    maxWidth: "4.5rem",
                                    action: () => kiss.router.navigateTo({
                                        ui: "landing-page"
                                    })
                                },
                                {
                                    type: "select",
                                    label: "Examples",
                                    minWidth: "15rem",
                                    fieldWidth: "100%",
                                    height: "4rem",
                                    margin: "0 0.5rem 0 0",
                                    options: [
                                        {
                                            label: "Field types",
                                            value: "code_fields",
                                            color: "var(--blue)"
                                        },
                                        {
                                            label: "Simple panel",
                                            value: "code_panel",
                                            color: "var(--purple)"
                                        },
                                        {
                                            label: "Complete layout",
                                            value: "code_layout",
                                            color: "var(--red)"
                                        },
                                        {
                                            label: "Datatable view",
                                            value: "code_datatable",
                                            color: "var(--pink)"
                                        },
                                        {
                                            label: "Kanban board",
                                            value: "code_kanban",
                                            color: "var(--orange)"
                                        },
                                        {
                                            label: "Calendar view",
                                            value: "code_calendar",
                                            color: "var(--yellow)"
                                        },
                                        {
                                            label: "Timeline view",
                                            value: "code_timeline",
                                            color: "var(--green)"
                                        },
                                        {
                                            label: "Gallery view",
                                            value: "code_gallery",
                                            color: "var(--gray)"
                                        },
                                        {
                                            label: "Database & ORM",
                                            value: "code_ORM",
                                            color: "#000000"
                                        }
                                    ],
                                    value: "code_fields",
                                    events: {
                                        change: function() {
                                            const newCode = this.getValue()
                                            $("code").setValue(eval(newCode))
                                        }
                                    }
                                },                                
                                {
                                    text: "Save code",
                                    icon: "fas fa-save",
                                    action: function () {
                                        const code = $("code").getValue()
                                        localStorage.setItem("code", code)
                                        this.setAnimation({
                                            name: "zoomIn",
                                            speed: "faster"
                                        })
                                    }
                                },
                                {
                                    text: "Restore saved code",
                                    icon: "fas fa-share",
                                    action: () => {
                                        const lastCode = localStorage.getItem("code")
                                        $("code").setValue(lastCode)
                                    }
                                },
                                {
                                    text: "Reset",
                                    icon: "fas fa-bolt",
                                    action: () => {
                                        $("code").setValue("{\n    type: 'text',\n    label: 'Hello world'\n}")
                                    }
                                }
                            ]
                        },
                        // CODE
                        {
                            id: "code",
                            type: "codeEditor",
                            height: "calc(100vh - 12rem)",
                            fieldHeight: "calc(100vh - 12rem)",
                            width: "100%",
                            fieldWidth: "100%",
                            value: defaultCode,
                            events: {
                                change: () => $(id).updateOutput()
                            }
                        }
                    ]
                },
                // OUTPUT
                {
                    id: "output",
                    type: "html",
                    flex: 1,
                    overflow: "auto",
                    margin: "0 0 0 1rem",
                    boxShadow: "var(--shadow-4)"
                }
            ],

            methods: {
                load() {
                    this.updateOutput()
                },

                updateOutput() {
                    try {
                        if (lastComponent) lastComponent.deepDelete()
                        $("output").innerHTML = ""

                        const codeAsAstring = $("code").getValue()
                        const code = Function('"use strict"; return (' + codeAsAstring + ')')()

                        lastComponent = createBlock({
                            target: "output",
                            width: "100%",
                            height: "100%",
                            items: [code]
                        }).render()

                        $(id).panelHeader.style.background = "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(50,9,121,1) 35%, rgba(0,212,255,1) 100%)"
                        $(id).setTitle("Live test - All good 🙂")

                    } catch (err) {
                        $(id).panelHeader.style.background = "var(--red)"
                        $(id).setTitle("Live test - Error 😢")
                    }
                }
            }
        })
    }
})

;kiss.app.defineView({
    id: "timeline-content",
    renderer: function (id, target) {
        // Build a fake collection
        let fakeModelTemplate = createFakeModel("timeline")
        fakeModelTemplate.id = "fakeTimeline"
        let fakeModel = new kiss.data.Model(fakeModelTemplate)
        let fakeCollection = fakeModel.collection

        // A timeline needs columns definition.
        // Here, we use a special method of the model to use the field definitions as columns
        let columns = fakeModel.getFieldsAsColumns()
        columns.forEach(column => {
            column.hidden = !(["gameName", "category", "platform", "reviewed"].includes(column.id))
        })

        //
        // Create the timeline
        //
        let timeline = createTimeline({
            id: "myTimeline",
            color: "#00aaee",
            collection: fakeCollection,
            columns,
            colorField: "category",
            startDateField: "releaseDate",
            endDateField: "reviewDate",

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
                        $("myTimeline").sortBy([{
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
                        $("myTimeline").groupBy(["category", "platform"])
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
                timeline
            ],

            methods: {
                load: () => {
                    if (fakeCollection.records.length > 0) return

                    // Insert some fake records
                    const fields = fakeModel.getFields()
                    let fakeRecords = kiss.db.faker.generate(fields, 200)

                    // Review date is a random date between release date and release date + 30 days
                    fakeRecords.forEach(record => {
                        const releaseDate = new Date(record.releaseDate)
                        const delay = Math.floor(Math.random() * 30) + 1
                        record.reviewDate = kiss.formula.ADJUST_DATE(releaseDate, 0, 0, delay, 0, 0, 0)
                    })
                    kiss.db.insertMany("fakeTimeline", fakeRecords)
                }
            }
        })
    }
})

;kiss.doc.timelines = /*html*/
`
KissJS timelines allow you to visualize your tasks and events in a timeline view.
`

;kiss.app.defineView({
    id: "timeline-menu",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            defaultConfig: {
                height: 40,
                textAlign: "left",
                iconSize: "18px",
                iconColor: "#8aa2c8",
                borderColor: "#e3e5ec",
                borderWidth: "1px 0px 0px 0px",
                borderRadius: "0px",
                backgroundColor: "#f3f5f7",
                colorHover: "#00aaee",
                iconColorHover: "#00aaee",
                backgroundColorHover: "#e5e9ec"
            },

            layout: "vertical",
            items: [{
                    type: "html",
                    html: "Timeline",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: "Example with 1000 records",
                    icon: "fas fa-info",
                    action: () => kiss.router.navigateTo({
                        anchor: "Introduction about KissJS timeline"
                    })
                },
                {
                    type: "button",
                    text: "Back to Home",
                    icon: "fas fa-arrow-left",
                    fontWeight: "bold",
                    action: () => kiss.router.navigateTo({
                        ui: "start",
                        section: "home"
                    })
                }
            ]
        })
    }
})

;kiss.app.defineView({
    id: "tutorials-content",
    renderer: function (id, target) {
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
                    showCase(kiss.doc.tutorial_01_title, kiss.doc.tutorial_01, {
                        demo: true,
                        url: "./tutorials/tutorial_01/index.html"
                    }),
                    showCase(kiss.doc.tutorial_02_title, kiss.doc.tutorial_02, {
                        demo: true,
                        url: "./tutorials/tutorial_02/index.html"
                    }),
                    showCase(kiss.doc.tutorial_03_title, kiss.doc.tutorial_03, {
                        demo: true,
                        url: "./tutorials/tutorial_03/index.html"
                    }),
                    showCase(kiss.doc.tutorial_04_title, kiss.doc.tutorial_04, {
                        demo: true,
                        url: "./tutorials/tutorial_04/index.html"
                    }),
                    showCase(kiss.doc.tutorial_05_title, kiss.doc.tutorial_05),
                    showCase(kiss.doc.tutorial_06_title, kiss.doc.tutorial_06, {
                        demo: true,
                        url: "./tutorials/tutorial_06/index.html"
                    }),
                    showCase(kiss.doc.tutorial_07_title, kiss.doc.tutorial_07, {
                        demo: true,
                        height: 800,
                        url: "./tutorials/tutorial_07/index.html"
                    }),                    
                    showCase(kiss.doc.tutorial_08_title, kiss.doc.tutorial_08, {
                        demo: true,
                        height: 800,
                        url: "./tutorials/tutorial_08/index.html"
                    }),
                    showCase(kiss.doc.tutorial_09_title, kiss.doc.tutorial_09, {
                        demo: true,
                        height: 800,
                        url: "./tutorials/tutorial_09/index.html"
                    })
                ]
            }]
        })
    }
})

;/**
 * TUTORIAL 01
 */
kiss.doc.tutorial_01_title = "01 - Using UI components"

kiss.doc.tutorial_01 = /*html*/
    `KissJS comes with a few pre-built components that will help you build a user interface **programmatically**.
Building an interface **programmatically** means you can use complex logic to build any user interface using only Javascript.
This tutorial demonstrates how to create a "Hello World" modal window, containing a **form** with some **fields** and a **button**.
You can see the live demo below.

Now, let's explain this tutorial step by step.
First of all, we create 3 types of fields (text, date, checkbox):

    // Build a text field
    const myTextField = createTextField({
        label: "I'm a text field",
        placeholder: "Enter something",
        labelWidth: 200,
        fieldWidth: 300
    })

    // Build a date field
    const myDateField = createDateField({
        label: "I'm a date field",
        labelWidth: 200,
        fieldWidth: 300
    })

    // Build a checkbox field
    const myCheckbox = createCheckbox({
        label: "I'm a checkbox",
        shape: "switch", // Try "check", "square", "circle", "star"
        iconColorOn: "#3bc48c",
        iconColorOff: "#cccccc",
        labelWidth: 200,
        fieldWidth: 300
    })

Then, we create a **container** to embed those 3 fields.
KissJS containers are **Blocks** or **Panels**.
They can have embedded **items**.

In the example below, note how:
* we created a **Block** element
* we inserted our 3 previous fields into the **items** property of the block
* we inserted a 4th field directly using its JSON configuration: not only it's possible, but it's the recommanded practice


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

            // We can also add components directly by inserting their JSON configuration inline.
            // Here, we create a "Select" field (= dropdown list = combobox)
            {
                type: "select",
                label: "I'm a select field",
                value: ["Option A", "Option C"], // Default values

                // "multiple: true" allows to select multiple values
                multiple: true,

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

Now, we create a **button** component.
To manage the **click** event of the button, we use its **events** property.
In this example, clicking the button retrieves all the form values and display them in the console:

    // Create a button
    const myButton = createButton({
        text: "Shake me to get the form values (check the console, too)",
        icon: "fas fa-thumbs-up", // Font awesome icons
        iconSize: "24px",
        iconColor: "#00aaee",
        
        // CSS properties can be applied directly on the component
        width: "100%",
        margin: "20px 0px 0px 0px",
        borderRadius: "20px 0px 20px 0px",

        // The components can have an "events" property to manage all the W3C DOM events
        events: {

            // Here, we want to capture the button "click" event.
            // Note: you can use various conventions for event names because the event name is normalized internally: click, onclick, onClick
            // You should always prioritize W3C standards, though
            click: function(event) {

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

Now we have a **form** containing a few **fields**, and a **button** to retrieve the values.
We will create a **panel** to embed the form and the button in a clean layout.

    // Now build a draggable window containing the form and the button
    const myModal = createPanel({
        id: "sample-draggable-window",
        title: "Drag me",
        draggable: true,
        closable: true,

        // W3C styles properties
        top: "25%",
        width: 500,
        align: "center",
        boxShadow: "10px 10px 10px #555555",

        // It's also possible to target specific classes to style components and sub-components
        styles: {
            "this": "border-radius: 20px 5px 20px 5px", // Styling the base component (this)
            "panel-header": "border-radius: 20px 5px 0px 0px" // Styling a sub-component
        },

        // ... and if you don't like having inline style in your component, you can just apply classes at any level
        classes: {
            "this": "my-panel-class", // The component itself
            "panel-header": "my-panel-header",
            "panel-body": "my-panel-body"
        },

        items: [
            myForm,
            myButton
        ]
    })

Using the method "createPanel" generated an HTMLElement which is *detached* from the DOM.
To display our panel, we must attach it to the DOM, which is done using the "render" method, like this:

    myModal.render()

Well done!
You've just created a simple UI using KissJS components, and you've learned how to create:
- some fields (a Text field, a Date field, a Checkbox field, then a Select field)
- a button, with custom attributes
- a container (a simple Block and a nice Panel)
`

/**
 * Tutorial 02
 */
kiss.doc.tutorial_02_title = "02 - Creating an application view"

kiss.doc.tutorial_02 = /*html*/
    `When you create a Web application, you generally need multiple **views**.

In KissJS, a view is simply a **function that returns an <a href="https://developer.mozilla.org/fr/docs/Web/API/HTMLElement">HTMLElement</a>**.
And that's really all you have to know.
It can be anything from a very simple element to a complex layout with many components and nested components.

Let's see how to create a **view** with KissJS:

1. Add your view function to your app, using **kiss.app.defineView**:


    kiss.app.defineView({
        id: "dummy",
        renderer: function (id, target) {
        // ... put your code here, then return an HTMLElement
        }
    })

This will push your view function into a repository containing all your view functions.
We call this repository the **View manager**.
The view manager will handle a few tricks for you, like showing/caching/hiding/cleaning your views in an easy manner.
 
2. Create an HTML Element inside your view function.
It can be any standard HTML (div, span, p, table...) or a custom Web Component as well:


    const myDummyElement = document.createElement("div")
     
3. IMPORTANT: set its **id** property
This will help KissJS keep track of this specific view.


    myDummyElement.id = id

4. OPTIONAL: set its **target** property.
This will tell KissJS WHERE you want to insert your view into the DOM:


    myDummyElement.target = target

5. Insert your content into your HTMLElement.


    myDummyElement.innerHTML = "<center><h1>HELLO WORLD</h1></center>"
     
6. Return your HTMLElement.
Hey, this **is** your view!


    return myDummyElement


If we put it all together, we have something like this:


    kiss.app.defineView({
        id: "dummy",
        renderer: function (id, target) {
            const myDummyElement = document.createElement("div")
            myDummyElement.id = id
            myDummyElement.target = target // Optional
            myDummyElement.innerHTML = "<center><h1>HELLO WORLD</h1></center>"
            return myDummyElement
        }
    })


Each view can (and should) be stored in a separate file.
When you want to display one of your views, call the **kiss.views.show** function using the **view id** as a parameter:


    kiss.views.show("dummy")


As you are likely to use **kiss.views.show("...")** very often, you might want to create an alias function for it.
Of course, it's really up to you.
For example:


    const showView = kiss.views.show
    showView("dummy")
    
`

/**
 * Tutorial 03
 */
kiss.doc.tutorial_03_title = "03 - Multiple views and components"

kiss.doc.tutorial_03 = /*html*/
    `We've seen before that a KissJS **view** must return an **HTMLElement**.
As KissJS components derive from HTMLElement, a view can directly return a KissJS component.

This demo illustrates:
- how we can build our views using KissJS components
- how we define multiple views
- how we can switch views using methods of the **view manager**

For the sake of simplicity, we have defined 2 views in the same file, but separating views in different files is considered a better practice:

    // Let's define View 1...
    kiss.app.defineView({
        id: "view1",
        renderer: function (id, target) {

            // The view will be a KissJS panel:
            const myPanel = createPanel({
                id: id,
                title: "VIEW 1",
                position: "absolute",
                draggable: true,
                align: "center",
                boxShadow: "0px 0px 64px #223344",
        
                items: [
                    {
                        type: "html",
                        html: "I'm the VIEW 1",
                        padding: "20px",
                        style: "text-align: center; font-size: 32px; color: #00aaee;"
                    },
                    {
                        type: "button",
                        text: "Click to jump to view 2",
                        icon: "fas fa-rocket",
                        iconSize: "32px",
                        fontSize: "32px",
                        padding: "20px",
                        iconPadding: "0px 50px 0px 0px",
                        
                        // The button click event will replace view1 by view2
                        events: {
                            click: function() {
                                kiss.views.replaceBy("view2")
                            }
                        }
                    }
                ]
            })

            // The view can return a KissJS Component
            // (KissJS components derive from HTMLElement, so, they're considered as standard DOM elements)
            return myPanel
        }
    })

    // Let's define View 2...
    kiss.app.defineView({
        id: "view2",
        renderer: function (id, target) {
        
            // We can directly return the KissJS panel...
            return createPanel({
                id: id,
                title: "VIEW 2",
                position: "absolute",
                draggable: true,
                align: "center",
                headerBackgroundColor: "#7112FC",
                boxShadow: "0px 0px 64px #223344",
        
                items: [
                    {
                        type: "html",
                        html: "I'm the VIEW 2",
                        padding: "20px",
                        styles: {
                            "this": "text-align: center; font-size: 32px; color: #7112FC"
                        }                    
                    },
                    {
                        type: "button",
                        text: "Go back to view 1",
                        icon: "fas fa-arrow-left",
                        iconSize: "32px",
                        fontSize: "32px",
                        padding: "20px",
                        iconPadding: "0px 50px 0px 0px",
                        
                        // Same as before, but using "action" as a shortcut to replace "events > click"
                        // and also using arrow functions syntax (javascript ES6)
                        // This is much shorter!
                        action: () => kiss.views.replaceBy("view1")
                    }
                ]
            })
        }
    })

Displaying the first view is done with the view manager **show** method:

    kiss.views.show("view1")

Replacing a view by another can be done using the view manager **replaceBy** method:

    kiss.views.replaceBy("view2")

And you get the result below:
`

/**
 * Tutorial 04
 */

 kiss.doc.tutorial_04_title = "04 - Using external view controllers"

 kiss.doc.tutorial_04 = /*html*/
     `In some situations, putting all the logic directly inside the view definition can lead to long scripts that are difficult (and boring) to maintain.
For this, it's possible to separate the **view definition** and the **view controller** in separate files.
 
The **Controller** is automatically associated to the **View** if it has the same id.
 
When you organize your files into your project, we suggest that you name your controller like your view, like below.
Of course, it's really your decision here, nothing mandatory:
 
    //
    // yourView.js
    //
    kiss.app.defineView({
        id: "**YOUR_VIEW_ID**",
        renderer: function (id, target) {
            // Your code here, which returns a HTMLElement
        }
    })

    //
    // yourView.controller.js
    // Basically, it's just a list of methods that will be associated to your view
    //
    kiss.app.defineViewController("**YOUR_VIEW_ID**", {
        method1: function() {
            // ...
        },
        method2: function() {
            // ...
        }
    })
`

/**
 * Tutorial 05
 */
kiss.doc.tutorial_05_title = "05 - Using the client router"

kiss.doc.tutorial_05 = /*html*/
    `KissJS **client router** is a very convenient way to **navigate between views**.
As we've seen before, you can directly display a specific view using the syntax:

    kiss.views.show("YOUR_VIEW_ID")

But you can also use the client router using this syntax:

    kiss.router.navigateTo({
        ui: YOUR_VIEW_ID
    })

What's the difference? A lot:
- the router will display your view as the main **ui** *(ui = user interface)*
- it will change the url #hash to .../index.html#ui=YOUR_VIEW_ID
- it will push the url #hash change into the browser history, so that using the **back** button works fine

This has a few advantages listed below:
## Single Page Application
As it manipulates the #hash and not the path, the page won't reload and you can use the router to build a SPA.

## Deep linking
The **ui** parameter is required, but you can provide other parameters to the router, like this:

    kiss.router.navigateTo({
        ui: YOUR_VIEW_ID,
        sectionId: "123",
        chapterId: "456"
    })

The url #hash will then change to **.../index.html#ui=YOUR_VIEW_ID&sectionId=123&chapterId=456**
This can be used to implement [deep linking](https://en.wikipedia.org/wiki/Deep_linking) in your application.

## Application context
The current #hash parameters reflect the **context** of your application.
To know this context, you can use the following syntax:

    const context = kiss.router.getRoute()

It will return an object like this:

    {
        ui: YOUR_VIEW_ID,
        sectionId: "123",
        chapterId: "456"
    }

This way, you can use the router to handle some of your global application states.

## It also works offline
KissJS client router works perfectly with local file path (file:///C:/project/index.html#ui=start)
It means you can start coding an SPA with multiple views and files **without any server at all**.
You just need a code editor and you're good!

## It's asynchronous
The **route()** method is async, so you can do stuff like:

    kiss.router.navigateTo({
        ui: YOUR_VIEW_ID
    })
    .then(doSomethingElse)

To see the router in action:
- <a href="./tutorials/tutorial_05/index.html" target="_new">open this demo</a>
- keep an eye on the url
- check the javascript console
- play with the **back button** of your browser to see how the router updates your application without reloading the page
`

/**
 * Tutorial 06
 */
 kiss.doc.tutorial_06_title = "06 - Using the built-in PubSub"

 kiss.doc.tutorial_06 = /*html*/
    `PubSub stands for **Publish/Subscribe** and is a core mechanism used by KissJS to establish communication between components.

The components which are **publishing** messages into a channel have absolutely no knowledge about the components that are **subscribed** to the channel.
This way, KissJS enforces a very loose coupling system.

We subscribe a function to a channel using **kiss.pubsub.subscribe**, or simply **subscribe**

    subscribe(channelId, function(messageData) {
        // ... do whatever you want with messageData
    })


We publish a message on a channel using **kiss.pubsub.publish**, or simply **publish**

    publish(channelId, messageData)

The message data can be *anything*: a string, an object, an array, a class instance...
In the example below, we send JSON data in the channel "EVT_USER_RENAMED":

    publish("EVT_USER_RENAMED", {
        userId: 123,
        newName: "Bob Wilson"
    })

Any function subscribed to the channel "EVT_USER_RENAMED" will receive our JSON as an input parameter:

    subscribe("EVT_USER_RENAMED", function(messageData) {
        console.log("User id: " + messageData.userId)
        console.log("New user name: " + messageData.newName)
    })


You can use PubSub for any purpose, and not only for KissJS components.
KissJS components have a built-in mechanism to easily subscribe a component to one or more channels, thanks to the **subscriptions** property.
For example:

    const fieldUsername = createTextField({
        label: "User name",

        // Here, we subscribe our text field component to 2 channels: "EVT_USER_RENAMED" and "EVT_USER_RESET"
        subscriptions: {
            
            // The field will be updated when a message will be emitted on the channel "EVT_USER_RENAMED"
            EVT_USER_RENAMED: function (msgData) {
                const newUserName = msgData.newName
                this.setValue(newUserName)
            },

            // We can also emit a message without any data:
            EVT_USER_RESET: function() {
                this.setValue("")
            }
        }
    })
 `

/**
 * Tutorial 07
 */
kiss.doc.tutorial_07_title = "07 - A Todo app in less than 200 lines"

kiss.doc.tutorial_07 = /*html*/
    `
This next example shows how to build a simple Todo list application like the one demonstrated on TodoMVC website:
http://todomvc.com/

Without all the comments, our Todo app is less than 200 lines of code, and you can:
- add a Task
- remove a Task
- check / uncheck a Task
- edit a Task name (double-click)
- filter Tasks (All / Active / Completed)
- display a Status (ex: 7 items left)
- export Tasks status as JSON
`

/**
 * Tutorial 08
 */
kiss.doc.tutorial_08_title = "08 - A Todo app using MVC"

kiss.doc.tutorial_08 = /*html*/
    `
In the previous tutorial, we built a simple and monolithic Todo app to show how easy it is to create a small application using **KissJS**.
Here, we'll build another one using the clean **MVC** pattern.

A few notes:
- We have split the code into 3 files: **model**, **view**, **controller**, and **index** makes the glue between them.

- **Model**: KissJS embeds an ORM (Object-Relational Mapping) and a persistent offline database supporting standard NoSQL operations using MongoDb syntax.
Defining a **Task** model automatically generates:
    - a Model instance in **kiss.app.models.task**
    - a Collection of tasks in **kiss.app.collections.task**

- **View**: the view is the user interface.
In this case, we have used 2 KissJS **panels** to display the tasks: one for the tasks to do, one for the tasks done.

- **Controller**: the controller is the logic of the application. It's the **Controller** of the tasks.
It's responsible for:
    - loading tasks from the database
    - creating a new task
    - updating a task status
    - updating a task name
    - removing a task

The view is automatically refreshed when the database is updated.
This is **not** due to data binding.
This is because KissJS provides a pubsub mechanism to notify the view when the database is updated.
In our case, the view is subscribed to the insert, update and delete events of the **Task** model.
`

/**
 * Tutorial 09
 */
kiss.doc.tutorial_09_title = "09 - Let's have fun with Talking blocks"

kiss.doc.tutorial_09 = /*html*/
    `Our **talking blocks** are an interesting way to teach object oriented programming to beginners.

In this small application, you can click on 2 different blocks to make the 1st block jump on the 2nd one.
Things become interesting when the target block already has other blocks over it.
In this situation, you'll see how the blocks are starting to "talk" together to find a solution to the problem, jumping everywhere.
The more blocks involved, the more fun!

Why is it interesting?
Because it shows that we only need 3 simple methods to make the auto-organization happen:
- **goOver**: a block wants to go on another block
- **freeYourself**: a block asks to a destination block to free itself from the block(s) over it
- **goAway**: a block asks the block over itself to go away

KissJS provides all the necessary stuff to:
- create the block's **design**, using a simple **Html** component
- embed the block's **logic**, using the component's **methods** property
- react to mouse events, using the component's **events** property
- animate the blocks using the built-in **showAt** method
- create a **console** to display the "dialog" between blocks

On top of this, the demo makes extensive use of async/await to keep the logic in sync with the asynchronous animations.`

;kiss.app.defineView({
    id: "tutorials-menu",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            defaultConfig: {
                height: 40,
                textAlign: "left",
                iconSize: "18px",
                iconColor: "#8aa2c8",
                borderColor: "#e3e5ec",
                borderWidth: "1px 0px 0px 0px",
                borderRadius: "0px",
                backgroundColor: "#f3f5f7",
                colorHover: "#00aaee",
                iconColorHover: "#00aaee",
                backgroundColorHover: "#e5e9ec"
            },

            layout: "vertical",
            items: [{
                    type: "view",
                    id: "logo"
                },
                {
                    type: "html",
                    html: "Tutorials & demos",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_01_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_01_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_02_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_02_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_03_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_03_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_04_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_04_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_05_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_05_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_06_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_06_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_07_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_07_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_08_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_08_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_09_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_09_title
                    })
                },
                {
                    type: "button",
                    text: "Back to Home",
                    icon: "fas fa-arrow-left",
                    fontWeight: "bold",
                    action: () => kiss.router.navigateTo({
                        section: "home",
                        anchor: "What is KissJS?"
                    })
                }
            ]
        })
    }
})

;
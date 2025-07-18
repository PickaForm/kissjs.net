/**
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
| mapView | A map view (encapsulates OpenLayers)
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
;
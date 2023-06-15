/**
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
- <a href="../tutorial_05/index.html" target="_new">open this demo</a>
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
 * Tutorial 09
 */
kiss.doc.tutorial_09_title = "09 - A Todo app in less than 200 lines"

kiss.doc.tutorial_09 = /*html*/
    `Yes. Tuto 07 and 08 were eaten by a quantic vortex. They are on their way back. Soon.

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
 * Tutorial 10
 */
kiss.doc.tutorial_10_title = "10 - Let's have fun with Talking blocks"

kiss.doc.tutorial_10 = /*html*/
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

;
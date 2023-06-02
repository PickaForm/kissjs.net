/**
 * INTRODUCTION
 */
kiss.doc.concepts = /*html*/
`
KissJS is a simple javascript library to build web applications.
It stands for **Keep It Simple Stupid Javascript**, because it was built following the KISS principles.

KissJS has been developed and is owned by the startup PickaForm, **a no-code platform to build business applications easily**.
For any request or question, please contact me at: david.grossi[at]pickaform.com

KissJS was born from the frustration that all mainstream libraries (or frameworks) like Angular, React, Vue, ExtJS, Webix, ... are easy to learn, but very difficult to master.
I deeply believe that web development should be user friendly, and should not require mastering **anything beyond Javascript, HTML and CSS**.

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

Actually, yes: <a href="https://en.pickaform.fr" target="_new">that</a>.

Thanks to the simplicity of the library, I was able to build a complete no-code platform similar to AirTable and Infinity, but with features that are more focused on bigger companies (aka my current customers).

For example:
- better form layout capabilities when there are many fields in a record (by many, I mean +200 fields in a single form. I have customers in Insurance and Banking business who do that)
- a real workflow engine, worklow in the sense of "business process", and not "workflow automation"
- ability to generate PDF documents by filling Microsoft Word templates with form data
- a good security layer which enables the users to fine tune the access for workspaces, apps, models, and views
- a more flexible architecture where models and views can be shared among multiple applications
- a speed that would require a lot of optimization efforts with React, Angular or Vue: those frameworks are fantastic to build web products and mobile apps, but not very well suited to build very fast business apps
- don't believe me about the speed? Load 100 000 records into Infinity (a Vue app), then compare their datatable performance with KissJS datatable, and don't forget to open the dev panel to check memory leaks...
This performance of KissJS is native: you don't have anything to optimize. It's just fast out-of-the-box.

As far as "business apps" are concerned, ExtJS was very good at building this, but then became this huge monster with so many tentacles (not to mention the price).
Webix is still probably one of the best out there, but a bit expensive compared to its non-existent community, and unfortunately I've sometimes been stuck with bugs that took months to be fixed.
In the end, I needed something "between" these worlds, which allowed me to build UIs quickly and mainly with JS, but requiring no complexity, no building process, no complex and imposed architecture.
And if possible, something as standard as possible: why should a field property be called "mandatory" when the W3C has the property "required"?

Well, in a nutshell: **something simple**.

Oh... did I mention that I built this no-code platform alone?
I couldn't have done it without KissJS, so yes: it works.
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

Sure, it's much longer to write, and performances are not optimal because of extra assignment steps.
Nevertheless, if not used in huge loops, the extra milliseconds necessary to execute dumb code are transparent to the end-users.
As a result, the code is much easier to read and understand for humans.
And we **prefer (dumb) humans** to machines.

Dumb code is used everywhere in KissJS, except when it can impact too much rendering performances or user experience.
`

kiss.doc.beliefs = /*html*/
`
I have a pretty good background in computer games - I started at 8 years old with [Donkey Kong Junior on an LCD screen](https://www.youtube.com/watch?v=qpf5gpQ0i28) - and since then, I've been amazed at the evolution in the video games industry.
I have probably seen, played, and enjoyed all the evolutions and revolutions in video games.
Video games led me to become a computer engineer at the end of the last millennium (yeah, I know...)

Although I spent 6 years in the video games industry as a project manager, my main activity was to create custom applications for all types of business, large and small, regardless of the technology available, but mainly using IBM software.
I have developed and delivered over 100 applications for my clients and eventually became an IBM Champion in 2019 for my collaboration platform called PickaForm, a no-code platform based on IBM technology, targeting non-technical people to create their own business applications.

I got this title not because of the technical side, but because of the product itself and the main philosophy behind it: building business applications using only very simple components.
With PickaForm, you can really build useful applications for your business using just a few forms and built-in features like "workflows", "Form to PDF", "file attachments", "comments", "tagging"...
PickaForm concepts were born before Podio, before Quickbase, before AirTable, before FormStack, before the so-called "no-code" era.

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

KissJS is my personal attempt to keep things as simple as possible.
I'm also clear-headed:
- I will probably reinvent the wheel (again)
- I will probably make the same mistakes other people have made before me
- there are many people who are much smarter than me and who would have done much better than me, in many ways

But... I had fun building it, and I'm happy to share it!
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
KissJS <a href="javascript:kiss.router.navigateTo({ui: 'start', section: 'datatables'})">datatable</a> is highly capable.
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
Insert this code into the **head** of your index.html file.
Don't forget to adjust the paths according to your project:

    <!-- FONT AWESOME -->
    <link rel="stylesheet" href="./webfonts/fontawesome-all.min.css"/>

    <!-- KISSJS STYLES & COMPONENTS -->
    <link rel="stylesheet" href="./kissjs.min.css"/>
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
- <a href="./resources/lib/kissjs/kissjs.css" download>Style sheet</a>

3/ Not required, but can help:
- <a href="./resources/doc/index.html" download>Sample index.html</a>
- <a href="./resources/doc/index.js" download>Sample index.js</a>

In case you decide to use the sample **index.html** and sample **index.js** above, please copy all the webfonts resources inside a webfonts subfolder, so that your project looks like:
    **webfonts**/fa-brands-400.woff2
    **webfonts**/fa-regular-400.woff2
    **webfonts**/fa-solid-900.woff2
    **webfonts**/fontawesome-all.min.css
    index.html
    index.js
    kissjs.min.css
    kissjs.min.js

`

kiss.doc.codingStyle = /*html*/
`
KissJS has the following coding style, and you won't necessary agree with it.

**No semicolon**
Except the one at the end of a js file in order to avoid problems with minification. And that's it.
If you wonder why, it's because semicolons are unuseful extra characters that don't even always solve the [ASI problem](https://medium.com/@DanInProgress/javascript-semicolons-are-bad-actually-7c311195001c).
Why should I type extra characters, then?

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
Nearly every javascript library I know sticks to single quotes, but I'm not really sure why.
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

;
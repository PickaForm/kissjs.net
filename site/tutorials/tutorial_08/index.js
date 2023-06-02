/**
 * POC to integrate a MAP with KissJS datatable
 */
window.onload = async function () {

    // Init KissJS application
    kiss.app.init()

    /**
     * Load some records from the StarWars public API
     */
    async function loadRecordsFromStarWarsApi() {

        // The simplest way to get data from a REST endpoint is using the kiss.ajax object:
        // Here, we use a public api which returns the list of Star Wars starships in the "results" property:
        const response = await kiss.ajax.request({
            url: "https://www.swapi.tech/api/starships?page=1&limit=100"
        })
        let records = response.results

        // KissJS has 3 database wrappers: db.memory, db.offline, and db.online
        // Lets start pushing the resulting data into an in-memory database:
        await db.memory.insertOne("spaceship", records)

        // Now, we have a database!
        // We can perform basic CRUD operations on it.
        // Here, we retrieve the records to see if they were inserted properly:
        
        //let localRecords = await db.memory.find("spaceship", {})
        //log("Local records are...")
        //log(localRecords)
    }

    // Uncomment to load data from the public API
    await loadRecordsFromStarWarsApi()

    // Because each view needs its own data, we will proxy the data using a "Collection".
    // kiss.data.Collection class acts as a proxy for the database,
    // and adds some useful methods to work with your data.
    // To build a Collection, we also need a Model to structure the data. So, we do:
    let newModel = new kiss.data.Model({
        id: "spaceship",
        name: "Star Wars spaceship",
        namePlural: "Star Wars spaceships",
        fields: [{
                id: "uid",
                label: "UID",
                type: "text"
            },
            {
                id: "name",
                label: "Name",
                type: "text"
            },
            {
                id: "url",
                label: "URL",
                type: "text"
            }
        ]
    })

    let newCollection = new kiss.data.Collection({
        mode: "memory",
        model: newModel
    })

    // A datatable needs columns definition.
    // Here, we map the collection's fields:
    let columns = newCollection.model.getFields().map(field => {
        return {
            id: field.id,
            type: field.type,
            title: field.label.toTitleCase()
        }
    })

    // Button column: using the built-in button columns
    columns.push({
        title: "Text only",
        type: "button",
        button: {
            text: "Trash this",
            action: (rowIndex, colIndex, recordId, record) => {
                log(record)
            }
        }
    })

    columns.push({
        title: "Icon only",
        type: "button",
        button: {
            icon: "fas fa-trash",
            action: (rowIndex, colIndex, recordId, record) => {
                log(record)
            }
        }
    })

    columns.push({
        title: "Icon and tip",
        type: "button",
        button: {
            icon: "fas fa-trash",
            tip: "Delete this",
            action: (rowIndex, colIndex, recordId, record) => {
                log(record)
            }
        }
    })

    columns.push({
        title: "All of that",
        type: "button",
        button: {
            text: "Delete",
            icon: "fas fa-trash",
            tip: "Trash this",
            action: (rowIndex, colIndex, recordId, record) => {
                log(record)
            }
        }
    })

    // Button column: using a custom renderer and a function declared in the global scope
    columns.push({
        title: "100% custom",
        renderer: function (cellRawValue, rowIndex, colIndex, recordId) {
            return `<span style="padding: 10px; box-shadow: 3px 3px 3px #dddddd; border-radius: 10px; color: #ffffff; background: #23c48c; cursor: pointer" onclick="YOUR_GLOBAL_METHOD_NAME('${recordId}')">
                        Row: ${rowIndex}
                    </span>`
        }
    })

    window.YOUR_GLOBAL_METHOD_NAME = function (recordId) {
        let record = newCollection.records.get(recordId)
        log(record)
    }

    //
    // Create the datatable
    //
    let datatable = createDatatable({
        id: "myDatatable",
        color: "#8833EE",
        collection: newCollection,
        columns: columns,

        // Options
        canEdit: true,
        canAddField: false,
        canEditField: false,
        canCreateRecord: false,

        height: () => kiss.screen.current.height / 3 * 2,

        // Define the menu of actions
        customActions: [{
                text: "Show selection in the console",
                icon: "fas fa-check",
                action: async () => {
                    log(await $("myDatatable").getSelectedRecords())
                }
            },
            {
                text: "Filter records...",
                icon: "fas fa-rocket",
                action: () => {
                    $("myDatatable").openFilterWindow()
                }
            }
        ],

        // openRecord method is triggered when you click at the beginning of a row
        methods: {
            your_openRecord: (record) => {
                log(record)
                // YOUR CODE HERE TO CONTROL THE INTERACTIVE MAP
            }
        }
    })

    //
    // Create a block for the map
    //
    let map = createBlock({
        height: () => kiss.screen.current.height / 3,
        styles: {
            "this": "box-shadow: inset 0px -100px 100px #5500BB; line-height: 100px; background: #8833EE; color: #ffffff; font-size: 32px"
        },
        items: [{
            type: "html",
            html: "<center>:: INSERER LA CARTE INTERACTIVE ICI ::</center>",
        }]
    })

    //
    // Create the viewport containing the map and the datatable
    //
    return createBlock({
        //id: id,
        fullscreen: true,
        layout: "vertical",
        items: [
            map,
            datatable
        ]
    }).render()
};
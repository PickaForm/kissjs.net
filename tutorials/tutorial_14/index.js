/**
 * Ajax demo
 */
window.onload = async function () {
    // Get the data from the Star Wars API
    const endpoints = {
        SPACESHIPS: "https://swapi.dev/api/starships",
        PEOPLE: "https://swapi.dev/api/people",
        PLANETS: "https://swapi.dev/api/planets"
    }

    const response = await kiss.ajax.request({
        url: endpoints.PEOPLE
    })

    // Parse the 1st record to create the model
    const records = response.results
    const firstRecord = records[0]

    const modelFields = Object.keys(firstRecord).map(field => {
        const firstValue = firstRecord[field]

        let fieldConfig = {
            id: field,
            label: field,
            type: "text"
        }

        if (Array.isArray(firstValue)) {
            Object.assign(fieldConfig, {
                type: "select",
                options: []
            })
        } else if (kiss.tools.isNumber(firstValue)) {
            Object.assign(fieldConfig, {
                type: "number"
            })
        } else if (kiss.tools.isISODate(firstValue)) {
            Object.assign(fieldConfig, {
                type: "date"
            })
        }

        return fieldConfig
    })

    // Defines the model
    const model = kiss.app.defineModel({
        mode: "memory",
        name: "people",
        items: modelFields
    })

    // Format dates
    records.forEach(record => {
        Object.keys(record).forEach(field => {
            const value = record[field]
            if (kiss.tools.isISODate(value)) {
                record[field] = (new Date(value)).toISO()
                console.log(record[field])
            }
        })
    })

    model.collection.insertMany(records).then(response => {
        createDatatable({
            collection: model.collection,
            columns: model.getFieldsAsColumns(),
            height: () => kiss.screen.current.height - 200,
            canEdit: true
        }).render()
    })
};
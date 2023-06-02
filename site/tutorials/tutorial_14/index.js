/**
 * Ajax demo
 */
window.onload = async function () {
    const endpoints = {
        SPACESHIPS: "https://swapi.dev/api/starships",
        PEOPLE: "https://swapi.dev/api/people",
        PLANETS: "https://swapi.dev/api/planets"
    }

    kiss.ajax.request({
        
        // Pick your flavor :)
        url: endpoints.PEOPLE

    }).then(response => {

        kiss.db.mode = "memory"
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
            }
            else if (kiss.tools.isNumber(firstValue)) {
                Object.assign(fieldConfig, {
                    type: "number"
                })
            }
            else if (kiss.tools.isISODate(firstValue)) {
                Object.assign(fieldConfig, {
                    type: "date"
                })
            }

            return fieldConfig
        })

        const model = kiss.app.defineModel({
            name: "people",
            items: modelFields
        })

        model.collection.insertMany(records).then(response => {
            const dt = createDatatable({
                collection: model.collection,
                columns: model.getFieldsAsColumns(),
                height: 800,
                editable: true
            }).render()
        })
    })
};
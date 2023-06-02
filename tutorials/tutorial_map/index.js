/**
 * POC to integrate a MAP with KissJS datatable
 */

// Load KissJS extensions
kiss.loader.loadScripts([
    // LIBRARY EXTENSIONS
    "../../kissjs/client/ux/map/map",
    "../../kissjs/client/ux/map/ol",

    // VIEWS
    //"views/home/start",

])

kiss.loader.loadStyles([
    // LIBRARY EXTENSIONS
    "../../kissjs/client/ux/map/map",
    "../../kissjs/client/ux/map/ol",
    
    // VIEWS
    //"views/home/start"
])

window.onload = async function () {

    var vectorLayer = new ol.layer.Vector({
        title: "personalLayer",
        source: new ol.source.Vector()
    });

    // Init KissJS application
    kiss.app.init()

    /**
     * Load records from the public API
     */
    async function loadRecordsFromBanApi() {
        const response = await kiss.ajax.request({
            url: "http://beta.mobinav.com/geodab/geodab.php?limit=1000 "
        })

        const records = response.results

        records.forEach(element => {
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point([element.lon, element.lat]).transform('EPSG:4326', "EPSG:3857"),
                name: element.id,
                id: element.id
            })

            iconFeature.setId(element.id)
            vectorLayer.getSource().addFeatures([iconFeature])

        })

        // Push the resulting data into an in-memory database:
        await db.memory.insertOne("ban", records)
    }

    await loadRecordsFromBanApi()

    // Because each view needs its own data, we will proxy the data using a "Collection".
    // kiss.data.Collection class acts as a proxy for the database,
    // and adds some useful methods to work with your data (like grouping)

    // To build a Collection, we do:
    let newCollection = new kiss.data.Collection({
        mode: "memory",

        model: {
            id: "ban",
            name: "ban_address",
            namePlural: "ban address",
            fields: [{
                    id: "id",
                    label: "ID",
                    type: "int"
                },
                {
                    id: "numero",
                    label: "numero",
                    type: "text"
                },
                {
                    id: "suffixe",
                    label: "suffixe",
                    type: "text"
                },
                {
                    id: "nom_voie",
                    label: "nom_voie",
                    type: "text"
                },
                {
                    id: "code_postal",
                    label: "code_postal",
                    type: "text"
                },
                {
                    id: "nom_commune",
                    label: "nom_commune",
                    type: "text"
                },
                {
                    id: "lon",
                    label: "lon",
                    type: "float"
                },
                {
                    id: "lat",
                    label: "lat",
                    type: "float"
                }
            ]
        }
    })

    // A datatable needs columns definition.
    // Here, we map the collection's fields:
    let columns = newCollection.model.getFields().map(field => {
        return {
            id: field.id,
            type: field.type,
            title: field.label.toTitleCase(),

            // Custom renderer for cells
            renderer: function (value) {
                return `${(value != " ") ? `<span class="field-select-value">${value}</span>` : ""}`
            }
        }
    })

    //
    // Create the datatable
    //
    let datatable = createDatatable({
        id: "myDatatable",
        color: "#8833EE",
        collection: newCollection,
        columns: columns,

        // Options
        canEdit: false,
        canAddField: false,
        canEditField: false,
        canCreateRecord: false,

        height: () => kiss.screen.current.height / 2,
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
            openRecord: (record) => {
                console.log("Selected record > ", record.id, ' <> ', record);

                // Recherche l'objet ol qui correspond a l'id du record
                let feature = vectorLayer.getSource().getFeatureById(record.id);

                //Zoom sur la position de l'objet sur la carte
                map.map.getView().fit(feature.getGeometry(), {
                    maxZoom: 18
                });

                // On selectionne un element sur la carte
                selectSingleClick.getFeatures().clear();
                selectSingleClick.getFeatures().push(feature);
            }
        }
    })

    //
    // Gestion de la carte et des interactions
    //
    let map = createMap({
        height: kiss.screen.current.height / 2,
        methods: {
            load: function () {
                this.renderMap()
            }
        }
    })

    // Gestion de la selection des objets sur la carte
    var selectSingleClick = new ol.interaction.Select();
    map.map.addInteraction(selectSingleClick);

    selectSingleClick.on('select', function (e) {
        let selectFeature = e.selected[0];

        let rowIndex = datatable.collection.records.findIndex(record => record.id == selectFeature.getId());
        let r = datatable.collection.records[rowIndex];
        datatable.highlightRecord(r.id);
    });

    map.map.addLayer(vectorLayer);

    page = createBlock({
        fullscreen: true,
        layout: "vertical",
        items: [
            map,
            datatable
        ]
    });

    page.render();
};
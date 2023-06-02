// Load kissJS library dynamically
kiss.loader.loadLibrary()

window.onload = async function () {

    // Init the logger to log... nothing
    //kiss.logger.init({})


    const orderModel = new kiss.data.Model({
        id: "order",
        mode: "memory",

        name: "Order",
        namePlural: "Orders",

        items: [{
            type: "text",
            id: "currencyPair",
            label: "Currency pair"
        }, {
            type: "number",
            id: "orderCount",
            label: "Order count"
        }, {
            type: "number",
            id: "price",
            label: "Price"
        }, {
            type: "number",
            id: "quantity",
            label: "Quantity"
        }, {
            type: "text",
            id: "side",
            label: "Side"
        }]
    })

    let isLoaded = false

    const datatable = createDatatable({
        id: "Asks",
        color: "#00aaee",
        collection: orderModel.collection,

        rowHeight: 20,
        width: "100%",
        height: kiss.screen.current.height,
        showScroller: false,

        methods: {
            selectRecord: (rec) => createForm(rec)
        }
    }).render()

    await kiss.websocket.init({
        socketUrl: "wss://api.valr.com/ws/trade",

        onopen: () => {
            kiss.websocket.send({
                type: 'SUBSCRIBE',
                subscriptions: [{
                    event: 'AGGREGATED_ORDERBOOK_UPDATE',
                    pairs: ["BTCZAR"]
                }]
            })
        },

        onmessage: async (msg) => {
            const msgData = JSON.parse(msg.data)
            if (!msgData.data) return

            console.log(msgData.data)
            if (isLoaded) return
            const asks = msgData.data.Asks
            const bids = msgData.data.Bids

            await orderModel.collection.deleteMany({})
            
            asks.forEach(ask => {
                ask.quantity = Number(ask.quantity)
                ask.price = Number(ask.price)
            })

            await orderModel.collection.insertMany(asks)
            isLoaded = true
        }
    })
};
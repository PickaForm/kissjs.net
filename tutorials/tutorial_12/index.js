window.onload = async function () {

    // HTML template for table header
    const templateHeader = (name) => {
        return `
            <div class="header">
                <div class="header-title">${name}</div>
                <div class="header-columns">
                    <div class="header-column">ZAR Price</div>
                    <div class="header-column">BTC Amount</div>
                    <div class="header-column">BTC Total</div>
                </div>
            </div>
        `
    }

    // HTML template for table rows
    const templateRow = (data, color) => {
        return `
            <div class="data-row">
                <div class="data-cell ${color}">${Number(data.price)}</div>
                <div class="data-cell">${Number(data.quantity).toFixed(8)}</div>
                <div class="data-cell">${Number(data.sum).toFixed(8)}</div>
            </div>`
    }

    // Build the panel that will receives the 2 tables (asks & bids)
    // Most properties are just for cosmetic...
    createPanel({
        id: "orderbook",
        title: "Order book",
        icon: "fas fa-bolt",
        draggable: true,
        expandable: true,
        closable: true,
        closeMethod: "hide",
        layout: "horizontal",
        top: 50,
        left: 50,
        items: [
            // Insertion point for asks
            {
                id: "asks"
            },
            // Insertion point for bids
            {
                id: "bids"
            }
        ]
    }).render() // <= if not rendered, the component is generated in cache but not inserted into the DOM

    // Just to show you simple buttons :)
    createButton({
        text: "Show/hide order book",
        icon: "fas fa-eye",
        margin: 10,
        action: () => $("orderbook").toggle()
    }).render()

    createButton({
        text: "Let's swing!",
        icon: "far fa-smile",
        margin: 10,
        action: () => $("orderbook").setAnimation("swing")
    }).render()

    // Use KissJS websocket module
    // => I still didn't implement "ping pong" for disconnection detection, but I will soon...
    kiss.websocket.init({
        
        socketUrl: "wss://api.valr.com/ws/trade",

        onopen: () => {
            kiss.websocket.send({
                type: "SUBSCRIBE",
                subscriptions: [{
                    event: "AGGREGATED_ORDERBOOK_UPDATE",
                    pairs: ["BTCZAR"]
                }]
            })
        },

        onmessage: async (msg) => {

            // Utility function to add a cumulative sum to a set of records + inverse sort
            const addSum = (records) => {
                let sum = 0
                records.forEach(record => {
                    record.quantity = Number(record.quantity)
                    sum += record.quantity
                    record.sum = sum
                })
                records.reverse()
            }
            
            // Exit if msg doesn't have the data we need
            const msgData = JSON.parse(msg.data)
            if (!msgData || !msgData.data) return
            
            let asks = msgData.data.Asks
            let bids = msgData.data.Bids
            addSum(asks)
            addSum(bids)

            // Build the html tables injecting your data into HTML templates
            // Not sure what should be "RED" or "GREEN" here... it's just an example anyway
            let htmlAsks = templateHeader("luno")
            htmlAsks += asks.map(record => templateRow(record, "green")).join("")

            let htmlBids = templateHeader("luno")
            htmlBids += bids.map(record => templateRow(record, "red")).join("")

            // Inject resulting HTML into KissJS components
            $("asks").setInnerHtml(htmlAsks)
            $("bids").setInnerHtml(htmlBids)
        }
    })
};
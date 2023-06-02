window.onload = async function () {
    createHtml({
        id: "stuff",
        html: "HELLO"
    }).render()

    createButton({
        text: "Move stuff",
        action: () => {
            $("hop").toggle()
        }
    }).render()

    let items = []
    kiss.tools.timer.start()
    for (let i=1; i<300; i++) {
        items.push({
            type: "text",
            label: i,
            fieldWidth: "100%"
        })
    }

    createPanel({
        id: "hop",
        title: "demo",
        width: 500,
        height: 500,
        align: "center",
        verticalAlign: "center",
        draggable: true,
        closable: true,
        closeMethod: "hide",
        overflow: "auto",
        layout: "vertical",
        items
    }).render()

    kiss.tools.timer.show("OK")
};
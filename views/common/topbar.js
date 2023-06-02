kiss.app.defineView("topbar", function (id, target) {
    return createBlock({
        id: id,
        target,

        layout: "horizontal",
        height: 50,

        items: [
            {
                id: "side-menu",
                hidden: true,

                type: "button",
                icon: "fas fa-bars",
                iconColor: "#7799bb",
                iconColorHover: "#00aaee",
                iconSize: "24px",
                backgroundColor: "transparent",
                borderWidth: "0px",
                margin: "6px",
                action: () => $("site-west").setAnimation("slideInLeft").toggle()
            },
            {
                type: "spacer",
                flex: 1
            },
            {
                type: "html",
                html: `<a href="https://en.pickaform.fr/"><img src="./resources/img/pickaform.png"</a>`
            },
            {
                hidden: true,
                
                type: "button",
                text: "Download",
                borderRadius: "32px",
                icon: "fas fa-coffee",
                iconSize: "18px",
                margin: "10px",
                padding: "10px",
                action: () => kiss.views.show("buy")
            }
        ]
    })
})

;
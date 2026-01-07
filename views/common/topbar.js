kiss.app.defineView({
    id: "topbar",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            layout: "horizontal",
            alignItems: "center",
            height: 50,

            items: [{
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
                    html: `<a href="https://airprocess.com/fr"><img width=117 src="./resources/img/logo - home.webp"</a>`
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
    }
})

;
kiss.app.defineView({
    id: "datatables-menu",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            defaultConfig: {
                height: 40,
                textAlign: "left",
                iconSize: "18px",
                iconColor: "#8aa2c8",
                borderColor: "#e3e5ec",
                borderWidth: "1px 0px 0px 0px",
                borderRadius: "0px",
                backgroundColor: "#f3f5f7",
                colorHover: "#00aaee",
                iconColorHover: "#00aaee",
                backgroundColorHover: "#e5e9ec"
            },

            layout: "vertical",
            items: [{
                    type: "html",
                    html: "Datatables",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: "Example with 5000 records",
                    icon: "fas fa-info",
                    action: () => kiss.router.navigateTo({
                        anchor: "Introduction about KissJS datatables"
                    })
                },
                {
                    type: "button",
                    text: "Back to Home",
                    icon: "fas fa-arrow-left",
                    fontWeight: "bold",
                    action: () => kiss.router.navigateTo({
                        ui: "start",
                        section: "home"
                    })
                }
            ]
        })
    }
})

;
kiss.app.defineView({
    id: "containers-menu",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            defaultConfig: {
                height: 30,
                textAlign: "left",
                fontSize: "1.3rem",
                iconSize: "1.3rem",
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
                    html: "Containers",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: "Introduction",
                    icon: "fas fa-info",
                    action: () => kiss.router.navigateTo({
                        anchor: "Introduction about containers"
                    })
                },
                {
                    type: "button",
                    text: "Block",
                    icon: "fas fa-code",
                    action: () => kiss.router.navigateTo({
                        anchor: "Block"
                    })
                },
                {
                    type: "button",
                    text: "Panel",
                    icon: "fas fa-window-maximize",
                    action: () => kiss.router.navigateTo({
                        anchor: "Panel"
                    })
                },
                {
                    type: "button",
                    text: "Form",
                    icon: "far fa-file-alt",
                    action: () => kiss.router.navigateTo({
                        anchor: "Form"
                    })
                },
                {
                    type: "button",
                    text: "Back to Home",
                    icon: "fas fa-arrow-left",
                    fontWeight: "bold",
                    action: () => kiss.router.navigateTo({
                        section: "home",
                        anchor: "What is KissJS?"
                    })
                }
            ]
        })
    }
})

;
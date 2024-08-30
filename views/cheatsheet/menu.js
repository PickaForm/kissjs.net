kiss.app.defineView({
    id: "cheatsheet-menu",
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
                    html: "Cheat sheet",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: "General",
                    icon: "fas fa-info",
                    action: () => kiss.router.navigateTo({
                        anchor: "General"
                    })
                },
                {
                    type: "button",
                    text: "Building UI",
                    icon: "far fa-object-group",
                    action: () => kiss.router.navigateTo({
                        anchor: "Building UI"
                    })
                },
                {
                    type: "button",
                    text: "Building application views",
                    icon: "far fa-object-group",
                    action: () => kiss.router.navigateTo({
                        anchor: "Building application views"
                    })
                },
                {
                    type: "button",
                    text: "Data & ORM",
                    icon: "fas fa-database",
                    action: () => kiss.router.navigateTo({
                        anchor: "Manipulating data"
                    })
                },
                {
                    type: "button",
                    text: "ACL & Permissions",
                    icon: "fas fa-key",
                    action: () => kiss.router.navigateTo({
                        anchor: "ACL and Permissions"
                    })
                },
                {
                    type: "button",
                    text: "Localization",
                    icon: "fas fa-globe",
                    action: () => kiss.router.navigateTo({
                        anchor: "Localization"
                    })
                },
                {
                    type: "button",
                    text: "Tools",
                    icon: "fas fa-wrench",
                    action: () => kiss.router.navigateTo({
                        anchor: "Miscellaneous tools"
                    })
                },
                {
                    type: "button",
                    text: "Prototypes",
                    icon: "fab fa-js-square",
                    action: () => kiss.router.navigateTo({
                        anchor: "Javascript prototypes"
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
kiss.app.defineView({
    id: "home-menu",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            defaultConfig: {
                height: 40,
                color: "#667788",
                colorHover: "#00aaee",
                backgroundColor: "#f3f5f7",
                backgroundColorHover: "#e5e9ec",
                textAlign: "left",
                iconSize: "18px",
                iconColor: "#8aa2c8",
                iconColorHover: "#00aaee",
                borderColor: "#e3e5ec",
                borderWidth: "1px 0px 0px 0px",
                borderRadius: "0px"
            },

            layout: "vertical",
            items: [{
                    type: "html",
                    html: "Home",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: "Introduction",
                    icon: "fas fa-star",
                    action: () => kiss.router.navigateTo({
                        anchor: "What is KissJS?"
                    })
                },
                {
                    type: "button",
                    text: "Philosophy",
                    icon: "fas fa-heart",
                    action: () => kiss.router.navigateTo({
                        anchor: "Philosophy"
                    })
                },
                {
                    type: "button",
                    text: "Efficiency",
                    icon: "fas fa-fighter-jet",
                    action: () => kiss.router.navigateTo({
                        anchor: "Efficiency"
                    })
                },
                {
                    type: "button",
                    text: "Dumb code",
                    icon: "fas fa-smile fa-rotate-180",
                    action: () => kiss.router.navigateTo({
                        anchor: "Dumb code"
                    })
                },
                {
                    type: "button",
                    text: "Features",
                    icon: "fas fa-list",
                    action: () => kiss.router.navigateTo({
                        anchor: "Features"
                    })
                },
                {
                    type: "button",
                    text: "Technically",
                    icon: "fas fa-wrench",
                    action: () => kiss.router.navigateTo({
                        anchor: "Technically"
                    })
                },
                {
                    type: "button",
                    text: "Quickstart",
                    icon: "fas fa-bolt",
                    action: () => kiss.router.navigateTo({
                        anchor: "Quickstart"
                    })
                },
                {
                    type: "button",
                    text: "Coding style",
                    icon: "fas fa-thumbs-up",
                    action: () => kiss.router.navigateTo({
                        anchor: "Coding style"
                    })
                },
                {
                    type: "button",
                    text: "About the author's beliefs",
                    icon: "fas fa-eye",
                    action: () => kiss.router.navigateTo({
                        anchor: "About the author's beliefs"
                    })
                },
                {
                    type: "button",
                    text: "UI Components",
                    icon: "fas fa-cube",
                    iconColor: "#8c4bff",
                    action: () => kiss.router.navigateTo({
                        section: "components",
                        anchor: "Introduction about KissJS components"
                    })
                },
                {
                    type: "button",
                    text: "UI Datatables",
                    icon: "fas fa-table",
                    iconColor: "#8c4bff",
                    action: () => kiss.router.navigateTo({
                        section: "datatables",
                        anchor: "Introduction about KissJS datatables"
                    })
                },
                {
                    type: "button",
                    text: "UI Containers",
                    icon: "far fa-clone",
                    iconColor: "#8c4bff",
                    action: () => kiss.router.navigateTo({
                        section: "containers",
                        anchor: "Introduction about KissJS containers"
                    })
                },
                {
                    type: "button",
                    text: "Tutorials",
                    icon: "fas fa-user-graduate",
                    iconColor: "#bb22ff",
                    action: () => kiss.router.navigateTo({
                        section: "tutorials"
                    })
                },
                {
                    type: "button",
                    text: "<b><u>API DOCUMENTATION</u></b>",
                    color: "#8aa2c8",
                    icon: "fas fa-coffee",
                    action: () => document.location = "./doc/out/kiss.html"
                }
            ]
        })
    }
})

;
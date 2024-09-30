kiss.app.defineView({
    id: "tutorials-menu",
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
                    type: "view",
                    id: "logo"
                },
                {
                    type: "html",
                    html: "Tutorials & demos",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_01_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_01_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_02_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_02_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_03_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_03_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_04_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_04_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_05_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_05_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_06_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_06_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_07_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_07_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_08_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_08_title
                    })
                },
                {
                    type: "button",
                    text: kiss.doc.tutorial_09_title,
                    icon: "fas fa-user-graduate",
                    action: () => kiss.router.navigateTo({
                        anchor: kiss.doc.tutorial_09_title
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
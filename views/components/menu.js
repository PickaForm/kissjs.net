kiss.app.defineView({
    id: "components-menu",
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
                    type: "view",
                    id: "logo"
                },
                {
                    type: "html",
                    html: "Components",
                    class: "navigation-title"
                },
                {
                    type: "button",
                    text: "Introduction",
                    icon: "fas fa-star",
                    action: () => kiss.router.navigateTo({
                        anchor: "Introduction about KissJS components"
                    })
                },
                {
                    type: "button",
                    text: "Text field",
                    icon: "fas fa-font",
                    action: () => kiss.router.navigateTo({
                        anchor: "Text field"
                    })
                },
                {
                    type: "button",
                    text: "Textarea field",
                    icon: "fas fa-paragraph",
                    action: () => kiss.router.navigateTo({
                        anchor: "Textarea field"
                    })
                },
                {
                    type: "button",
                    text: "Number field",
                    icon: "fas fa-list-ol",
                    action: () => kiss.router.navigateTo({
                        anchor: "Number field"
                    })
                },
                {
                    type: "button",
                    text: "Date field",
                    icon: "fas fa-calendar",
                    action: () => kiss.router.navigateTo({
                        anchor: "Date field"
                    })
                },
                {
                    type: "button",
                    text: "Checkbox field",
                    icon: "fas fa-check-square",
                    action: () => kiss.router.navigateTo({
                        anchor: "Checkbox field"
                    })
                },
                {
                    type: "button",
                    text: "Select field",
                    icon: "fas fa-caret-square-down",
                    action: () => kiss.router.navigateTo({
                        anchor: "Select field"
                    })
                },
                {
                    type: "button",
                    text: "Slider field",
                    icon: "fas fa-sliders-h",
                    action: () => kiss.router.navigateTo({
                        anchor: "Slider field"
                    })
                },
                {
                    type: "button",
                    text: "Rating field",
                    icon: "fas fa-star",
                    action: () => kiss.router.navigateTo({
                        anchor: "Rating field"
                    })
                },
                {
                    type: "button",
                    text: "Color picker",
                    icon: "fas fa-paint-brush",
                    action: () => kiss.router.navigateTo({
                        anchor: "Color picker"
                    })
                },
                {
                    type: "button",
                    text: "Icon picker",
                    icon: "fas fa-rocket",
                    action: () => kiss.router.navigateTo({
                        anchor: "Icon picker"
                    })
                },
                {
                    type: "button",
                    text: "Buttons",
                    icon: "fas fa-square",
                    action: () => kiss.router.navigateTo({
                        anchor: "Buttons"
                    })
                },
                {
                    type: "button",
                    text: "Html",
                    icon: "fas fa-code",
                    action: () => kiss.router.navigateTo({
                        anchor: "Html"
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
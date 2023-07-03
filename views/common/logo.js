kiss.app.defineView({
    id: "logo",
    renderer: function (id, target) {
        return createHtml({
            id: id,
            target,
            height: 120,
            html: `<img src="./resources/img/KissJS logo.png" alt="KissJS logo" width=300 height=120>`,

            style: "cursor: pointer",

            events: {
                click: () => {
                    kiss.router.navigateTo({
                        ui: "landing-page"
                    })
                },

                mouseenter: function () {
                    this.setAnimation("pulse")
                }
            }
        })
    }
})

;
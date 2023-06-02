kiss.app.defineView("logo", function (id, target) {
    return createHtml({
        id: id,
        target,
        margin: "0px 0px 32px 0px",
        height: 150,
        html: `<img src="./resources/img/KissJS logo.png">`,

        style: "cursor: pointer",

        events: {
            click: () => {
                kiss.router.navigateTo({
                    ui: "landing-page"
                })
            },

            mouseenter: function() {
                this.setAnimation("pulse")
            }
        }
    })
})

;
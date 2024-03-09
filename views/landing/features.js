kiss.app.defineView({
    id: "landing_features",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            width: "100%",
            height: 500,
            margin: "0px 0px 50px 0px",

            defaultConfig: {
                padding: "32px",
                margin: "0px 32px 0px 32px",
                background: "#ffffff",
                borderRadius: "10px",
                boxShadow: "0px 0px 20px #cccccc"
            },

            layout: "horizontal",
            items: [{
                    flex: 1,
                    type: "html",
                    html: "HELLO"
                },
                {
                    flex: 1,
                    type: "html",
                    html: "WORLD"
                }
            ]
        })
    }
})

;
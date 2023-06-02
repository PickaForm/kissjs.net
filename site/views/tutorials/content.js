kiss.app.defineView("tutorials-content", function (id, target) {
    return createBlock({
        id: id,
        target,

        styles: {
            "this": "user-select: none;"
        },

        items: [{
            background: "#ffffff",

            defaultConfig: {
                labelWidth: 200,
                labelPosition: "left"
            },

            items: [
                showCase(kiss.doc.tutorial_01_title, kiss.doc.tutorial_01, {
                    demo: true,
                    url: "./tutorials/tutorial_01/index.html"
                }),
                showCase(kiss.doc.tutorial_02_title, kiss.doc.tutorial_02, {
                    demo: true,
                    url: "./tutorials/tutorial_02/index.html"
                }),
                showCase(kiss.doc.tutorial_03_title, kiss.doc.tutorial_03, {
                    demo: true,
                    url: "./tutorials/tutorial_03/index.html"
                }),
                showCase(kiss.doc.tutorial_04_title, kiss.doc.tutorial_04, {
                    demo: true,
                    url: "./tutorials/tutorial_04/index.html"
                }),
                showCase(kiss.doc.tutorial_05_title, kiss.doc.tutorial_05),
                showCase(kiss.doc.tutorial_06_title, kiss.doc.tutorial_06, {
                    demo: true,
                    url: "./tutorials/tutorial_06/index.html"
                }),
                showCase(kiss.doc.tutorial_09_title, kiss.doc.tutorial_09, {
                    demo: true,
                    height: 800,
                    url: "./tutorials/tutorial_09/index.html"
                }),                
                showCase(kiss.doc.tutorial_10_title, kiss.doc.tutorial_10, {
                    demo: true,
                    height: 800,
                    url: "./tutorials/tutorial_10/index.html"
                })                
            ]
        }]
    })
})

;
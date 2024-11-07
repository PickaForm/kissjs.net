kiss.app.defineView({
    id: "home-content",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            styles: {
                "this": "background: #ffffff"
            },

            items: [
                // CONCEPTS
                showCase("What is KissJS?", kiss.doc.concepts),

                // PHILOSOPHY
                showCase("Philosophy", kiss.doc.philosophy),

                // EFFICIENCY
                showCase("Efficiency", kiss.doc.efficiency),

                // DUMB CODE
                showCase("Dumb code", kiss.doc.dumbCode),

                // FEATURES
                showCase("Features", kiss.doc.features),

                // TECHNICALLY
                showCase("Technically", kiss.doc.technically),

                // QUICKSTART
                showCase("Quickstart", kiss.doc.quickstart),

                // LIBRARY RESOURCES
                showCase("Library resources", kiss.doc.libraryResources),

                // QUICKSTART
                showCase("Coding style", kiss.doc.codingStyle),

                // BELIEFS
                showCase("About the author's beliefs", kiss.doc.beliefs)
            ]
        })
    }
})

;
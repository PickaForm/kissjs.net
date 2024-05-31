kiss.app.defineView({
    id: "cheatsheet-content",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            styles: {
                "this": "user-select: none; background: #ffffff"
            },

            items: [
                showCase("General", kiss.doc.cheatsheetGeneral),
                showCase("Building UI", kiss.doc.cheatsheetUI),
                showCase("Manipulating data", kiss.doc.cheatsheetData),
                showCase("ACL and Permissions", kiss.doc.cheatsheetACL),
                showCase("Localization", kiss.doc.cheatsheetLocalization),
                showCase("Miscellaneous tools", kiss.doc.cheatsheetMiscTools),
                showCase("Javascript prototypes", kiss.doc.cheatsheetPrototypes)
            ]
        })
    }
})

;
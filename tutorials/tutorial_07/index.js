// Load kissJS library dynamically
kiss
    .loader.loadLibrary()
    .then(() => {
        kiss.db.mode = "offline"
    })

window.onload = async function () {

    kiss.app.defineView({
        id: "view_1",
        renderer: function (id, target) {
            return createHtml({
                id: id,
                target,

                color: "#ffffff",
                background: "#ff0000",
                padding: "20px",
                html: "HELLO"
            })
        }
    })

    kiss.app.defineView({
        id: "view_2",
        renderer: function (id, target) {
            return createHtml({
                id: id,
                target,

                color: "#ffffff",
                background: "#00aaee",
                padding: "20px",
                html: "WORLD"

            })
        }
    })

    createPanel({
        title: "View swap",
        width: 400,
        align: "center",
        draggable: true,
        closable: true,
        boxShadow: "5px 5px 10px #cccccc",

        items: [
            // VIEW CONTAINER
            {
                type: "block", // <= Juste pour info mais pas la peine car Kiss génère un "block" par défaut si on ne précise pas le type
                id: "view-container", // Il lui faut un id car ça sera notre point d'ancrage pour insérer nos vues dans le DOM
                padding: "50px",
                items: [
                    // Je charge la première vue dans mon block
                    {
                        type: "view",
                        id: "view_1"
                    }
                ]
            },
            {
                // Ici, je ne mentionne pas le type mais c'est un "block" aussi
                // Il va contenir mes 2 boutons horizontalement car la propriété layout est "horizontal"
                layout: "horizontal",

                // Comme avec ExtJS, on peut affecter des props par défaut aux items du container
                defaultConfig: {
                    margin: "0px 10px 0px 0px"
                },

                items: [
                    // Bouton 1
                    {
                        type: "button",
                        icon: "fas fa-rocket",
                        text: "Switch to view 2",
                        action: () => {

                            /**
                             * 
                             * Explication: la méthode show prend 1 param obligatoire et 2 optionnels:
                             * - l'id de la vue à afficher
                             * - l'id dans le DOM où on veut injecter la vue
                             * - le dernier paramètre indique si la vue est exclusive ou pas.
                             * 
                             * Si exclusif = true, la vue dégage toutes les autres vues dans ce noeud du DOM.
                             * Si pas exclusif, la vue est simplement ajoutée (append) au noeud du DOM.
                             * 
                             * En mode exclusif, les vues "exclues" d'un noeud DOM sont mises en cache mais pas détruites.
                             * Donc si on passe d'une vue 1 à une vue 2 et inversement, ça va très vite à l'affichage.
                             * 
                             * Dans la doc: http://www.kissjs.net/doc/out/kiss.views.html#.show
                             * 
                             * http://www.kissjs.net/doc/out/kiss.ui.Block.html
                             * 
                             * Pour info, Cela permet d'isoler la géométrie du composant et celle de son contenu, afin de respecter les principes "BEM" autant que possible.
                             * Pour info toujours, un des principes BEM propose qu'un composant n'influe pas sur la géométrie extérieure pour simplifer les ajustements de mise en page.
                             * En gros, si tu veux que ton contenu ait une marge avec l'extérieur, il ne faut pas utiliser de "margin".
                             * Il faut que le composant englobant ait un "padding" avec son contenu.
                             * 
                             * Tout ça pour dire que la vue doit être insérée dans le "content" du composant block, dont la classe est "block-{{YOUR-BLOCK-ID}}";
                             * Dans notre exemple: "block-view-container"
                             *
                             */

                            kiss.views.show("view_2", "block-view-container", true)
                        }
                    },
                    // Bouton 2
                    {
                        type: "button",
                        icon: "fas fa-bolt",
                        text: "Switch to view 1",
                        action: () => {
                            kiss.views.show("view_1", "block-view-container", true)
                        }
                    }
                ]
            }
        ]
    }).render()
}
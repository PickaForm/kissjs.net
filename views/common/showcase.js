/**
 * Build a standard "showCase" widget, which contains:
 * - colored margin
 * - title
 * - description
 * - optional sample code
 * 
 * @param {string} title 
 * @param {string} description 
 * @param  {...any} config
 * @returns {HTMLElement} A kissJS Block element
 */
function showCase(title, description, ...examples) {
    let exampleBlock = examples.map(itemConfig => showCaseExample(itemConfig))

    return createBlock({
        layout: "horizontal",
        padding: "16px 0px 16px 0px",
        items: [
            // Margin
            {
                type: "html",
                html: "",
                class: "showcase-margin"
            },
            // Show case block
            {
                width: "100%",
                items: [
                    // Title
                    {
                        id: title,
                        type: "html",
                        html: `<div class="showcase-title">${title}</div>`
                    },
                    // Description
                    {
                        type: "html",
                        html: `<div class="showcase-description"><pre>${marked(description)}</pre></div>`
                    },
                    // Example and code
                    ...exampleBlock
                ]
            }
        ]
    })
}

/**
 * Show an example and its corresponding JSON config, or a demo
 * 
 * @param {object} itemConfig 
 * @returns {HTMLElement} A KissJS Block element
 */
function showCaseExample(itemConfig) {

    // Include a demo within an iframe
    if (itemConfig.demo == true) {
        return createBlock({
            id: "showcase-" + kiss.tools.shortUid(),
            items: [{
                type: "html",
                class: "showcase-description",
                html: `<iframe style="border: none" width=100% height=${itemConfig.height || 500} src="${itemConfig.url}">`
            }]
        })
    }

    // Include a code example
    const isMobile = kiss.tools.isMobile()

    return createBlock({
        id: "showcase-" + itemConfig.id,
        layout: (isMobile) ? "vertical" : "horizontal",
        flexWrap: "wrap",

        items: [
            // Example
            {
                flex: 1,
                class: "showcase-example",
                items: [itemConfig]
            },
            // Code
            {
                type: "html",
                flex: 1,
                class: "code-sample",
                html: toHTML(itemConfig)
            }
        ]
    })
}

/**
 * Transform a JSON object configuration into a clean HTML string, for code examples
 * 
 * @param {object} config
 * @returns {string}
 */
function toHTML(config) {
    let jsonConfig = kiss.tools.snapshot(config)
    for (prop of ["id", "target", "events"]) delete jsonConfig[prop]
    let objectAsHtml = JSON.stringify(jsonConfig, undefined, 4).replace(/"(\w+)"\s*:/g, '$1:')
    return "<pre>" + hljs.highlight("javascript", objectAsHtml).value + "</pre>"
}

;
kiss.app.defineView({
    id: "landing-page",
    renderer: function (id, target) {
        return createBlock({
            id: id,
            target,

            fullscreen: true,
            overflowY: "auto",

            items: [
                // Hero header
                {
                    type: "view",
                    id: "landing-hero"
                },
                // Framework layers
                {
                    hidden: true,
                    type: "html",
                    html: `
                        <div class="layer">kiss.router</div>
                        <div class="layer">kiss.ui</div>
                        <div class="layer">kiss.acl</div>
                        <div class="layer">kiss.data</div>
                        <div class="layer">kiss.pubsub</div>
                        <div class="layer">kiss.websocket</div>
                    `
                },
                // Sample code
                {
                    type: "view",
                    id: "landing-sample-code"
                }
            ],

            methods: {
                load: function () {
                    if (kiss.tools.isMobile()) return

                    // Load code into code zones
                    $("demo-code").innerHTML = texts.showPanelConfig

                    // Load tips
                    $("help-simple-api").attachTip(texts.helpSimpleApi)
                    $("help-items").attachTip(texts.helpItems)
                    $("help-events").attachTip(texts.helpEvents)
                    $("help-fields").attachTip(texts.helpFields)
                    $("help-select").attachTip(texts.helpSelect)
                    $("help-checkbox").attachTip(texts.helpCheckbox)
                    $("help-button").attachTip(texts.helpButton)
                    $("help-W3C").attachTip(texts.helpW3C)
                    $("help-font-awesome").attachTip(texts.helpFontAwesome)
                    $("help-layout").attachTip(texts.helpLayout)
                    $("help-animation").attachTip(texts.helpAnimation)
                    $("help-defaults").attachTip(texts.helpDefaults)
                    $("help-pubsub").attachTip(texts.helpPubsub)
                    $("help-subscriptions").attachTip(texts.helpSubscriptions)
                    $("help-override").attachTip(texts.helpOverride)

                    // Manage how the demo panel is displayed according to the scroll position
                    $(id).onscroll = (event) => {
                        let pagePosition = $(id).scrollTop
                        let demoPosition = $("landing-sample-code").offsetTop

                        if (pagePosition > (demoPosition - 512)) {
                            kiss.views.show("demo-panel")

                            if ($("demo-panel").isHidden()) $("demo-panel")?.show().setAnimation("zoomIn")

                        } else {

                            if ($("demo-panel") && !$("demo-panel").isHidden()) $("demo-panel").hide()

                        }
                    }
                }
            }
        })
    }
})

;
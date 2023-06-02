kiss.app.defineView("buy", function (id, target) {
    return createPanel({
        id: id,
        target,

        modal: true,
        closable: true,
        draggable: true,
        align: "center",
        top: 200,
        width: "50%",
        height: () => kiss.screen.getHeightMinus(400),
        title: "Why should you buy this?",
        animation: "zoomIn",

        items: [{
                type: "html",
                html: `<pre class="showcase-description">Seriously.

Why should you buy a javascript library when you can find *tons* of free libraries like React, Vue, or Angular. Why should you buy something that has *no* community at all?
Well, there are few reasons for that.

Mainstream frameworks are simple to do simple stuff, but get highly complicated when you want to build bigger stuff. In short, you'll probably do your first app in minutes, but then you'll need 2-3 months to really master the framework.
That's also why a lot of people mastering a framework can't afford to invest time in mastering another one: it's just too long, with too many concepts to grab.

KissJS is the simplest library you'll find to build fast and complex UI. It has no dependencies at all, not event JQuery. It's very easy to customize your components, or to build new ones. It also has a great datatable, which works perfectly smoothly with tens of thousands of records loaded.

I've spent a year fulltime to build this library so that people can save a *lot* of time to build web applications without (too much) headakes.
If you decide to buy KissJS for you or your company, you also help the library to get better and better.

Click on the Paypal button and I'll send you a zip.
Contact me if you have questions: david@pickaform.com
</pre>
`
            },
            {
                type: "html",
                html: `
                <center><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_s-xclick">
                    <input type="hidden" name="hosted_button_id" value="W3JTUL4QAJ2T6">
                    <table>
                    <tr><td><input type="hidden" name="on0" value="KissJS bundles"></td></tr>
                    <tr><td><select class="buy-options" name="os0">
                        <option value="KissJS - 1 seat">KissJS - 1 seat $59,00 USD</option>
                        <option value="KissJS - 2 seats">KissJS - 2 seats $99,00 USD</option>
                        <option value="KissJS - 3 seats">KissJS - 3 seats $149,00 USD</option>
                        <option value="KissJS - 5 seats">KissJS - 5 seats $249,00 USD</option>
                        <option value="KissJS - 10 seats">KissJS - 10 seats $499,00 USD</option>
                        <option value="KissJS - 20 seats">KissJS - 20 seats $999,00 USD</option>
                    </select></td></tr>
                    </table>
                    <input type="hidden" name="currency_code" value="USD">
                    <input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal, le réflexe sécurité pour payer en ligne">
                    <img alt="" border="0" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif" width="1" height="1">
                </form></center>
            `
            }
        ]
    })
})

;
/**
 * Example of how to use the KissJS built-in PubSub
 * 
 * PubSub stands for Publish/Subscribe, and it's the core mechanism used by KissJS to establish a communication between Components.
 * The Components which are **publishing** messages into a channel have absolutely no knowledge about the Components that are **subscribed** to the channel.
 * This way, KissJS enforces a very loose coupling system.
 */
window.onload = function () {

    const myButton = createButton({
        text: "Generate a new ID",
        icon: "fas fa-star",

        // Play with button colors...
        color: "#ffffff",
        colorHover: "#00aaee",
        backgroundColor: "#00aaee",
        backgroundColorHover: "#445566",
        iconColor: "#000000",
        iconColorHover: "#ffffff",
        borderColor: "#000000",
        borderColorHover: "#00aaee",
        margin: "0 0 20px 0",

        events: {
            click: function () {
                // To publish a message on a channel, just use the syntax: publish(channelId, messageData)
                // The message data can be *anything*: a string, an object, an array, a class instance...
                // Here, we publish an RFC4122 id using the built-in id generator:
                publish("EVT_CHANGE_ID", uid())
            }
        }
    })

    // There are different ways to subscribe to a channel, though:

    //
    // OPTION 1: calling the PubSub's "subscribe" method
    //
    const myField1 = createField({
        label: "ID set directly using setValue method",
        labelPosition: "top",
        width: 400
    })

    subscribe("EVT_CHANGE_ID", function (messageData) {

        // We subscribe the field's "setValue" method and pass it the message data:
        myField1.setValue(messageData)

        // Note that you can use the PubSub mechanism for any purpose, and not only with KissJS components:
        const panelToMove = $("myPanel")
        panelToMove.setAnimation("rotateIn")
    })

    //
    // OPTION 2: using the "subscriptions" property of a Component:
    //
    const myField2 = createField({
        label: "ID set directly indirectly using a PubSub subscription",
        labelPosition: "top",
        width: 400,

        subscriptions: {
            EVT_CHANGE_ID: function (msgData) {
                this.setValue(msgData)
            }
        }
    })

    createPanel({
        id: "myPanel",
        title: "Let's PubSub!",
        position: "absolute",
        draggable: true,
        align: "center",
        layout: "vertical",
        boxShadow: "0px 0px 64px #223344",

        items: [
            myButton,
            myField1,
            myField2
        ]
    }).render()
};
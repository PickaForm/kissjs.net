/**
 * Example of how to define view controllers externally.
 * 
 * In the previous example, we've seen that we can directly attach "methods" to components, using the "methods" property.
 * But sometimes, controllers are just too big to fit in, and it's cleaner to manage them separately.
 * 
 * To separate the view and its controller, we use 2 helper functions:
 * - kiss.app.defineView, to define the view
 * - kiss.app.defineViewController, to define the associated view controller
 * 
 * The 2 functions can (and should) be put in separate files.
 * Note that:
 * - the controller *MUST* have the exact same id as the view so that the association between the two can be done properly.
 * - the scope "this" is preserved in the external controller, which makes things natural when maniupating the view (this = the view itself)
 * - nevertheless, don't forget the scope will be lost if you use arrow functions for your methods
 * 
 * In this tutorial, we'll build a small game where we have to click in a moving box to raise the score.
 * Good luck!
 */
window.onload = function () {

    // Globals to help us keep a pointer to the game timers
    let timerInverval = null
    let jumpInterval = null
    const gameSpeed = 1000 // Lower the number to make the game more difficult...

    /**
     * DEFINE THE VIEW 1
     * 
     * A moving block that we have to click to increase the score...
     */
    kiss.app.defineView({
        id: "the-block",
        renderer: function (id, target) {

            return createHtml({
                id: id,

                position: "absolute",
                width: 100,
                height: 100,

                // Let's apply some inline styling
                style: `
                color: #ffffff; background: #00aaee;
                box-shadow: 50px 50px 64px #223344;
                border-radius: 32px;
                font-size: 16px;
                line-height: 100px;
                text-align: center;
                user-select: none;
                cursor: pointer`,

                html: "Score: 0",

                // Tips are automatically displayed on mouseover
                tip: "Click to score!",

                events: {
                    click: function () {
                        // This method is defined in the controller
                        this.addScore()
                    }
                }
            })
        }
    })

    /**
     * DEFINE THE VIEW CONTROLLER 1
     * 
     * (normally in a separate file, but here in the same file for the example)
     */
    kiss.app.defineViewController("the-block", {

        jump: function () {
            this.showAt(Math.random() * (kiss.screen.current.width - this.clientWidth * 2), Math.random() * (kiss.screen.current.height - this.clientHeight * 2), 0.2)
        },

        resetScore: function () {
            this.score = 0
            this.setScore()
        },

        setScore: function () {
            if (!this.score) this.score = 0
            this.closest("a-html").innerText = $("score").innerText = "Score: " + this.score
        },

        addScore: function () {
            this.score++
            this.setScore()
            this.jump()
        }
    })

    /**
     * DEFINE THE VIEW 2
     * 
     * Just a panel to display the timer and the score...
     */
    kiss.app.defineView({
        id: "the-game",
        renderer: function (id, target) {

            return createPanel({
                id: id,
                title: "Click in the moving box to score!",
                position: "absolute",
                align: "center",
                width: 300,
                items: [{
                        id: "timer",
                        type: "html",
                        html: "Timer: 1000"
                    },
                    {
                        id: "score",
                        type: "html",
                        html: "Score: 0"
                    },
                    {
                        id: "game-starter",
                        type: "button",
                        text: "Start the (kind of) game",
                        icon: "fas fa-rocket",
                        width: "100%",
                        margin: "20px 0px 0px 0px",
                        action: () => $("the-game").startGame()
                    }
                ]
            })
        }
    })

    /**
     * DEFINE THE VIEW CONTROLLER 2
     */
    kiss.app.defineViewController("the-game", {

        updateTimer: function () {
            const currentTime = $("timer").time
            let newTime = (currentTime > 0) ? currentTime : 2000
            newTime--

            $("timer").time = newTime
            $("timer").innerText = "Timer: " + newTime

            if (currentTime === 0) this.stopGame()
        },

        stopGame: function () {
            $("the-block").hide()
            $("game-starter").show()

            clearInterval(timerInverval)
            clearInterval(jumpInterval)
        },

        startGame: function () {
            kiss.views.show("the-block")
            $("game-starter").hide()
            $("the-block").resetScore()
            $("the-block").show()

            timerInverval = setInterval(() => this.updateTimer(), 2)
            jumpInterval = setInterval(() => $("the-block").jump(), gameSpeed)
        }
    })

    // Display the 1st view
    kiss.views.show("the-game")
};
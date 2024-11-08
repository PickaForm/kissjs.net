/**
 * WHEN BLOCKS ARE TALKING TOGETHER
 * 
 * Click on a 1st block, then click on a 2nd block, and the 1st block will jump on the 2nd one.
 * If the target block is busy, it will try to free itself automatically.
 * 
 * In this tutorial, we see how to use a simple <Html> component to create our clever blocks.
 * The use of KissJS allows:
 * - easy CSS customization of the block
 * - easy animations, using the "showAt" method with arguments
 * - easy way to add custom methods to the component
 * - easy way to manage the events of the component
 * 
 */
window.onload = async function () {

    // Generates our blocks
    const blockNames = ["Bob", "Will", "Joe", "Rick", "Sam", "John", "Stan", "Kim", "Luke", "Han"]

    /**
     * WORLD REPRESENTATION
     */
    const world = {
        // Parameter to define the block size
        blockSize: 100,

        /**
         * Define the world's "ground" for the blocks
         */
        getOrigin: function() {
            return {
                x: kiss.screen.current.width / 2 - (blockNames.length * (110)) / 2,
                y: kiss.screen.current.height - world.blockSize - 10,
            }
        },

        /**
         * Return the x,y coordinates from a column index
         * 
         * @param {number} columnIndex 
         */
        computePosition: function (columnIndex) {
            const x = this.getOrigin().x + columnIndex * (world.blockSize + 10)
            const y = this.getOrigin().y

            return {
                x,
                y
            }
        },

        /**
         * Create a panel to display the dialog between blocks
         */
        initConsole: function() {
            createPanel({
                title: "Talking blocks...",
                position: "absolute",
                draggable: true,
                icon: "fas fa-list",
                top: 10,
                left: 10,
                width: 450,
                boxShadow: "5px 5px 10px #cccccc",
                layout: "vertical",
                items: [
                    {
                        id: "eventList",
                        type: "textarea",
                        value: "Please, click on 2 different blocks to see what happens",
                        height: 150,
                        fieldWidth: "100%"
                    },
                    {
                        type: "html",
                        height: "32px",
                        html: `<center><a href="../tutorial_09/index.js">Source code</a></center>`
                    }
                ]
            }).render()
        },

        /**
         * Display the last event in the "world" console
         * 
         * @param {string} message 
         */
        showEvent: function (message) {
            const targetField = $("eventList")
            const currentValue = targetField.getValue()
            targetField.setValue(currentValue + "\n" + message)
        }
    }

    /**
     * Generates a "talking" block :)
     * 
     * @param {number} index 
     * @param {string} blockId 
     */
    function createTalkingBlock(index, blockId) {

        // Update the world
        const startingPosition = world.computePosition(index)

        return createHtml({
            // Layout
            position: "absolute",
            width: world.blockSize,
            height: world.blockSize,
            background: "#ffffff",
            border: "solid 1px #00aaee",
            boxShadow: "inset 0px 0px 16px #00aaee",
            borderRadius: "20px",
            cursor: "pointer",

            style: "user-select: none",

            // Html that defines our block design
            html: `<center>
                        <span class="block-over" style="color: #ff0000; font-size: 10px">-</span>
                        <br><span style="font-size: 32px; line-height: 60px"><b>${blockId}</b></span>
                        <br><span class="block-under" style="color: #00aaee; font-size: 10px">-</span>
                    </center>`,

            // Position
            id: blockId,
            left: startingPosition.x,
            top: startingPosition.y,

            // Keep starting position in memomry
            homeX: startingPosition.x,
            homeY: startingPosition.y,

            // Which block is over, which block is under
            isOver: null,
            isUnder: null,

            //
            // METHODS START HERE
            // This is where the block's logic lies
            //
            methods: {
                /**
                 * Go over a target block
                 * 
                 * @param {string} blockId 
                 */
                goOver: async function (blockId) {
                    world.showEvent(`* ${this.id} is going over ${blockId} *`)

                    // If I'm already on the target block, I don't move
                    if (this.isOver == blockId) {
                        world.showEvent(`${this.id}: "Sorry bro, but I'm already there!"`)
                        return
                    }

                    // Target = Me? Nonsense!
                    if (this.id == blockId) {
                        //world.showEvent(`${this.id}: "Sorry bro, but I can't go over myself!"`)
                        this.backHome()
                        return
                    }

                    // A block is over me? Ask it to go away!
                    if (this.isUnder) {
                        world.showEvent(`${this.id}: "Hey ${this.isUnder}, can you go away, please?"`)
                        await $(this.isUnder).goAway()
                        this.IamUnder(null)
                    }

                    // The target block has a block over itself? Ask it to clean my landing area!
                    if ($(blockId).isUnder) {
                        world.showEvent(`${this.id}: "Hey ${blockId}, I'm coming. Can you free yourself?"`)
                        await $(blockId).freeYourself()
                    }

                    // I'm freeing the block which was under me
                    if (this.isOver) $(this.isOver).IamUnder(null)

                    // I'm now occupying the target block: let's update ourselves!
                    this.IamOver(blockId)
                    $(blockId).IamUnder(this.id)

                    // I'm moving to the target block!
                    await this.translateTo($(blockId).offsetLeft, $(blockId).offsetTop - world.blockSize)
                    world.showEvent(`${this.id}: "I'm here, ${blockId}!"`)
                },

                /**
                 * The block is trying to free itself from the upper block
                 */
                freeYourself: async function () {
                    world.showEvent(`${this.id}: "Understood! I have to free myself. Can you go away, ${this.isUnder}?"`)
                    await $(this.isUnder).goAway()
                    this.IamUnder(null)
                },

                /**
                 * Go away over a random block, or go back home if the chosen block is forbidden
                 */
                goAway: async function () {
                    // Someone is over me: go away please!
                    if (this.isUnder) {
                        world.showEvent(`${this.id}: "Hey ${this.isUnder}, can you go away, please?"`)
                        await $(this.isUnder).goAway()
                        this.IamUnder(null)
                    }

                    world.showEvent(`${this.id}: "OK, I'm going away...`)

                    // Let's find a new position in the world
                    // It can be my starting position or another block
                    const randomInt = Math.floor(Math.random() * Math.floor(blockNames.length - 1))
                    const randomBlockId = blockNames[randomInt]

                    if ((randomBlockId != world.from) && (randomBlockId != world.to) && (randomBlockId != this.id) && ($(randomBlockId).isUnder == null)) {

                        // Target must be available and different from (me + from + to)
                        await this.goOver(randomBlockId)

                    } else {
                        // Otherwise, we go back to the initial position
                        await this.backHome()
                    }
                },

                /**
                 * Going back to the starting position
                 */
                backHome: async function () {
                    // If I'm already home, I don't move
                    if (this.isOver == null) {
                        world.showEvent(`${this.id}: "Sorry bro, I'm already home!"`)
                        return
                    }
                    
                    world.showEvent(`${this.id}: "I'm going back to my home position."`)

                    // Someone is over me: go away please!
                    if (this.isUnder) {
                        world.showEvent(`${this.id}: "Hey ${this.isUnder}, can you go away, please?"`)
                        await $(this.isUnder).goAway()
                        this.IamUnder(null)
                    }

                    await this.translateTo(this.config.homeX, this.config.homeY)
                    world.showEvent(`${this.id}: "Now, I'm back home!"`)

                    // Reset the blocks over and under
                    $(this.isOver).IamUnder(null)
                    this.IamUnder(null)
                    this.IamOver(null)

                },

                /**
                 * Update the isOver property
                 * 
                 * @param {string} blockId 
                 */
                IamOver(blockId) {
                    this.isOver = blockId
                    this.querySelector(".block-under").innerText = blockId || "-"
                },

                /**
                 * Update the isUnder property
                 * 
                 * @param {string} blockId 
                 */
                IamUnder(blockId) {
                    this.isUnder = blockId
                    this.querySelector(".block-over").innerText = blockId || "-"
                },

                /**
                 * Translate to a new position doing fancy stuff
                 * 
                 * @param {number} x 
                 * @param {number} y 
                 */
                translateTo: async function (x, y) {

                    // Up
                    this.style.transform = `rotate(90deg)`
                    this.showAt(this.offsetLeft, world.blockSize, 0.2)
                    await kiss.tools.wait(200)

                    // Side
                    this.style.transform = `rotate(180deg)`
                    this.showAt(x, world.blockSize, 0.1)
                    await kiss.tools.wait(100)

                    // Down
                    this.style.transform = `rotate(270deg)`
                    this.showAt(x, y, 0.2)
                    await kiss.tools.wait(200)

                    this.style.transform = `rotate(0deg)`
                    return this
                }
            },

            //
            // EVENTS START HERE
            //
            events: {
                /**
                 * Manage the click events.
                 * Here, we click on a FIRST block, then on a SECOND block,
                 * and the magic will happen...
                 */
                click: function () {
                    if (world.from && world.to) {
                        world.from = null
                        world.to = null
                    }
                    if (!world.from) {
                        world.from = this.id
                    } else {
                        world.to = this.id
                        $(world.from).goOver(world.to)
                    }
                },
                /**
                 * Rotate a block on mouseover
                 */
                mouseover: function () {
                    this.style.transform = "rotate(3deg)"
                    this.style.borderWidth = "5px"
                },
                mouseleave: function () {
                    this.style.transform = "rotate(0deg)"
                    this.style.borderWidth = "1px"
                }
            }
        })
    } // End of our block definition

    // Inititalize the "World" console that displays the dialogs between blocks
    world.initConsole()

    // Generate the blocks
    blockNames.forEach((blockId, index) => createTalkingBlock(index, blockId).render())
};
/**
 * 
 * The Rich Text Field derives from [Component](kiss.ui.Component.html).
 * It's a simple componant to edit rich text content:
 * - headers (h1, h2, h3)
 * - bold, italic, underline
 * - color
 * - lists (ordered, bullet, check)
 * - blockquote
 * - code block
 * - clear formatting
 * 
 * Encapsulates original Quill inside a KissJS UI component:
 * https://quilljs.com
 * 
 * - Check official documentation to customize the toolbar.
 * - Current version of local Quill: 2.0.2
 * 
 * @param {string} [config.value] - Default value
 * @param {string} [config.label]
 * @param {boolean} [config.readOnly]
 * @param {boolean} [config.disabled]
 * @param {boolean} [config.required]
 * @param {string|number} [config.labelWidth]
 * @param {string|number} [config.fieldWidth]
 * @param {string} [config.fieldPadding]
 * @param {string} [config.labelPosition] - left | right | top | bottom
 * @param {string} [config.labelAlign] - left | right
 * @param {string} [config.labelFontSize] - Any valid CSS value
 * @param {string} [config.labelFontWeight] - Any valid CSS value
 * @param {string} [config.labelColor] - Any valid CSS value
 * @param {number} [config.boxShadow]
 * @param {integer} [config.width] - Width in pixels
 * @param {integer} [config.height] - Height in pixels
 * @param {boolean} [config.useCDN] - Set to true to use the CDN version of Quill. Default is true.
 * @param {string} [config.theme] - Use "snow" for a docked toolbar, and "bubble" for a floating toolbar. Default is "bubble".
 * @param {object[]} [config.toolbar1] - Toolbar 1. Default is ["clean", { "header": 1 }, { "header": 2 }, { "header": 3 }, { "header": 4 }]
 * @param {object[]} [config.toolbar2] - Toolbar 2. Default is ["bold", "italic", "underline", {color: []}]
 * @param {object[]} [config.toolbar3] - Toolbar 3. Default is [{ "list": "ordered"}, { "list": "bullet" }, { "list": "check" }]
 * @param {object[]} [config.toolbar4] - Toolbar 4. Default is ["blockquote", "code-block"]
 * @param {boolean} [config.imageWithCaption] - If true, the editor will allow to insert images with a caption.
 * @returns this
 * 
 * ## Generated markup
 * ```
 * <a-richtextfield class="a-richtextfield">
 *  <label class="field-label"></label>
 *  <div class="field-richtext">
 *      <!-- Quill editor is here !-->
 *  </div>
 * </a-richtextfield>
 * ```
 */
kiss.ux.RichTextField = class RichTextField extends kiss.ui.Component {
    /**
     * Its a Custom Web Component. Do not use the constructor directly with the **new** keyword.
     * Instead, use one of the 2 following methods:
     * 
     * Create the Web Component and call its **init** method:
     * ```
     * const myRichTextField = document.createElement("a-richtextfield").init(config)
     * ```
     * 
     * Or use the shorthand for it:
     * ```
     * const myRichTextField = createRichTextField({
     *  label: "My rich text field",
     *  width: 600,
     *  labelPosition: "top"
     * })
     * 
     * myRichTextField.render()
     * ```
     * 
     * Or directly declare the config inside a container component:
     * ```
     * const myPanel = createPanel({
     *   title: "My panel",
     *   items: [
     *       {
     *          type: "richTextField",
     *          label: "My rich text field",
     *          width: 600,
     *          labelPosition: "top"
     *       }
     *   ]
     * })
     * myPanel.render()
     * ```
     */
    constructor() {
        super()
    }

    /**
     * Generates a label and a rich text editor inside a div container
     * 
     * @ignore
     * @returns {HTMLElement}
     */
    init(config = {}) {
        super.init(config)

        this.isQuillInitialized = false
        this.useCDN = (config.useCDN === false) ? false : true
        this.readOnly = !!config.readOnly
        this.disabled = !!config.disabled
        this.required = !!config.required

        this.innerHTML = `
            ${ (config.label) ? `<label id="field-label-${this.id}" for="${this.id}" class="field-label">
                ${ (this.isLocked()) ? this.locker : "" }
                ${ config.label || "" }
                ${ (this.isRequired()) ? this.asterisk : "" }
            </label>` : "" }
            <div id="container-${this.id}" class="field-richtext"></div>
        `
        // Set properties and styles
        this.label = this.querySelector(".field-label")
        this.field = this.querySelector(".field-richtext")

        this._setProperties(config, [
            [
                ["draggable"],
                [this]
            ],
            [
                ["flex", "flexFlow", "width", "minWidth", "height", "minHeight", "flex", "display", "margin", "padding"],
                [this.style]
            ],
            [
                ["fieldWidth=width", "fieldHeight=height", "maxHeight", "fieldPadding=padding", "boxShadow"],
                [this.field.style]
            ],
            [
                ["fontSize", "labelAlign=textAlign", "labelFlex=flex", "labelFontSize=fontSize", "labelFontWeight=fontWeight", "labelColor=color"],
                [this.label?.style]
            ]
        ])

        // Set the default display mode that will be restored by the show() method
        this.displayMode = "flex"

        // Manage label and field layout according to label position
        this.style.flexFlow = "row"

        if (config.label) {
            // Label width
            if (config.labelWidth) this.setLabelWidth(config.labelWidth)

            // Label position
            this.config.labelPosition = config.labelPosition || "left"
            this.setLabelPosition(config.labelPosition)
        }

        // Init Quill toolbars
        this.theme = config.theme || "bubble"
        this.toolbar1 = config.toolbar1 || ["clean", {
            "header": 1
        }, {
            "header": 2
        }, {
            "header": 3
        }, {
            "header": 4
        }]
        this.toolbar2 = config.toolbar2 || ["bold", "italic", "underline", {
            color: []
        }]
        this.toolbar3 = config.toolbar3 || [{
            "list": "ordered"
        }, {
            "list": "bullet"
        }, {
            "list": "check"
        }]
        this.toolbar4 = config.toolbar4 || ["blockquote", "code-block", "link"]

        return this
    }

    /**
     * After render, initialize the "Quill" rich text editor
     * 
     * Note: the focus and blur management is a bit tricky because the Quill editor doesn't not manage it internally.
     * For example, the blur event is triggered when the editor is left, but also when the user clicks on the editor toolbar, which is not the expected behavior.
     * To fix this, we have to check if the last "blur" event was inside the editor or the toolbar, an cancel the blur event if it was the toolbar.
     * On top of this, the "change" event is triggered on every key press, which is not the standard way for a field.
     * We circumvent this by triggering the change event only when the editor is left, and by comparing the previous value with the new one.
     * 
     * @ignore
     */
    async _afterRender() {
        if (window.Quill) {
            this._initRichTextField()
        } else {
            await this._initRichTextEditor()
            this._initRichTextField()
        }

        // Set initial value + eventually bind record
        if (this.config.record) {
            this._bindRecord(this.config.record)
        } else if (this.config.value) {
            this.richTextField.clipboard.dangerouslyPasteHTML(this.config.value)
        }

        // READONLY
        if (this.readOnly || this.disabled) {
            this.richTextContainer.classList.add("field-richtext-read-only")
            this.richTextField.disable()
            return
        }

        // FOCUS
        this.isFirstFocus = true

        this.richTextField.root.onfocus = () => {
            this.focused = true

            if (!this.isFirstFocus) return

            this.isFirstFocus = false
            this.previousValue = this.getValue()
            this.dispatchEvent(new Event("focus"))
        }

        // BLUR + GLOBAL CHANGE
        this.richTextField.root.onblur = () => {
            if (!this.focused) return
            this.focused = false

            if (!this._isInsideEditor()) {
                this.isFirstFocus = true
                this.dispatchEvent(new Event("blur"))

                const newValue = this.getValue()
                if (this.previousValue == newValue) return

                if (this.validate()) {
                    this.setValue(newValue, true)
                }
            }
        }

        // CHANGE
        this.richTextField.on("text-change", () => {
            this.validate()
        })

        // EDITOR CHANGE
        this.richTextField.on("editor-change", () => {
            this._adjustToolbarPosition.call(this)
        })
    }

    /**
     * Load the editor library
     * 
     * @private
     * @ignore
     */
    async _initRichTextEditor() {
        if (this.useCDN === false) {
            // Local (version 2.0.2)
            await kiss.loader.loadScript("../../kissjs/client/ux/richTextField/richTextField_quill")
            await kiss.loader.loadStyle("../../kissjs/client/ux/richTextField/richTextField_quill." + this.theme)
        } else {
            // CDN
            await kiss.loader.loadScript("https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill")
            await kiss.loader.loadStyle("https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill." + this.theme)
        }
    }

    /**
     * Initialize the editor
     * 
     * @private
     * @ignore
     */
    _initRichTextField() {
        if (this.richTextField) return

        this.richTextField = new Quill("#container-" + this.id, {
            theme: this.theme,
            modules: {
                toolbar: [
                    this.toolbar1,
                    this.toolbar2,
                    this.toolbar3,
                    this.toolbar4
                ]
            }
        })

        this.richTextToolbar = this.querySelector(".ql-toolbar")
        this.richTextContainer = this.querySelector(".ql-container")
        this.isQuillInitialized = true

        this._initSelectionObserver()

        if (this.config.imageWithCaption) {
            this._initImageWithCaption()
            this._initImageWithCaptionClick()
            this._addCreationButton()
        }
    }

    /**
     * Keep track of the current selection index
     */
    _initSelectionObserver() {
        this.richTextField.root.addEventListener("click", () => {
            const currentSelection = this.richTextField.getSelection()
            this.currentSelectionIndex = (currentSelection || {}).index || 0
        })        
    }

    /**
     * Bind the field to a record
     * (this subscribes the field to react to database changes)
     * 
     * @private
     * @ignore
     * @param {object} record
     * @returns this
     */
    _bindRecord(record) {
        this.record = record
        this.modelId = record.model.id
        this.recordId = record.id

        // Set initial value
        if (record[this.id]) {
            this.initialValue = record[this.id]
            this.richTextField.clipboard.dangerouslyPasteHTML(this.initialValue)
        }

        // React to changes on a single record of the binded model
        this.subscriptions.push(
            subscribe("EVT_DB_UPDATE:" + this.modelId.toUpperCase(), (msgData) => {
                if ((msgData.modelId == this.modelId) && (msgData.id == this.recordId)) {
                    const updates = msgData.data
                    this._updateField(updates)
                }
            })
        )

        // React to changes on multiple records of the binded Model
        this.subscriptions.push(
            subscribe("EVT_DB_UPDATE_BULK", (msgData) => {
                const operations = msgData.data
                operations.forEach(operation => {
                    if ((operation.modelId == this.modelId) && (operation.recordId == this.recordId)) {
                        const updates = operation.updates
                        this._updateField(updates)
                    }
                })
            })
        )

        return this
    }

    /**
     * Update the code editor value internally
     * 
     * @private
     * @ignore
     * @param {*} updates
     */
    _updateField(updates) {
        if (this.id in updates) {
            const newValue = updates[this.id]
            if (newValue || (newValue === 0) || (newValue === "")) {
                this.richTextField.clipboard.dangerouslyPasteHTML(newValue)
            }
        }
    }

    /**
     * Set the code
     * 
     * @param {string} newValue
     * @param {boolean} [fromBlurEvent] - If true, the update is only performed on binded record, not locally
     * @returns this
     */
    async setValue(newValue, fromBlurEvent) {

        // Ensure the editor is available before setting the value
        await kiss.tools.waitUntil(() => this.isQuillInitialized, 50, 5000)

        if (this.record) {
            // If the field is connected to a record, we update the database
            this.record.updateFieldDeep(this.id, newValue).then(success => {

                // Rollback the initial value if the update failed (ACL)
                if (!success) {
                    this.richTextField.clipboard.dangerouslyPasteHTML(this.initialValue || "")
                }
            })
        } else {
            // Otherwise, we just change the field value
            if (!fromBlurEvent) {
                this.richTextField.clipboard.dangerouslyPasteHTML(newValue)
            }
        }

        return this
    }

    /**
     * Get the field value, which is the HTML content
     * 
     * @returns {string} - The field value
     */
    getValue() {
        return this.richTextField.getSemanticHTML()
    }

    /**
     * Clear the field value
     * 
     * @returns this
     */
    clearValue() {
        this.setValue("")
        return this
    }

    /**
     * Validate the field value and apply UI style accordingly
     * 
     * @returns {boolean} true is the field is valid, false otherwise
     */
    validate() {
        this.setValid()

        // Exit if field is readOnly
        if (this.config.readOnly) return true

        // Required
        if (this.required && this.isEmpty()) this.setInvalid()
        return this.isValid
    }

    /**
     * Give focus to the input field
     * 
     * @returns this
     */
    focus() {
        this.richTextField.focus()
        return this
    }

    /**
     * Unset the focus of the input field
     * 
     * @returns this
     */
    blur() {
        this.richTextField.blur()
        return this
    }

    /**
     * Reset the focus
     */
    resetFocus() {
        this.blur()
        setTimeout(() => this.focus(), 100)
    }

    /**
     * Remove the invalid style
     * 
     * @returns this
     */
    setValid() {
        this.isValid = true
        this.richTextContainer.classList.remove("field-richtext-invalid")
        return this
    }

    /**
     * Change the style when the field is invalid
     * 
     * @returns this
     */
    setInvalid() {
        log("kiss.ui - field.setInvalid - Invalid value for the field: " + this.config.label, 4)

        this.isValid = false
        this.richTextContainer.classList.add("field-richtext-invalid")
        return this
    }

    /**
     * Check if the field is empty
     * 
     * @returns {boolean}
     */
    isEmpty() {
        const value = this.getValue()
        const regex = /^(\s*<p>\s*<\/p>\s*)+$/;
        return regex.test(value)
    }

    /**
     * Set the field label
     * 
     * @param {string} newLabel
     * @returns this
     */
    setLabel(newLabel) {
        if (!this.label) return

        this.config.label = newLabel
        this.label.innerText = newLabel
        return this
    }

    /**
     * Get the field label
     * 
     * @returns {string}
     */
    getLabel() {
        return this?.label?.innerText || ""
    }

    /**
     * Set the field width
     * 
     * @param {*} width
     * @returns this
     */
    setWidth(width) {
        this.config.width = width
        this.style.width = this._computeSize("width", width)
        return this
    }

    /**
     * Set the color selector field width
     * 
     * @param {*} width
     * @returns this
     */
    setFieldWidth(width) {
        this.config.fieldWidth = width
        this.field.style.width = this._computeSize("fieldWidth", width)
        return this
    }

    /**
     * Set the label width
     * 
     * @param {*} width
     * @returns this
     */
    setLabelWidth(width) {
        this.config.labelWidth = width
        this.label.style.width = this.label.style.maxWidth = this._computeSize("labelWidth", width)
        return this
    }

    /**
     * Get the label position
     * 
     * @returns {string} "left" | "right" | "top"
     */
    getLabelPosition() {
        return this.config.labelPosition
    }

    /**
     * Set label position
     * 
     * @param {string} position - "left" (default) | "right" | "top" | "bottom"
     * @returns this
     */
    setLabelPosition(position) {
        this.config.labelPosition = position

        switch (position) {
            case "top":
                this.style.flexFlow = "column"
                this.field.style.order = 1
                break
            case "bottom":
                this.style.flexFlow = "column"
                this.field.style.order = -1
                break
            case "right":
                this.style.flexFlow = "row"
                this.field.style.order = -1
                break
            default:
                this.style.flexFlow = "row"
                this.field.style.order = 1
        }
        return this
    }

    /**
     * Check if the last blur event was inside the editor
     * 
     * @private
     * @ignore
     * @returns {boolean}
     */
    _isInsideEditor() {
        const {
            x,
            y
        } = kiss.screen.mousePosition

        // Check if it was inside the editor
        const editorRect = this.richTextField.root.getBoundingClientRect()
        const isInsideEditor = (
            x >= editorRect.left &&
            x <= editorRect.right &&
            y >= editorRect.top &&
            y <= editorRect.bottom
        )
        if (isInsideEditor) return true

        // Check if it was inside the toolbar
        const toolbarRect = this.richTextToolbar.getBoundingClientRect()
        const isInsideToolbar = (
            x >= toolbarRect.left &&
            x <= toolbarRect.right &&
            y >= toolbarRect.top &&
            y <= toolbarRect.bottom
        )
        if (isInsideToolbar) return true

        return false
    }

    /**
     * Adjust the toolbar position to fix default Quill behavior.
     * Center it horizontally inside the editor instead of cropping it when it reaches the window border.
     * 
     * @private
     * @ignore
     */
    _adjustToolbarPosition() {
        setTimeout(() => {
            const tooltip = document.querySelector(".ql-tooltip")
            if (!tooltip) return
            const componentBounds = this.getBoundingClientRect()
            const tooltipWidth = tooltip.offsetWidth
            let left = (componentBounds.width / 2) - (tooltipWidth / 2)
            if (left < 0) left = 10
            if (left + tooltipWidth > window.innerWidth) left = window.innerWidth - tooltipWidth - 10
            tooltip.style.left = left + "px"
        }, 5)
    }

    //
    //
    // CUSTOM BLOT FOR IMAGE WITH CAPTION
    //
    //

    /**
     * Initialize the custom blot for image with caption
     * 
     * @private
     * @ignore
     */
    _initImageWithCaption() {
        const BlockEmbed = window.Quill.import("blots/block/embed")

        class ImageFigureBlot extends BlockEmbed {
            static create(value) {
                const node = super.create()
                const figure = document.createElement("figure")
                const img = document.createElement("img")
                img.setAttribute("src", value.src)

                if (value.alt) img.setAttribute("alt", value.alt)

                const caption = document.createElement("figcaption")
                caption.innerText = value.caption || ""
                caption.classList.add("ql-caption")

                figure.appendChild(img)
                figure.appendChild(caption)
                node.appendChild(figure)
                return node
            }

            static value(node) {
                const img = node.querySelector("img")
                if (!img) return null

                const figcaption = node.querySelector("figcaption")

                return {
                    src: img.getAttribute("src"),
                    alt: img.getAttribute("alt"),
                    caption: figcaption ? figcaption.innerText : ""
                }
            }
        }

        ImageFigureBlot.blotName = "imagefigure"
        ImageFigureBlot.tagName = "div"
        window.Quill.register(ImageFigureBlot)
    }

    /**
     * Initialize the click event on the image with caption
     * 
     * @private
     * @ignore
     */
    _initImageWithCaptionClick() {
        this.richTextField.root.addEventListener("click", (event) => {
            const figure = event.target.closest("figure")
            if (!figure) return

            const img = figure.querySelector("img")
            const currentImg = img.getAttribute("src") || ""
            const currentAlt = img.getAttribute("alt") || ""
            const figcaption = figure.querySelector("figcaption")
            const currentCaption = figcaption?.innerText || ""

            this._insertImageFromURL({
                mode: "update",
                figure,
                img,
                src: currentImg,
                alt: currentAlt,
                figcaption,
                caption: currentCaption
            })
        })
    }

    /**
     * Add a custom button to the toolbar to create a menu for image management
     * 
     * @private
     * @ignore
     */
    _addCreationButton() {
        const toolbar = this.richTextField.getModule("toolbar")
        const toolbarContainer = toolbar.container
        const customButton = document.createElement("div")
        customButton.innerHTML = "<span class='fas fa-plus ql-toolbar-extension'></span>"

        const group = document.createElement("span")
        group.classList.add("ql-formats")
        group.appendChild(customButton)
        toolbarContainer.appendChild(group)

        customButton.addEventListener("click", (event) => {
            createMenu({
                items: [
                txtTitleCase("images"),
                "-",
                {
                    icon: "fas fa-globe",
                    text: txtTitleCase("#image from url"),
                    action: () => this._insertImageFromURL({})
                },
                {
                    icon: "fas fa-download",
                    text: txtTitleCase("#image from download"),
                    action: () => this._insertImageFromDownload()
                },
                {
                    icon: "fas fa-th",
                    text: txtTitleCase("#image from library"),
                    action: () => this._insertImageFromLibrary()
                },
                {
                    hidden: true, // TODO: Implement Unsplash integration
                    icon: "fas fa-search",
                    text: txtTitleCase("#image from unsplash"),
                    action: () => this._insertImageFromUnsplash()
                },
                "-",
                txtTitleCase("other"),
                "-",
                {
                    icon: "fas fa-paperclip",
                    text: txtTitleCase("#file attachment"),
                    action: () => this._insertAttachment()
                },
                {
                    icon: "fas fa-square",
                    text: txtTitleCase("#integrate button"),
                    action: () => this._insertButton()
                }
            ]}).render().showAt(event.clientX - 10, event.clientY - 10)
        })        
    }

    /**
     * Insert an image from a download
     * 
     * @private
     * @ignore
     * @param {object} config
     */    
    _insertImageFromDownload() {
        const _this = this
        createFileUploadWindow({
            modelId: _this.modelId,
            multiple: false,
            maxSize: 5 * 1024 * 1024, // 5 MB
            ACL: "public",
            callback: (data) => {
                _this._insertImageFromURL({
                    mode: "create",
                    src: "/" + data[0].path.replaceAll("\\", "/"),
                    alt: data[0].filename,
                    caption: data[0].filename
                })
            }
        })        
    }

    /**
     * Insert an image from the library
     * 
     * @private
     * @ignore
     * @param {object} config
     */    
    _insertImageFromLibrary() {
        createFileLibraryWindow({
            callback: (file) => {
                if (!file || !file.filename) return

                // If the file is an image, insert it
                if (file.mimeType.startsWith("image/")) {
                    this._insertImageFromURL({
                        mode: "create",
                        src: kiss.tools.createFileURL(file),
                        alt: file.filename,
                        caption: file.filename
                    })
                    
                    $("file-library-window").close()
                }
            }
        })
    }

    /**
     * Insert an image from Unsplash
     * 
     * @private
     * @ignore
     * @param {object} config
     */    
    _insertImageFromUnsplash() {
    }

    /**
     * Insert an attachment (file)
     * 
     * @private
     * @ignore
     * @param {object} config
     */    
    _insertAttachment() {
    }

    /**
     * Insert a button (link)
     * 
     * @private
     * @ignore
     * @param {object} config
     */    
    _insertButton() {
    }

    /**
     * Show the dialog to insert an image and a caption from a URL
     * 
     * @param {object} [config] - Configuration object
     * @param {string} [config.mode] - "create" to insert a new image, "update" to update an existing image
     * @param {HTMLElement} [config.figure] - The figure element to update (if mode is "update")
     * @param {HTMLElement} [config.img] - The img element to update (if mode is "update")
     * @param {string} [config.src] - The image URL (if mode is "create" or "update")
     * @param {string} [config.alt] - The alternative text for the image (if mode is "create" or "update")
     * @param {string} [config.figcaption] - The figcaption element to update (if mode is "update")
     * @param {string} [config.caption] - The caption text for the image (if mode is "create" or "update")
     * 
     * @example
     * // Insert a new image with caption
     * myRichTextField._insertImageFromURL({
     *  mode: "create",
     *  src: "https://example.com/image.jpg",
     *  alt: "Example Image",
     *  caption: "This is an example image"
     * })
     */
    _insertImageFromURL({
        mode,
        figure = "",
        img = "",
        src = "",
        alt = "",
        figcaption = "",
        caption = "",
    }) {
        const _this = this

        createPanel({
            id: "image-caption-panel",
            title: txtTitleCase("image properties"),
            icon: "fas fa-image",
            modal: true,
            draggable: true,
            closable: true,
            align: "center",
            verticalAlign: "center",
            width: "40rem",
            defaultConfig: {
                labelPosition: "top",
                width: "100%",
                fieldWidth: "100%",
                margin: "1rem 0rem",
                events: {
                    keydown: (event) => {
                        if (event.key === "Enter") {
                            event.preventDefault()
                            $("image-caption-panel").ok()
                        }
                    }
                }
            },
            items: [{
                    id: "image-src-input",
                    type: "text",
                    label: txtTitleCase("image url"),
                    value: src,
                    validationType: "url",
                    required: true,
                    readOnly: (mode === "create")
                },
                {
                    id: "image-alt-input",
                    type: "text",
                    label: txtTitleCase("alternative text"),
                    value: alt,
                    required: true
                },
                {
                    id: "image-caption-input",
                    type: "text",
                    label: txtTitleCase("caption"),
                    value: caption,
                    required: true
                },
                {
                    layout: "horizontal",
                    items: [
                        {
                            hidden: (mode !== "update"),
                            type: "button",
                            text: txtTitleCase("delete"),
                            icon: "fas fa-trash",
                            iconColor: "var(--red)",
                            margin: "0 0.5rem 0 0",
                            flex: 1,
                            action: () => $("image-caption-panel").delete()
                        },
                        {
                            type: "button",
                            text: txtTitleCase("validate"),
                            icon: "fas fa-check",
                            iconColor: "var(--green)",
                            flex: 1,
                            action: () => $("image-caption-panel").ok()
                        }
                    ]
                }
            ],
            methods: {
                delete() {
                    const wrapper = figure.closest("div")
                    if (wrapper && wrapper.parentNode) {
                        wrapper.parentNode.removeChild(wrapper)
                    }
                    $("image-caption-panel").close()              
                },
                ok() {
                    const panel = $("image-caption-panel")
                    if (!panel.validate()) return

                    const newSrc = $("image-src-input").getValue()
                    const newAlt = $("image-alt-input").getValue()
                    const newCaption = $("image-caption-input").getValue()

                    if (mode === "update") {
                        if (!newSrc) return
                        img.setAttribute("src", newSrc)
                        img.setAttribute("alt", newAlt)
                        figcaption.innerText = newCaption
                    }
                    else {
                        _this.addImageWithCaption({
                            src: newSrc,
                            alt: newAlt,
                            caption: newCaption
                        })
                    }
                    panel.close()
                }
            }
        }).render()
    }

    /**
     * Insert an image with a caption into the editor
     * 
     * @param {object} config
     * @param {string} config.src - URL of the image
     * @param {string} config.alt 
     * @param {string} config.caption
     */
    addImageWithCaption({
        src,
        alt = "",
        caption = ""
    }) {
        if (!src) return

        const index = this.currentSelectionIndex || 0
        this.richTextField.insertEmbed(index, "imagefigure", {
            src,
            alt,
            caption
        })
        this.richTextField.setSelection(index + 1)
    } 
}

// Create a Custom Element and add a shortcut to create it
customElements.define("a-richtextfield", kiss.ux.RichTextField)

/**
 * Shorthand to create a new Rich text field. See [kiss.ux.RichTextField](kiss.ux.RichTextField.html)
 * 
 * @param {object} config
 * @returns HTMLElement
 */
const createRichTextField = (config) => document.createElement("a-richtextfield").init(config)

;/**
 * 
 * The Code Editor component derives from [Component](kiss.ui.Component.html).
 * 
 * It allows to write code, embedding the famous Ace Editor.
 * 
 * @param {object} config
 * @param {*} [config.value] - Default value
 * @param {string} [config.label]
 * @param {string} [config.labelWidth]
 * @param {string} [config.fieldWidth]
 * @param {string} [config.fieldHeight]
 * @param {string} [config.labelPosition] - left | right | top | bottom
 * @param {string} [config.labelAlign] - left | right
 * @param {string} [config.labelFontSize] - Any valid CSS value
 * @param {string} [config.labelFontWeight] - Any valid CSS value
 * @param {string} [config.labelColor] - Any valid CSS value
 * @param {boolean} [config.readOnly]
 * @param {boolean} [config.disabled]
 * @param {boolean} [config.required]
 * @param {boolean} [config.draggable]
 * @param {string} [config.margin]
 * @param {string} [config.display] - flex | inline flex
 * @param {string|number} [config.width]
 * @param {string|number} [config.height]
 * @param {string|number} [config.border]
 * @param {string|number} [config.borderStyle]
 * @param {string|number} [config.borderWidth]
 * @param {string|number} [config.borderColor]
 * @param {string|number} [config.borderRadius]
 * @param {string|number} [config.boxShadow]
 * @param {boolean} [config.showMargin]
 * @param {boolean} [config.hideHorizontalScrollbar] - Hide the horizontal editor scrollbar if set to true. Default is false.
 * @param {boolean} [config.hideVerticalScrollbar] - Hide the vertical editor scrollbar if set to true. Default is false.
 * @returns this
 * 
 * ## Generated markup
 * ```
 * <a-codeeditor class="a-codeeditor">
 *  <label class="field-label"></label>
 *  <div class="code-editor"></div>
 * </a-codeeditor>
 * ```
 */
kiss.ux.CodeEditor = class CodeEditor extends kiss.ui.Component {
    /**
     * Its a Custom Web Component. Do not use the constructor directly with the **new** keyword.
     * Instead, use one of the 3 following methods:
     * 
     * Create the Web Component and call its **init** method:
     * ```
     * const myCodeEditor = document.createElement("a-codeeditor").init(config)
     * ```
     * 
     * Or use the shorthand for it:
     * ```
     * const myCodeEditor = createCodeEditor({
     *   label: "Enter your code",
     *   height: 300
     * })
     * 
     * myCodeEditor.render()
     * ```
     * 
     * Or directly declare the config inside a container component:
     * ```
     * const myPanel = createPanel({
     *   title: "My panel",
     *   items: [
     *       {
     *           type: "codeEditor",
     *           label: "Enter your code",
     *           height: 300
     *       }
     *   ]
     * })
     * myPanel.render()
     * ```
     */
    constructor() {
        super()
    }

    /**
     * Generates a Code Editor from a JSON config
     * 
     * @ignore
     * @param {object} config - JSON config
     * @returns {HTMLElement}
     */
    init(config) {
        super.init(config)

        // Template
        this.innerHTML = /*html*/ `
            ${ (config.label) ? `<label id="field-label-${this.id}" for="${this.id}" class="field-label">
                ${ (this.isLocked()) ? this.locker : "" }
                ${ config.label || "" }
                ${ (this.isRequired()) ? this.asterisk : "" }
            </label>` : "" }

            <div id="editor-for:${this.id}" class="code-editor"></div>
            `.removeExtraSpaces()

        // Set properties
        this.label = this.querySelector(".field-label")
        this.field = this.querySelector(".code-editor")

        this._setProperties(config, [
            [
                ["draggable"],
                [this]
            ],
            [
                ["width", "minWidth", "height", "flex", "display", "margin"],
                [this.style]
            ],
            [
                ["fieldWidth=width", "fieldHeight=height", "maxHeight", "fieldFlex=flex", "boxShadow", "border", "borderStyle", "borderWidth", "borderColor", "borderRadius"],
                [this.field.style]
            ],
            [
                ["labelAlign=textAlign", "labelFlex=flex", "labelFontSize=fontSize", "labelFontWeight=fontWeight", "labelColor=color"],
                [this.label?.style]
            ]
        ])

        // Set the default display mode that will be restored by the show() method
        this.displayMode = "flex"

        // Manage label and field layout according to label position
        this.style.flexFlow = "row"

        // The field will be display after ACE component is fully loaded
        this.field.style.display = "none"

        if (config.label) {
            // Label width
            if (config.labelWidth) this.setLabelWidth(config.labelWidth)

            // Label position
            this.config.labelPosition = config.labelPosition || "left"
            this.setLabelPosition(config.labelPosition)
        }

        return this
    }

    /**
     * Bind the field to a record
     * (this subscribes the field to react to database changes)
     * 
     * @private
     * @ignore
     * @param {object} record
     * @returns this
     */
    _bindRecord(record) {
        this.record = record
        this.modelId = record.model.id
        this.recordId = record.id

        // Set initial value
        if (record[this.id]) {
            this.initialValue = record[this.id]
            this.editor.setValue(this.initialValue)
        }

        // React to changes on a single record of the binded model
        this.subscriptions.push(
            subscribe("EVT_DB_UPDATE:" + this.modelId.toUpperCase(), (msgData) => {
                if ((msgData.modelId == this.modelId) && (msgData.id == this.recordId)) {
                    const updates = msgData.data
                    this._updateField(updates)
                }
            })
        )

        // React to changes on multiple records of the binded Model
        this.subscriptions.push(
            subscribe("EVT_DB_UPDATE_BULK", (msgData) => {
                const operations = msgData.data
                operations.forEach(operation => {
                    if ((operation.modelId == this.modelId) && (operation.recordId == this.recordId)) {
                        const updates = operation.updates
                        this._updateField(updates)
                    }
                })
            })
        )

        return this
    }

    /**
     * Update the code editor value internally
     * 
     * @private
     * @ignore
     * @param {*} updates
     */
    _updateField(updates) {
        if (this.id in updates) {
            const newValue = updates[this.id]
            if (newValue || (newValue === 0) || (newValue === "")) {
                this.editor.setValue(newValue)
            }
        }
    }    

    /**
     * Insert Ace editor into the Web Component
     * 
     * @private
     * @render
     */
    async _afterRender() {
        if (!window.ace) {
            await kiss.loader.loadScript("../../kissjs/client/ux/codeEditor/ace")
        }

        this.editor = ace.edit("editor-for:" + this.id, {
            selectionStyle: "text"
        })

        this.editor.setOptions({
            autoScrollEditorIntoView: true,
            copyWithEmptySelection: false,
            showPrintMargin: false,
            fontSize: "var(--field-font-size)",
            showFoldWidgets: false
        })

        // Show hide line number
        this.editor.renderer.setShowGutter((this.config.showMargin == false) ? false : true)

        // Set Ace to Javascript / Monokai
        this.editor.session.setMode("ace/mode/javascript")
        this.editor.setTheme("ace/theme/monokai")
        this.editor.session.setUseWorker(false)

        //
        // Override common events: focus, blur, change
        //
        
        // FOCUS
        this.editor.on("focus", () => {
            this.previousValue = this.editor.getValue()
            this.dispatchEvent(new Event("focus"))
        })

        // BLUR
        this.editor.on("blur", () => {
            const newValue = this.editor.getValue()
            if (newValue != this.previousValue) this.hasChanged = true
            else this.hasChanged = false
            this.dispatchEvent(new Event("blur"))
        })

        // CHANGE
        this.editor.session.on("change", () => {
            this.dispatchEvent(new Event("change"))
        })

        // Set initial value + eventually bind record
        if (this.config.record) {
            this._bindRecord(this.config.record)
        }
        else if (this.config.value) {
            this.editor.setValue(this.config.value)
        }

        // Hide scrollbars if needed
        if (this.config.hideHorizontalScrollbar == true) {
            this.classList.add("no-scrollbar-h")
        }

        if (this.config.hideVerticalScrollbar == true) {
            this.classList.add("no-scrollbar-v")
        }

        this.field.style.display = "block"
        setTimeout(() => {
            this.editor.resize()
        }, 50)
    }

    /**
     * Set the code
     * 
     * @param {string} newValue
     * @param {boolean} [fromBlurEvent] - If true, the update is only performed on binded record, not locally
     * @returns this
     */
    async setValue(newValue, fromBlurEvent) {

        // Ensure the editor is available before setting the value
        await kiss.tools.waitUntil(() => this.editor, 50, 5000)

        if (this.record) {
            // If the field is connected to a record, we update the database
            this.record.updateFieldDeep(this.id, newValue).then(success => {

                // Rollback the initial value if the update failed (ACL)
                if (!success) this.editor.setValue(this.initialValue || "")
            })
        } else {
            // Otherwise, we just change the field value
            if (!fromBlurEvent) {
                this.editor.setValue(newValue)
            }
        }

        return this
    }

    /**
     * Get the code
     * 
     * @returns {string} The image src
     */
    getValue() {
        if (!this.editor) return ""
        return this.editor.getValue()
    }

    validate() {
        return true
    }

    /**
     * Insert a text at the current cursor position
     * 
     * @param {string} text
     * @returns this
     */
    insert(text) {
        const cursorPosition = this.editor.getCursorPosition()
        this.editor.session.insert(cursorPosition, text)
        this.editor.focus()
        return this
    }

    /**
     * Give focus to the input field
     * 
     * @returns this
     */
    focus() {
        this.editor.focus()
        return this
    }

    /**
     * Unset the focus of the input field
     * 
     * @returns this
     */
    blur() {
        this.editor.blur()
        return this
    }
    
    /**
     * Clear the current selection
     * 
     * @returns this
     */
    clearSelection() {
        this.editor.clearSelection()
        return this
    }    

    /**
     * Set the field label
     * 
     * @param {string} newLabel
     * @returns this
     */
    setLabel(newLabel) {
        if (!this.label) return

        this.config.label = newLabel
        this.label.innerText = newLabel
        return this
    }

    /**
     * Get the field label
     * 
     * @returns {string}
     */
    getLabel() {
        return this?.label?.innerText || ""
    }

    /**
     * Set the field width
     * 
     * @param {*} width
     * @returns this
     */
    setWidth(width) {
        this.config.width = width
        this.style.width = this._computeSize("width", width)
        return this
    }

    /**
     * Set the color selector field width
     * 
     * @param {*} width
     * @returns this
     */
    setFieldWidth(width) {
        this.config.fieldWidth = width
        this.field.style.width = this._computeSize("fieldWidth", width)
        return this
    }

    /**
     * Set the label width
     * 
     * @param {*} width
     * @returns this
     */
    setLabelWidth(width) {
        this.config.labelWidth = width
        this.label.style.width = this.label.style.maxWidth = this._computeSize("labelWidth", width)
        return this
    }

    /**
     * Get the label position
     * 
     * @returns {string} "left" | "right" | "top"
     */
    getLabelPosition() {
        return this.config.labelPosition
    }

    /**
     * Set label position
     * 
     * @param {string} position - "left" (default) | "right" | "top" | "bottom"
     * @returns this
     */
    setLabelPosition(position) {
        this.config.labelPosition = position

        switch (position) {
            case "top":
                this.style.flexFlow = "column"
                this.field.style.order = 1
                break
            case "bottom":
                this.style.flexFlow = "column"
                this.field.style.order = -1
                break
            case "right":
                this.style.flexFlow = "row"
                this.field.style.order = -1
                break
            default:
                this.style.flexFlow = "row"
                this.field.style.order = 1
        }
        return this
    }
}

// Create a Custom Element and add a shortcut to create it
customElements.define("a-codeeditor", kiss.ux.CodeEditor)

/**
 * Shorthand to create a new Code Editor. See [kiss.ux.CodeEditor](kiss.ux.CodeEditor.html)
 * 
 * @param {object} config
 * @returns HTMLElement
 */
const createCodeEditor = (config) => document.createElement("a-codeeditor").init(config)

;/**
 * 
 * The aiTextarea derives from [Field](kiss.ui.Field.html).
 * 
 * **AI** field allows to generate content automatically
 * 
 * It's basically a textarea field with an extra button to open the AI parameters and prompt
 * 
 * @param {object} config
 * @param {string} [config.iconColorOn] - Icon color
 * @param {object} [config.ai] - Optional AI default configuration
 * @param {string} [config.ai.who] - Default persona: "-" | "sales manager" | "hr manager" | "marketing manager" | "product manager"
 * @param {string} [config.ai.what] - Default task: "-" | "draft a blog post" | "summup a text" | "convert to tweet" | "write an email" | "create user persona" | "create job description"
 * @param {string} [config.ai.tone] - Default tone: "casual" | "formal" | "humour" | "ironic"
 * @param {string} [config.ai.goal] - Default goal: "-" | "inform" | "persuade" | "inspire"
 * @param {number} [config.ai.temperature] - OpenAI creativity, from 0 to 1
 * @param {number} [config.ai.max_tokens] - Max number of tokens for OpenAI answer
 * @returns this
 * 
 * ## Generated markup
 * ```
 * <a-aitextarea class="a-aitextarea">
 *  <span class="field-label"></span>
 *  <textarea class="field-input"></textarea>
 * </a-aitextarea>
 * ```
 */
kiss.ux.AiTextarea = class AiTextarea extends kiss.ui.Field {
    /**
     * Its a Custom Web Component. Do not use the constructor directly with the **new** keyword.
     * Instead, use one of the 3 following methods:
     * 
     * Create the Web Component and call its **init** method:
     * ```
     * const myAiTextareaField = document.createElement("a-aitextarea").init(config)
     * ```
     * 
     * Or use a shorthand to create one the various field types:
     * ```
     * const myAiTextArea = createAiTextareaField({
     *   label: "I'm a long text field",
     *   cols: 100,
     *   rows: 10
     * })
     * ```
     * 
     * Or directly declare the config inside a container component:
     * ```
     * const myPanel = createPanel({
     *   title: "My panel",
     *   items: [
     *       {
     *           type: "aitextarea",
     *           label: "I'm an AI textarea"
     *       }
     *   ]
     * })
     * myPanel.render()
     * ```
     */    
    constructor() {
        super()
    }

    /**
     * @ignore
     */
    init(config = {}) {
        config.type = "aiTextarea"

        // Generates the field
        super.init(config)

        // Append a button right after the label
        this.label.appendChild(this._createAIButton())

        return this
    }

    /**
     * Add a button to open an AI assistant
     * 
     * @private
     * @ignore
     */
    _createAIButton() {
        const color = this.config.iconColorOn || "#00aaee"
        let lastParams = localStorage.getItem("config-ai-paragraph") || "{}"
        lastParams = JSON.parse(lastParams)

        return createButton({
            icon: "far fa-lightbulb",
            iconSize: "1.6rem",
            iconColor: color,
            height: "1.7rem",
            margin: "0 0 0 0.5rem",
            padding: "0.2rem 0",
            borderWidth: 0,
            boxShadow: "none",
            iconColorHover: "#ffffff",
            backgroundColorHover: color,

            action: (event) => {
                event.stop()

                createPanel({
                    id: "AI-panel",
                    title: txtTitleCase("your AI assistant"),
                    icon: "far fa-lightbulb",
                    headerBackgroundColor: color,
                    modal: true,
                    closable: true,
                    draggable: true,
                    width: "50rem",
                    align: "center",
                    verticalAlign: "center",

                    // Prevent from closing if the user started to work with a prompt
                    events: {
                        close: (forceClose) => {
                            if (forceClose) return true

                            if ($("prompt").getValue() != "") {
                                createDialog({
                                    type: "danger",
                                    message: txtTitleCase("are you sure you want to cancel your input?"),
                                    buttonOKPosition: "left",
                                    action: () => $("AI-panel").close("remove", true)
                                })
                                return false
                            }
                        }
                    },

                    defaultConfig: {
                        labelPosition: "top",
                        width: "100%"
                    },

                    items: [{
                            layout: "horizontal",
                            defaultConfig: {
                                flex: 1,
                                labelPosition: "top"
                            },
                            items: [
                                // AI PROFILE
                                {
                                    id: "who",
                                    type: "select",
                                    label: txtTitleCase("AI profile"),
                                    value: this.config?.ai?.who || lastParams.who || "-",
                                    allowValuesNotInList: true,
                                    options: [{
                                            label: txtTitleCase("no profile"),
                                            value: "-",
                                            color: "var(--green)"
                                        }, {
                                            label: txtTitleCase("sales rep"),
                                            value: "sales manager",
                                            color: "var(--red)"
                                        },
                                        {
                                            label: txtTitleCase("HR manager"),
                                            value: "hr manager",
                                            color: "var(--purple)"
                                        },
                                        {
                                            label: txtTitleCase("marketing manager"),
                                            value: "marketing manager",
                                            color: "var(--blue)"
                                        },
                                        {
                                            label: txtTitleCase("product manager"),
                                            value: "product manager",
                                            color: "var(--orange)"
                                        }
                                    ]
                                },
                                // TASK TO PERFORM
                                {
                                    id: "what",
                                    type: "select",
                                    label: txtTitleCase("task"),
                                    value: this.config?.ai?.what || lastParams.what || "-",
                                    allowValuesNotInList: true,
                                    options: [{
                                            label: txtTitleCase("free"),
                                            value: "-",
                                            color: "var(--green)"
                                        }, {
                                            label: txtTitleCase("draft a blog post"),
                                            value: "draft a blog post"
                                        },
                                        {
                                            label: txtTitleCase("summup a text"),
                                            value: "summup a text"
                                        },
                                        {
                                            label: txtTitleCase("convert to Tweet"),
                                            value: "convert to Tweet"
                                        },
                                        {
                                            label: txtTitleCase("write an email"),
                                            value: "write an email"
                                        },
                                        {
                                            label: txtTitleCase("create user persona"),
                                            value: "create user persona"
                                        },
                                        {
                                            label: txtTitleCase("create job description"),
                                            value: "create job description"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            layout: "horizontal",
                            defaultConfig: {
                                flex: 1,
                                labelPosition: "top"
                            },
                            items: [
                                // AI TONE
                                {
                                    id: "tone",
                                    type: "select",
                                    label: txtTitleCase("tone to use"),
                                    value: this.config?.ai?.tone || lastParams.tone || "casual",
                                    allowValuesNotInList: true,
                                    options: [{
                                            label: txtTitleCase("casual"),
                                            value: "casual",
                                            color: "var(--green)"
                                        },
                                        {
                                            label: txtTitleCase("formal"),
                                            value: "formal",
                                            color: "var(--orange)"
                                        },
                                        {
                                            label: txtTitleCase("humour"),
                                            value: "humour",
                                            color: "var(--red)"
                                        },
                                        {
                                            label: txtTitleCase("ironic"),
                                            value: "ironic",
                                            color: "var(--purple)"
                                        }
                                    ]
                                },
                                // TASK GOAL
                                {
                                    id: "goal",
                                    type: "select",
                                    label: txtTitleCase("goal"),
                                    value: this.config?.ai?.goal || lastParams.goal || "-",
                                    allowValuesNotInList: true,
                                    options: [{
                                            label: txtTitleCase("none"),
                                            value: "-",
                                            color: "var(--green)"
                                        }, {
                                            label: txtTitleCase("inform"),
                                            value: "inform",
                                            color: "var(--blue)"
                                        },
                                        {
                                            label: txtTitleCase("persuade"),
                                            value: "persuade",
                                            color: "var(--purple)"
                                        },
                                        {
                                            label: txtTitleCase("inspire"),
                                            value: "inspire",
                                            color: "var(--red)"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            layout: "horizontal",
                            defaultConfig: {
                                flex: 1,
                                labelPosition: "top"
                            },
                            items: [
                                // MAX RESULT LENGTH
                                {
                                    id: "max_tokens",
                                    label: txtTitleCase("response max length"),
                                    type: "number",
                                    value: Math.min(this.config?.ai?.max_tokens || lastParams.max_tokens || 1000, 2000) || 1000,
                                    max: 2000
                                },
                                // TEMPERATURE
                                {
                                    id: "temperature",
                                    label: txtTitleCase("creativity"),
                                    type: "slider",
                                    min: 0,
                                    max: 100,
                                    value: this.config?.ai?.temperature || lastParams.temperature || 50
                                }
                            ]
                        },
                        // AI PROMPT
                        {
                            id: "prompt",
                            type: "textarea",
                            label: txtTitleCase("#AI prompt instructions"),
                            required: true,
                            value: lastParams.prompt || "",
                            rows: 10
                        },
                        // BUTTON TO SEND THE PROMPT
                        {
                            type: "button",
                            text: txtTitleCase("generate content..."),
                            icon: "fas fa-bolt",
                            iconColor: "var(--orange)",
                            margin: "2rem 0 0 0",
                            height: "4rem",
                            action: async () => {
                                if (!$("AI-panel").validate()) {
                                    return
                                }

                                localStorage.setItem("config-ai-paragraph", JSON.stringify($("AI-panel").getData()))

                                const data = $("AI-panel").getData()
                                const prompt = this._preparePrompt(data)
                                const temperature = Number((data.temperature / 100).toFixed(2))
                                const result = await this._executePrompt(prompt, temperature, data.max_tokens)

                                if (!result.success) {
                                    createDialog({
                                        type: "danger",
                                        message: txtTitleCase("#openAI error"),
                                        noCancel: true
                                    })
                                    return
                                }

                                await this.setValue(result.data)
                                $("AI-panel").close("remove", true)
                            }
                        }
                    ]
                }).setAnimation({
                    name: "jackInTheBox",
                    speed: "fast"
                }).render()
            }
        })
    }

    /**
     * Prepare the prompt with extra parameters.
     * 
     * @private
     * @ignore
     * @param {object} config
     * @param {string} config.who - AI agent personality
     * @param {string} config.what - Task to perform
     * @param {string} config.tone - Tone to use when answering
     * @param {string} config.goal - Content goal
     * @param {string} config.prompt - Free prompt to detail the task
     * 
     * @returns {string} Prompt with options
     */
    _preparePrompt({
        who,
        what,
        tone,
        goal,
        prompt
    }) {
        const language = (kiss.language.current == "fr") ? "french" : "english"

        let instructions = ""
        if (who != "-") instructions += `You are a ${who}. `
        if (goal != "-") instructions += `The goal is to ${goal} the reader. `
        if (tone != "-") instructions += `The tone must be ${tone}. `
        if (what != "-") instructions += `You have to ${what}. `
        instructions += `Your answer must be in ${language}. `
        instructions += `Data to process using previous requirements: ${prompt}`

        return instructions
    }

    /**
     * Execute the prompt calling OpenAI service
     * 
     * @private
     * @ignore
     * @param {string} prompt 
     * @param {number} temperature - OpenAI temperature (default 0.5)
     * @param {number} max_tokens - Max number of tokens for OpenAI answer (default 2000)
     * @returns {object} The OpenAI service response, or an error
     */
    async _executePrompt(prompt, temperature = 0.5, max_tokens = 2000) {
        return await kiss.ajax.request({
            url: "/command/openai/createCompletion",
            method: "post",
            showLoading: true,
            timeout: 3 * 60 * 1000, // Give OpenAI 3mn to answer
            body: JSON.stringify({
                prompt,
                temperature,
                max_tokens
            })
        })
    }
}

// Create a Custom Element
customElements.define("a-aitextarea", kiss.ux.AiTextarea)

/**
 * Shorthand to create a new AI textarea. See [kiss.ux.AiTextarea](kiss.ux.AiTextarea.html)
 * 
 * @param {object} config
 * @returns HTMLElement
 */
const createAiTextareaField = (config) => document.createElement("a-aitextarea").init(config)

;/**
 * 
 * The aiImage derives from [Field](kiss.ui.Attachment.html).
 * 
 * **AI** image field allows to generate an image with AI.
 * 
 * It's basically an attachment dedicated to store images generated by an AI.
 * 
 * @param {object} config
 * @returns this
 * 
 */
kiss.ux.AiImage = class AiImage extends kiss.ui.Attachment {
    constructor() {
        super()
    }

    /**
     * @ignore
     */
    init(config = {}) {
        config.type = "aiImage"
        config.buttonText = txtTitleCase("generate an image")
        super.init(config)
        return this
    }

    /**
     * Handle click event
     * 
     * @private
     * @ignore
     */
    _initClickEvent() {
        this.onclick = function (event) {
            if (event.target.classList.contains("field-upload-button")) {
                this.showPromptWindow()
            } else if (event.target.classList.contains("display-as-list")) {
                this.renderAs("list")
            } else if (event.target.classList.contains("display-as-thumbnails")) {
                this.renderAs("thumbnails")
            } else if (event.target.classList.contains("display-as-thumbnails-large")) {
                this.renderAs("thumbnails-large")
            }
        }
    }

    /**
     * Add a button to open an AI assistant
     * 
     * @private
     * @ignore
     */
    showPromptWindow() {
        const localStorageId = "config-ai-image-prompt-" + this.id

        createPanel({
            id: "AI-panel",
            title: txtTitleCase("#image generator"),
            icon: "fas fa-images",
            modal: true,
            closable: true,
            draggable: true,
            width: "50rem",
            align: "center",
            verticalAlign: "center",

            // Prevent from closing if the user started to work with a prompt
            events: {
                close: (forceClose) => {
                    if (forceClose) return true

                    if ($("prompt").getValue() != "") {
                        createDialog({
                            type: "danger",
                            message: txtTitleCase("are you sure you want to cancel your input?"),
                            buttonOKPosition: "left",
                            action: () => $("AI-panel").close("remove", true)
                        })
                        return false
                    }
                }
            },

            defaultConfig: {
                labelPosition: "top",
                width: "100%"
            },

            items: [
                // IMAGE SIZE
                {
                    id: "size",
                    type: "select",
                    label: txtTitleCase("image format"),
                    value: "1792x1024",
                    allowValuesNotInList: true,
                    options: [{
                        value: "1024x1024",
                        label: txtTitleCase("square")
                    }, {
                        value: "1792x1024",
                        label: txtTitleCase("landscape")
                    }, {
                        value: "1024x1792",
                        label: txtTitleCase("portrait")
                    }]
                },
                // AI PROMPT
                {
                    id: "prompt",
                    type: "textarea",
                    label: txtTitleCase("#AI image instructions"),
                    required: true,
                    rows: 10,
                    value: localStorage.getItem(localStorageId)
                },
                // BUTTON TO SEND THE PROMPT
                {
                    type: "button",
                    text: txtTitleCase("generate image..."),
                    icon: "fas fa-bolt",
                    iconColor: "var(--orange)",
                    margin: "2rem 0 0 0",
                    height: "4rem",
                    action: async () => {
                        if (!$("AI-panel").validate()) {
                            return
                        }

                        // Call the OpenAI service
                        const data = $("AI-panel").getData()
                        const result = await this._executePrompt({
                            prompt: data.prompt,
                            size: data.size
                        })

                        // Save the prompt for the next time
                        localStorage.setItem(localStorageId, data.prompt)

                        if (!result.success) {
                            createDialog({
                                type: "danger",
                                message: txtTitleCase("#openAI error"),
                                noCancel: true
                            })
                            return
                        }

                        $("AI-panel").close("remove", true)
                    }
                }
            ]
        }).setAnimation({
            name: "jackInTheBox",
            speed: "fast"
        }).render()
    }

    /**
     * Execute the prompt calling OpenAI service
     * 
     * @private
     * @ignore
     * @param {string} prompt 
     * @param {string} size - A size supported by Dall-E (1024x1024, 1792x1024, 1024x1792)
     * @returns {object} The OpenAI service response, or an error
     */
    async _executePrompt({prompt, size}) {
        return await kiss.ajax.request({
            url: "/command/openai/createImageToField",
            method: "post",
            showLoading: true,
            timeout: 3 * 60 * 1000, // Give OpenAI 3mn to answer
            body: JSON.stringify({
                modelId: this.record.model.id,
                recordId: this.record.id,
                fieldId: this.id,
                prompt,
                size
            })
        })
    }
}

// Create a Custom Element
customElements.define("a-aiimage", kiss.ux.AiImage)

/**
 * Shorthand to create a new AI image. See [kiss.ux.AiImage](kiss.ux.AiImage.html)
 * 
 * @param {object} config
 * @returns HTMLElement
 */
const createAiImageField = (config) => document.createElement("a-aiimage").init(config)

;/**
 * 
 * The Map derives from [Component](kiss.ui.Component.html).
 * 
 * Encapsulates original OpenLayers inside a KissJS UI component:
 * https://openlayers.org/
 * 
 * @param {object} config
 * @param {float} [config.longitude] - Longitude
 * @param {float} [config.latitude] - Latitude
 * @param {string} [config.address] - Address
 * @param {integer} [config.zoom] - Zoom level (default 10)
 * @param {integer} [config.width] - Width in pixels
 * @param {integer} [config.height] - Height in pixels
 * @param {boolean} [config.showMarker] - Set false to hide the marker. Default is true.
 * @param {boolean} [config.useCDN] - Set to false to use the local version of OpenLayers. Default is true.
 * @returns this
 * 
 * ## Generated markup
 * ```
 * <a-map class="a-map">
 *  <div class="ol-viewport"></div>
 * </a-map>
 * ```
 */
kiss.ux.Map = class Map extends kiss.ui.Component {
    /**
     * Its a Custom Web Component. Do not use the constructor directly with the **new** keyword.
     * Instead, use one of the 3 following methods:
     * 
     * Create the Web Component and call its **init** method:
     * ```
     * const myMap = document.createElement("a-map").init(config)
     * ```
     * 
     * Or use the shorthand for it:
     * ```
     * const myMap = createMap({
     *  width: 300,
     *  height: 200,
     *  longitude: 2.3483915,
     *  latitude: 48.8534951,
     *  zoom: 15
     * })
     * 
     * myMap.render()
     * ```
     * 
     * Or directly declare the config inside a container component:
     * ```
     * const myPanel = createPanel({
     *   title: "My panel",
     *   items: [
     *       {
     *          type: "map",
     *          width: 300,
     *          height: 200,
     *          longitude: 2.3483915,
     *          latitude: 48.8534951,
     *          zoom: 15
     *       }
     *   ]
     * })
     * myPanel.render()
     * ```
     * 
     * You can define a map from a geolocation or an address:
     * ```
     * const myMapFromGeoloc = createMap({
     *  longitude: 2.3483915,
     *  latitude: 48.8534951,
     * })
     * 
     * const myMapFromAddress = createMap({
     *  address: "10 Downing Street, London",
     * })
     * ```
     * 
     * For now, the geoencoding is done with Nominatim, which is a free service but has limitations when it comes to the accuracy of the address street number.
     */
    constructor() {
        super()
    }

    /**
     * Generates a map from a JSON config
     * 
     * @ignore
     * @param {object} config - JSON config
     * @returns {HTMLElement}
     */
    init(config = {}) {

        // Set default values
        config.width = config.width || 300
        config.height = config.height || 225
        this.zoom = config.zoom || 10
        this.longitude = config.longitude
        this.latitude = config.latitude
        this.address = config.address
        this.showMarker = (config.showMarker === false) ? false : true
        this.useCDN = (config.useCDN === false) ? false : true

        super.init(config)

        this._setProperties(config, [
            [
                ["display", "flex", "position", "top", "left", "width", "height", "margin", "padding", "background", "backgroundColor", "borderColor", "borderRadius", "borderStyle", "borderWidth", "boxShadow"],
                [this.style]
            ]
        ])

        return this
    }

    /**
     * Check if the OpenLayers (ol) library is loaded, and initialize the map
     * 
     * @ignore
     */
    async _afterRender() {
        if (window.ol) {
            this.initMap()
        } else {
            await this.initOpenLayers()
            this.initMap()
        }
    }

    /**
     * Load the OpenLayers library
     * 
     * @ignore
     */
    async initOpenLayers() {
        if (this.useCDN === false) {
            // Local
            await kiss.loader.loadScript("../../kissjs/client/ux/map/map_ol")
            await kiss.loader.loadStyle("../../kissjs/client/ux/map/map_ol")
        } else {
            // CDN
            await kiss.loader.loadScript("https://cdn.jsdelivr.net/npm/ol@v10.0.0/dist/ol")
            await kiss.loader.loadStyle("https://cdn.jsdelivr.net/npm/ol@v10.0.0/ol")
        }
    }

    /**
     * Initialize the OpenLayers map
     * - Create the map
     * - Set the target
     * - Add a click event to store the click coordinates in the "clicked" property
     * 
     * @ignore
     */
    initMap() {
        // Create the map
        this.map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                })
            ],

            view: new ol.View({
                zoom: this.zoom
            })
        })

        // Insert the map inside the KissJS component
        this.map.setTarget(this.id)

        if (this.longitude && this.latitude) {
            this.setGeolocation({
                longitude: this.longitude,
                latitude: this.latitude
            })
        } else if (this.address) {
            this.setAddress(this.address)
        }

        // Store the clicked coordinates
        // const _this = this
        // this.map.on("click", function (evt) {
        //     const coordinate = evt.coordinate
        //     const lonLat = ol.proj.toLonLat(coordinate)
        //     _this.clicked = {
        //         longitude: lonLat[0],
        //         latitude: lonLat[1]
        //     }
        // })
    }

    /**
     * Set a new address on the map
     * 
     * IMPORTANT: this methods uses Nominatim for geocoding, which is a free service but has limitations when it comes to the accuracy address street number.
     * 
     * @async
     * @param {string} address 
     * @returns {object} The geolocation object: {longitude, latitude}
     * 
     * @example
     * myMap.setAddress("10 Downing Street, London")
     */
    async setAddress(address) {
        const geoloc = await kiss.tools.getGeolocationFromAddress(address)
        if (!geoloc) return

        this.longitude = geoloc.longitude
        this.latitude = geoloc.latitude

        this.setGeolocation({
            longitude: this.longitude,
            latitude: this.latitude
        })

        return {
            longitude: this.longitude,
            latitude: this.latitude
        }
    }

    /**
     * Set a new geolocation on the map
     * 
     * @param {object} geoloc
     * @param {number} geoloc.longitude
     * @param {number} geoloc.latitude
     * @returns {object} The geolocation object
     * 
     * @example
     * myMap.setGeolocation({
     *  longitude: 2.3483915,
     *  latitude: 48.8534951
     * })
     */
    setGeolocation(geoloc) {
        try {
            this.longitude = geoloc.longitude
            this.latitude = geoloc.latitude

            const newLonLat = [this.longitude, this.latitude]
            const newCenter = ol.proj.fromLonLat(newLonLat)
            this.map.getView().setCenter(newCenter)

            if (this.showMarker) this.addGeoMarker()
            return this
        }
        catch(err) {
            // Map is not loaded yet
            return this
        }
    }

    /**
     * Add a marker on the map at the current geolocation
     * 
     * @returns this
     */
    addGeoMarker() {
        const position = ol.proj.fromLonLat([this.longitude, this.latitude])

        const iconStyle = new ol.style.Style({
            text: new ol.style.Text({
                font: '900 24px "Font Awesome 5 Free"',
                text: "\uf3c5",
                fill: new ol.style.Fill({
                    color: "#ff0000"
                }),
                offsetY: -12
            })
        })

        const iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(position)
        })
        iconFeature.setStyle(iconStyle)

        const vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [iconFeature]
            })
        })

        this.map.addLayer(vectorLayer)
        return this
    }

    /**
     * Set a new zoom level on the map
     * 
     * @param {number} zoom
     * @returns this
     * 
     * @example
     * myMap.setZoom(15)
     */
    setZoom(zoom) {
        this.zoom = zoom
        this.map.getView().setZoom(zoom)
        return this
    }

    /**
     * Set the width of the map
     * 
     * @param {number} width 
     * @returns this
     */
    setWidth(width) {
        this.style.width = width
        return this
    }

    /**
     * Set the height of the map
     * 
     * @param {number} height 
     * @returns this
     */
    setHeight(height) {
        this.style.height = height
        return this
    }
}

// Create a Custom Element and add a shortcut to create it
customElements.define("a-map", kiss.ux.Map)

/**
 * Shorthand to create a new Map component. See [kiss.ux.Map](kiss.ux.Map.html)
 * 
 * @param {object} config
 * @returns HTMLElement
 */
const createMap = (config) => document.createElement("a-map").init(config)

;/**
 * 
 * The Map field derives from [Field](kiss.ui.Field.html).
 * 
 * **Map** field displays a map with a text field to enter an address or geo coordinates.
 * 
 * @param {object} config
 * @param {string} [config.value] - Default address or geo coordinates like: latitude,longitude
 * @param {number} [config.zoom] - Zoom level (default 10, max 19)
 * @param {number} [config.mapHeight] - Height (the map width is defined by the field's width)
 * @param {number|string} [config.mapRatio] - Ratio between the field width and the map height (default 4/3). Can be a number or a string to evaluate, like: "4/3", "16/9", 1.77, 1.33, 2, etc. Use this property only if the height is not defined.
 * @returns this
 * 
 * ## Generated markup
 * ```
 * <a-mapfield class="a-mapfield">
 *  <label class="field-label"></label>
 *  <input type="text" class="field-input"></input>
 *  <a-map class="a-map">
 *      <div class="ol-viewport"></div>
 *  </a-map>
 * </a-mapfield>
 * ```
 */
kiss.ux.MapField = class MapField extends kiss.ui.Field {
    /**
     * Its a Custom Web Component. Do not use the constructor directly with the **new** keyword.
     * Instead, use one of the 3 following methods:
     * 
     * Create the Web Component and call its **init** method:
     * ```
     * const myMapField = document.createElement("a-mapfield").init(config)
     * ```
     * 
     * Or use a shorthand to create one the various field types:
     * ```
     * const myMapField = createMapField({
     *  value: "-21,55",
     *  zoom: 15,
     *  width: 600,
     *  mapHeight: 400
     * })
     * 
     * myMapField.render()
     * ```
     * 
     * Or directly declare the config inside a container component:
     * ```
     * const myPanel = createPanel({
     *   title: "My panel",
     *   items: [
     *       {
     *           type: "mapfield",
     *           value: "-21,55",
     *           zoom: 15,
     *           width: 600,
     *           mapHeight: 400
     *       }
     *   ]
     * })
     * myPanel.render()
     * ```
     */
    constructor() {
        super()
    }

    /**
     * @ignore
     */
    init(config = {}) {
        config.type = "mapField"
        config.autoSize = true

        // Generates the text field to enter the address or geo coordinates
        super.init(config)

        // Ensure the map will be displayed below the field
        this.style.flexFlow = "row wrap"

        this._observeKeys()
        return this
    }

    /**
     * @ignore
     */
    async _afterRender() {
        // Insert a map right after the field
        this._createMap()

        // Wait for the OpenLayers library to be loaded
        await this._waitForOpenLayers()

        // Adjust the map height based on the field width, if no height is defined
        if (this.config.mapRatio && !this.config.mapHeight) {
            this._adjustMapRatio()
        }

        // Set the map's default position
        if (this.config.value) {
            this._setMapValue(this.config.value)
        }

        // Add a button to expand the map fullscreen
        this._addExpandButton()
    }

    /**
     * Add a map to the field
     * 
     * @private
     * @ignore
     */
    async _createMap() {
        let zoom = this.config.zoom || 10
        if (zoom > 19) zoom = 19
        if (zoom < 1) zoom = 1

        this.map = createMap({
            zoom: this.config.zoom,
            width: this.config.width,
            height: this.config.mapHeight
        })

        this.map.style.order = 2
        this.map.style.flex = "1 1 100%"

        this.appendChild(this.map)
        this.map.render()
    }

    /**
     * Wait for the OpenLayers library to be loaded
     * 
     * @private
     * @ignore
     * @param {number} [maxAttempts=50] - Maximum number of attempts
     */
    _waitForOpenLayers(maxAttempts = 50) {
        let attempts = 0
        return new Promise((resolve, reject) => {
            function checkOpenLayers() {
                if (typeof ol !== "undefined") {
                    resolve();
                } else if (attempts < maxAttempts) {
                    attempts++
                    setTimeout(checkOpenLayers, 100)
                } else {
                    reject(new Error("Could not load openLayers library"))
                }
            }
            checkOpenLayers()
        })
    }

    /**
     * Adjusts the map height based on the field width
     * 
     * @private
     * @ignore
     */
    _adjustMapRatio() {
        this.mapRatio = this.config.mapRatio
        if (typeof this.mapRatio == "string") {
            const mapRatio = eval(this.mapRatio)
            this.mapRatio = (isNaN(mapRatio)) ? (4 / 3) : mapRatio
        }

        setTimeout(() => {
            const width = this.getBoundingClientRect().width
            this.map.setHeight(width / this.mapRatio + "px")
        }, 50)
    }

    /**
     * Updates the field value internally
     * 
     * @private
     * @ignore
     * @param {*} updates 
     */
    _updateField(updates) {
        if (this.id in updates) {
            const newValue = updates[this.id]
            if (newValue || (newValue === 0) || (newValue === "")) {
                this.field.value = newValue
                this._setMapValue(newValue)
            }
        }
    }

    /**
     * Add a button to expand the map fullscreen
     * 
     * @private
     * @ignore
     */
    _addExpandButton() {
        setTimeout(() => {
            const fieldMap = this.map
            const mapExpandButton = document.createElement("button")
            mapExpandButton.innerHTML = "⛶"
            mapExpandButton.classList.add("a-mapfield-button")
            fieldMap.map.getViewport().appendChild(mapExpandButton)
            mapExpandButton.onclick = () => this.expandMap()
        }, 500)
    }

    /**
     * @ignore
     */
    _observeKeys() {
        const _this = this
        this.field.onkeydown = function (e) {
            if (e.key === "Enter") {
                _this._setMapValue(_this.field.value)
            }
        }
    }

    /**
     * @ignore
     */
    _setMapValue(input) {
        const geoloc = kiss.tools.isGeolocation(input)
        if (geoloc) {
            this.map.setGeolocation(geoloc)
        } else {
            this.map.setAddress(input)
        }
    }

    /**
     * Expand the map fullscreen
     * 
     * @returns this
     */
    expandMap() {
        let map = createMap({
            width: "100%",
            height: "100%",
            longitude: this.map.longitude,
            latitude: this.map.latitude,
            zoom: this.map.zoom
        })

        createPanel({
            title: this.config.label,
            closable: true,
            position: "absolute",
            top: 0,
            left: 0,
            padding: 0,
            width: "100%",
            height: "100%",
            items: [
                map
            ]
        }).render()

        return this
    }

    /**
     * Set a new address on the map
     * 
     * IMPORTANT: this methods uses Nominatim for geocoding, which is a free service but has limitations when it comes to the accuracy address street number.
     * 
     * @param {string} address 
     * @returns this
     * 
     * @example
     * myMapField.setAddress("10 Downing Street, London")
     */
    setAddress(address) {
        this.map.setAddress(address)
    }

    /**
     * Set a new geolocation on the map
     * 
     * @param {object} geoloc
     * @param {number} geoloc.longitude
     * @param {number} geoloc.latitude
     * @returns this
     * 
     * @example
     * myMapField.setGeolocation({
     *  longitude: 2.3483915,
     *  latitude: 48.8534951
     * })
     */
    setGeolocation(geoloc) {
        this.map.setGeolocation(geoloc)
    }
}

// Create a Custom Element
customElements.define("a-mapfield", kiss.ux.MapField)

/**
 * Shorthand to create a new Map field. See [kiss.ux.MapField](kiss.ux.MapField.html)
 * 
 * @param {object} config
 * @returns HTMLElement
 */
const createMapField = (config) => document.createElement("a-mapfield").init(config)

;/**
 * 
 * The QrCode derives from [Component](kiss.ui.Component.html).
 * 
 * Encapsulates original QRCode.js inside a KissJS UI component:
 * https://github.com/davidshimjs/qrcodejs
 * 
 * The generator includes correct levels:
 * 
 * Level L
 * This is the lowest level of error correction rate that a QR code can have. QR code software uses this level if the user intends to generate a less dense QR code image.
 * Level L has the highest error correction rate of approximately seven percent (7%).
 * 
 * Level M
 * Level M is the middle tier of the error correction level that QR code experts recommend for marketing use. Because of this, marketers can correct their QR codes at a medium level. Level M has the highest error correction rate of approximately fifteen percent (15%).
 * 
 * Level Q
 * This level is the second to the highest error correction level. This error correction level has the highest error correction rate of approximately twenty-five percent (25%).
 * 
 * Level H
 * Level H is the highest error correction level that can withstand an extreme level of damage in their QR code. The level Q and H error correction levels are most recommended for industrial and manufacturing companies.
 * 
 * @param {object} config
 * @param {string} config.text - The text to encode as a QRCode
 * @param {integer} [config.width] - Width in pixels
 * @param {integer} [config.height] - Height in pixels
 * @param {string} [config.colorDark] - Hexa color code. Default #000000
 * @param {string} [config.colorLight] - Hexa color code. Default #ffffff
 * @param {string} [config.correctLevel] - "L", "M", "Q", or "H". Default "M"
 * @returns this
 * 
 * ## Generated markup
 * ```
 * <a-qrcode class="a-qrcode">
 *  <div class="qrcode-image"></div>
 * </a-qrcode>
 * ```
 */
kiss.ux.QrCode = class QrCode extends kiss.ui.Component {
    /**
     * Its a Custom Web Component. Do not use the constructor directly with the **new** keyword.
     * Instead, use one of the 3 following methods:
     * 
     * Create the Web Component and call its **init** method:
     * ```
     * const myQrCode = document.createElement("a-qrcode").init(config)
     * ```
     * 
     * Or use the shorthand for it:
     * ```
     * const myQrCode = createQrCode({
     *  text: "I'm a QRCode"
     * })
     * 
     * myQrCode.render()
     * ```
     * 
     * Or directly declare the config inside a container component:
     * ```
     * const myPanel = createPanel({
     *   title: "My panel",
     *   items: [
     *       {
     *          type: "qrcode",
     *          text: "I'm a QRCode",
     *          colorDark: "#00aaee",
     *          correctionLevel: "H"
     *       }
     *   ]
     * })
     * myPanel.render()
     * ```
     */
    constructor() {
        super()
    }

    /**
     * Generates a QRCode from a JSON config
     * 
     * @ignore
     * @param {object} config - JSON config
     * @returns {HTMLElement}
     */
    init(config = {}) {
        super.init(config)

        this.innerHTML = `<div class="qrcode-image"></div>`
        this.QRCodeImage = this.querySelector(".qrcode-image")
        this.style.display = "inline-block"

        this._setProperties(config, [
            [
                ["width", "height"],
                [this.style]
            ]
        ])

        return this
    }

    /**
     * Check if the QRCode library is loaded, and initialize the QRCode
     * 
     * @private
     * @ignore
     */    
    async _afterRender() {
        if (!window.QRCode) {
            await kiss.loader.loadScript("../../kissjs/client/ux/qrcode/qrcode.lib")
        }

        // Insert QRCode inside the KissJS component
        const correctLevels = {L: 1, M: 0, Q: 3, H: 2}
        new QRCode(this.QRCodeImage, {
            text: this.config.text,
            width: this.config.width || "100",
            height: this.config.height || "100",
            correctLevel: correctLevels[this.config.correctLevel] || 0
        })        
    }
}

customElements.define("a-qrcode", kiss.ux.QrCode)

/**
 * Shorthand to create a new QrCode. See [kiss.ux.QrCode](kiss.ux.QrCode.html)
 * 
 * @param {object} config
 * @returns HTMLElement
 */
const createQRCode = (config) => document.createElement("a-qrcode").init(config)

;/**
 * 
 * The chart derives from [Component](kiss.ui.Component.html).
 * 
 * Encapsulates original Chart.js charts inside a KissJS UI component:
 * https://www.chartjs.org/
 * 
 * @param {object} config
 * @param {string} config.chartType - Chart type (bar, line, pie, ... check Chart.js documentation)
 * @param {object} config.data - Chart data (https://www.chartjs.org/docs/latest/general/data-structures.html)
 * @param {object} config.options - Chart options (https://www.chartjs.org/docs/latest/general/options.html)
 * @param {object} [config.plugins] - Chart plugins (https://www.chartjs.org/docs/latest/developers/plugins.html)
 * @param {integer} [config.width] - Width in pixels
 * @param {integer} [config.height] - Height in pixels
 * @param {boolean} [config.useCDN] - Set to false to use the local version of ChartJS. Default is true.
 * @param {boolean} [config.useDataLabels] - Set to true to use the plugin for data labels. Default is false. See https://chartjs-plugin-datalabels.netlify.app/
 * @param {boolean} [config.useMoment] - Set to true to use the plugin for moment.js. Default is false. See https://github.com/chartjs/chartjs-adapter-moment
 * @returns this
 * 
 * ## Generated markup
 * ```
 * <a-chart class="a-chart">
 *  <canvas id="chart-id">
 *      <!-- Chart.js canvas -->
 *  </canvas>
 * </a-chart>
 * ```
 */
kiss.ux.Chart = class UxChart extends kiss.ui.Component {
    /**
     * Its a Custom Web Component. Do not use the constructor directly with the **new** keyword.
     * Instead, use one of the 3 following methods:
     * 
     * Create the Web Component and call its **init** method:
     * ```
     * const myChart = document.createElement("a-chart").init(config)
     * ```
     * 
     * Or use the shorthand for it:
     * ```
     * const myChart = createChart({
     *  chartType: "bar",
     *  data: {...},
     *  options: {...},
     *  width: 300,
     *  height: 200
     * })
     * 
     * myChart.render()
     * ```
     * 
     * Or directly declare the config inside a container component:
     * ```
     * const myPanel = createPanel({
     *   title: "My panel",
     *   items: [
     *       {
     *          type: "chart",
     *          chartType: "bar",
     *          data: {...},
     *          options: {...},
     *          width: 300,
     *          height: 200
     *       }
     *   ]
     * })
     * myPanel.render()
     * ```
     */
    constructor() {
        super()
    }

    /**
     * Generates a chart from a JSON config
     * 
     * @ignore
     * @param {object} config - JSON config
     * @returns {HTMLElement}
     */
    init(config = {}) {
        config.type = "chart"

        // Set default values
        config.width = config.width || "30rem"
        config.height = config.height || "22.5rem"
        this.chartType = config.chartType
        this.data = config.data
        this.options = config.options
        this.plugins = config.plugins || []
        this.useCDN = (config.useCDN === false) ? false : true
        this.useDataLabels = config.useDataLabels || false
        this.useMoment = config.useMoment || false

        super.init(config)

        this.innerHTML = `<canvas id="chart-${this.id}"></canvas>`
        this.chartContainer = this.querySelector("canvas")

        // Set the style
        this.style.display = "flex"
        this.style.alignItems = "center"
        this.style.justifyContent = "center"
        this.style.overflow = "hidden"
        this.chartContainer.style.flex = 1

        this._setProperties(config, [
            [
                ["flex", "position", "top", "left", "width", "height", "margin", "padding", "background", "backgroundColor", "borderColor", "borderRadius", "borderStyle", "borderWidth", "boxShadow"],
                [this.style]
            ]
        ])

        return this
    }

    /**
     * Check if the Chart.js library is loaded, and initialize the chart
     * 
     * @private
     * @ignore
     */
    async _afterRender() {
        await this._initChartJS({
            useDataLabels: this.useDataLabels,
            useMoment: this.useMoment
        })

        this._initChart()
    }

    /**
     * Load the OpenLayers library
     * 
     * @private
     * @ignore
     */
    async _initChartJS({useDataLabels, useMoment} = {}) {
        await this._initChartJSCore()

        // Data labels plugin
        if (useDataLabels) await this._initDataLabels()

        // Moment.js adapter
        if (useMoment) await this._initMoment()
    }

    async _initChartJSCore() {
        if (window.Chart) return

        if (this.useCDN === false) {
            await kiss.loader.loadScript("../../kissjs/client/ux/chart/chartjs")
        }
        else {
            await kiss.loader.loadScript("https://cdn.jsdelivr.net/npm/chart")
        }
    }

    /**
     * Load the Chart.js plugin for data labels
     * 
     * @private
     * @ignore
     */
    async _initDataLabels() {
        if (typeof ChartDataLabels !== "undefined") return

        if (this.useCDN === false) {
            await kiss.loader.loadScript("../../kissjs/client/ux/chart/chartjs-plugin-datalabels")
            
        }
        else {
            await kiss.loader.loadScript("https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels", {
                autoAddExtension: false
            })
        }

        Chart.register(ChartDataLabels)
    }

    /**
     * Load the Chart.js adapter for moment.js
     * 
     * @private
     * @ignore
     */
    async _initMoment() {
        if (window.moment) return

        if (this.useCDN === false) {
            await kiss.loader.loadScript("../../kissjs/client/ux/chart/chartjs-moment")
            await kiss.loader.loadScript("../../kissjs/client/ux/chart/chartjs-moment-adapter")
        }
        else {
            await kiss.loader.loadScript("https://cdn.jsdelivr.net/npm/moment/min/moment-with-locales.min")
            await kiss.loader.loadScript("https://cdn.jsdelivr.net/npm/chartjs-adapter-moment", {
                autoAddExtension: false
            })
        }

        // Set the locale to be able to translate the dates in time series
        window.moment.locale(kiss.language.current || "en")
    }

    /**
     * Initialize the chart
     * 
     * @private
     * @ignore
     */
    _initChart() {
        this.chart = new Chart(this.chartContainer, {
            type: this.chartType,
            data: this.data,
            options: this.options,
            plugins: this.plugins
        })
    }

    /**
     * Refresh the chart with new data and/or options
     * 
     * @param {object} config
     * @param {object} [config.chartType] - New chart type
     * @param {object} [config.data] - New chart data
     * @param {object} [config.options] - New chart options
     * @param {boolean} [config.useDataLabels] - Set to true to use the plugin for data labels
     * @param {boolean} [config.useMoment] - Set to true to use the adapter for moment.js
     */
    async refresh({chartType, data, options, useDataLabels, useMoment, width, height}) {
        if (!this.chart) return
        
        this.setWidth(width)
        this.setHeight(height)

        // The chart should be regenerated if the chart type or the useDataLabels property has changed
        const shouldRegenerate = (chartType != this.chartType) || (useDataLabels != this.useDataLabels)
        
        if (shouldRegenerate) {
            this.chart.destroy()
            this.chartType = chartType

            await this._initChartJS({
                useDataLabels,
                useMoment
            })
            
            this.chart = new Chart(this.chartContainer, {
                type: this.chartType,
                data,
                options,
                plugins: this.plugins
            })
        }
        else {
            Object.assign(this.chart.data, data)
            Object.assign(this.chart.options, options)
            this.chart.update()
        }
    }

    /**
     * Destroy the chart
     * 
     * https://www.chartjs.org/docs/latest/developers/api.html
     */
    destroy() {
        this.chart.destroy()
    }

    /**
     * Update the chart
     * 
     * https://www.chartjs.org/docs/latest/developers/api.html
     */
    update() {
        this.chart.update()
    }

    /**
     * Reset the chart
     * 
     * https://www.chartjs.org/docs/latest/developers/api.html
     */
    reset() {
        this.chart.reset()
    }

    /**
     * Resize the chart
     * 
     * @param {number} width - Width in pixels
     * @param {number} height - Height in pixels
     */
    resize(width, height) {
        this.style.width = width + "px"
        this.style.height = height + "px"
    }

    /**
     * Export the chart to an image
     * 
     * https://www.chartjs.org/docs/latest/developers/api.html
     * 
     * @param {string} type - image type (image/png, image/jpeg, image/webp, ...)
     * @param {number} quality - 0 to 1
     * @returns {string} Base64 image
     * 
     * @example
     * ```
     * // Returns a png data url of the image on the canvas
     * const imageAsPng = myChart.toBase64Image()
     * 
     * // Returns a jpeg data url in the highest quality of the canvas
     * const imageAsJpg = myChart.toBase64Image("image/jpg", 1)
     * ```
     */
    toBase64Image(type, quality) {
        return this.chart.toBase64Image(type, quality)
    }

    /**
     * Download the chart as an image
     * 
     * @param {object} config
     * @param {string} [config.filename] - image filename. Default is "chart.jpg"
     * @param {string} [config.type] - image type (image/png, image/jpeg, image/webp, ...). Default is "image/jpg"
     * @param {number} [config.quality] - 0 to 1. Default is 1
     */
    downloadBase64Image({type, quality, filename} = {}) {
        const link = document.createElement("a")
        link.href = this.toBase64Image(type || "image/jpg", quality || 1)
        link.download = filename || "chart.jpg"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }    

    /**
     * Set the width of the map
     * 
     * @param {number} width 
     * @returns this
     */
    setWidth(width) {
        this.config.width = width
        this.style.width = this._computeSize("width")
        return this
    }

    /**
     * Set the height of the map
     * 
     * @param {number} height 
     * @returns this
     */
    setHeight(height) {
        this.config.height = height
        this.style.height = this._computeSize("height")
        return this
    }
}

// Create a Custom Element and add a shortcut to create it
customElements.define("a-chart", kiss.ux.Chart)

/**
 * Shorthand to create a new Chart component. See [kiss.ux.Chart](kiss.ux.Chart.html)
 * 
 * @param {object} config
 * @returns HTMLElement
 */
const createChart = (config) => document.createElement("a-chart").init(config)

;/**
 * 
 * A *Directory* field allows to select users, groups, roles.
 * It also handles API clients, which can be considered as users with specific rights inside an application.
 * 
 * It has some special options compared to the standard <Select> field:
 * - users: use false to hide users
 * - groups: use false to hide groups
 * - roles: add custom roles in the list (like "everyone", "nobody, "creator"...)
 * - apiClients: use true to show them
 * - sortBy: to sort by first name or last name
 * - nameOrder: to display the first name or the last name first
 * - sortOrder: use "asc" or "desc"
 * - displayAsCards: to display the selected users as nice colored card
 * 
 * @param {object} config
 * @param {boolean} [config.multiple] - True to enable multi-select - Default to true
 * @param {boolean} [config.users] - true to list the users - Default to true
 * @param {boolean} [config.groups] - true to list the groups - Default to true
 * @param {object[]} [config.roles] - list of custom roles like: ["everyone", "authenticated", "creator", "userId", "nobody"]
 * @param {boolean} [config.apiClients] - true to list the API clients - Default to false
 * @param {string} [config.sortBy] - Use "firstName" or "lastName", to sort users according to their first name or last name
 * @param {string} [config.nameOrder] - Use "firstName" or "lastName", to show users like "Smith John" or "John Smith"
 * @param {string} [config.sortOrder] - Use "asc" (default) or "desc", to change the sort order for users and groups
 * @param {boolean} [config.displayAsCards] - true to display values as cards
 * @param {string|string[]} [config.value] - Default value
 * @param {string} [config.optionsColor] - Default color for all options
 * @param {string} [config.valueSeparator] - Character used to display multiple values
 * @param {string} [config.inputSeparator] - Character used to input multiple values
 * @param {boolean} [config.stackValues] - True to render the values one on another
 * @param {boolean} [config.hideInput] - true (default) to automatically hide the input field after a completed search
 * @param {boolean} [config.allowValuesNotInList] - Allow to input a value which is not in the list of options
 * @param {boolean} [config.allowDuplicates] - Allow to input duplicate values. Default to false.
 * @param {boolean} [config.allowClickToDelete] - Add a "cross" icon over the values to delete them. Default to false.
 * @param {boolean} [config.allowSwitchOnOff] - Allow to click on a value to switch it on/off
 * @param {function} [config.optionRenderer] - Custom function to render each option in the list of options
 * @param {function} [config.valueRenderer] - Custom function to render the actual field values
 * @param {string} [config.label]
 * @param {string} [config.labelWidth]
 * @param {string} [config.labelPosition] - left | right | top | bottom
 * @param {string} [config.labelAlign] - left | right
 * @param {boolean} [config.autocomplete] - Set "off" to disable
 * @param {boolean} [config.readOnly]
 * @param {boolean} [config.disabled] - TODO
 * @param {boolean} [config.required] - TODO
 * @param {string} [config.margin]
 * @param {string} [config.padding]
 * @param {string} [config.display] - flex | inline flex
 * @param {string|number} [config.width]
 * @param {string|number} [config.minWidth]
 * @param {string|number} [config.height]
 * @returns this
 * 
 */
kiss.ux.Directory = class Directory extends kiss.ui.Select {
    constructor() {
        super()
    }

    /**
     * @ignore
     */
    init(config = {}) {
        // Defaults
        config.multiple = !!config.multiple
        config.optionRenderer = this.optionRenderer
        config.allowDuplicates = false
        config.allowClickToDelete = true
        config.maxHeight = (kiss.screen.isMobile) ? "calc(100% - 3.2rem)" : "42rem"

        // Load options for users and/or groups and/or roles
        this.showUsers = (config.users !== false)
        this.showGroups = (config.groups !== false)
        this.showRoles = (Array.isArray(config.roles) && config.roles.length > 0)
        this.showApiClients = (config.apiClients === true)
        this.roles = config.roles || []

        // Define icons for each entry type
        this.types = {
            user: "fas fa-user directory-user-icon",
            group: "fas fa-user-friends directory-group-icon",
            role: "fas fa-key directory-role-icon",
            api: "fas fa-plug directory-role-icon"
        }

        // If true, display values as cards
        this.displayAsCards = config.displayAsCards

        // Ordering
        this.nameOrder = config.nameOrder || "lastName"
        this.sortBy = config.sortBy || "lastName"
        this.sortOrder = config.sortOrder || "asc"

        // Readonly
        this.readOnly = !!config.readOnly || !!config.computed

        // Generates the <Select> field
        super.init(config)
        
        if (!this.readOnly) {
            // Override click event
            this.onclick = function (event) {
                event.stop()
                const classes = event.target.classList
                if (classes.contains("field-select-value-delete")) return this._deleteValueByClick(event)
                else if (classes.contains("field-select-value")) return this._showOptions()
                else if (classes.contains("field-select-values")) return this._showOptions()
                else if (classes.contains("field-select")) return this._showOptions()
                else if (classes.contains("field-select-input")) return this._showOptions()
                else if (classes.contains("directory-item-initials")) return this._showOptions()
                else if (classes.contains("directory-item-title")) return this._showOptions()
                else if (classes.contains("directory-item-subtitle")) return this._showOptions()
                else if (classes.contains("field-option")) return this._selectOption(event)
            }
        }

        return this
    }

    /**
     * Defines how values are displayed
     * 
     * @private
     * @ignore
     */
    _renderValues() {
        this._loadOptions()

        // Check if the field is empty
        let isEmpty = false

        if (this.multiple) {
            if (this.value && Array.isArray(this.value) && this.value.length == 0) isEmpty = true
        } else {
            if (this.value === undefined || this.value === "") isEmpty = true
        }

        if (isEmpty) {
            this.fieldValues.innerHTML = ""
            this._adjustSizeAndPosition()
            return
        }

        // Set the value renderer
        let renderer = (this.displayAsCards) ? (this._renderValueAsCard).bind(this) : (this._renderValue).bind(this)

        // Separate values by <br> if the option "stackValues" is true
        let htmlSeparator = (this.stackValues) ? "<br>" : ""

        this.fieldValues.innerHTML = []
            .concat(this.value)
            .filter(value => value != "" && value != undefined && value != null)
            .map(value => {
                let option = this.options.find(option => option.value == value)

                if (option) return renderer(option)

                if (this.allowValuesNotInList) return renderer({
                    label: value,
                    value
                })
            })
            .join(htmlSeparator)

        // Adjust the size of the options wrapper depending on the field content
        this._adjustSizeAndPosition()
    }

    /**
     * Default renderer to render a single value
     * 
     * @private
     * @ignore
     * @param {object} option 
     */
    _renderValue(option) {
        return /*html*/ `
            <div class="field-select-value" value="${option.value}" ${(option.color || this.optionsColor) ? `style="background: ${option.color || this.optionsColor}"` : ""}>
                ${option.label || option.value}
                ${(this.allowClickToDelete == true) ? `<span class="field-select-value-delete fas fa-times"></span>` : ""}
            </div>
        `.removeExtraSpaces()
    }

    /**
     * Extended renderer to render a single value
     * 
     * @private
     * @ignore
     * @param {object} option 
     */
    _renderValueAsCard(option) {
        let initials = kiss.directory.getUserInitials(option)
        let userColor = kiss.directory.getEntryColor(option.value)

        return /*html*/ `
            <div class="field-select-value directory-item" value="${option.value}">
                <span class="directory-item-initials" style="background: ${userColor}">${initials}</span>
                <div class="directory-item-infos">
                    <span class="directory-item-title">${option.label}</span>
                    <span class="directory-item-subtitle">${option.value}</span>
                </div>
                ${(this.allowClickToDelete == true) ? `<span class="field-select-value-delete fas fa-times"></span>` : ""}
            </div>
        `.removeExtraSpaces()
    }

    /**
     * Create the list of options
     */
    async _createOptions() {
        await this._loadOptions()
        super._createOptions()
    }

    /**
     * Get the list of possible values from the directory
     * 
     * @private
     * @ignore
     */
    _loadOptions() {
        if (this.isLoaded) return

        this.options = []

        if (this.showRoles) {
            kiss.directory._initRoles()
            this.options = this.options.concat(this.roles.map(roleId => kiss.directory.roles[roleId]))
        }
        if (this.showUsers != false) this.options = this.options.concat(this.getUsers())
        if (this.showGroups == true) this.options = this.options.concat(this.getGroups())
        if (this.showApiClients == true) this.options = this.options.concat(this.getApiClients())

        this.isLoaded = true
    }

    /**
     * Get users
     * 
     * @ignore
     * @returns {object[]} Array of users
     */
    getUsers() {
        return kiss.directory
            .getUsers({
                sortBy: this.sortBy,
                sortOrder: this.sortOrder,
                nameOrder: this.nameOrder,
                onlyActiveUsers: true
            })
            .map(user => {
                return {
                    type: "user",
                    label: user.name,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    value: user.email
                }
            })
    }

    /**
     * Get groups
     * 
     * @ignore
     * @returns {object[]} Array of groups
     */
    getGroups() {
        return kiss.directory
            .getGroups(this.sortOrder)
            .map(group => {
                return {
                    type: "group",
                    label: group.name,
                    value: group.id
                }
            })
    }

    /**
     * Get API clients
     * 
     * @ignore
     * @returns {object[]} Array of API clients
     */
    getApiClients() {
        return kiss.directory
            .getApiClients()
            .map(client => {
                return {
                    type: "api",
                    label: client.name,
                    value: client.id
                }
            })
    }    

    /**
     * Defines how options are displayed
     * 
     * @ignore
     */
    optionRenderer(option) {
        return `<span class="${this.types[option.type]} field-option-icon" style="color: #00aaee"></span>${option.label}`
    }
}

// Create a Custom Element and add a shortcut to create it
customElements.define("a-directory", kiss.ux.Directory)

/**
 * Shorthand to create a new Directory field. See [kiss.ux.Directory](kiss.ux.Directory.html)
 * 
 * @param {object} config
 * @returns HTMLElement
 */
const createDirectory = (config) => document.createElement("a-directory").init(config)

;/**
 * 
 * A *Link* field allows to link records together by picking a foreign record from a list.
 * 
 * @param {object} config
 * @param {object} config.link - Configuration of the link:
 * @param {string} config.link.modelId - Id of the foreign model
 * @param {string} config.link.fieldId - Id of the field in the foreign model that will be linked
 * @param {boolean} [config.canCreateRecord] - Set to false to prevent from creating a new foreign record directly from the Link field. Default = true
 * @param {boolean} [config.canLinkRecord] - Set to false to prevent from linking to a new foreign record directly from the Link field. Default = true
 * @param {boolean} [config.canDeleteLinks] - Set to false to prevent from deleting links directly from the Link field. Default = true
 * @param {boolean} [config.multiple] - True to enable multi-select
 * @param {boolean} [config.linkStyle] - "default" or "compact"
 * @param {string} [config.label]
 * @param {string} [config.labelWidth]
 * @param {string} [config.labelPosition] - left | right | top | bottom
 * @param {string} [config.labelAlign] - left | right
 * @param {boolean} [config.readOnly]
 * @param {string} [config.margin]
 * @param {string} [config.padding]
 * @param {string|number} [config.width]
 * @param {string|number} [config.minWidth]
 * @param {string|number} [config.height]
 * @returns this
 * 
 * @example
 * {
 *   type: "link",
 *   id: "customers",
 *   label: "Customers",
 *   link: {
 *      modelId: "customer",
 *      fieldId: "name"
 *   },
 *   multiple: true,
 *   canCreateRecord: true,
 *   canLinkRecord: true
 * }
 * 
 */
kiss.ux.Link = class Link extends kiss.ui.Select {
    constructor() {
        super()
    }

    init(config = {}) {
        this.readOnly = !!config.readOnly
        this.canCreateRecord = config.canCreateRecord
        this.canLinkRecord = config.canLinkRecord
        this.canDeleteLinks = config.canDeleteLinks

        // Init the foreign table
        this.foreignModel = kiss.app.models[config.link.modelId]
        this.foreignCollection = this.foreignModel?.collection || {}
        this.sort = []

        // Init the global table that contains relationships
        this.linkModel = kiss.app.models.link
        this.linkCollection = this.linkModel.collection

        // Implement the default <Select> field
        super.init(config)

        // Overrides default click event
        this.onclick = this._handleClick
        
        // Disable the dropdown list that shows options
        this._showOptions = () => {}

        return this
    }

    /**
     * Handle the click event
     * 
     * @private
     * @ignore
     * @param {object} event 
     */
    _handleClick(event) {
        const classes = event.target.classList

        // Clicked on the unlink button
        if (classes.contains("field-link-value-delete")) {
            if (!this.readOnly) {
                const fieldValueElement = event.target.closest("div")
                const linkId = fieldValueElement.getAttribute("linkId")
                return this._deleteLink(linkId)
            }
        }

        // Clicked on a foreign record item
        const item = event.target.closest(".field-link-value")
        if (item) {
            const clickedItem = event.target.closest(".field-link-value")
            const recordId = clickedItem.getAttribute("recordId")
            return this._openRecord(recordId)
        }

        // Clicked on a button
        const button = event.target.closest(".a-button")
        if (button) {
            if (button.classList.contains("field-link-button-link")) return this._linkForeignRecords()
            if (button.classList.contains("field-link-button-add")) return this._createAndLink()
            if (button.classList.contains("field-link-button-expand")) return this._showForeignRecords()
        }

        // Clicked in the buttons area
        if (event.target.closest(".field-link-buttons") && this.canLinkRecord && !this.readOnly) {
            this._linkForeignRecords()
        }
    }

    /**
     * Bind the field to a record
     * (this subscribes the field to react to database changes)
     * 
     * @private
     * @ignore
     * @param {object} record
     * @returns this
     */
    _bindRecord(record) {
        this.record = record
        this.modelId = record.model.id
        this.recordId = record.id

        // React to changes on a single record update of the binded foreign model
        const foreignModelId = this.foreignModel.id

        this.subscriptions.push(
            subscribe("EVT_DB_UPDATE:" + foreignModelId.toUpperCase(), (msgData) => {
                if (msgData.modelId == foreignModelId) {
                    const recordIds = this.links.map(link => link.recordId)
                    if (recordIds.includes(msgData.id)) {
                        this._renderValues()
                    }
                }
            })
        )

        // React to changes on foreign records deletions
        this.subscriptions.push(
            subscribe("EVT_DB_DELETE:" + foreignModelId.toUpperCase(), (msgData) => {
                if (msgData.modelId == foreignModelId) {
                    const recordIds = this.links.map(link => link.recordId)
                    if (recordIds.includes(msgData.id)) {
                        this._renderValues()
                    }
                }
            })
        )

        // React to changes on multiple records changes of the binded foreign model
        this.subscriptions.push(
            subscribe("EVT_DB_UPDATE_BULK", (msgData) => {
                let shouldUpdate = false
                const recordIds = this.links.map(link => link.recordId)
                const operations = msgData.data

                operations.forEach(operation => {
                    if ((operation.modelId == foreignModelId) && recordIds.includes(operation.recordId)) shouldUpdate = true
                })

                if (shouldUpdate) {
                    this._renderValues()
                }
            })
        )

        // React to changes on link creations
        this.subscriptions.push(
            subscribe("EVT_DB_INSERT:LINK", (msgData) => {
                if ((msgData.data.rX == this.record.id) || (msgData.data.rY == this.record.id)) {
                    this._renderValues()
                }
            })
        )

        // React to changes on link deletions
        this.subscriptions.push(
            subscribe("EVT_DB_DELETE:LINK", (msgData) => {
                const recordIds = this.links.map(link => link.linkId)
                if (recordIds.includes(msgData.id)) {
                    this._renderValues()
                }
            })
        )

        return this
    }

    /**
     * Get the field value
     * 
     * @returns {object[]} - The field value, which is an array of foreign records
     */
    getValue() {
        return this.links || []
    }

    /**
     * Create a new foreign record then link it directly with the active record
     * 
     * @private
     * @ignore
     */
    async _createAndLink() {
        // Prevent from linking multiple records if the field is not flagged "multiple"
        if (!this.multiple && this.links.length > 0) {
            return createNotification(txtTitleCase("#only one link"))
        }

        // Creates the new foreign record
        let newForeignRecordData = {}
        let newForeignRecord

        if (!this.config.inherit) {
            newForeignRecord = this.foreignModel.create()
        }
        else {
            // If the inheritance option is enabled,
            // each new document created will be pre-filled with the values of the fields of the same name
            const model = kiss.app.models[this.modelId]
            const sharedFields = model.fields.filter(fX => this.foreignModel.fields.find(
                fY => fX.label == fY.label &&
                !fX.deleted &&
                !fY.deleted &&
                !fX.isSystem &&
                !fX.isFromPlugin
            ))
            
            sharedFields.forEach(field => {
                const foreignField = this.foreignModel.getFieldByLabel(field.label)
                newForeignRecordData[foreignField.id] = this.record[field.id]
            })

            newForeignRecord = this.foreignModel.create(newForeignRecordData, true)
        }
        
        await newForeignRecord.save()

        // Display the new record in a form
        createForm(newForeignRecord)

        // Link the 2 records together
        await this.record.linkTo(newForeignRecord, this.id, this.config.link.fieldId)

        // Update the list of links
        this._renderValues()
    }

    /**
     * Delete a link to a foreign record
     * 
     * @private
     * @ignore
     * @param {string} linkId - id of the record that holds the link
     */
    async _deleteLink(linkId) {
        createDialog({
            title: txtTitleCase("delete a link"),
            type: "dialog",
            message: txtTitleCase("#delete link"),
            colorOK: "var(--red)",
            colorCancel: "var(--green)",
            action: async () => {
                const success = await this.record.deleteLink(linkId)
                if (!success) return

                this._renderValues()
                this.dispatchEvent(new Event("change"))
            }
        })
    }

    /**
     * Open a foreign record
     * 
     * @private
     * @ignore
     * @param {string} recordId - id of the record to open
     */
    async _openRecord(recordId) {
        const link = this.links.find(linkInfo => linkInfo.record.id == recordId)
        const record = this.foreignModel.create(link.record)
        createForm(record)
    }

    /**
     * Show linked foreign records
     * 
     * @private
     * @ignore
     */
    async _showForeignRecords() {
        const foreignRecords = this.links.map(link => link.record)
        createRecordSelectionWindow(this.foreignModel, this.id, foreignRecords, null, {
            canSelect: false
        })
    }

    /**
     * Link a record from the datatable
     * 
     * @private
     * @ignore
     * @param {object} record
     */
    async _linkRecord(record) {
        createDialog({
            title: txtTitleCase("#connect records"),
            message: txtTitleCase("#connect confirmation"),
            icon: "fas fa-link",
            action: async () => {
                // Note: in this context, "this" is the datatable view associated with the field
                const linkField = $(this.config.fieldId)

                const success = await linkField._addLink(record)
                if (!success) return createNotification(txtTitleCase("#record already linked"))
                
                linkField.setValid()
                this.closest("a-panel").close()
            }
        })
    }

    /**
     * Show all the foreign records that can be selected
     * 
     * @private
     * @ignore
     */
    async _linkForeignRecords() {
        // Prevent from linking multiple records if the field is not flagged "multiple"
        if (!this.multiple && this.links.length > 0) {
            return createNotification(txtTitleCase("#only one link"))
        }

        createRecordSelectionWindow(this.foreignModel, this.id, null, this._linkRecord, {
            iconAction: "fas fa-link",
            canSelect: false
        })
    }

    /**
     * Add a link with an existing foreign record
     * 
     * @private
     * @ignore
     * @param {object} foreignRecord
     * @eturns {boolean} false if the operation failed
     */
    async _addLink(foreignRecord) {
        // Prevent from selecting a record which is already linked
        if (this.links.map(link => link.recordId).includes(foreignRecord.id)) return false

        await this.record.linkTo(foreignRecord, this.id, this.config.link.fieldId)
        this._renderValues()
        this.dispatchEvent(new Event("change"))
        return true
    }

    /**
     * Get the view configuration
     * 
     * @private
     * @ignore
     * @returns {object[]}
     */
    _getViewConfig() {
        const viewRecord = kiss.app.collections.view.records.find(view => view.modelId == this.foreignModel.id && view.fieldId == this.id)

        // Register the field to listen to view changes
        if (viewRecord && !this.viewId) {
            this.viewId = viewRecord.id
            this.subscriptions.push(
                kiss.pubsub.subscribe("EVT_DB_UPDATE:VIEW", msgData => {
                    if (msgData.id != this.viewId) return
                    if (msgData.data.sort) this._renderValues()
                    if (msgData.data.config && msgData.data.config.columns) this._renderValues()
                })
            )
        }

        // Assign sort infos
        this.sort = (viewRecord) ? viewRecord.sort : this.sort
        
        return (viewRecord) ? viewRecord.config.columns : []
    }

    /**
     * Load the linked records
     * 
     * @private
     * @ignore
     */
    async _loadLinks() {
        if (!this.record) {
            this.links = []
            return
        }
        this.links = await kiss.data.relations.getLinksAndRecords(this.record.model.id, this.record.id, this.id, this.sort)
    }

    /**
     * Render the current value(s) of the widget
     * 
     * @private
     * @ignore
     * @async
     */
    async _renderValues() {
        const viewConfig = this._getViewConfig()

        await this._loadLinks()

        const linkButtonId = kiss.tools.shortUid()
        const hasLinks = (this.links.length != 0)
        const canLinkOtherRecords = (hasLinks && this.multiple != true) ? false : true

        const showAddButton = this.record && !this.readOnly && this.canCreateRecord !== false && canLinkOtherRecords
        const showLinkButton = !this.readOnly && this.canLinkRecord !== false && canLinkOtherRecords
        const showExpandButton = this.multiple && hasLinks
        const showButtons = showAddButton || showLinkButton || showExpandButton

        const linkButtons = (!showButtons) ? "" : `
            <div class="field-link-buttons">
                ${(showAddButton) ? `<div id="${linkButtonId}" class="a-button field-link-button field-link-button-add"><span class="button-icon fas fa-plus"></span><span class="button-text">${txtTitleCase("new")}</span></div>` : ""}
                ${(showLinkButton) ? `<div class="a-button field-link-button field-link-button-link"><span class="button-icon fas fa-link"></span><span class="button-text">${txtTitleCase("#select link")}</span></div>` : ""}
                ${(showExpandButton) ? `<div class="a-button field-link-button field-link-button-expand"><span class="button-icon fas fa-table"></span><span class="button-text">${txtTitleCase("display as table")}</span></div>` : ""}
            </div>`.removeExtraSpaces()

        // No record attached, or no links => just display buttons
        if (!this.record || !hasLinks) {
            this.fieldValues.innerHTML = linkButtons
            return
        }

        // Separate values with <br> if the option "stackValues" is true
        let htmlSeparator = (this.stackValues) ? "<br>" : ""

        // Get the fields to display in the cards, depending on the config
        const isCompact = (this.config.linkStyle == "compact")
        const displayLabels = (!["compact", "no labels"].includes(this.config.linkStyle))

        let fields = this.foreignModel.getActiveFields()
        let fieldsToDisplay = fields

        if (isCompact) {
            const primaryKeyField = this.foreignModel.getPrimaryKeyField()
            fieldsToDisplay = [primaryKeyField || fields[0]]
        } else {
            if (viewConfig.length > 0) {
                fieldsToDisplay = viewConfig
                    .filter(column => column.hidden != true)
                    .map(column => fieldsToDisplay.find(field => field.id == column.id))
                    .filter(field => field)
            }
        }

        // Render!
        const badge = (isCompact) ? "" : `<div class="field-link-item-badge" style="background: ${this.foreignModel.color}">
                            <span class="${this.foreignModel.icon}"></span>
                        </div>`

        this.fieldValues.innerHTML =
            linkButtons +
            this.links.map(recordInfo => {
                return `<div class="field-link-value ${(isCompact) ? "field-link-value-compact" : ""}" recordId="${recordInfo.recordId}" linkId="${recordInfo.linkId}" style="border-color: ${this.foreignModel.color}">
                            ${badge}
                            <div class="field-link-record" id="field-link-record:${recordInfo.recordId}">
                                ${this._renderSingleValue(recordInfo.record, fieldsToDisplay, displayLabels)}
                            </div>
                            ${(this.readOnly || !this.canDeleteLinks) ? "" : `<span class="field-link-value-delete fas fa-times"></span>`}
                        </div>`.removeExtraSpaces()
            }).join(htmlSeparator)
    }

    /**
     * Render a single value
     * 
     * @private
     * @ignore
     * @param {object} record - Record to render
     * @returns {string} Html for the value
     */
    _renderSingleValue(record, fieldsToDisplay, displayLabels) {
        return fieldsToDisplay.map(field => {

            // Skip system fields
            if (field.isSystem) return ""
            
            // Skip link fields
            if (field.type == "link") return ""

            let value = record[field.id]
            const htmlLabel = (displayLabels) ? `<div class="field-link-item-label">${field.label}</div>` : ""
            const htmlValue = kiss.fields.renderers[this.foreignModel.id][field.id]({field, value, record})

            return `<div class="field-link-item">
                ${htmlLabel}
                <div class="field-link-item-value">${htmlValue}</div>
            </div>`
        }).join("")
    }

    /**
     * Get the list of possible values from the linked collection
     * 
     * @private
     * @ignore
     */
    async _loadOptions() {
        if ((!this.foreignCollection) || (!this.config.link.modelId)) {
            this.options = []
            return
        }

        const options = await this.foreignCollection.find()
        this.options = options.map(record => record.id)
    }
}

// Create a Custom Element and add a shortcut to create it
customElements.define("a-link", kiss.ux.Link)

/**
 * Shorthand to create a new Link field. See [kiss.ux.Link](kiss.ux.Link.html)
 * 
 * @param {object} config
 * @returns HTMLElement
 */
const createLink = (config) => document.createElement("a-link").init(config)

;/**
 * 
 * The Wizard Panel derives from [Panel](kiss.ui.Panel.html).
 * 
 * It's a panel where items are displayed one at a time (each wizard page) with helper buttons (next, previous) to navigate through the pages.
 * The panel title is updated with the current page number.
 * 
 * @param {object} config
 * @param {function} config.action - Action triggered when the last page of the wizard is validated. The function is called with the wizard panel as context, so that this.getData() can be used to get the data of all fields of the wizard.
 * @param {object} [config.actionText] - Text of the action button of the last page, like "Done", "Proceed", "Let's go". Default = "OK"
 * @param {boolean} [config.pageValidation] - If true, validate each page when navigating next/previous. Default = false
 * @returns this
 * 
 * ## Generated markup
 * ```
 * <a-wizardpanel class="a-panel">
 *  <div class="panel-header">
 *      <span class="panel-icon"></span>
 *      <span class="panel-title"></span>
 *      <span class="panel-custom-buttons"></span>
 *      <span class="panel-button-expand-collapse"></span>
 *      <span class="panel-button-maximize"></span>
 *      <span class="panel-button-close"></span>
 *  </div>
 *  <div class="panel-body">
 *      <!-- Panel items are inserted here -->
 *  </div>
 * </a-wizardpanel>
 * ```
 * 
 */
kiss.ux.WizardPanel = class WizardPanel extends kiss.ui.Panel {
    /**
     * Its a Custom Web Component. Do not use the constructor directly with the **new** keyword.
     * Instead, use one of the 3 following methods:
     * 
     * Create the Web Component and call its **init** method:
     * ```
     * const myWizardPanel = document.createElement("a-wizardpanel").init(config)
     * ```
     * 
     * Or use the shorthand for it:
     * ```
     * const myWizardPanel = createWizardPanel({
     * 
     *   // Can have the same config properties as a panel
     *   title: "Setup"
     *   icon: "fas fa-wrench",
     *   headerBackgroundColor: "#00aaee",
     *   closable: true,
     *   draggable: true,
     *   modal: true,
     *   display: "flex"
     *   flexFlow: "column",
     *   padding: "10px",
     * 
     *   // Wizard pages
     *   items: [
     *      wizardPage1,
     *      wizardPage2,
     *      wizardPage3
     *   ],
     *   actionText: "Proceed",
     *   action: function() {
     *      // Get the data of all fields of the wizard
     *      const data = this.getData()
     *     // Do something with the data
     *   }
     * })
     * 
     * myWizardPanel.render()
     * ```
     * 
     * Or directly declare the config inside a container component:
     * ```
     * const myBlock = createBlock({
     *   items: [
     *       {
     *           type: "wizardpanel",
     *           title: "Foo",
     *           items: [
     *               wizardPage1,
     *               wizardPage2,
     *               wizardPage3
     *           ],
     *           actionText: "Proceed",
     *           action: function() {
     *              // Get the data of all fields of the wizard
     *              const data = this.getData()
     *              // Do something with the data
     *           }
     *       }
     *   ]
     * })
     * myBlock.render()
     * ```
     * 
     * If you need to validate a page before navigating to the next one, you can add a **validate** method to the page:
     * ```
     * const wizardPage1 = {
     *  type: "panel", // or "block"
     *  items: [
     *      // Page items
     *  ],
     *  methods: {
     *     validate: function() {
     *       // Validate the page
     *       return true // or false
     *     }
     *  }
     * }
     * 
     * Use this in combination with "pageValidation" property in the wizard panel config.
     * If you don't need a specific validation, "pageValidation" will validate all the pages as normal forms, checking for validation rules of each field.
     * ```
     * 
     */
    constructor() {
        super()
    }

    /**
     * Generates a Wizard Panel from a JSON config
     * 
     * @ignore
     * @param {object} config - JSON config
     * @returns {HTMLElement}
     */
    init(config) {
        config.id = config.id || "cmp-" + (kiss.global.componentCount++).toString()
        this.id = config.id
        this.currentPage = 0
        this.numberOfPages = config.items.length
        this.pageValidation = !!config.pageValidation

        this._initButtons(config)
        config.items = this._initStructure(config)

        super.init(config)
        this._updateTitle()

        this.classList.add("a-panel")
        return this
    }

    /**
     * Manage click event in the panel's header to perform various actions like "close", "expand", "collapse"...
     * 
     * @private
     * @ignore
     */
    _initHeaderClickEvent() {
        this.panelHeader.onclick = function(event) {
            const element = event.target
            let panel = element.closest("a-wizardpanel")

            if (element.classList.contains("panel-button-close")) {
                panel.close()
            }
            else if (element.classList.contains("panel-button-expand")) {
                panel.maximize(20)
            }
            else if (element.classList.contains("panel-button-expand-collapse") || element.classList.contains("panel-header-collapsible")) {
                panel.expandCollapse()
            }
            else if ((element.classList.contains("panel-title") || element.classList.contains("panel-icon")) && panel.config.collapsible === true && panel.config.draggable !== true) {
                panel.expandCollapse()
            }
        }
    }    

    /**
     * Initialize the DOM structure of the wizard panel:
     * - original items are inserted into "pages" block
     * - a button bar is added to the bottom of the panel to navigate between pages
     * 
     * @private
     * @ignore
     * @param {object} config 
     * @returns {object} The final structure
     */
    _initStructure(config) {
        const items = [
            {
                id: this.id + "-pages",
                multiview: true,
                items: config.items
            },
            {
                id: this.id + "-buttons",
                layout: "horizontal",
                defaultConfig: {
                    type: "button",
                    margin: "1rem 0.5rem 0 0",
                    height: "4rem",
                    flex: 1
                },
                items: [
                    this.buttonCancel,
                    (this.numberOfPages > 1) ? this.buttonNext : this.buttonOK
                ]
            }
        ]
        return items
    }

    /**
     * Initialize the buttons of the wizard panel:
     * - cancel
     * - previous / next
     * - validate
     * 
     * @private
     * @ignore
     * @param {object} config 
     */
    _initButtons(config) {
        this.buttonCancel = {
            icon: "fas fa-times",
            text: txtTitleCase("cancel"),
            action: function () {
                this.closest("a-wizardpanel").close()
            }
        }

        this.buttonPrevious = {
            icon: "fas fa-chevron-left",
            text: txtTitleCase("previous"),
            action: function () {
                this.closest("a-wizardpanel").previous()
            }
        }

        this.buttonNext = {
            icon: "fas fa-chevron-right",
            iconPosition: "right",
            text: txtTitleCase("next"),
            action: function () {
                this.closest("a-wizardpanel").next()
            }
        }             

        this.buttonOK = {
            icon: "fas fa-check",
            text: config.actionText || "OK",
            action: () => {
                if (this.pageValidation && !this.validatePage()) return

                if (config.action) {
                    // If an action is defined, call it with the wizard panel as context
                    config.action.bind(this)() 
                }
                else {
                    // If no action is defined, just close the wizard panel
                    this.close()
                }
            }
        }     
    }

    /**
     * Update the buttons when navigating between pages
     * 
     * @private
     * @ignore
     */
    _updateButtons() {
        let buttons
        if (this.currentPage == 0) {
            buttons = [this.buttonCancel, (this.numberOfPages > 1) ? this.buttonNext : this.buttonOK]
        }
        else if (this.currentPage == this.numberOfPages - 1) {
            buttons = [this.buttonPrevious, this.buttonOK]
        }
        else {
            buttons = [this.buttonPrevious, this.buttonNext]
        }
        $(this.id + "-buttons").setItems(buttons)
    }

    /**
     * Update the title of the wizard panel with the current page number
     * 
     * @private
     * @ignore
     */
    _updateTitle() {
        this.setTitle((this.currentPage + 1) + "/" + this.numberOfPages + ((this.config.title) ? " - " + this.config.title : ""))
    }

    /**
     * Validates the form of a wizard page.
     * Prevents from navigating to the next page if the form is not validated.
     * 
     * @param {number} [pageIndex] - Optional wizard's page to validate. If not specified, tries to validate the current page.
     */
    validatePage(pageIndex) {
        this.pages = $(this.id + "-pages").children
        if (!this.pages) return true
        const currentPage = this.pages[pageIndex || this.currentPage]
        return (currentPage.validate) ? currentPage.validate() : true
    }

    /**
     * Navigate to the next wizard page
     */
    next() {
        if (this.pageValidation && !this.validatePage()) return

        this.currentPage++
        this._updateButtons()
        this._updateTitle()

        $(this.id + "-pages").showItem(this.currentPage, {
            name: "slideInRight",
            speed: "faster"
        })
    }

    /**
     * Navigate to the previous wizard page
     */
    previous() {
        this.currentPage--
        this._updateButtons()
        this._updateTitle()
        
        $(this.id + "-pages").showItem(this.currentPage, {
            name: "slideInLeft",
            speed: "faster"
        })
    }
}

// Create a Custom Element and add a shortcut to create it
customElements.define("a-wizardpanel", kiss.ux.WizardPanel)

/**
 * Shorthand to create a new Wizard Panel. See [kiss.ux.WizardPanel](kiss.ux.WizardPanel.html)
 * 
 * @param {object} config
 * @returns HTMLElement
 */
const createWizardPanel = (config) => document.createElement("a-wizardpanel").init(config)

;/**
 * 
 * A *SelectViewColumn* field allows to select values from a view column
 * 
 * @ignore
 * @param {object} config
 * @param {boolean} [config.multiple] - True to enable multi-select - Default to true
 * @param {string|string[]} [config.value] - Default value
 * @param {string} [config.optionsColor] - Default color for all options
 * @param {string} [config.valueSeparator] - Character used to display multiple values
 * @param {string} [config.inputSeparator] - Character used to input multiple values
 * @param {boolean} [config.stackValues] - True to render the values one on another
 * @param {boolean} [config.hideInput] - true (default) to automatically hide the input field after a completed search
 * @param {boolean} [config.allowValuesNotInList] - Allow to input a value which is not in the list of options
 * @param {boolean} [config.allowDuplicates] - Allow to input duplicate values. Default to false.
 * @param {boolean} [config.allowClickToDelete] - Add a "cross" icon over the values to delete them. Default to false.
 * @param {boolean} [config.allowSwitchOnOff] - Allow to click on a value to switch it on/off
 * @param {function} [config.optionRenderer] - Custom function to render each option in the list of options
 * @param {function} [config.valueRenderer] - Custom function to render the actual field values
 * @param {string} [config.label]
 * @param {string} [config.labelWidth]
 * @param {string} [config.labelPosition] - left | right | top | bottom
 * @param {string} [config.labelAlign] - left | right
 * @param {boolean} [config.autocomplete] - Set "off" to disable
 * @param {boolean} [config.readOnly]
 * @param {boolean} [config.disabled]
 * @param {boolean} [config.required]
 * @param {string} [config.margin]
 * @param {string} [config.padding]
 * @param {string} [config.display] - flex | inline flex
 * @param {string|number} [config.width]
 * @param {string|number} [config.minWidth]
 * @param {string|number} [config.height]
 * @returns this
 * 
 */
kiss.ux.SelectViewColumn = class SelectViewColumn extends kiss.ui.Select {
    constructor() {
        super()
    }

    /**
     * @ignore
     */
    init(config = {}) {
        // Generates the <Select> field
        super.init(config)

        // View used to retrieve data
        this.viewId = config.viewId

        // Field to retrieve in the view
        this.fieldId = config.fieldId
        return this
    }

    /**
     * Create the list of options
     * 
     * @private
     * @ignore
     */
    async _createOptions() {
        await this._loadOptions()
        super._createOptions()
    }

    /**
     * Get the list of possible values from the view column
     * 
     * @private
     * @ignore
     */
    async _loadOptions() {
        if (this.isLoaded) return
        this.options = []
        const viewRecord = kiss.app.collections.view.records.find(view => view.id == this.viewId)
        const collection = viewRecord.getCollection()

        await collection.find()
        this.options = collection.records

        // Exclude group records
        if (collection.group.length > 0) {
            this.options = this.options.filter(record => !record.$type)
        }

        // Exclude records with empty values
        this.options = this.options.filter(record => !!record[this.fieldId])

        // Convert records to options
        this.options = this.options.map(record => {
            const fieldValue = record[this.fieldId]
            return {
                value: (Array.isArray(fieldValue)) ? fieldValue[0] : fieldValue
            }
        })

        // Remove duplicates
        this.options = this.options.uniqueObject("value")

        // Sort alphabetically
        this.options = this.options.sortBy("value")

        this.isLoaded = true
    }
}

// Create a Custom Element
customElements.define("a-selectviewcolumn", kiss.ux.SelectViewColumn)

;/**
 * 
 * A *SelectViewColumns* field allows to select a record in a view, and assign values to multiple fields at once:
 * - this field
 * - other fields of the same record
 * 
 * The field value is set by getting the value of the foreign field which id is fieldId[0].
 * The other fields are set by comparing their label:
 * - if the foreign field has the same label as a field inside the record, it's a match: the local field is set
 * - otherwise, the foreign field is skipped
 * 
 * Example:
 * - you pick a product in a view showing all products
 * - it assigns the product name, product category and unit price at the same time
 * - if extra fields are present in the foreign record but not in the local record, they are skipped
 * 
 * @ignore
 * @param {object} config
 * @param {string} [config.viewId] - The view to pick records in. Use this or collectionId.
 * @param {string} [config.collectionId] - The collection to pick records in. Use this or viewId.
 * @param {string[]} config.fieldId - Ids of the fields which will be set when picking a record
 * @param {string|string[]} [config.value] - Default value
 * @param {string} [config.optionsColor] - Default color for all options
 * @param {boolean} [config.allowValuesNotInList] - Allow to create a new entry in the view
 * @param {function} [config.optionRenderer] - Custom function to render each option in the list of options
 * @param {function} [config.valueRenderer] - Custom function to render the actual field values
 * @param {string} [config.label]
 * @param {string} [config.labelWidth]
 * @param {string} [config.labelPosition] - left | right | top | bottom
 * @param {string} [config.labelAlign] - left | right
 * @param {boolean} [config.readOnly]
 * @param {boolean} [config.disabled]
 * @param {boolean} [config.required]
 * @param {string} [config.margin]
 * @param {string} [config.padding]
 * @param {string} [config.display] - flex | inline flex
 * @param {string|number} [config.width]
 * @param {string|number} [config.minWidth]
 * @param {string|number} [config.height]
 * @returns this
 * 
 */
kiss.ux.SelectViewColumns = class SelectViewColumns extends kiss.ui.Select {
    constructor() {
        super()
    }

    /**
     * @ignore
     */
    init(config = {}) {
        // Generates the <Select> field
        super.init(config)

        // View used to retrieve data
        // OR
        // Collection used to retrieve data
        this.viewId = config.viewId
        this.collectionId = config.collectionId

        // Field to retrieve in the view
        this.fieldId = config.fieldId[0]

        // Other fields to set automatically
        this.otherFieldIds = config.fieldId.slice(1)

        // Allow to create a new value if necessary
        this.allowValuesNotInList = !!config.allowValuesNotInList

        // Overrides default click event
        this.onclick = this._handleClick

        // Disable the dropdown list that shows options
        this._showOptions = () => {}
        return this
    }

    /**
     * Handle the click event
     * 
     * @private
     * @ignore
     * @param {object} event 
     */    
    async _handleClick(event) {
        if (event.target.classList.contains("field-label")) return
        this._showView()
    }

    /**
     * Show the view to pick records in
     * 
     * @private
     * @ignore
     */
    async _showView() {
        const _this = this
        let collection, columns, sort, filter, group, viewRecord

        if (this.viewId) {
            viewRecord = await kiss.app.collections.view.findOne(this.viewId)
            this.viewModel = kiss.app.models[viewRecord.modelId]
            collection = this.viewModel.collection
            columns = this.viewModel.getFieldsAsColumns()
            sort = viewRecord.sort
            filter = viewRecord.filter
            group = viewRecord.group
        }
        else if (this.collectionId) {
            collection = kiss.app.collections[this.collectionId]
            this.viewModel = kiss.app.models[collection.modelId]
            columns = this.viewModel.getFieldsAsColumns()
            sort = []
            filter = {}
            group = []
        }
        else {
            // Exit if no viewId or collectionId have been provided
            return
        }
        
        // Build the datatable
        const datatable = createDatatable({
            collection: this.viewModel.collection,
            sort: sort,
            filter: filter,
            group: group,

            canEdit: false,
            canSelect: false,
            canAddField: false,
            canEditField: false,
            canCreateRecord: this.allowValuesNotInList,
            showActions: false,
            columns: columns,
            color: this.viewModel.color,
            height: () => "calc(100vh - 25rem)",

            methods: {
                selectRecord: async function(record) {
                    await _this.setValue(record)
                    this.closest("a-panel").close()
                },

                // Creates a new blank record
                async createRecord(model) {
                    const record = model.create()
                    const success = await record.save()
                    if (!success) return
                    createForm(record)
                }
            }
        })

        // Build the panel to embed the datatable
        createPanel({
            modal: true,
            closable: true,

            // Header
            title: "<b>" + this.viewModel.namePlural + "</b>",
            icon: this.viewModel.icon,
            headerBackgroundColor: this.viewModel.color,

            // Size and layout
            display: "flex",
            layout: "vertical",
            width: () => "calc(100vw - 20rem)",
            height: () => "calc(100vh - 20rem)",
            align: "center",
            verticalAlign: "center",
            autoSize: true,

            items: [datatable]
        }).render()
    }

    /**
     * Set the value of the field + other connected fields.
     * 
     * @ignore
     * @param {object} record
     * @returns this
     */
    async setValue(record) {
        let model = this.record.model

        let mapping = this.otherFieldIds.map(viewFieldId => {
            let label = this.viewModel.getField(viewFieldId).label
            let localField = model.getFieldByLabel(label) || {}
            return {
                label,
                id: localField.id,
                viewFieldId
            }
        }).filter(map => map.id)

        // Set the field itself
        let update = {}
        update[this.id] = record[this.fieldId]

        // Set the other fields
        mapping.forEach(map => {
            let localField = model.getField(map.id) || {}
            let recordValue = record[map.viewFieldId]
            
            if (kiss.tools.isNumericField(localField)) {
                // Number fields
                recordValue = parseFloat(recordValue)
                if (isNaN(recordValue)) recordValue = 0
            }
            else if (localField.type === "checkbox") {
                // Checkbox fields
                recordValue = !!recordValue
            }

            // Empty values are set to ""
            if (recordValue === undefined) recordValue = ""

            update[map.id] = recordValue
        })

        await this.record.updateDeep(update)
        return this
    }

    formatValue(value) {
        if (kiss.tools.isNumericField(this)) {
            recordValue = parseFloat(recordValue)
            if (isNaN(recordValue)) recordValue = 0
        }
        else if (this.type === "checkbox") {
            recordValue = !!recordValue
        }

        if (recordValue === undefined) recordValue = ""

    }
}

// Create a Custom Element
customElements.define("a-selectviewcolumns", kiss.ux.SelectViewColumns)

;
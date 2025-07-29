code_relationships = `{
    layout: "vertical",
    alignItems: "center",
    
    defaultConfig: {
        width: 500,
        margin: "1rem 0"
    },
    
    items: [
        // PAGE TITLE
        {
            type: "html",
            html: "<center><h1>KissJS ORM & Relationships</h1></center>"
        },
        // DESCRIPTION
        {
            type: "html",
            html:
                \`KissJS ORM allows to simulate relationships inside a NoSQL environment.
                <br>
                <br>1 - Create 1 or more Expert records
                <br>2 - Create 1 or more Product records
                <br>3 - Link 1 Expert to 1 Product
                <br>4 - Check the console to see how the Expert and Product records are updated when linked together
            \`
        },
        // FORM TO ENTER EXPERT INFOS
        {
            type: "panel",
            title: "Expert",
            icon: "fas fa-user",
            layout: "vertical",
            boxShadow: "var(--shadow-2)",
            items: [
                // EXPERT NAME
                {
                    id: "fullName",
                    type: "text",
                    label: "Full name",
                    labelPosition: "top",
                    value: "Bob Wilson"
                },
                // BUTTON TO CREATE A NEW EXPERT
                {
                    type: "button",
                    icon: "fas fa-plus",
                    text: "Create new Expert",
                    action: async () => {
                        const newExpert = kiss.app.models.expert.create({
                            id: "expert_" + String(kiss.global.expertIndex++),
                            fullName: $("fullName").getValue()
                        })
                        await newExpert.save()
                    } 
                }               
            ]        
        },
        
        // NUMBER OF EXPERTS
        {
            type: "html",
            html: \`Current experts: <span id="number-of-experts">0</span>\`,
        },
        
        // LIST OF EXPERTS
        {
            id: "list-of-experts",
            type: "html",
            color: "#00aaee"
        },
        
        // FORM TO ENTER PRODUCT INFOS
        {
            type: "panel",
            title: "Product",
            icon: "fas fa-check",
            layout: "vertical",
            boxShadow: "var(--shadow-2)",
            items: [
                // PRODUCT NAME
                {
                    id: "name",
                    type: "text",
                    label: "Product name",
                    labelPosition: "top",
                    value: "NoCode training course - 5 weeks"
                },
                // BUTTON TO CREATE A NEW PRODUCT
                {
                    type: "button",
                    icon: "fas fa-plus",
                    text: "Create new Product",
                    action: async () => {
                        const newProduct = kiss.app.models.product.create({
                            id: "product_" + String(kiss.global.productIndex++),
                            name: $("name").getValue()
                        })
                        await newProduct.save()
                    } 
                }                  
            ]        
        },
        
        // NUMBER OF PRODUCTS
        {
            type: "html",
            html: \`Current products: <span id="number-of-products">0</span>\`,
        },
        
        // LIST OF PRODUCTS
        {
            id: "list-of-products",
            type: "html",
            color: "#00aaee"
        },        

        // LINK 2 RECORDS
        {
            type: "panel",
            title: "Linking records together",
            icon: "fas fa-link",
            layout: "horizontal",
            boxShadow: "var(--shadow-2)",
            
            defaultConfig: {
                width: 200,
                labelWidth: 150,
                fieldWidth: 150,
                labelPosition: "top"
            },
            
            items: [
                {
                    id: "expertId",
                    type: "select",
                    label: "Expert id",
                    options: ["expert_0"],
                    value: "expert_0",
                    subscriptions: {
                        "EVT_DB_INSERT:EXPERT": async function() {
                            const experts = await kiss.app.collections.expert.find({}, true)
                            this.updateOptions(experts.map(e => e.id))                        }
                    }
                },
                // LINK 2 RECORDS TOGETHER
                {
                    type: "button",
                    icon: "fas fa-link",
                    text: "Link 2 records",
                    action: async () => {
                        const expertId = String($("expertId").getValue())
                        const productId = String($("productId").getValue())
                        
                        const expert = await kiss.app.collections.expert.findOne(expertId, true)
                        const product = await kiss.app.collections.product.findOne(productId, true)
        
                        if (!expert || !product) return

                        // When you link 2 records, the "lookup" and "summary" fields are automatically computed
                        await expert.linkTo(product, "linkToProducts", "linkToExpert")
                        console.log(\`Connected Expert \${expertId} to Product \${productId}\`)
                        
                        // Show the updated experts in the console
                        console.log("-- EXPERTS --")
                        kiss.app.collections.expert.records.forEach(expert => {
                            log(expert.fullName + " has " + expert.numberOfProducts + " product(s)")
                        })
                        
                        // Show the updated products in the console
                        console.log("-- PRODUCT --")
                        kiss.app.collections.product.records.forEach(product => {
                            log(product.name + " belongs to " + (product.expertName || "nobody"))
                        })
                    } 
                },
                {
                    id: "productId",
                    type: "select",
                    label: "Product id",
                    options: ["product_0"],
                    value: "product_0",
                    subscriptions: {
                        "EVT_DB_INSERT:PRODUCT": async function() {
                            const products = await kiss.app.collections.product.find({}, true)
                            this.updateOptions(products.map(p => p.id))
                        }
                    }
                },             
            ]
        },
        
        // NUMBER OF LINKS
        {
            type: "html",
            html: \`Current links: <span id="number-of-links">0</span>\`,
        },
        
        // LIST OF LINKS
        {
            id: "list-of-links",
            type: "html",
            color: "#00aaee"
        }
    ],
    
    // A component can be subscribed to any kinds of events.
    // Database events can be:
    // - EVT_DB_INSERT:MODEL_ID
    // - EVT_DB_UPDATE:MODEL_ID
    // - EVT_DB_DELETE:MODEL_ID
    // - EVT_DB_INSERT_MANY:MODEL_ID
    // - EVT_DB_UPDATE_MANY:MODEL_ID
    // - EVT_DB_DELETE_MANY:MODEL_ID
    subscriptions: {
        "EVT_DB_INSERT:EXPERT": function() {
            this.showExperts()
        },
        "EVT_DB_INSERT:PRODUCT": function() {
            this.showProducts()
        },
        "EVT_DB_INSERT:LINK": function() {
            this.showLinks()
        },        
    },
    
    methods: {
        async showExperts() {
            const experts = await kiss.app.collections.expert.find({}, true) // "true" disables collection cache
            
            const expertsHtml = experts.map(expert => {
                return \`<div>Full name: \${expert.fullName} / id: \${expert.id}</div>\`
            }).join("")
            
            $("list-of-experts").setInnerHtml(expertsHtml)
            $("number-of-experts").innerHTML = experts.length
        },

        async showProducts() {
            const products = await kiss.app.collections.product.find({}, true) // "true" disables collection cache
            
            const productsHtml = products.map(product => {
                return \`<div>Product name: \${product.name} / id: \${product.id}</div>\`
            }).join("")
            
            $("list-of-products").setInnerHtml(productsHtml)
            $("number-of-products").innerHTML = products.length
        },
        
        // Each "link" record consists of:
        // - mX, rX, to define the left side record
        // - mY, rY, to define the right side record
        // - fX and fY to define the connecting fields
        async showLinks() {
            const links = await kiss.app.collections.link.find({}, true) // "true" disables collection cache
            
            const linksHtml = links.map(link => {
                return \`<div>\${link.mX} \${link.rX} (\${link.fX}) | (\${link.fY}) \${link.mY} \${link.rY}</div>\`
            }).join("")
            
            $("list-of-links").setInnerHtml(linksHtml)
            $("number-of-links").innerHTML = links.length
        },        

        async load() {
            const expertModel = kiss.app.defineModel({
                id: "expert",
                name: "Expert",
                namePlural: "Experts",
                items: [
                    {
                        id: "fullName",
                        type: "text",
                        label: "Full name"
                    },
                    {
                        id: "linkToProducts",
                        type: "link",
                        label: "Link to products",
                        multiple: true, // 1-N
                        link: {
                            modelId: "product",
                            fieldId: "linkToExpert"
                        }
                    },
                    // Summary field that will be synchronized with the linked Products
                    {
                        id: "numberOfProducts",
                        type: "summary",
                        label: "Number of products",
                        summary: {
                            linkId: "linkToProducts",
                            fieldId: "name",
                            operation: "COUNT" // SUM, AVERAGE
                        }
                    }
                ]
            })
            
            const productModel = kiss.app.defineModel({
                id: "product",
                name: "Product",
                namePlural: "Products",
                items: [
                    {
                        id: "name",
                        type: "text",
                        label: "Product name"
                    },
                    {
                        id: "linkToExpert",
                        type: "link",
                        label: "Link to expert",
                        multiple: false, // 1-1
                        link: {
                            modelId: "expert",
                            fieldId: "linkToProducts"
                        }
                    },
                    // Lookup field that will be synchronized with the linked Expert
                    {
                        id: "expertName",
                        type: "lookup",
                        label: "Expert name",
                        lookup: {
                            linkId: "linkToExpert",
                            fieldId: "fullName"
                        }
                    }
                ]
            })            
            
            // Define relationships between models
            kiss.app.defineModelRelationships()
            
            // Reset collections & indexes
            await kiss.app.collections.expert.deleteMany({})
            await kiss.app.collections.product.deleteMany({})
            await kiss.app.collections.link.deleteMany({})
            
            kiss.global.expertIndex = 0
            kiss.global.productIndex = 0
        }
    }
}`

;
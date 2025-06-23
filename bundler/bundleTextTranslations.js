/**
 * - This script extracts the translations from /resources/texts.js file and generates separate files for each language.
 * - It's called by the build process (bundler.bat) to create the language files.
 * - The generated files are used by the client to load the translations for the selected language.
 * 
 * @ignore
 */
const fs = require('fs')
const path = require('path')

const sourceFile = path.join(__dirname, '..', 'resources', 'texts.js')
const rawContent = fs.readFileSync(sourceFile, 'utf-8')

const match = rawContent.match(/kiss\.app\.defineTexts\(\s*(\{[\s\S]*\})\s*\)/)
if (!match) {
    console.error("Impossible to find the call to kiss.app.defineTexts")
    process.exit(1)
}

let textsObject
try {
    textsObject = eval('(' + match[1] + ')')
} catch (e) {
    console.error("Error while parsing the object :", e)
    process.exit(1)
}

const languages = new Set()

for (const key in textsObject) {
    const value = textsObject[key]
    if (typeof value === 'object') {
        for (const lang of Object.keys(value)) {
            languages.add(lang)
        }
    }
}

languages.forEach(lang => {
    const entries = {}
    for (const key in textsObject) {
        const value = textsObject[key]
        if (typeof value === 'object') {
            if (lang === 'en' && !value.en) {
                continue
            }
            if (value[lang] !== undefined) {
                entries[key] = {
                    [lang]: value[lang]
                }
            }
        }
    }

    const output = [
        'kiss.app.defineTexts({'
    ]

    const keys = Object.keys(entries)
    keys.forEach((key, index) => {
        const entry = entries[key]
        const line = `    "${key}": {\n        ${lang}: ${JSON.stringify(entry[lang])}\n    }${index < keys.length - 1 ? ',' : ''}`
        output.push(line)
    })

    output.push('});\n')

    // Écriture dans le fichier correspondant
    const outputFile = path.join(__dirname, '..', 'resources', `texts.${lang}.js`)
    fs.writeFileSync(outputFile, output.join('\n'), 'utf-8')
    console.log(`✅ Generated texts.${lang}.js`)
})
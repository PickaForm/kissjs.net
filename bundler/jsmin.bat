terser "..\build.js" --source-map "url=build.min.js.map" --output "..\build.min.js"
jsmin.exe < "..\build.css" > "..\build.min.css"
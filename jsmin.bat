call jsmin.exe <app.css >app.min.css
call terser app.js --source-map "url=app.min.js.map" --output app.min.js
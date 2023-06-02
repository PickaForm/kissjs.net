:: BUNDLE THE APPLICATION RESOURCES
for /R ".\views" %%f in (*.js) do type "%%f" >> app.js
for /R ".\views" %%f in (*.css) do type "%%f" >> app.css
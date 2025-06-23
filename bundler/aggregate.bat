::
:: GENERATE THE APPLICATION JAVASCRIPT BUNDLE
::

:: DELETE EXISTING OUTPUT FILES
del /Q "..\build.js"
del /Q "..\build.css"

:: PROJECT VIEWS
for /R "..\views" %%f in (*.js) do type "%%f" >> "..\build.js"

:: PROJECT MODELS
for /R "..\models" %%f in (*.js) do type "%%f" >> "..\build.js"

::
:: GENERATE THE APPLICATION STYLES BUNDLE
::

:: PROJECT VIEWS
for /R "..\views" %%f in (*.css) do type "%%f" >> "..\build.css"
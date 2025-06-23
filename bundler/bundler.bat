echo ----- Aggregating JavaScript files -----
call aggregate.bat

if %errorlevel% neq 0 (
    echo Error: Failed to aggregate JavaScript files.
    exit /b %errorlevel%
)

echo ----- Minifying JavaScript file -----
call jsmin.bat

if %errorlevel% neq 0 (
    echo Error: Failed to minify JavaScript file.
    exit /b %errorlevel%
)

echo ----- Splitting localization files by language -----
call node bundleTextTranslations.js

echo ----- Finished -----

exit /b 0
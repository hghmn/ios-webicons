'use strict';

/**
 * String templating html
 */
module.exports = opts => `\
<!-- AUTO GENERATED - DO NOT EDIT -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>${ opts.title }</title>
    <meta name="description" content="${ opts.description }">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- webapp icon links added here at runtime -->
</head>
<body>
<!-- app name and image -->
<div class="app">
    <h1>${ opts.title }</h1>
    <ul>${ appsList( opts.apps, opts.baseDir ) }</ul>
</div>
</body>
</html>
`;


function appsList(apps, baseDir) {
    return (apps || [])
        .map(appName => {
            let path = [ baseDir, appName ];
            return `<li><a href="${ path.join('/') }">${ appName }</a></li>`
        })
        .join('');
}

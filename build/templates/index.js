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

    <!-- add default styles -->
    ${ templateStyles(opts.styles) }
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

function templateStyles(styles) {
    return (styles || [])
        .map(styleText => `<style type="text/css">${ styleText }</style>`)
        .join('\n');
}

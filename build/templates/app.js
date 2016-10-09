'use strict';

/**
 * String templating html
 */
module.exports = opts => `\
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>${ opts.title }</title>
    <meta name="description" content="${ opts.description }">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    ${ templateStyles(opts.styles) }

    <!-- webapp icon links added here at runtime -->
</head>
<body>
<!-- app name and image -->
<div class="app">
    <h1>${ opts.title }</h1>
    <img id="icon" src="data:image/svg+xml;base64,${ opts.svgBase64 }" width="180" height="180" />

    <p>This page, when saved to your homescreen, will attempt to open the app with the deeplink ${ opts.deeplink }</p>

    <!-- info message -->
    <p class="info message">If you are seeing this page, it means that the webicon links have not been enabled, or your cache has been cleared recently. <a href="/">Go back to the main page to enable</a></p>
</div>

<div id="data">
    <!-- data is picked up from the svg image, then used to create the icon image links -->
    <!-- <img id="icon" src="data:image/svg+xml;base64,${ opts.svgBase64 }" width="180" height="180" /> -->
</div>

${ templateScripts(opts.scripts) }
</body>
</html>
`;

/**
 * Create
 * @param {string[]} scriptText the raw text source for the script
 */
function templateScripts(scripts) {
    return (scripts || [])
        .map(scriptText => `<script type="text/javascript">${ scriptText }</script>`)
        .join('\n');
}

function templateStyles(styles) {
    return (styles || [])
        .map(styleText => `<style type="text/css">${ styleText }</style>`)
        .join('\n');
}

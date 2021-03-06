
var svg = `\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
    <g>
        <circle class="ring" fill="none" stroke="#000000" stroke-width="3" cx="30" cy="30" r="18"/>
        <circle class="ring" fill="none" stroke="#000000" stroke-width="3" cx="30" cy="30" r="27"/>
    </g>
</svg>`;

module.exports = {
    title: 'Apple Maps',
    description: 'Native maps app for iOS',
    deeplink: 'maps:',
    svgBase64: base64EncodeSVG(svg),
    scripts: [
        '/* first script */',
        '/* second script */',
    ],
};

function base64EncodeSVG(svgText) {
    var cleanStr = svgText.replace(/\s{2,}/g, '');
    return new Buffer(cleanStr).toString('base64');
}

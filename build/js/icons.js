(function() {

var $head = document.head,
    $img = document.querySelector('img#icon');

var sizes = [
    '60x60',
    '76x76',
    '120x120',
    '152x152',
    '180x180',
];

window.onload = function() {
    var $canvas = document.createElement("canvas");
    var ctx = $canvas.getContext('2d'),
        dataURL,
        parsedSize,
        width, height,
        link;

    sizes.forEach(function(sizeRaw) {
        parsedSize = sizeRaw.split('x').map(Number);

        width = parsedSize[0];
        height = parsedSize[1];

        $canvas.width = width;
        $canvas.height = height;

        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage($img, 0, 0);
        dataURL = $canvas.toDataURL("image/png");

        link = document.createElement('link');
        link.setAttribute('rel', 'apple-touch-icon-precomposed');
        link.setAttribute('sizes', sizeRaw);
        link.setAttribute('href', dataURL);
        $head.appendChild(link);
    });
};

}());

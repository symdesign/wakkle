
require('./vendor/polyfills.js');
require('./vendor/generateUUID.js');

require('./components/Controller.js');
require('./components/Wakkl.js');
require('./components/Sound.js');
require('./components/Text.js'); 
require('./components/Graphic.js');
require('./components/Mask.js');

function getPlaceholders() {
    var regexp = new RegExp('.*?\.wakkl.jpg$', 'i');
    var elements = document.getElementsByTagName('img');
    var placeholders = [],
        src,
        id; 

    for (var i = 0; i < elements.length; i++) {

        element = elements[i];

        if (element.hasAttribute('src')) {

            src = element.getAttribute('src');

            if (regexp.test(src)) {
                element.id = element.id || generateUUID(); // making sure the element has an ID
                placeholders.push(element);
            }
        }
    }
    return placeholders;
}

var placeholders = getPlaceholders(),
    wakkl = [];

for (var i = 0; i < placeholders.length; i++) {
    var placeholder = placeholders[i];
    wakkl[i] = new Wakkl(placeholder);
    wakkl[i].init();
}

var controller = Controller.getInstance();
controller.UI();
controller.update(wakkl[0]); // TODO: update that wakkl which is currently in viewport

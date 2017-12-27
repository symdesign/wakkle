
export function collect() {
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

import {generateUUID} from './collect/generateUUID';

export function collect() {

    var regexp = new RegExp('.*?\.wakkl', 'i');
    var imgs = document.getElementsByTagName('img'),
        img,
        wrapper;

    var elements = [],
        id; 

    for (var i = 0; i < imgs.length; i++) {

        img = imgs[i];

        if (!img.hasAttribute('src'))   continue;
        if (!regexp.test(img.src))      continue;

        var path,
            meta,
            sound,
            mask,
            vector;

        path = img.currentSrc || img.src;
        path = path.replace('.jpg','');
        path = path.replace('.wakkl','');
        path = path + '/';

        loadJSON(path + 'meta.json', function(json) {
            meta = {
                "Path": path,
                "Count": json.Sequence.Count,
                "AngleOfView": json.Sequence.AngleOfView,
                "Phi": json.Sequence.Phi,
                "Chi": json.Sequence.Chi,
            }
            sound   = json.Sound;
            mask    = json.Mask;
            vector  = json.Vector;
        });

        img.id      = img.id || generateUUID(); // making sure the img has an ID
        img.meta    = meta;
        img.sound   = sound;
        img.mask    = mask;
        img.vector  = vector;
        img.wrapper = img.parentElement.nodeName.toLowerCase() == 'figure' ? img.parentElement : wrap( img );

        img.wrapper.id = img.id;
        img.wrapper.position = getCssValue( 'position', img.wrapper );
        img.wrapper.style.position = img.wrapper.position == 'static' ? 'relative' : img.wrapper.position; 
        elements.push(img);

    }
    return elements;
}

function loadJSON(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (callback) callback(data);
            }
        }
    };
    xhr.open('GET', path, false); // make synchronous XMLHttpRequest in order receive value outside of the callback function
    xhr.send();
}

function wrap( element ) {

    var wrapper = document.createElement('figure');
    if (element.hasAttributes()) cloneAttributes(element, wrapper);

    element.parentNode.insertBefore(wrapper, element); // insert wrapper
    wrapper.appendChild(element); // move element into wrapper
    wrapper.removeAttribute('src');
    wrapper.removeAttribute('srcset');

    return wrapper;
}

function cloneAttributes(transmitter, receiver) {
    for (var i = 0; i < transmitter.attributes.length; i++) {
        var attribute = transmitter.attributes[i];
        receiver.setAttribute(attribute.name, attribute.value)
    }
}

function getCssValue( property, element) {
    return window.getComputedStyle(element, null).getPropertyValue( property )
}
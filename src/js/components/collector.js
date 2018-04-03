

import observeResize    from 'simple-element-resize-detector';

import {generateUUID}   from './collector/generateUUID';
import {pad}            from './collector/numberPadding';

export var Collector = function() {

    this.initialized = false;

    var fileExtension = 'wakkle';
    var metaSelector  = 'WAKKLE-dataset'; 

    var regexp = new RegExp('.*?\.' + fileExtension, 'i');
    var images = document.querySelectorAll('img'),
        image,
        wakkle,
        path;

    var components = [];

    this.init = function() {

        document.registerElement( 'wakkle-image' );
        //document.registerElement( 'wakkle-markup' );
        document.registerElement( 'wakkle-sound' );

        for (var i = 0; i < images.length; i++) {
            
            image = images[i];

            if ( !image.hasAttribute('src') )   continue;
            if ( !regexp.test( image.src ) )    continue;

            wakkle = image;

            path = wakkle.currentSrc || wakkle.src;
            path = path.replace('.jpg','');
            path = path.replace('.wakkle','');
            path = path + '/';
            
            wakkle.id          = wakkle.id || generateUUID(); // making sure the wakkle has an ID
            wakkle.sequence    = getSequence( path );

            wakkle.wrapper     = wakkle.parentElement.nodeName.toLowerCase() == 'wakkle-image' ? wakkle.parentElement : wrap( wakkle );
            wakkle.wrapper.id  = wakkle.id;

            wakkle.wrapper.style.position   = getCSSValue( 'position', wakkle.wrapper ) == 'static' ? 'relative' : wakkle.wrapper.position;
            wakkle.wrapper.style.display    = 'block';
            wakkle.wrapper.style.overflow   = 'hidden';
            wakkle.wrapper.style.height     = wakkle.naturalHeight * (wakkle.clientWidth / wakkle.naturalWidth) + 'px';

            observeResize( wakkle.wrapper, () => {
                wakkle.wrapper.style.height = wakkle.naturalHeight * (wakkle.clientWidth / wakkle.naturalWidth) + 'px';
            });

            for ( var i = 0; i < wakkle.wrapper.children.length; i++ ) {
                wakkle.wrapper.children[i].style.position = 'absolute';
            }

            wakkle.markup      = wakkle.wrapper.querySelectorAll( 'wakkle-markup' );
            wakkle.sound       = {};
            wakkle.meta        = {};

            loadJSON(path + 'meta.json', function(json) {

                wakkle.sound.Source    = json[ metaSelector ].Sound ? path + json[ metaSelector ].Sound : wakkle.parentElement.querySelector('wakkle-sound').getAttribute('source') || '';

                wakkle.meta.FOV        = json[ metaSelector ].FOV      || wakkle.getAttribute('fov') || console.error('FOV is not defined.');
                wakkle.meta.Arc        = json[ metaSelector ].Arc      || wakkle.getAttribute('arc') || console.error('Arc is not defined.');
                wakkle.meta.ArcShift   = json[ metaSelector ].ArcShift || wakkle.getAttribute('arc-shift') || 0;
                wakkle.meta.OriginX    = json[ metaSelector ].OriginX  || wakkle.getAttribute('origin-x')  || 0;
                wakkle.meta.OriginY    = json[ metaSelector ].OriginY  || wakkle.getAttribute('origin-y')  || 0;

            });

            components.push(wakkle);

        }
        
        this.initialized = true;

    }

    this.collect = function() {
        return components;
    }

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


function getSequence( path ) {

    var xhr, sequence = {};
    
    (function() {

        findNaming();
        findLength();

        sequence.path = path;

    })();

    return sequence;

    function findNaming() {

        var testNumber      = 1,
            testPaddings    = [ 2, 1, 3 ], // e.g 01, 1 or 001
            testExtensions  = [ 'jpg', 'png', 'gif', 'jpeg' ],
            e404 = false,
            found = false;

        for ( var i = 0; i <= testPaddings.length; i++ ) {

            for ( var j = 0; j < testExtensions.length; j++ ) {

                xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) { // found

                            found = true;
                            sequence.padding = testPaddings[ i ];
                            sequence.extension = testExtensions[ j ];

                            e404 ? console.log('⬆ Good. The sequence has ' + sequence.padding + ' digits and the file extension ".' + sequence.extension + '".') : '';

                        }
                        if (xhr.status === 404) e404 = true;
                    }
                };
            
                xhr.open('HEAD', path + pad( testNumber, testPaddings[ i ] ) + '.' + testExtensions[ j ], false);
                xhr.send();  

                if ( found ) break;

            }

            if ( found ) break;

        }

    }

    function findLength() {

        var maxLength = 60,
            found = false;

        if ( sequence.padding == null && sequence.extension == null ) return;

        sequence.images = [];

        for ( var i = 0; i <= maxLength; i++ ) {

            var testImage = pad( i+1, sequence.padding ) + '.' + sequence.extension;
            xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {

                    if (xhr.status === 200) { // length not found

                        sequence.images.push( path + testImage )

                    }
                    if (xhr.status === 404) { // length found

                        console.log('⬆ Good. ' + pad( i, sequence.padding ) + '.' + sequence.extension + ' is the last image in sequence.')
                        sequence.length = i;
                        found = true;
                        
                    }
                }
            };
        
            xhr.open('HEAD', path + testImage, false);
            xhr.send();

            if ( found ) break;
        }
    }
}


function wrap( element ) {

    var wrapper = document.createElement( 'wakkle-image' );

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

function getCSSValue( property, element) {
    return window.getComputedStyle(element, null).getPropertyValue( property )
}


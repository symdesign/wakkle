
import * as CONST       from './const';

import {generateUUID}   from './collector/generateUUID';
import {pad}            from './collector/numberPadding';

export var Collector = function() {

    this.initialized = false;

    var regexp = new RegExp('.*?\.' + CONST.file_extension, 'i');
    var imgs = document.getElementsByTagName('img'),
        img,
        path,
        listener;

    var components = [];

    this.init = function() {
        
        for (var i = 0; i < imgs.length; i++) {
            
            img = imgs[i];

            if (!img.hasAttribute('src'))   continue;
            if (!regexp.test(img.src))      continue;

            path = img.currentSrc || img.src;
            path = path.replace('.jpg','');
            path = path.replace('.wakkle','');
            path = path + '/';

            img.id          = img.id || generateUUID(); // making sure the img has an ID
            img.sequence    = getSequence( path );
            img.markup      = img.parentElement.getElementsByTagName( 'object' );

            img.sound       = {};

            loadJSON(path + 'meta.json', function(json) {
                img.sound.Source = path + json[ CONST.meta_key ].Sound || '';
                img.meta = {
                    "FOV":          json[ CONST.meta_key ].FOV,
                    "Phi":          json[ CONST.meta_key ].Phi,
                    "Chi":          json[ CONST.meta_key ].Chi,
                    "OriginX":      json[ CONST.meta_key ].OriginX,
                    "OriginY":      json[ CONST.meta_key ].OriginY,
                }
            });

            if ( !img.meta.FOV ) img.meta.FOV = img.getAttribute('fov') || console.error('FOV is not defined.');
            if ( !img.meta.Phi ) img.meta.Phi = img.getAttribute('phi') || console.error('Angle phi is not defined.');
            if ( !img.meta.Chi ) img.meta.Chi = img.getAttribute('chi') || console.error('Angle chi is not defined.');
            if ( !img.meta.OriginX ) img.meta.OriginX = img.getAttribute('origin-x') || console.error('Perspective origin X is not defined.');
            if ( !img.meta.OriginY ) img.meta.OriginX = img.getAttribute('origin-y') || console.error('Perspective origin Y is not defined.');

           

            document.registerElement( CONST.tagname );

            img.wrapper     = img.parentElement.nodeName.toLowerCase() == CONST.tagname ? img.parentElement : wrap( img );
            img.wrapper.id  = img.id;
            for ( var i = 0; i < img.wrapper.children.length; i++ ) {
                img.wrapper.children[i].style.position = 'absolute';
            }
            Object.assign( img.wrapper.style, {
                'position':             getCSSValue( 'position', img.wrapper ) == 'static' ? 'relative' : img.wrapper.position,
    
                'display':              'flex',
                'align-items':          'center',
                'justify-content':      'center',
    
                'display':              'block',
                'width':                '100%',
                'height':               '0',
                'padding-bottom':       ( img.naturalHeight / img.naturalWidth * 100 ) + '%',

                'overflow':             'hidden'
            })
            
            components.push(img);

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

    var wrapper = document.createElement( CONST.tagname );
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


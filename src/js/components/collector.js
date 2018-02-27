
import {generateUUID} from './collector/generateUUID';
import { setTimeout } from 'timers';

// var elementResizeDetectorMaker = require("element-resize-detector");
// var ResizeDetector = elementResizeDetectorMaker();

import observeResize from 'simple-element-resize-detector';

const WAKKLE_FILE_EXTENSION = 'wakkle';
const WAKKLE_TAGNAME  = 'wakkle-image';

export var Collector = function() {

    this.initialized = false;

    var regexp = new RegExp('.*?\.' + WAKKLE_FILE_EXTENSION, 'i');
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

            img.id      = img.id || generateUUID(); // making sure the img has an ID
            img.markup  = img.parentElement.getElementsByTagName('object');

            loadJSON(path + 'meta.json', function(json) {
                img.sound   = json.Sound;
                img.mask    = json.Mask;
                img.vector  = json.Vector;
                img.meta = {
                    "Path":         path,
                    "Count":        json[ 'Sequence' ].Count,
                    "AngleOfView":  json[ 'Sequence' ].AngleOfView,
                    "Phi":          json[ 'Sequence' ].Phi,
                    "Chi":          json[ 'Sequence' ].Chi,
                    "FOV":          parseFloat( json[ 'XMP-exif' ].FOV ),
                    "OriginX":      json[ 'Sequence' ].OriginX,
                    "OriginY":      json[ 'Sequence' ].OriginY,
                }
            });
    
            document.registerElement( WAKKLE_TAGNAME );
            img.wrapper     = img.parentElement.nodeName.toLowerCase() == WAKKLE_TAGNAME ? img.parentElement : wrap( img );
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

                'overflow':             'hidden',
    
                'perspective':          getCSSPerspective( img.meta.FOV, img.width, img.height ),
                'perspective-origin':   ( img.meta.OriginX || '50%' ) + ' ' + ( img.meta.OriginY || '50%' )
            })
            
            components.push(img);

        }
        
        this.initialized = true;

    }

    this.collect = function() {
        return components;
    }
    
    this.ResizeSensor = function() {

        var elements = document.getElementsByTagName( WAKKLE_TAGNAME );

        for ( var i = 0; i < elements.length; i++ ) {
    

            observeResize(elements[i], ( element ) => {
                var width = element.children[0].offsetWidth,
                    height = element.children[0].offsetHeight;
                
                element.style.perspective = getCSSPerspective( img.meta.FOV, width, height );
            });

            // ResizeDetector.listenTo( elements[i], function( element ) {

            //     var width = element.children[0].offsetWidth,
            //         height = element.children[0].offsetHeight;
                
            //     element.style.perspective = getCSSPerspective( img.meta.FOV, width, height );

            // });
            
        }

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

function wrap( element ) {

    var wrapper = document.createElement( WAKKLE_TAGNAME );
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

function getCSSPerspective( fov, width, height) {
    if ( !fov || !width || !height ) return 0;
    return Math.pow( width/2*width/2 + height/2*height/2, 0.5 ) / Math.tan( (fov/2) * Math.PI / 180 ) + 'px';
}

function getCSSValue( property, element) {
    return window.getComputedStyle(element, null).getPropertyValue( property )
}


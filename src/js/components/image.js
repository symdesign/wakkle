
import {pad}                    from './collector/numberPadding';

import {removeFromArray}        from './image/removeFromArray';
import {sortArrayMiddleToOut}   from './image/sortArrayMiddleToOut';
import {imagePreload}           from './image/imagePreload';


export var Sequence = function( element ) {  // rather call "new Sequence()" as "new Image()" is protected

    this.initialized    = false;
    this.q              = 0.5;
    this.idx;        // absolute image index
    this._idx;       // temp absolute image index (easing)

    var that        = this,
        image       = new Image(),
        q,          // relative image index
        count,      // number of loaded image
        listener;   // listens for changes of q made by controller

    this.init = function() {
        
        count   = 0;
        image.onload = function() { // TODO: test if onload gets fired again inside init-function when currentSrc changes
            
            loadImages();
            
        }
        image.src = element.currentSrc || element.src;

    }

    function loadImages() {

        element.style.position = 'absolute';

        var images = sortArrayMiddleToOut( element.sequence.images ), // in order to load progressively starting from the middle
            loaded = [],
            currBefore,
            prevBefore = element,
            currAfter,
            prevAfter = element;

        var progress = document.createElement('progress');
            progress.setAttribute('max', images.length);
            progress.setAttribute('value', 0);
        document.body.appendChild(progress); // TODO: add to element.wrapper instead of body

        var b = ( ( element.sequence.length / 2) % 2 ? Math.round( element.sequence.length / 2 ) -1  : element.sequence.length / 2), 
            a = ( ( element.sequence.length / 2) % 2 ? Math.round( element.sequence.length / 2 )  : element.sequence.length / 2);
            
        new imagePreload( images, {
            onProgress: function(image, imageEl, index) {
                var percent = Math.floor((100 / this.queue.length) * this.completed.length);
                progress.value = index;

                if (prevBefore != element && prevAfter != element && element) element.remove();
                if (count > 3 && !listener) listen();

                loaded.push(image);

                for (var i = 0; i < loaded.length; i++) { // to keep the loaded as short as possible
                    if ( loaded.indexOf( element.sequence.images[ b ] ) >= 0 ) {
                        removeFromArray(loaded, element.sequence.images[ b ] );

                        currBefore = createImage( element.sequence.images[ b ] )
                        placeBefore( currBefore, prevBefore );

                        prevBefore = currBefore;
                        b--;
                    }
                    if ( loaded.indexOf( element.sequence.images[ a ] ) >= 0 ) {
                        removeFromArray( loaded, element.sequence.images[ a ] );

                        currAfter = createImage( element.sequence.images[ a ] )
                        placeAfter( currAfter, prevAfter );

                        prevAfter = currAfter;
                        a++;
                    }
                }
            },
            onComplete: function(loaded, errors) {
                element.remove();
                progress.style.display = 'none';
                this.initialized = true;
            }
        });
    }

    function createImage(source) {
        var objectFit = window.getComputedStyle(element, null).getPropertyValue('object-fit');
        var image = document.createElement('img');
        image.src = source;
        image.style.filter = "alpha(opacity = 0)"; // Internet Explorer
        image.style.opacity = 0;
        image.style.position = 'absolute'; // stack images on z axis

        if (objectFit != 'fill' && objectFit != 'none') {
            image.style.objectFit = objectFit;
            image.style.width = (element.hasAttribute('width') ? element.width : element.style.width) || '100%';
            image.style.height = (element.hasAttribute('height') ? element.height : element.style.height) || 'auto';
        }
        return image;
    }

    function placeAfter( image, referenceNode ) {
        referenceNode.parentNode.insertBefore( image , referenceNode.nextSibling );
        count++;
    }

    function placeBefore( image, referenceNode ) {
        referenceNode.parentNode.insertBefore( image, referenceNode );
        count++;
    }

    this.update = function() {
        that._idx = that._idx || 0;
        that.idx = Math.round( (count-1) * that.q );
        
        var image = document.getElementById(element.id).getElementsByTagName('img');

        if (!that.initialized) {
            for ( var i = 0; i < image.length; i++ ) {
                image[i].style.filter    = "alpha(opacity = 0)"; // Internet Explorer
                image[i].style.opacity   = 0;
            }
        }
        // this is more performant than a for-loop each time but
        // for some reasons not every image is hidden fromt he beginning
        // so I have added it as long as the sequence is not completely initialized
        image[that._idx].style.filter    = "alpha(opacity = 0)"; // Internet Explorer
        image[that._idx].style.opacity   = 0;


        image[ that.idx].style.filter    = "alpha(opacity = 1)"; // Internet Explorer
        image[ that.idx].style.opacity   = 1;

        that._idx = that.idx;
    }

    function listen() {

        that._idx = that._idx || 0;
        that.idx = Math.round( (count-1) * that.q );
        
        var image = document.getElementById(element.id).getElementsByTagName('img');


        if (!that.initialized) {
            for ( var i = 0; i < image.length; i++ ) {
                image[i].style.filter    = "alpha(opacity = 0)"; // Internet Explorer
                image[i].style.opacity   = 0;
            }
        }
        // this is more performant than a for-loop each time but
        // for some reasons not every image is hidden fromt he beginning
        // so I have added it as long as the sequence is not completely initialized
        image[that._idx].style.filter    = "alpha(opacity = 0)"; // Internet Explorer
        image[that._idx].style.opacity   = 0;


        image[ that.idx].style.filter    = "alpha(opacity = 1)"; // Internet Explorer
        image[ that.idx].style.opacity   = 1;

        that._idx = that.idx;

        //listener = window.requestAnimationFrame(listen)
    }

}
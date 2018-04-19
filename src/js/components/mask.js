import {generateUUID}   from './collector/generateUUID';
import {pad}            from './collector/numberPadding';

export var Mask = function( wakkle ) {

    this.initialized    = false;
    this.q              = 0.5;

    var that        = this,
        markup,
        masks,
        masked      = [];

    this.init = function() {
        for ( var i = 0; i < wakkle.markup.length; i++ ) {

            markup = wakkle.markup[i];

            if ( wakkle.markup[i].hasAttribute('mask') && wakkle.markup[i].getAttribute('mask') != '' ) {
                
                masked.push( markup );
                
                var xhr = new XMLHttpRequest();

                console.log( 'waiting to insert ' + wakkle.markup[i].getAttribute('mask'))
                xhr.url = wakkle.markup[i].getAttribute('mask');
                xhr.open('GET', xhr.url, true);
                xhr.send();

                xhr.onload = function(e) {

                    if ( xhr.status >= 200 && xhr.status < 400 ) {

                        var tmp       = document.createElement('div');
                        tmp.innerHTML = xhr.responseText;

                        wakkle.wrapper.appendChild( tmp );
                        // https://stackoverflow.com/a/22277907

                        var svg         = tmp.getElementsByTagName('svg')[0],
                            viewBox     = svg.getAttribute('viewBox').replace(/^\s+|\s+$/gm,'').split(' '),
                            clipPaths   = tmp.getElementsByTagName('clipPath'),
                            clipPath,
                            markup      = wakkle.wrapper.querySelector('[mask="' + xhr.url + '"]'),
                            id          = markup.id || generateUUID();

                        markup.id = markup.id || id;
                        
                        // Remove some of the attributes that aren't needed
                        svg.removeAttribute('xmlns:a');
                        svg.removeAttribute('width');
                        svg.removeAttribute('height');
                        svg.removeAttribute('x');
                        svg.removeAttribute('y');
                        svg.removeAttribute('enable-background');
                        svg.removeAttribute('xmlns:xlink');
                        svg.removeAttribute('xml:space');
                        svg.removeAttribute('version');

                        svg.style.top = '-100%';

                        for ( var i = 0; i < clipPaths.length; i++ ) {
                            clipPath = clipPaths[i];

                            clipPath.setAttributeNS('http://www.w3.org/2000/svg','clipPathUnits','objectBoundingBox');
                            clipPath.setAttributeNS('http://www.w3.org/2000/svg','transform','scale(' + (1/viewBox[2]) + ','+ (1/viewBox[3]) +')');
                            // http://meyerweb.com/eric/thoughts/2017/02/24/scaling-svg-clipping-paths-for-css-use/

                            clipPath.id = id + '--' + pad( ( clipPath.id ? clipPath.id : i ), wakkle.sequence.padding );
                            
                        }

                        wakkle.wrapper.appendChild( svg );

                        svg.innerHTML = svg.innerHTML

                        console.log('mask inserted')

                    }
                }
            }
        }
    }

    this.update = function() {
        
        for ( var i = 0; i < masked.length; i++ ) {
            
            masked[i].style.clipPath        = 'url(#' + masked[i].id + '--' + pad( Math.round( ( wakkle.sequence.length - 1 ) * that.q ), wakkle.sequence.padding ) + ')'
            masked[i].style.WebkitClipPath = 'url(#' + masked[i].id + '--' + pad( Math.round( ( wakkle.sequence.length - 1 ) * that.q ), wakkle.sequence.padding ) + ')'
            
        }
    }


}
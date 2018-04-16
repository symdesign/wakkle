
import {generateUUID}   from './collector/generateUUID';
import {pad}            from './collector/numberPadding';
import {prefix}         from './../utils/vendorPrefix'

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

                xhr.url = wakkle.markup[i].getAttribute('mask');
                xhr.open('GET', xhr.url, true);
                xhr.send();
                

                xhr.onload = function(e) {
                    
                    if ( xhr.status >= 200 && xhr.status < 400 ) {

                        var container       = document.createElement('div');
                        var responseText    = xhr.responseText;

                        // https://stackoverflow.com/a/22277907

                        var svg         = container.getElementsByTagName('svg')[0],
                            viewBox     = responseText.match(/ viewBox="([^"]*)"/i)[1].replace(/^\s+|\s+$/gm,'').split(' '),
                            markup      = wakkle.wrapper.querySelector('[mask="' + xhr.url + '"]'),
                            id          = markup.id || generateUUID();

                        markup.id = markup.id || id;

                        // Make CSS clip-path responsive
                        // add transform="scale(' + ( 1 / viewBox[2]) + ')" clipPathUnits="objectBoundingBox"

                        if ( !responseText.includes('transform') ) {
                            responseText = responseText.replace( /<clipPath([^>]*)>/gi, function( match, $1) {
                                return '<clipPath' + $1 + ' transform="scale(' + ( 1 / viewBox[2]) + ',' + ( 1 / viewBox[3]) + ')">'
                            })
                        }

                        if ( !responseText.includes('clipPathUnits') || !responseText.includes('objectBoundingBox') ) {
                            responseText = responseText.includes('userSpaceOnUse') ? responseText.replace( /clipPathUnits=["']userSpaceOnUse["']/gi, '' ) : responseText;
                            responseText = responseText.replace( /<clipPath([^>]*)>/gi, function( match, $1) {
                                return '<clipPath' + $1 + ' clipPathUnits="objectBoundingBox">'
                            })
                        }

                        // Remove all attributes apart from viewBox
                        responseText = responseText.replace( /<svg(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/i, '<svg viewBox="' + responseText.match(/ viewBox="([^"]*)"/i)[1] + '">' );

                        // Make unique ids for CSS clip-path referencing
                        var i = 0;
                        responseText = responseText.replace(/(<clipPath.*id=["'])((?:\\.|[^"\\])*)(["'])/gi, function( match, $1, $2, $3) {

                            var id = markup.id || generateUUID();

                            i++;
                            $2 = id + '--' + pad( ( $2 ? $2 : i ), wakkle.sequence.padding )
                            
                            return $1 + $2 + $3;

                        })
                        console.log( responseText )

                        container.innerHTML = responseText;
                        container.style.position = 'absolute';
                        document.body.insertBefore( container, document.body.firstChild );

                    }
                }
            }
        }
    }

    this.update = function() {

        for ( var i = 0; i < masked.length; i++ ) {
            masked[i].style[ prefix.clipPath ] = 'url(#' + masked[i].id + '--' + pad( Math.round( ( wakkle.sequence.length - 1 ) * that.q ), wakkle.sequence.padding ) + ')'
        }
    }


}
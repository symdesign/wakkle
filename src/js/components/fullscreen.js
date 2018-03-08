
import * as CONST       from './const';
import * as screenfull  from 'screenfull';

import {icons}          from './UI/icons';

export var Fullscreen = function( element ) {

    var that = this,
        fullscreen = false;

    this.icons = icons;

    this.init = function() {

        if ( !element.ui.fullscreen || !screenfull.enabled ) return;

        var fullscreenButton = document.createElement('div');

        fullscreenButton.appendChild( that.icons.use( '#icon-fullscreen-off' ) )
        fullscreenButton.className = CONST.class_prefix + 'fullscreen-button ';
        fullscreenButton.style.position = 'absolute';
        fullscreenButton.style.cursor = 'pointer';
        fullscreenButton.addEventListener( 'click', function() {
            that.toggleFullscreen();
            that.toggleUI();
        });

        screenfull.on('change', () => {
            fullscreen = !fullscreen;
            that.toggleUI();
        });

        element.ui.wrapper.appendChild( fullscreenButton );

    }

    this.toggleUI = function() {

        var fullscreenButton = element.wrapper.querySelector('.' + CONST.class_prefix + 'fullscreen-button');
        fullscreenButton.innerHTML = '';
        fullscreenButton.appendChild( that.icons.use( '#icon-fullscreen-' + ( fullscreen ? 'on' : 'off ') ) );

        fullscreen ? element.wrapper.classList.add( 'fullscreen' ) : element.wrapper.classList.remove( 'fullscreen' );

    }

    this.toggleFullscreen = function() {
        !fullscreen ? screenfull.request( element.wrapper ) : screenfull.exit();
    }

}
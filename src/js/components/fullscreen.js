
import * as button      from './UI';
import * as screenfull  from 'screenfull';

export var Fullscreen = function( wakkle ) {

    var that = this,
        fullscreen = false;

    this.icons = button.icons;

    this.init = function() {

        if ( !wakkle.ui.fullscreen || !screenfull.enabled ) return;

        var fullscreenButton = document.createElement('div');

        fullscreenButton.appendChild( that.icons.use( '#icon-fullscreen-off' ) )
        fullscreenButton.className = button.pref + 'fullscreen-button ';
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

        wakkle.ui.wrapper.appendChild( fullscreenButton );

    }

    this.toggleUI = function() {

        var fullscreenButton = wakkle.wrapper.querySelector('.' + button.pref + 'fullscreen-button');
        fullscreenButton.innerHTML = '';
        fullscreenButton.appendChild( that.icons.use( '#icon-fullscreen-' + ( fullscreen ? 'on' : 'off ') ) );

        fullscreen ? wakkle.wrapper.classList.add( 'fullscreen' ) : wakkle.wrapper.classList.remove( 'fullscreen' );

    }

    this.toggleFullscreen = function() {
        !fullscreen ? screenfull.request( wakkle.wrapper ) : screenfull.exit();
    }

}
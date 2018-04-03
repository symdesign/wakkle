
import * as button from './UI';

export var Minimap = function( wakkle ) {

    this.initialized    = false;
    this.q              = 0.5;
    this.icons          = button.icons;

    var that = this,
        minimap,
        iconMinimap         = that.icons.use( '#icon-minimap' ),
        iconMinimapCenter   = that.icons.use( '#icon-minimap-center' ),
        arc = wakkle.meta.Arc,
        arcShift = wakkle.meta.ArcShift;;

    this.init = function() {

        if ( !wakkle.ui.minimap ) return;

        iconMinimap.style.position = 'absolute';

        minimap = document.createElement('div');

        minimap.style.position  = 'absolute';
        minimap.className       = button.pref + 'minimap ';
        minimap.appendChild( iconMinimap )
        minimap.appendChild( iconMinimapCenter )

        wakkle.ui.wrapper.appendChild( minimap );

    }
    
    this.update = function() {

        if ( !wakkle.ui.minimap ) return;

        iconMinimap.style.transform = 'rotateZ( ' + ( ( that.q * arc + arcShift ) ) + 'deg )'

    }

}
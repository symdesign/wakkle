
import * as CONST from './const';
import {icons}    from './UI/icons';

export var Minimap = function( element ) {

    this.initialized    = false;
    this.q              = 0.5;
    this.icons          = icons;

    var that = this,
        minimap,
        iconMinimap         = that.icons.use( '#icon-minimap' ),
        iconMinimapCenter   = that.icons.use( '#icon-minimap-center' ),
        phi = element.meta.Phi,
        chi = element.meta.Chi;;


    this.init = function() {

        if ( !element.ui.minimap ) return;

        iconMinimap.style.position = 'absolute';

        minimap = document.createElement('div');

        minimap.style.position  = 'absolute';
        minimap.className       = CONST.class_prefix + 'minimap ' + CONST.class_prefix + 'ui';
        minimap.appendChild( iconMinimap )
        minimap.appendChild( iconMinimapCenter )

        element.wrapper.appendChild( minimap );

    }
    
    this.update = function() {

        if ( !element.ui.minimap ) return;

        iconMinimap.style.transform = 'rotateZ( ' + ( ( that.q * (chi-phi) + phi ) ) + 'deg )'

    }

}
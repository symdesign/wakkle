
export const pref = 'wakkle-';        // .wakkle-sound-button, etc.

export const head_move = {
    name: 'head_move',
    icon: {
        selector: '#icon-head-move',
    },
    lib:  'js/headtrackr.min.js',
}

export const mouse_move = {
    name: 'mouse_move',
    icon: {
        selector: '#icon-mouse-move',
    },
}

export const mouse_drag = {
    name: 'mouse_drag',
    icon: {
        selector: '#icon-mouse-drag',
    },
}

export const touch_drag = {
    name: 'touch_drag',
    icon: {
        selector: '#icon-touch-drag',
    },
}

export const device_orientation = {
    name: 'device_orientation',
    icon: {
        selector: '#icon-device-orientation',
    },
}

export var icons = {

    init: function() {
        var wrapper = document.createElement('div'),
            svg = require( './UI/icons.svg' );

        wrapper.style.display = 'none';
        wrapper.innerHTML = svg;
        document.body.insertBefore( wrapper, document.body.firstChild );
    },
    
    use: function( selector, options ) {

        if ( !selector ) return;
        if ( options === undefined ) options = {};

        options = {
            size: options.size      || '32',
            fill: options.fill      || '#fff',
            stroke: options.fill    || '',
            style: options.style    || {}
        }
    
        var svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg'),
            use = document.createElementNS( 'http://www.w3.org/2000/svg', 'use');
    
        svg.setAttribute( 'width', options.size );
        svg.setAttribute( 'height', options.size );
        
        use.setAttributeNS( 'http://www.w3.org/1999/xlink', 'xlink:href', selector );
        use.setAttribute( 'fill', options.fill );
    
        svg.appendChild( use );

        return svg;
    
    }

}

icons.init()



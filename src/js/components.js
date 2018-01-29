
import {Controller} from './components/controller';
import {Sequence}   from './components/image';
import {Mask}       from './components/mask';
import {Sound}      from './components/sound';
import {Text}       from './components/text'; 
import {Vector}     from './components/vector';
import {Grid}       from './components/grid';

import {collect}            from './utils/collect';
import {isElementVisible}   from './utils/isElementVisible';


export var settings = {
    grid: true
}

export var init = function() {

    var elements = collect(),
        controller = [],
        components = [],
        image  = [],
        mask   = [],
        sound  = [],
        text   = [],
        vector = [],
        grid   = [];

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        if ( isElementVisible( element ) ) {

            controller[i] = new Controller();
            controller[i].init();

            image[i] = new Sequence( element );
            image[i].init();
            controller[i].control( image[i] );

            mask[i] = new Mask( element );
            mask[i].init();
            controller[i].control( mask[i] );

            sound[i] = new Sound( element );
            !sound[ i==0?0 : i-1 ].initialized && sound[i].init();
            controller[i].control( sound[i] );

            text[i] = new Text( element );
            text[i].init();
            controller[i].control( text[i] );

            vector[i] = new Vector( element );
            vector[i].init();
            controller[i].control( vector[i] );

            if ( settings.grid ) {
                grid[i] = new Grid( element );
                grid[i].init()
                controller[i].control( grid[i] )
            }
            
            // TODO: implement global control switch + control switch UI
            // TODO: watch() or listen() if element is in viewport

        }
    }
}

export function setControl( mode ) {
    for (var i = 0; i < controller.length; i++) {
        controller[i].setActive( mode );
    }
}

function userSettings() {
    
}


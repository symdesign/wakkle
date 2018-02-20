
import {Collector}  from './components/collector';

import {Controller} from './components/controller';
import {Sequence}   from './components/image';
import {Mask}       from './components/mask';
import {Sound}      from './components/sound';
import {Markup}     from './components/markup'; 
import {Vector}     from './components/vector';
import {Grid}       from './components/grid';

import {isElementVisible}   from './utils/isElementVisible';


export var init = function( settings ) {


    if (!settings) settings = {};

    if (settings.ui === undefined) settings.ui = true;

    if (settings.grid === undefined) settings.grid = {};
    if (settings.grid.xy === undefined && settings.grid === undefined ) settings.grid.xy = false;
    if (settings.grid.yz === undefined && settings.grid === undefined ) settings.grid.yz = false;
    if (settings.grid.xz === undefined && settings.grid === undefined ) settings.grid.xz = false;

    if (typeof settings.grid === 'boolean') {
        var status = settings.grid;
        settings.grid = {};
        settings.grid.xy = settings.grid.yz = settings.grid.xz = status;
    } 

    var grid = new Grid({
        xy: settings.grid.xy,
        yz: settings.grid.yz,
        xz: settings.grid.xz
    });


    var collector = new Collector();
        collector.init();
        collector.ResizeSensor();
    
    var elements = collector.collect(),
        controller = [],
        components = [],
        image  = [], 
        mask   = [],
        sound  = [],
        markup = [],
        vector = [];

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        //if ( !isElementVisible( element ) ) { // Needs to be fixed

            controller[i] = new Controller();
            controller[i].init();
            controller[i].UI = settings.ui;

            image[i] = new Sequence( element );
            image[i].init();
            controller[i].control( image[i] );

            mask[i] = new Mask( element );
            mask[i].init();
            controller[i].control( mask[i] );

            sound[i] = new Sound( element );
            !sound[ i==0?0 : i-1 ].initialized && sound[i].init();
            controller[i].control( sound[i] );

            markup[i] = new Markup( element );
            markup[i].init();
            markup[i].insert( grid.xy );
            markup[i].insert( grid.yz );
            markup[i].insert( grid.xz );
            controller[i].control( markup[i] );

            vector[i] = new Vector( element );
            vector[i].init();
            controller[i].control( vector[i] );
            
            // TODO: implement global control switch + control switch UI
            // TODO: watch() or listen() if element is in viewport

        //}
    }
}

export function setControl( mode ) {
    for (var i = 0; i < controller.length; i++) {
        controller[i].setActive( mode );
    }
}

function userSettings() {
    
}


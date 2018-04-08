
import './../scss/style.scss';
import 'document-register-element'; // Polyfill for custom tagnames

import {Collector}  from './components/collector';

import {UI}         from './components/UI';
import {Controller} from './components/controller';
import {Sequence}   from './components/image';
import {Mask}       from './components/mask';
import {Sound}      from './components/sound';
import {Markup}     from './components/markup'; 
import {Minimap}    from './components/minimap';
import {Fullscreen} from './components/fullscreen';

export var version = '1.0 beta';

export var init = function( options ) {

    if ( !options ) options = {};

    var settings = {

        ui:     typeof options.ui === 'boolean' ? {
                    controllers:  options.ui, // show controller buttons
                    fullscreen:   options.ui, // show fullscreen button
                    minimap:      options.ui, // show minimap similar to facebook's 360° videos
                    fade:         options.ui, // fade out on mouse-out, in on mouse-in
                    minimal:      options.ui, // gather buttons in context menus
                    sound:        options.ui, // true, false, mute
                } : 
                typeof options.ui === 'object' ? {
                    controllers:  options.ui.controllers,
                    fullscreen:   options.ui.fullscreen,
                    minimap:      options.ui.minimap,
                    fade:         options.ui.fade,
                } : {
                    controllers:  true,
                    fullscreen:   true,
                    minimap:      true,
                    fade:         true,
                },

         bindFontSize:  default_( options.bindFontSize, true ),

    }

    var collector = new Collector();
        collector.init();
    
    var wakkles = collector.collect(),
        wakkle,

        controller  = [],
        components  = [],
        image       = [], 
        mask        = [],
        sound       = [],
        markup      = [],
        vector      = [],
        minimap     = [],
        fullscreen  = [],
        ui          = [];

    for (var i = 0; i < wakkles.length; i++) {

        wakkle    = wakkles[i];
        wakkle.ui = settings.ui;

        ui[i] = new UI( wakkle );
        ui[i].init();

        controller[i] = new Controller( wakkle );
        controller[i].init();

        image[i] = new Sequence( wakkle );
        image[i].init();
        controller[i].connect( image[i] );

        mask[i] = new Mask( wakkle );
        mask[i].init();
        controller[i].connect( mask[i] );

        sound[i] = new Sound( wakkle );
        !sound[ i==0?0 : i-1 ].initialized && sound[i].init();
        controller[i].connect( sound[i] );

        markup[i] = new Markup( wakkle );
        markup[i].init();
        controller[i].connect( markup[i] );

        minimap[i] = new Minimap( wakkle );
        minimap[i].init();
        controller[i].connect( minimap[i] );

        fullscreen[i] = new Fullscreen( wakkle );
        fullscreen[i].init();

    }

    function default_( overwrite, default_ ) {
        return overwrite !== undefined ? overwrite : default_
    }
}

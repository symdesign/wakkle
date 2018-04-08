
import * as button from './UI';

export var Sound = function( wakkle ) {

    this.initialized    = false;
    this.q              = 0.5;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    var that    = this,
        audio   = new Audio(),
        context = new AudioContext(),
        panner  = context.createPanner(),
        volume  = context.createGain(),
        source  = context.createMediaElementSource( audio );

    var fadeInterval,
        current,
        target;

    this.init = function() {

        if ( !wakkle.sound ) return;

        audio.src       = wakkle.sound.Source;
        audio.autoplay  = wakkle.sound.Autoplay || false;
        audio.loop      = wakkle.sound.Loop || true;

        panner.setPosition(0, 0, 1);
        panner.panningModel = 'equalpower';

        volume.gain.value = current = 0;

        // Source -> Panner -> Volume -> Destination / Output
        source.connect( panner );
        panner.connect( volume );
        volume.connect( context.destination );

        document.addEventListener( 'visibilitychange', volumeHandler );

        var promise = audio.play();
        if (promise !== undefined) promise.then( () => { audio.play() } ).catch( e => { /**/ } )

        this.UI.init()
        
        this.initialized = true;

    }

    this.icons = button.icons;

    this.UI = {
        init: function() { 

            var soundButton = document.createElement('div');

            soundButton.appendChild( that.icons.use( '#icon-sound' + ( audio.paused ? '-off' : '') ) )
            soundButton.className = button.pref + 'sound-button ';
            soundButton.style.position = 'absolute';
            soundButton.style.cursor = 'pointer';
            soundButton.addEventListener( 'click', toggle );

            wakkle.ui.wrapper.appendChild( soundButton );

        },
        set: function( playing ) {
            var soundButton = wakkle.wrapper.querySelector('.' + button.pref + 'sound-button use');
            soundButton.setAttribute('xlink:href', '#icon-sound' + ( playing ? '' : '-off') )
        }
    }

    this.update = function() {
        var x = -1 * (that.q - 0.5) * 2, // values between 1 and -1
            y = 0,
            z = 0.5;
        
        panner.setPosition(x,y,z);
    }

    function toggle() {

        if ( audio.paused ) audio.play()

        if ( volume.gain.value > 0 ) target = 0
        if ( volume.gain.value < 1 ) target = 1

        volumeTo( target )
        that.UI.set( target );

    }

    function volumeTo( target ) {

        if ( current < 0 ) current = 0;
        if ( current > 1 ) current = 1;
        if ( fadeInterval ) clearInterval( fadeInterval );

        fadeInterval = setInterval(function() { 
            // Note: we can't use requestAnimationFrame because fade wouldn't work when document hidden

            if ( volume.gain.value > target ) current -= 0.1
            if ( volume.gain.value < target ) current += 0.1
            if ( volume.gain.value == target ) clearInterval( fadeInterval )

            if ( current >= target || current <= target ) current = target;

            volume.gain.value = current;
        
        }, 100)

    }

    function volumeHandler() {
        // TODO: visibilityState within viewport
        if ( document.visibilityState == 'hidden' ) volumeTo( 0 )
        if ( document.visibilityState == 'visible' ) volumeTo( 1 )
    }

}



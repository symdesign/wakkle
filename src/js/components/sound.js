
import * as button from './UI';

export var Sound = function( wakkle ) {

    this.initialized    = false;
    this.q              = 0.5;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    var that    = this,
        audio   = new Audio(),
        context = new AudioContext(),
        panner  = context.createPanner(),
        level;

    var playing = false,
        fadeIn,
        fadeOut,
        volume,
        target;

    this.init = function() {

        if ( !wakkle.sound ) return;

        audio.src       = wakkle.sound.Source;
        audio.autoplay  = wakkle.sound.Autoplay || true;
        audio.loop      = wakkle.sound.Loop || true;
        audio.volume    = volume = 0; // let's make a nice fade-in instead
        audio.controls  = false;

        panner.setPosition(0, 0, 1);
        panner.panningModel = 'equalpower';
        panner.connect( context.destination );

        context.createMediaElementSource(audio).connect( panner );

        document.addEventListener( 'visibilitychange', visibilityHandler );

        this.play();
        this.initialized = true;

        setTimeout(() => {
            if ( audio.currentTime == 0 ) this.pause();
            this.UI.init();
        },1000)
    }

    this.play = function() {
        playing = true;
        play();
    }

    this.pause = function() {
        playing = false;
        pause();
    }

    this.toggle = function() {
        playing = !playing;
        that.UI.set( playing );
        playing ? play() : pause();
    }

    this.icons = button.icons;

    this.UI = {
        init: function() { 

            var soundButton = document.createElement('div');

            soundButton.appendChild( that.icons.use( '#icon-sound-' + ( playing ? 'on' : 'off ') ) )
            soundButton.className = button.pref + 'sound-button ';
            soundButton.style.position = 'absolute';
            soundButton.style.cursor = 'pointer';
            soundButton.addEventListener( 'click', function() {
                that.toggle()
            });

            wakkle.ui.wrapper.appendChild( soundButton );

        },
        set: function( playing ) {
            var soundButton = wakkle.wrapper.querySelector('.' + button.pref + 'sound-button');
            soundButton.innerHTML = '';
            soundButton.appendChild( that.icons.use( '#icon-sound-' + ( playing ? 'on' : 'off ') ) );
        }
    }

    this.update = function() {
        var x = -1 * (that.q - 0.5) * 2, // values between 1 and -1
            y = 0,
            z = 0.5;
        
        panner.setPosition(x,y,z);
    }


    function play() {

        audio.play();

        if ( volume < 0 ) volume = 0;
        if ( volume > 1 ) volume = 1;

        fadeIn = setInterval(function() { 
        // Note: we can't use requestAnimationFrame because fade wouldn't work when document hidden

            target = 1;
            volume += 0.1;
            audio.volume = volume >= target ? target : volume;
    
            if ( fadeOut ) {
                clearInterval( fadeOut );
                fadeOut = false;
            }
            if ( audio.volume == target ) {
                clearInterval( fadeIn );
                fadeIn = false;
            }
    
        }, 100)
    }
    
    function pause() {

        audio.play();

        if ( volume < 0 ) volume = 0;
        if ( volume > 1 ) volume = 1;

        fadeOut = setInterval(function() {

            target = 0
            volume -= 0.1;
            audio.volume = volume <= target ? target : volume;
    
            if ( fadeIn ) {
                clearInterval( fadeIn );
                fadeIn = false;
            }
            if ( audio.volume == target ) {
                clearInterval( fadeOut );
                fadeOut = false;
            }
            
        }, 100)
    }

    function visibilityHandler() {
        if ( document.visibilityState == 'hidden' && playing ) pause();
        if ( document.visibilityState == 'visible' && playing ) play();
    }

}




export var Sound = function( element ) {

    this.initialized    = false;
    this.q              = 0.5;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    var that    = this,
        audio   = new Audio(),
        context = new AudioContext(),
        panner  = context.createPanner(),
        level,
        volume,
        up,
        down,
        speed   = 0.01,
        listener;

    this.init = function() {

        if ( !element.sound ) return;

        audio.src       = element.meta.Path + element.sound.Source;
        audio.autoplay  = element.sound.Autoplay || false;
        audio.loop      = element.sound.Loop || true;
        audio.volume    = 0; // let's make a nice fade-in instead
        audio.controls  = false;

        panner.setPosition(0, 0, 1);
        panner.panningModel = 'equalpower';
        panner.connect( context.destination );

        context.listener.setPosition(0, 0, 0);
        context.createMediaElementSource(audio).connect( panner );

        this.initialized = true;
        this.start();

    }

    this.start = function() {
        play();
    }
    this.stop = function() {
        pause();
    }

    this.update = function() {
        var x = -1 * (that.q - 0.5) * 2,
        y = 0,
        z = 1 - Math.abs(x);
    
        panner.setPosition(x,y,z);
    }

    function play() {
        volume = 1

        audio.play()
        level = audio.volume + speed >= volume ? volume : audio.volume + speed
        audio.volume = level

        if ( audio.volume == volume ) {
            cancelAnimationFrame( up )
            up = undefined
        } else {
            if ( down ) cancelAnimationFrame( down )
            up = requestAnimationFrame( play )
        }
    }
    
    function pause() {
        volume = 0

        audio.play()
        level = audio.volume - speed <= volume ? volume : audio.volume - speed
        audio.volume = level

        if ( audio.volume == volume ) {
            cancelAnimationFrame( down )
            down = undefined
        } else {
            if ( up ) cancelAnimationFrame( up )
            down = requestAnimationFrame( pause )
        }
    }
    
    function stop() {
        pause()
        audio.currentTime = 0
    }
}


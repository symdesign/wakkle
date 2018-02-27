
import {loadScript} from "./controller/loadScript.js";


const CONTROL_ICONS = {
    html: require('./controller/control-icons.svg'),
    fill: '#fff',
    size: '32'
}

const HEAD_MOVE = {
    name: 'head_move',
    icon: {
        selector: '#icon-head-move',
    },
    lib:  'js/headtrackr.min.js',
}

const MOUSE_MOVE = {
    name: 'mouse_move',
    icon: {
        selector: '#icon-mouse-move',
    },
}

const MOUSE_DRAG = {
    name: 'mouse_drag',
    icon: {
        selector: '#icon-mouse-drag',
    },
}

const TOUCH_DRAG = {
    name: 'touch_drag',
    icon: {
        selector: '#icon-touch-drag',
    },
}

const DEVICE_ORIENTATION = {
    name: 'device_orientation',
    icon: {
        selector: '#icon-device-orientation',
    },
}


var WIDTH = windowWidth(), HEIGHT = windowHeight();


export var Controller = function( element ) {

    this.initialized    = false;
    this.q              = 0.5;

    this.UI             = false;
    var trackers        = [];

    var that = this;

    var htracker,
        videoInput,
        canvasInput,
        debugCanvas,
        camFov;

    var active,
        history,
        mouseDownX,
        mouseDownY,
        mousedown,
        mouseMoveX,
        dX      = 0,
        easing  = 0.05,
        q       = 0.5;
    
    var updater,
        components = [],
        component;

    this.init = function() {

        if ( this.UI && hasWebcam() ) {
            trackers.push( HEAD_MOVE );
        }
        if ( this.UI && hasMouse() ) {
            trackers.push( MOUSE_MOVE );
            trackers.push( MOUSE_DRAG );
        }
        if ( this.UI && hasTouch() ) {
            trackers.push( TOUCH_DRAG );
        }
        if ( this.UI && hasDeviceOrientation() ) {
            trackers.push( DEVICE_ORIENTATION );
        }

        drawControllers();
        update();

        if ( hasMouse() ) this.setActive('mouse_move');
        if ( hasDeviceOrientation() ) this.setActive('device_orientation');

        this.initialized = true;

    }

    this.control = function( obj ) {
        components.push( obj );
    }

    function update() {
        // TODO: performance optimisation -> delay in dependence of distance between last and current mouse position 
        // look up: ease to value in certain speed
        // Introduction to Easing in JavaScript https://www.kirupa.com/html5/introduction_to_easing_in_javascript.htm
        for (var i = 0; i < components.length; i++) {
            var component = components[i]
            that.q += (q - that.q) * easing; 
            component.q = that.q;
            component.update()
        }
    }

    function mouseHandler(e) {
        var mouseX = e.pageX;
        q = mouseX / WIDTH;
        update();
    }

    function dragStart(e) {
        mousedown = 1;
        mouseDownX = e.pageX || e.changedTouches[0].pageX;
        mouseDownY = e.pageY || e.changedTouches[0].pageY;
        document.body.style.cursor = 'grabbing';
    }

    function dragEnd(e) {
        mousedown = 0;
        mouseMoveX = 0;
        document.body.style.cursor = 'grab';
    }

    function dragHandler(e) {

        e.preventDefault();
        if (!mousedown) return;

        var pageX = e.pageX || e.changedTouches[0].pageX,
            pageY = e.pageY || e.changedTouches[0].pageY;

        var _dX = pageX - (mouseMoveX || mouseDownX);

        mouseMoveX = pageX;
        if ((dX > 0 && _dX < 0) || (dX < 0 && _dX > 0)) {
            mouseDownX = mouseMoveX;
        }

        dX = _dX;
        var dQ = dX / WIDTH;
        dQ = -dQ;

        q = 1 - q;
        q = q + dQ;
        q = q > 1 ? 1 : q;
        q = q < 0 ? 0 : q;
        q = 1 - q;
        
        update();
    }

    function deviceOrientationHandler(e) {

        if (mousedown) return;
        
        var orientation,
            angle;

        switch (window.orientation) {
            case 0:
            case 180:
                orientation = "portrait";
                break;

            case 90:
            case -90:
                orientation = "landscape";
                break;
        }

        angle = orientation == 'portrait' ? e.gamma : e.beta;
        angle = (angle > 45 ? 45 : angle);

        q = (angle + 45) * (1 / 90);
        q = q < 0 ? 0 : q;
        q = q > 1 ? 1 : q;
        update();
    }

    var headtrackingDialogVisibility;
    
    function headtrackingStatus(e) {
        if (e.status == "found") { removeHeadtrackingDialog() }
    }

    function removeHeadtrackingDialog() {
        var headtrackingDialog = document.querySelector('.dialog-container');
        if ( headtrackingDialog.style.opacity == '0' ) {
            setTimeout( () => { headtrackingDialog.remove() }, 300) // wait for fadeOut and remove
            cancelAnimationFrame( headtrackingDialogVisibility )
        } else {
            headtrackingDialogVisibility = requestAnimationFrame( removeHeadtrackingDialog );
        } 
    }

    function head_moveHandler(e) {
        console.log('head_move event')
        camFov = Math.floor(htracker.getFOV()) / 2
        q = (e.x / camFov + 0.5) - 1
        q = q * 0.1
        q = q >= 1 ? 1 : q
        q = q <= 0 ? 0 : q
        update();
    }

    function facetrackHandler(e) {
        console.log('facetrack event')
        camFov = Math.floor(htracker.getFOV()) / 2
        q = (e.x / camFov + 0.5) - 1
        q = q * 0.1
        q = q >= 1 ? 1 : q
        q = q <= 0 ? 0 : q
        update();
    }

    function set(mode) {
        unsetHeadtrackr()
        unsetMousemove()
        unsetMousedrag()
        unsetTouchdrag()
        unsetDeviceorientation()

        switch (mode) {

            case 'mouse_move':
                setMousemove();
                break;

            case 'mouse_drag':
                setMousedrag()
                break;

            case 'head_move':
                setHeadtrackr()
                break;

            case 'device_orientation':
                setDeviceorientation()
                break;

            case 'touch_drag':
                setTouchdrag()
                break;

            case 'device_orientation_drag':
                setDeviceOrientationDrag()
                break;
        }
    }

    function setMousemove() { document.addEventListener('mousemove', mouseHandler, false) }

    function unsetMousemove() { document.removeEventListener('mousemove', mouseHandler, false) }

    function setDeviceorientation() { window.addEventListener('device_orientation', deviceOrientationHandler, false) }

    function unsetDeviceorientation() { window.removeEventListener('device_orientation', deviceOrientationHandler, false) }

    function setMousedrag() {
        document.body.style.cursor = 'grab';
        document.addEventListener('mousedown', dragStart);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('mousemove', dragHandler);
    }

    function unsetMousedrag(status) {
        document.body.style.cursor = 'initial'
        document.removeEventListener('mousedown', dragStart);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('mousemove', dragHandler);
    }

    function setTouchdrag() {
        document.addEventListener('touchstart', dragStart);
        document.addEventListener('touchmove', dragHandler);
        document.addEventListener('touchend', dragEnd);
    }

    function unsetTouchdrag() {
        document.removeEventListener('touchstart', dragStart);
        document.removeEventListener('touchend', dragEnd);
        document.removeEventListener('touchmove', dragHandler);
    }



    function setDeviceOrientationDrag() {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false)
        document.addEventListener('touchstart', dragStart);
        document.addEventListener('touchmove', dragHandler);
        document.addEventListener('touchend', dragEnd);
    }

    function unsetDeviceOrientationDrag() {
        window.removeEventListener('deviceorientation', deviceOrientationHandler, false)
        document.removeEventListener('touchstart', dragStart);
        document.removeEventListener('touchend', dragEnd);
        document.removeEventListener('touchmove', dragHandler);
    }


    if ( hasWebcam() ) {
        loadScript( HEAD_MOVE.lib, initHeadtrackr );
    }

    function initHeadtrackr() {

        videoInput = document.createElement('video');
        videoInput.id = 'inputVideo';
        videoInput.autoplay = true;
        videoInput.style.display = 'none';
        element.wrapper.appendChild(videoInput);

        canvasInput = document.createElement('canvas');
        canvasInput.id = 'inputCanvas';
        canvasInput.style.visibility = 'hidden';
        canvasInput.style.position = 'absolute';
        element.wrapper.appendChild(canvasInput);

        debugCanvas = document.createElement('canvas');
        debugCanvas.id = 'debugCanvas';
        debugCanvas.width = 320;
        debugCanvas.height = 240;
        debugCanvas.style.position = 'absolute';
        debugCanvas.style.zIndex = '9';
        debugCanvas.style.display = this.debug ? 'block' : 'none';
        debugCanvas.style.transform = 'scaleX(-1)';
        element.wrapper.appendChild(debugCanvas);

        htracker = new headtrackr.Tracker({
            ui: true,
            cameraOffset: 10,
            debug: debugCanvas,
            smoothing: false
        });

    }

    function setHeadtrackr() {

        if (!hasWebcam() || !htracker) return;

        htracker.init(videoInput, canvasInput);
        htracker.start();

        var getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

        getUserMedia = getUserMedia.bind(navigator);
        document.addEventListener('facetrackingEvent', facetrackHandler);
        document.addEventListener('headtrackrStatus', headtrackingStatus);
    }

    function unsetHeadtrackr() {
        if (!hasWebcam() || !htracker) return;
        console.log('unset Headtrackr')
        document.removeEventListener('facetrackingEvent', facetrackHandler);
        htracker.stop();
        htracker.stopStream();
    }


    this.setActive = function( tracker ) {

        set( tracker );

        if ( !this.UI ) return;

        var controlLinks = element.wrapper.querySelectorAll('.control-button');

        controlLinks.forEach( (item, index) => { 
            item.classList.remove('active');

            var icon = item.querySelector('use');
            var href = icon.getAttribute('xlink:href').replace('-off','');

            icon.setAttribute('xlink:href', href + '-off' );
            
        });

        var item = element.wrapper.querySelector('[data-tracker=' + tracker + ']');
        var icon = item.querySelector('use');
        var href = icon.getAttribute('xlink:href').replace('-off','');

        item.classList.add('active');
        icon.setAttribute('xlink:href', href );

    }

    this.getActive = function() {
        return active;
    }

    function drawControllers() {

        var icons = document.createElement('div');
        icons.style.display = 'none';
        icons.innerHTML = CONTROL_ICONS.html;

        element.wrapper.appendChild( icons );

        var ul = document.createElement('ul'),
            li,
            tracker;

        for ( var i = 0; i < trackers.length; i++ ) {
            
            tracker = trackers[i];

            li                  = document.createElement('li');
            li.className        = 'control-button ' + tracker.name;
            li.innerHTML        = '<svg '
                                + 'width="' + CONTROL_ICONS.size + '" '
                                + 'height="' + CONTROL_ICONS.size + '" '
                                + '>'
                                    + '<use '
                                    + 'xlink:href="' + tracker.icon.selector + '-off" '
                                    + 'fill="' + CONTROL_ICONS.fill + '" '
                                    + '/>'
                                + '</svg>';
            li.style.width      = '2em';
            li.style.height     = '2em';
            li.style.cursor     = 'pointer';
            li.dataset.tracker  = tracker.name;

            li.addEventListener( 'click', function(e){ 
                that.setActive( this.dataset.tracker );
            }, false);

            ul.className = 'control-buttons';
            ul.appendChild( li );

        }

        ul.style.position   = 'absolute';
        ul.style.zIndex     = '999' // looks bad but I really don't know how many items there will be
        document.getElementById( element.id ).appendChild( ul )

    }

    function isMobile() {
        var check = false;
        (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    function hasWebcam() {
        return navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
    }
    function hasTouch() {
        try {
            document.createEvent('TouchEvent');  
            return true;  
        } catch (e) {  
            return false;  
        }  
    }
    function hasMouse() {
        try {
            document.createEvent('MouseEvent');  
            return true;  
        } catch (e) {  
            return false;  
        }  
    }
    function hasDeviceOrientation() {
        try {
            document.createEvent('DeviceOrientationEvent');  
            document.createEvent('TouchEvent'); // Macbook Pro fires a not real DeviceOrientationEvent
            return true;  
        } catch (e) {  
            return false;  
        }
    }

}

function windowWidth() {
    return "innerWidth" in window ? window.innerWidth : document.documentElement.offsetWidth;
}

function windowHeight() {
    return "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
}
var onresize = function(e) {
    WIDTH = windowWidth(),
    HEIGHT = windowHeight();
}
window.addEventListener("resize", onresize); 


function round(value, exp) {
    if (typeof exp === 'undefined' || +exp === 0)
        return Math.round(value);

    value = +value;
    exp = +exp;

    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
        return NaN;

    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}
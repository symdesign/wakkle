// @codekit-prepend "../vendor/loadScript.js"

var WIDTH = windowWidth(),
    HEIGHT = windowHeight(),
    getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;

// Singleton http://robdodson.me/javascript-design-patterns-singleton/
var Controller = (function() {

    var instance,
        htracker,
        videoInput,
        canvasInput,
        debugCanvas;

    function init() {

        var currentSequence,
            activeEventListener,
            q = 0.5,
            _q = 0.5,
            history,
            mouseDownX,
            mouseDownY,
            mousedown,
            mouseMoveX,
            dX = 0;

        isMobile() ? set('orientationdrag') : set('mousemove');

        function update(q) {
            currentSequence != undefined ? currentSequence.q = q : console.log('No object there to be updated.');
        }

        function mouseHandler(e) {
            var mouseX = e.pageX;
            q = mouseX / WIDTH;
            update(q);
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

            _q = 1 - q;

            _q = _q + dQ;
            _q = _q > 1 ? 1 : _q;
            _q = _q < 0 ? 0 : _q;
            q = 1 - _q;

            update(q);
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

            update(q);
        }

        function headtrackringStatus(e) {
            if (e.status == "found") {
                console.log('found')
            }
        }

        function headtrackHandler(e) {
            console.log('headtrack event')
            camFov = Math.floor(htracker.getFOV()) / 2
            q = (e.x / camFov + 0.5) - 1
            q = q * 0.1
            q = q >= 1 ? 1 : q
            q = q <= 0 ? 0 : q
            update(q);
        }

        function facetrackHandler(e) {
            console.log('facetrack event')
            camFov = Math.floor(htracker.getFOV()) / 2
            q = (e.x / camFov + 0.5) - 1
            q = q * 0.1
            q = q >= 1 ? 1 : q
            q = q <= 0 ? 0 : q
            update(q);
        }

        function set(mode) {
            unsetHeadtrackr()
            unsetMousemove()
            unsetMousedrag()
            unsetTouchdrag()
            unsetDeviceorientation()

            activeEventListener = mode;

            switch (mode) {

                case 'mousemove':
                    setMousemove();
                    break;

                case 'mousedrag':
                    setMousedrag()
                    break;

                case 'headtrack' || 'facetrack':
                    setHeadtrackr()
                    break;

                case 'deviceorientation':
                    setDeviceorientation()
                    break;

                case 'touchdrag':
                    setTouchdrag()
                    break;

                case 'orientationdrag':
                    setOrientationDrag()
                    break;
            }
        }

        function setMousemove() { document.addEventListener('mousemove', mouseHandler, false) }

        function unsetMousemove() { document.removeEventListener('mousemove', mouseHandler, false) }

        function setDeviceorientation() { window.addEventListener('deviceorientation', deviceOrientationHandler, false) }

        function unsetDeviceorientation() { window.removeEventListener('deviceorientation', deviceOrientationHandler, false) }

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

        function setOrientationDrag() {
            window.addEventListener('deviceorientation', deviceOrientationHandler, false)
            document.addEventListener('touchstart', dragStart);
            document.addEventListener('touchmove', dragHandler);
            document.addEventListener('touchend', dragEnd);
        }

        function unsetOrientationDrag() {
            window.removeEventListener('deviceorientation', deviceOrientationHandler, false)
            document.removeEventListener('touchstart', dragStart);
            document.removeEventListener('touchend', dragEnd);
            document.removeEventListener('touchmove', dragHandler);
        }


        if (getUserMedia) {
            loadScript('js/vendor/headtrackr.min.js', getHeadtrackr);
        }

        function getHeadtrackr() {

                videoInput = document.createElement('video');
                videoInput.id = 'inputVideo';
                videoInput.autoplay = true;
                videoInput.style.display = 'none';
                document.body.appendChild(videoInput);

                canvasInput = document.createElement('canvas');
                canvasInput.id = 'inputCanvas';
                canvasInput.style.visibility = 'hidden';
                canvasInput.style.position = 'absolute';
                document.body.appendChild(canvasInput);

                debugCanvas = document.createElement('canvas');
                debugCanvas.id = 'debugCanvas';
                debugCanvas.width = 320;
                debugCanvas.height = 240;
                debugCanvas.style.position = 'absolute';
                debugCanvas.style.top = '0';
                debugCanvas.style.left = '0';
                debugCanvas.style.zIndex = '9999';
                debugCanvas.style.display = this.debug ? 'block' : 'none';
                document.body.appendChild(debugCanvas);

                htracker = new headtrackr.Tracker({
                    ui: true,
                    cameraOffset: 10,
                    debug: debugCanvas,
                    smoothing: false
                });
        }

        function setHeadtrackr() {

            if (!getUserMedia || !htracker) return;

            htracker.init(videoInput, canvasInput);
            htracker.start();

            getUserMedia = getUserMedia.bind(navigator);
            document.addEventListener('facetrackingEvent', facetrackHandler);
            document.addEventListener('headtrackrrStatus', headtrackringStatus);
        }

        function unsetHeadtrackr() {
            if (!getUserMedia || !htracker) return;

            document.removeEventListener('facetrackingEvent', facetrackHandler);
            htracker.stop();
            htracker.stopStream();
        }

        function isMobile() {
            var check = false;
            (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        }

        return {

            setActive: function(mode) {
                set(mode)
            },

            getActive: function() {
                return activeEventListener;
            },

            listAvailable: function() {
                var list = [];

                if (!isMobile()) {
                    list = ['mousemove', 'mousedrag'];
                    if (getUserMedia) list.push('headtrack')
                }
                if (isMobile()) {
                    list = ['orientationdrag'];
                }

                return list;
            },

            update: function(object) {
                currentSequence = object;
            },

            UI: function(isVisible) {

                var uiId = 'controls';
                var uiClassName = 'controls';

                // make sure UI does not already exist when we draw it
                var ui = document.getElementById( uiId );
                if (document.contains( ui )) { ui.remove() }

                var isVisible = typeof(isVisible) == 'undefined' ? true : isVisible;
                if (!isVisible) { return } // don't draw UI when it is not visible

                // draw or redraw UI
                var controls = this.listAvailable(),
                ul = document.createElement('ul');
                ul.className = uiClassName;
                ul.id = uiId;

                for (var i = 0; i < controls.length; i++) {

                    if (controls.length < 2) break;

                    var li = document.createElement('li');
                    var a = document.createElement('a');
                    a.className = 'control-link icon-' + controls[i];
                    a.id = controls[i];
                    a.href = 'javascript: setController(\'' + controls[i] + '\')';

                    var text = document.createTextNode(controls[i])

                    a.appendChild(text);
                    li.appendChild(a);
                    ul.appendChild(li);
                }

                document.body.appendChild(ul)
                if (controls.length > 1) setController(controls[0])
            }

        };

    };

    return {
        getInstance: function() {

            if (!instance) {
                instance = init();
            }

            return instance;
        }
    };

})();

function setController(controllerName) {
    var controlLinks = document.getElementsByClassName('control-link');
    for (var i = 0; i < controlLinks.length; i++) {
        controlLinks[i].classList.remove('active');
    }
    document.getElementById(controllerName).classList.add('active');
    controller.setActive(controllerName);
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

import {removeFromArray} from './image/removeFromArray';
import {sortArrayMiddleToOut} from './image/sortArrayMiddleToOut';
import {imagePreload} from './image/imagePreload';

// import isMobile

export var Sequence = function( element ) {  // rather call "new Sequence()" as "new Image()" is protected

    this.initialized    = false;
    this.q              = 0.5;
    this.idx;        // absolute image index
    this._idx;       // temp absolute image index (easing)

    var that        = this,
        image       = new Image(),
        q,          // relative image index
        count,      // number of loaded image
        listener;   // listens for changes of q made by controller

    this.init = function() {
        
        count   = 0;
        image.onload = function() { // TODO: test if onload gets fired again inside init-function when currentSrc changes
            
            loadImages();
            
        }
        image.src = element.currentSrc || element.src;

    }

    function loadImages() {

        element.style.position = 'absolute';

        var images = sortArrayMiddleToOut( getSources() ), // in order to load progressively starting from the middle
            loaded = [];

        var progress = document.createElement('progress');
            progress.setAttribute('max', images.length);
            progress.setAttribute('value', 0);
        document.body.appendChild(progress); // TODO: add to element.wrapper instead of body

        var appendCount = ( (images.length / 2) % 2 ? Math.round(images.length)   : images.length / 2), // number of right images
            prependCount = ( (images.length / 2) % 2 ? Math.round(images.length)-1 : images.length / 2), // number of left images
            nextAppend = element.meta.Path + pad(appendCount,element.meta.Count.toString().length) + '.jpg', 
            nextPrepend = element.meta.Path + pad(prependCount,element.meta.Count.toString().length) + '.jpg';

        new imagePreload(images, {
            onProgress: function(image, imageEl, index) {
                var percent = Math.floor((100 / this.queue.length) * this.completed.length);
                progress.value = index;

                if (count > 0 && element) element.remove();
                if (count > 3 && !listener) listen();

                loaded.push(image);

                for (var i = 0; i < loaded.length; i++) { // to keep the loaded as short as possible
                    if (loaded.indexOf(nextAppend) >= 0) {
                        removeFromArray(loaded,nextAppend);
                        appendImage(nextAppend, element.wrapper);
                        appendCount++;
                        // next image
                        nextAppend = element.meta.Path + pad(appendCount,element.meta.Count.toString().length) + '.jpg';
                    }
                    if (loaded.indexOf(nextPrepend) >= 0) {
                        removeFromArray(loaded,nextPrepend);
                        prependImage(nextPrepend, element.wrapper);
                        prependCount--;
                        // next image
                        nextPrepend = element.meta.Path + pad(prependCount,element.meta.Count.toString().length) + '.jpg';
                    }
                }
            },
            onComplete: function(loaded, errors) {
                progress.style.display = 'none';
                this.initialized = true;
            }
        });
    }

    function createImage(source) {
        var objectFit = window.getComputedStyle(element, null).getPropertyValue('object-fit');
        var image = document.createElement('img');
        image.src = source;
        image.style.filter = "alpha(opacity = 0)"; // Internet Explorer
        image.style.opacity = 0;
        image.style.position = 'absolute'; // stack images on z axis
        if (objectFit != 'fill' && objectFit != 'none') {
            image.style.objectFit = objectFit;
            image.style.width = (element.hasAttribute('width') ? element.width : element.style.width) || '100%';
            image.style.height = (element.hasAttribute('height') ? element.height : element.style.height) || 'auto';
        }
        return image;
    }

    function appendImage(source, wrapper) {
        var image = createImage(source);
        wrapper.appendChild(image);
        count++;
    }

    function prependImage(source, wrapper) {
        var image = createImage(source);
        wrapper.insertBefore(image, wrapper.firstChild);
        count++;
    }

    function getSources() {
        var array = []; 
        for (var i = 0; i < element.meta.Count; i++) {
            array[i] = element.meta.Path + pad(i, element.meta.Count.toString().length) + '.jpg';
        }
        return array;
    }

    this.update = function() {
        that._idx = that._idx || 0;
         that.idx = Math.round( (count-1) * that.q );
        
        var image = document.getElementById(element.id).getElementsByTagName('img');


        if (!that.initialized) {
            for ( var i = 0; i < image.length; i++ ) {
                image[i].style.filter    = "alpha(opacity = 0)"; // Internet Explorer
                image[i].style.opacity   = 0;
            }
        }
        // this is more performant than a for-loop each time but
        // for some reasons not every image is hidden fromt he beginning
        // so I have added it as long as the sequence is not completely initialized
        image[that._idx].style.filter    = "alpha(opacity = 0)"; // Internet Explorer
        image[that._idx].style.opacity   = 0;


        image[ that.idx].style.filter    = "alpha(opacity = 1)"; // Internet Explorer
        image[ that.idx].style.opacity   = 1;

        that._idx = that.idx;
    }

    function listen() {

        that._idx = that._idx || 0;
        that.idx = Math.round( (count-1) * that.q );
        
        var image = document.getElementById(element.id).getElementsByTagName('img');


        if (!that.initialized) {
            for ( var i = 0; i < image.length; i++ ) {
                image[i].style.filter    = "alpha(opacity = 0)"; // Internet Explorer
                image[i].style.opacity   = 0;
            }
        }
        // this is more performant than a for-loop each time but
        // for some reasons not every image is hidden fromt he beginning
        // so I have added it as long as the sequence is not completely initialized
        image[that._idx].style.filter    = "alpha(opacity = 0)"; // Internet Explorer
        image[that._idx].style.opacity   = 0;


        image[ that.idx].style.filter    = "alpha(opacity = 1)"; // Internet Explorer
        image[ that.idx].style.opacity   = 1;

        that._idx = that.idx;

        //listener = window.requestAnimationFrame(listen)
    }

}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function pad(num, size) {
    var s = num + ''
    while (s.length < size) s = '0' + s
    return s
}

function isMobile() {
    var check = false;
    (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}


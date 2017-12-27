require('../vendor/imagePreloader.js');
require('../vendor/removeFromArray.js');
require('../vendor/sortArrayMiddleToOut.js');

var Wakkl = function(placeholder) {

    var that = this,

        meta,
        sources,
        delay = 0.1,
        animation,
        previousQ,
        q = 0.5, // default active image (relative number)
        currentQ,
        previousIndex, // previous active image (absolute number)
        currentCount = 0;

    this.q = q; // active image (relative number)

    this.init = function() {
        var source = placeholder.currentSrc || placeholder.src,
            img = new Image();
        img.onload = function() { // TODO: test if onload gets fired again inside init-function when currentSrc changes
            meta = getMeta(); // meta will be fetched again when currentSrc changes
            sources = getSources();
            loadImages();
        }
        img.src = source;
    }

    function getMeta() {
        var path,
            meta;

        path = placeholder.currentSrc || placeholder.src;
        path = path.replace('.wakkl.jpg','');
        path = path + '/';

        loadJSON(path + 'meta.json', function(json) {
            meta = {
                "Path": path,
                "Count": json.wakkl.Count,
                "AngleOfView": json.wakkl.AngleOfView,
                "Phi": json.wakkl.Phi,
                "Chi": json.wakkl.Chi
            }
        });
        return meta;
    }

    function getSources() {
        var src,
            sources = []; 
        for (var i = 0; i < meta.Count; i++) {
            src = meta.Path + pad(i, meta.Count.toString().length) + '.jpg'
            sources[i] = src;
        }
        return sources;
    }

    function loadImages() {

        var wrapper = document.createElement('figure'),
            objectFit = window.getComputedStyle(placeholder, null).getPropertyValue('object-fit');

        if (placeholder.hasAttributes()) cloneAttributes(placeholder, wrapper);
        wrapper.removeAttribute('src');
        wrapper.removeAttribute('srcset');

        if (window.getComputedStyle(placeholder, null).getPropertyValue('position') == 'static') wrapper.style = 'relative'; // so children can be positioned 'absolute'
        
        placeholder.style.position = 'absolute';
        //placeholder.style.zIndex = -1;
        placeholder.parentNode.insertBefore(wrapper, placeholder)

        wrapper.appendChild(placeholder); // only move placeholder, keep it for detecting changes in currentSrc

        var imagesArray = sortArrayMiddleToOut(sources), // in order to load progressively starting from the middle
            r = Math.ceil(sources.length / 2),
            l = r-1,
            rSource = meta.Path + pad(r,meta.Count.toString().length) + '.jpg', 
            lSource = meta.Path + pad(l,meta.Count.toString().length) + '.jpg',
            queue = [];

        var progress = document.createElement('progress');
        progress.setAttribute('max', imagesArray.length);
        progress.setAttribute('value', 0);
        document.body.appendChild(progress);

        new preLoader(imagesArray, {
            onProgress: function(img, imageEl, index) {
                var percent = Math.floor((100 / this.queue.length) * this.completed.length);
                progress.value = index;

                if (currentCount > 3 && typeof animation == 'undefined') animate();

                queue.push(img);

                for (var i = 0; i < queue.length; i++) { // to keep the queue as short as possible
                    if (queue.indexOf(rSource) >= 0) {
                        removeFromArray(queue,rSource);
                        appendImage(rSource, wrapper);
                        r++;
                        rSource = meta.Path + pad(r,meta.Count.toString().length) + '.jpg';
                    }
                    if (queue.indexOf(lSource) >= 0) {
                        removeFromArray(queue,lSource);
                        prependImage(lSource, wrapper);
                        l--;
                        lSource = meta.Path + pad(l,meta.Count.toString().length) + '.jpg';
                    }
                }
            },
            onComplete: function(loaded, errors) {
                progress.style.display = 'none';
            }
        });
    }

    function createImage(source) {
        var objectFit = window.getComputedStyle(placeholder, null).getPropertyValue('object-fit');
        var image = document.createElement('img');
        image.src = source;
        image.style.filter = "alpha(opacity = 0)"; // Internet Explorer
        image.style.opacity = 0;
        image.style.position = 'absolute'; // stack images on z axis
        if (objectFit != 'fill' && objectFit != 'none') {
            image.style.objectFit = objectFit;
            image.style.width = (placeholder.hasAttribute('width') ? placeholder.width : placeholder.style.width) || '100%';
            image.style.height = (placeholder.hasAttribute('height') ? placeholder.height : placeholder.style.height) || 'auto';
        }
        return image;
    }

    function appendImage(source, wrapper) {
        var image = createImage(source);
        wrapper.appendChild(image); // TODO: insert before placeholder
        currentCount++;
    }

    function prependImage(source, wrapper) {
        var image = createImage(source);
        wrapper.insertBefore(image, wrapper.firstChild);
        currentCount++;
    }

    // TODO: performance optimisation -> delay in dependence of distance between last and current mouse position 
    // look up: ease to value in certain speed
    // Introduction to Easing in JavaScript https://www.kirupa.com/html5/introduction_to_easing_in_javascript.htm

    function animate() {

        if (previousIndex == undefined) previousIndex = Math.round((currentCount - 1) * that.q);
        if (currentQ == undefined) currentQ = that.q;

        currentQ += (that.q - currentQ) * delay;
        currentQ = round(currentQ, 4);

        var img = document.getElementById(placeholder.id).childNodes,
            currentIndex = Math.round((currentCount - 1) * currentQ);

        img[previousIndex].style.filter = "alpha(opacity = 0)"; // Internet Explorer
        img[previousIndex].style.opacity = 0;

        img[currentIndex].style.filter = "alpha(opacity = 1)"; // Internet Explorer
        img[currentIndex].style.opacity = 1;

        previousIndex = currentIndex;
        previousQ = currentQ;

        animation = window.requestAnimationFrame(animate)
    }

    function cloneAttributes(transmitter, receiver) {
        for (var i = 0; i < transmitter.attributes.length; i++) {
            var attribute = transmitter.attributes[i];
            receiver.setAttribute(attribute.name, attribute.value)
        }
    }

    function difference(a, b) {
        return Math.abs(a - b);
    }

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

    function isMobile() {
        var check = false;
        (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    function pad(num, size) {
        var s = num + ''
        while (s.length < size) s = '0' + s
        return s
    }

    function loadJSON(path, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    console.log(data);
                    console.log(data.wakkl.Count);
                    if (callback) callback(data);
                }
            }
        };
        xhr.open('GET', path, false); // make synchronous XMLHttpRequest in order receive value outside of the callback function
        xhr.send();
    }

}
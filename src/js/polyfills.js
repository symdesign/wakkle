/**
 * RequestAnimationFrame - for animating and syncing to 60fps
 */
(function() {
    var lastTime = 0;
    var vendors = ['ms','moz','webkit','o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
    };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
    };
}());

// window.getComputedStyle() polyfill
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

//addEventListener polyfill for ie7-8
(function(win, doc){
    if(win.addEventListener)return;     //No need to polyfill

    function docHijack(p){var old = doc[p];doc[p] = function(v){return addListen(old(v))}}
    function addEvent(on, fn, self){
        return (self = this).attachEvent('on' + on, function(e){
            var e = e || win.event;
            e.preventDefault  = e.preventDefault  || function(){e.returnValue = false}
            e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true}
            fn.call(self, e);
        });
    }
    function addListen(obj, i){
        if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
        else obj.addEventListener = addEvent;
        return obj;
    }

    addListen([doc, win]);
    if('Element' in win)win.Element.prototype.addEventListener = addEvent;          //IE8
    else{       //IE < 8
        doc.attachEvent('onreadystatechange', function(){addListen(doc.all)});      //Make sure we also init at domReady
        docHijack('getElementsByTagName');
        docHijack('getElementById');
        docHijack('createElement');
        addListen(doc.all);
    }
})(window, document);



/*
 * Minimal classList shim for IE 9
 * By Devon Govett
 * MIT LICENSE
 */

if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function() {
            var self = this;
            function update(fn) {
                return function(value) {
                    var classes = self.className.split(/\s+/),
                        index = classes.indexOf(value);

                    fn(classes, index, value);
                    self.className = classes.join(" ");
                }
            }

            var ret = {                    
                add: update(function(classes, index, value) {
                    ~index || classes.push(value);
                }),

                remove: update(function(classes, index) {
                    ~index && classes.splice(index, 1);
                }),

                toggle: update(function(classes, index, value) {
                    ~index ? classes.splice(index, 1) : classes.push(value);
                }),

                contains: function(value) {
                    return !!~self.className.split(/\s+/).indexOf(value);
                },

                item: function(i) {
                    return self.className.split(/\s+/)[i] || null;
                }
            };
            
            Object.defineProperty(ret, 'length', {
                get: function() {
                    return self.className.split(/\s+/).length;
                }
            });

            return ret;
        }
    });
}
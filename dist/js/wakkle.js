var wakkle =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return pref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return head_move; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return mouse_move; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return mouse_drag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return touch_drag; });
/* unused harmony export device_orientation */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return device_orientation_drag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return icons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UI; });

var pref = 'wakkle-'; // .wakkle-sound-button, etc.

var head_move = {
    name: 'head_move',
    icon: {
        selector: '#icon-head-move'
    },
    lib: 'js/headtrackr.min.js'
};

var mouse_move = {
    name: 'mouse_move',
    icon: {
        selector: '#icon-mouse-move'
    }
};

var mouse_drag = {
    name: 'mouse_drag',
    icon: {
        selector: '#icon-mouse-drag'
    }
};

var touch_drag = {
    name: 'touch_drag',
    icon: {
        selector: '#icon-touch-drag'
    }
};

var device_orientation = {
    name: 'device_orientation',
    icon: {
        selector: '#icon-device-orientation'
    }
};

var device_orientation_drag = {
    name: 'device_orientation_drag',
    icon: {
        selector: '#icon-device-orientation'
    }
};

var icons = {

    init: function () {
        var wrapper = document.createElement('div'),
            svg = __webpack_require__(7);

        wrapper.style.display = 'none';
        wrapper.innerHTML = svg;
        document.body.insertBefore(wrapper, document.body.firstChild);
    },

    use: function (selector, options) {

        if (!selector) return;
        if (options === undefined) options = {};

        options = {
            size: options.size || '32',
            fill: options.fill || '#fff',
            stroke: options.fill || '',
            style: options.style || {}
        };

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
            use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

        svg.setAttribute('width', options.size);
        svg.setAttribute('height', options.size);

        use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', selector);
        use.setAttribute('fill', options.fill);

        svg.appendChild(use);

        return svg;
    }

};

icons.init();

var UI = function (wakkle) {

    this.init = function () {

        if (wakkle.ui) {
            wakkle.ui.wrapper = document.createElement('div');
            wakkle.ui.wrapper.className = pref + 'ui';
            wakkle.wrapper.appendChild(wakkle.ui.wrapper);
        }
    };
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = pad;

function pad(num, size) {
    var s = parseInt(num) + '';
    while (s.length < size) {
        s = '0' + s;
    }return s;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,n){ true?module.exports=n():"function"==typeof define&&define.amd?define(n):e.simpleElementResizeDetector=n()}(this,function(){var e="position:absolute;left:0;top:-100%;width:100%;height:100%;margin:1px 0 0;border:none;opacity:0;visibility:hidden;pointer-events:none;",n=function(n,t){var i=document.createElement("iframe");return i.style.cssText=e,n.appendChild(i),i.contentWindow.onresize=function(){t(n)},i};return n});
//# sourceMappingURL=simple-element-resize-detector.js.map

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return generateUUID; });
var generateUUID = function () {
    // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return init; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_document_register_element__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_document_register_element___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_document_register_element__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_collector__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_UI__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_controller__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_image__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_mask__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_sound__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_markup__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_minimap__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_fullscreen__ = __webpack_require__(19);

 // Polyfill for custom tagnames












var version = '1.0 beta';

var init = function (options) {

    if (!options) options = {};

    var settings = {

        ui: typeof options.ui === 'boolean' ? {
            controllers: options.ui, // show controller buttons
            fullscreen: options.ui, // show fullscreen button
            minimap: options.ui, // show minimap similar to facebook's 360° videos
            fade: options.ui, // fade out on mouse-out, in on mouse-in
            minimal: options.ui, // gather buttons in context menus
            sound: options.ui // true, false, mute
        } : typeof options.ui === 'object' ? {
            controllers: options.ui.controllers,
            fullscreen: options.ui.fullscreen,
            minimap: options.ui.minimap,
            fade: options.ui.fade
        } : {
            controllers: true,
            fullscreen: true,
            minimap: true,
            fade: true
        },

        bindFontSize: default_(options.bindFontSize, true)

    };

    var collector = new __WEBPACK_IMPORTED_MODULE_1__components_collector__["a" /* Collector */]();
    collector.init();

    var wakkles = collector.collect(),
        wakkle,
        controller = [],
        components = [],
        image = [],
        mask = [],
        sound = [],
        markup = [],
        vector = [],
        minimap = [],
        fullscreen = [],
        ui = [];

    for (var i = 0; i < wakkles.length; i++) {

        wakkle = wakkles[i];
        wakkle.ui = settings.ui;

        ui[i] = new __WEBPACK_IMPORTED_MODULE_2__components_UI__["a" /* UI */](wakkle);
        ui[i].init();

        controller[i] = new __WEBPACK_IMPORTED_MODULE_3__components_controller__["a" /* Controller */](wakkle);
        controller[i].init();

        image[i] = new __WEBPACK_IMPORTED_MODULE_4__components_image__["a" /* Sequence */](wakkle);
        image[i].init();
        controller[i].connect(image[i]);

        mask[i] = new __WEBPACK_IMPORTED_MODULE_5__components_mask__["a" /* Mask */](wakkle);
        mask[i].init();
        controller[i].connect(mask[i]);

        sound[i] = new __WEBPACK_IMPORTED_MODULE_6__components_sound__["a" /* Sound */](wakkle);
        !sound[i == 0 ? 0 : i - 1].initialized && sound[i].init();
        controller[i].connect(sound[i]);

        markup[i] = new __WEBPACK_IMPORTED_MODULE_7__components_markup__["a" /* Markup */](wakkle);
        markup[i].init();
        controller[i].connect(markup[i]);

        minimap[i] = new __WEBPACK_IMPORTED_MODULE_8__components_minimap__["a" /* Minimap */](wakkle);
        minimap[i].init();
        controller[i].connect(minimap[i]);

        fullscreen[i] = new __WEBPACK_IMPORTED_MODULE_9__components_fullscreen__["a" /* Fullscreen */](wakkle);
        fullscreen[i].init();
    }

    function default_(overwrite, default_) {
        return overwrite !== undefined ? overwrite : default_;
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*! (C) Andrea Giammarchi - @WebReflection - Mit Style License */
(function(e,t){"use strict";function Ht(){var e=wt.splice(0,wt.length);Et=0;while(e.length)e.shift().call(null,e.shift())}function Bt(e,t){for(var n=0,r=e.length;n<r;n++)Jt(e[n],t)}function jt(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],Pt(r,A[It(r)])}function Ft(e){return function(t){ut(t)&&(Jt(t,e),O.length&&Bt(t.querySelectorAll(O),e))}}function It(e){var t=ht.call(e,"is"),n=e.nodeName.toUpperCase(),r=_.call(L,t?N+t.toUpperCase():T+n);return t&&-1<r&&!qt(n,t)?-1:r}function qt(e,t){return-1<O.indexOf(e+'[is="'+t+'"]')}function Rt(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target,s=e[y]||2,o=e[w]||3;kt&&(!i||i===t)&&t[h]&&r!=="style"&&(e.prevValue!==e.newValue||e.newValue===""&&(n===s||n===o))&&t[h](r,n===s?null:e.prevValue,n===o?null:e.newValue)}function Ut(e){var t=Ft(e);return function(e){wt.push(t,e.target),Et&&clearTimeout(Et),Et=setTimeout(Ht,1)}}function zt(e){Ct&&(Ct=!1,e.currentTarget.removeEventListener(S,zt)),O.length&&Bt((e.target||n).querySelectorAll(O),e.detail===l?l:a),st&&Vt()}function Wt(e,t){var n=this;vt.call(n,e,t),Lt.call(n,{target:n})}function Xt(e,t){nt(e,t),Mt?Mt.observe(e,yt):(Nt&&(e.setAttribute=Wt,e[o]=Ot(e),e[u](x,Lt)),e[u](E,Rt)),e[m]&&kt&&(e.created=!0,e[m](),e.created=!1)}function Vt(){for(var e,t=0,n=at.length;t<n;t++)e=at[t],M.contains(e)||(n--,at.splice(t--,1),Jt(e,l))}function $t(e){throw new Error("A "+e+" type is already registered")}function Jt(e,t){var n,r=It(e),i;-1<r&&(Dt(e,A[r]),r=0,t===a&&!e[a]?(e[l]=!1,e[a]=!0,i="connected",r=1,st&&_.call(at,e)<0&&at.push(e)):t===l&&!e[l]&&(e[a]=!1,e[l]=!0,i="disconnected",r=1),r&&(n=e[t+f]||e[i+f])&&n.call(e))}function Kt(){}function Qt(e,t,r){var i=r&&r[c]||"",o=t.prototype,u=tt(o),a=t.observedAttributes||j,f={prototype:u};ot(u,m,{value:function(){if(Q)Q=!1;else if(!this[W]){this[W]=!0,new t(this),o[m]&&o[m].call(this);var e=G[Z.get(t)];(!V||e.create.length>1)&&Zt(this)}}}),ot(u,h,{value:function(e){-1<_.call(a,e)&&o[h].apply(this,arguments)}}),o[d]&&ot(u,p,{value:o[d]}),o[v]&&ot(u,g,{value:o[v]}),i&&(f[c]=i),e=e.toUpperCase(),G[e]={constructor:t,create:i?[i,et(e)]:[e]},Z.set(t,e),n[s](e.toLowerCase(),f),en(e),Y[e].r()}function Gt(e){var t=G[e.toUpperCase()];return t&&t.constructor}function Yt(e){return typeof e=="string"?e:e&&e.is||""}function Zt(e){var t=e[h],n=t?e.attributes:j,r=n.length,i;while(r--)i=n[r],t.call(e,i.name||i.nodeName,null,i.value||i.nodeValue)}function en(e){return e=e.toUpperCase(),e in Y||(Y[e]={},Y[e].p=new K(function(t){Y[e].r=t})),Y[e].p}function tn(){X&&delete e.customElements,B(e,"customElements",{configurable:!0,value:new Kt}),B(e,"CustomElementRegistry",{configurable:!0,value:Kt});for(var t=function(t){var r=e[t];if(r){e[t]=function(t){var i,s;return t||(t=this),t[W]||(Q=!0,i=G[Z.get(t.constructor)],s=V&&i.create.length===1,t=s?Reflect.construct(r,j,i.constructor):n.createElement.apply(n,i.create),t[W]=!0,Q=!1,s||Zt(t)),t},e[t].prototype=r.prototype;try{r.prototype.constructor=e[t]}catch(i){z=!0,B(r,W,{value:e[t]})}}},r=i.get(/^HTML[A-Z]*[a-z]/),o=r.length;o--;t(r[o]));n.createElement=function(e,t){var n=Yt(t);return n?gt.call(this,e,et(n)):gt.call(this,e)},St||(Tt=!0,n[s](""))}var n=e.document,r=e.Object,i=function(e){var t=/^[A-Z]+[a-z]/,n=function(e){var t=[],n;for(n in s)e.test(n)&&t.push(n);return t},i=function(e,t){t=t.toLowerCase(),t in s||(s[e]=(s[e]||[]).concat(t),s[t]=s[t.toUpperCase()]=e)},s=(r.create||r)(null),o={},u,a,f,l;for(a in e)for(l in e[a]){f=e[a][l],s[l]=f;for(u=0;u<f.length;u++)s[f[u].toLowerCase()]=s[f[u].toUpperCase()]=l}return o.get=function(r){return typeof r=="string"?s[r]||(t.test(r)?[]:""):n(r)},o.set=function(n,r){return t.test(n)?i(n,r):i(r,n),o},o}({collections:{HTMLAllCollection:["all"],HTMLCollection:["forms"],HTMLFormControlsCollection:["elements"],HTMLOptionsCollection:["options"]},elements:{Element:["element"],HTMLAnchorElement:["a"],HTMLAppletElement:["applet"],HTMLAreaElement:["area"],HTMLAttachmentElement:["attachment"],HTMLAudioElement:["audio"],HTMLBRElement:["br"],HTMLBaseElement:["base"],HTMLBodyElement:["body"],HTMLButtonElement:["button"],HTMLCanvasElement:["canvas"],HTMLContentElement:["content"],HTMLDListElement:["dl"],HTMLDataElement:["data"],HTMLDataListElement:["datalist"],HTMLDetailsElement:["details"],HTMLDialogElement:["dialog"],HTMLDirectoryElement:["dir"],HTMLDivElement:["div"],HTMLDocument:["document"],HTMLElement:["element","abbr","address","article","aside","b","bdi","bdo","cite","code","command","dd","dfn","dt","em","figcaption","figure","footer","header","i","kbd","mark","nav","noscript","rp","rt","ruby","s","samp","section","small","strong","sub","summary","sup","u","var","wbr"],HTMLEmbedElement:["embed"],HTMLFieldSetElement:["fieldset"],HTMLFontElement:["font"],HTMLFormElement:["form"],HTMLFrameElement:["frame"],HTMLFrameSetElement:["frameset"],HTMLHRElement:["hr"],HTMLHeadElement:["head"],HTMLHeadingElement:["h1","h2","h3","h4","h5","h6"],HTMLHtmlElement:["html"],HTMLIFrameElement:["iframe"],HTMLImageElement:["img"],HTMLInputElement:["input"],HTMLKeygenElement:["keygen"],HTMLLIElement:["li"],HTMLLabelElement:["label"],HTMLLegendElement:["legend"],HTMLLinkElement:["link"],HTMLMapElement:["map"],HTMLMarqueeElement:["marquee"],HTMLMediaElement:["media"],HTMLMenuElement:["menu"],HTMLMenuItemElement:["menuitem"],HTMLMetaElement:["meta"],HTMLMeterElement:["meter"],HTMLModElement:["del","ins"],HTMLOListElement:["ol"],HTMLObjectElement:["object"],HTMLOptGroupElement:["optgroup"],HTMLOptionElement:["option"],HTMLOutputElement:["output"],HTMLParagraphElement:["p"],HTMLParamElement:["param"],HTMLPictureElement:["picture"],HTMLPreElement:["pre"],HTMLProgressElement:["progress"],HTMLQuoteElement:["blockquote","q","quote"],HTMLScriptElement:["script"],HTMLSelectElement:["select"],HTMLShadowElement:["shadow"],HTMLSlotElement:["slot"],HTMLSourceElement:["source"],HTMLSpanElement:["span"],HTMLStyleElement:["style"],HTMLTableCaptionElement:["caption"],HTMLTableCellElement:["td","th"],HTMLTableColElement:["col","colgroup"],HTMLTableElement:["table"],HTMLTableRowElement:["tr"],HTMLTableSectionElement:["thead","tbody","tfoot"],HTMLTemplateElement:["template"],HTMLTextAreaElement:["textarea"],HTMLTimeElement:["time"],HTMLTitleElement:["title"],HTMLTrackElement:["track"],HTMLUListElement:["ul"],HTMLUnknownElement:["unknown","vhgroupv","vkeygen"],HTMLVideoElement:["video"]},nodes:{Attr:["node"],Audio:["audio"],CDATASection:["node"],CharacterData:["node"],Comment:["#comment"],Document:["#document"],DocumentFragment:["#document-fragment"],DocumentType:["node"],HTMLDocument:["#document"],Image:["img"],Option:["option"],ProcessingInstruction:["node"],ShadowRoot:["#shadow-root"],Text:["#text"],XMLDocument:["xml"]}});typeof t!="object"&&(t={type:t||"auto"});var s="registerElement",o="__"+s+(e.Math.random()*1e5>>0),u="addEventListener",a="attached",f="Callback",l="detached",c="extends",h="attributeChanged"+f,p=a+f,d="connected"+f,v="disconnected"+f,m="created"+f,g=l+f,y="ADDITION",b="MODIFICATION",w="REMOVAL",E="DOMAttrModified",S="DOMContentLoaded",x="DOMSubtreeModified",T="<",N="=",C=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,k=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],L=[],A=[],O="",M=n.documentElement,_=L.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},D=r.prototype,P=D.hasOwnProperty,H=D.isPrototypeOf,B=r.defineProperty,j=[],F=r.getOwnPropertyDescriptor,I=r.getOwnPropertyNames,q=r.getPrototypeOf,R=r.setPrototypeOf,U=!!r.__proto__,z=!1,W="__dreCEv1",X=e.customElements,V=!/^force/.test(t.type)&&!!(X&&X.define&&X.get&&X.whenDefined),$=r.create||r,J=e.Map||function(){var t=[],n=[],r;return{get:function(e){return n[_.call(t,e)]},set:function(e,i){r=_.call(t,e),r<0?n[t.push(e)-1]=i:n[r]=i}}},K=e.Promise||function(e){function i(e){n=!0;while(t.length)t.shift()(e)}var t=[],n=!1,r={"catch":function(){return r},then:function(e){return t.push(e),n&&setTimeout(i,1),r}};return e(i),r},Q=!1,G=$(null),Y=$(null),Z=new J,et=function(e){return e.toLowerCase()},tt=r.create||function sn(e){return e?(sn.prototype=e,new sn):this},nt=R||(U?function(e,t){return e.__proto__=t,e}:I&&F?function(){function e(e,t){for(var n,r=I(t),i=0,s=r.length;i<s;i++)n=r[i],P.call(e,n)||B(e,n,F(t,n))}return function(t,n){do e(t,n);while((n=q(n))&&!H.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),rt=e.MutationObserver||e.WebKitMutationObserver,it=(e.HTMLElement||e.Element||e.Node).prototype,st=!H.call(it,M),ot=st?function(e,t,n){return e[t]=n.value,e}:B,ut=st?function(e){return e.nodeType===1}:function(e){return H.call(it,e)},at=st&&[],ft=it.attachShadow,lt=it.cloneNode,ct=it.dispatchEvent,ht=it.getAttribute,pt=it.hasAttribute,dt=it.removeAttribute,vt=it.setAttribute,mt=n.createElement,gt=mt,yt=rt&&{attributes:!0,characterData:!0,attributeOldValue:!0},bt=rt||function(e){Nt=!1,M.removeEventListener(E,bt)},wt,Et=0,St=s in n&&!/^force-all/.test(t.type),xt=!0,Tt=!1,Nt=!0,Ct=!0,kt=!0,Lt,At,Ot,Mt,_t,Dt,Pt;St||(R||U?(Dt=function(e,t){H.call(t,e)||Xt(e,t)},Pt=Xt):(Dt=function(e,t){e[o]||(e[o]=r(!0),Xt(e,t))},Pt=Dt),st?(Nt=!1,function(){var e=F(it,u),t=e.value,n=function(e){var t=new CustomEvent(E,{bubbles:!0});t.attrName=e,t.prevValue=ht.call(this,e),t.newValue=null,t[w]=t.attrChange=2,dt.call(this,e),ct.call(this,t)},r=function(e,t){var n=pt.call(this,e),r=n&&ht.call(this,e),i=new CustomEvent(E,{bubbles:!0});vt.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[b]=i.attrChange=1:i[y]=i.attrChange=0,ct.call(this,i)},i=function(e){var t=e.currentTarget,n=t[o],r=e.propertyName,i;n.hasOwnProperty(r)&&(n=n[r],i=new CustomEvent(E,{bubbles:!0}),i.attrName=n.name,i.prevValue=n.value||null,i.newValue=n.value=t[r]||null,i.prevValue==null?i[y]=i.attrChange=0:i[b]=i.attrChange=1,ct.call(t,i))};e.value=function(e,s,u){e===E&&this[h]&&this.setAttribute!==r&&(this[o]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",i)),t.call(this,e,s,u)},B(it,u,e)}()):rt||(M[u](E,bt),M.setAttribute(o,1),M.removeAttribute(o),Nt&&(Lt=function(e){var t=this,n,r,i;if(t===e.target){n=t[o],t[o]=r=Ot(t);for(i in r){if(!(i in n))return At(0,t,i,n[i],r[i],y);if(r[i]!==n[i])return At(1,t,i,n[i],r[i],b)}for(i in n)if(!(i in r))return At(2,t,i,n[i],r[i],w)}},At=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,Rt(o)},Ot=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),n[s]=function(t,r){p=t.toUpperCase(),xt&&(xt=!1,rt?(Mt=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new rt(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,kt&&s[h]&&i.attributeName!=="style"&&(o=ht.call(s,i.attributeName),o!==i.oldValue&&s[h](i.attributeName,i.oldValue,o)))})}(Ft(a),Ft(l)),_t=function(e){return Mt.observe(e,{childList:!0,subtree:!0}),e},_t(n),ft&&(it.attachShadow=function(){return _t(ft.apply(this,arguments))})):(wt=[],n[u]("DOMNodeInserted",Ut(a)),n[u]("DOMNodeRemoved",Ut(l))),n[u](S,zt),n[u]("readystatechange",zt),it.cloneNode=function(e){var t=lt.call(this,!!e),n=It(t);return-1<n&&Pt(t,A[n]),e&&O.length&&jt(t.querySelectorAll(O)),t});if(Tt)return Tt=!1;-2<_.call(L,N+p)+_.call(L,T+p)&&$t(t);if(!C.test(p)||-1<_.call(k,p))throw new Error("The type "+t+" is invalid");var i=function(){return o?n.createElement(f,p):n.createElement(f)},s=r||D,o=P.call(s,c),f=o?r[c].toUpperCase():p,p,d;return o&&-1<_.call(L,T+f)&&$t(f),d=L.push((o?N:T)+p)-1,O=O.concat(O.length?",":"",o?f+'[is="'+t.toLowerCase()+'"]':f),i.prototype=A[d]=P.call(s,"prototype")?s.prototype:tt(it),O.length&&Bt(n.querySelectorAll(O),a),i},n.createElement=gt=function(e,t){var r=Yt(t),i=r?mt.call(n,e,et(r)):mt.call(n,e),s=""+e,o=_.call(L,(r?N:T)+(r||s).toUpperCase()),u=-1<o;return r&&(i.setAttribute("is",r=r.toLowerCase()),u&&(u=qt(s.toUpperCase(),r))),kt=!n.createElement.innerHTMLHelper,u&&Pt(i,A[o]),i}),Kt.prototype={constructor:Kt,define:V?function(e,t,n){if(n)Qt(e,t,n);else{var r=e.toUpperCase();G[r]={constructor:t,create:[r]},Z.set(t,r),X.define(e,t)}}:Qt,get:V?function(e){return X.get(e)||Gt(e)}:Gt,whenDefined:V?function(e){return K.race([X.whenDefined(e),en(e)])}:en};if(!X||/^force/.test(t.type))tn();else if(!t.noBuiltIn)try{(function(t,r,i){r[c]="a",t.prototype=tt(HTMLAnchorElement.prototype),t.prototype.constructor=t,e.customElements.define(i,t,r);if(ht.call(n.createElement("a",{is:i}),"is")!==i||V&&ht.call(new t,"is")!==i)throw r})(function on(){return Reflect.construct(HTMLAnchorElement,[],on)},{},"document-register-element-a")}catch(nn){tn()}if(!t.noBuiltIn)try{mt.call(n,"a","a")}catch(rn){et=function(e){return{is:e.toLowerCase()}}}})(window);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Collector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_simple_element_resize_detector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_simple_element_resize_detector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_simple_element_resize_detector__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__collector_generateUUID__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__collector_numberPadding__ = __webpack_require__(1);







var Collector = function () {

    this.initialized = false;

    var fileExtension = 'wakkle';
    var metaSelector = 'WAKKLE-dataset';

    var regexp = new RegExp('.*?\.' + fileExtension, 'i');
    var images = document.querySelectorAll('img'),
        image,
        wakkle,
        path;

    var components = [];

    this.init = function () {

        document.registerElement('wakkle-image');
        //document.registerElement( 'wakkle-markup' );
        document.registerElement('wakkle-sound');

        for (var i = 0; i < images.length; i++) {

            image = images[i];

            if (!image.hasAttribute('src')) continue;
            if (!regexp.test(image.src)) continue;

            wakkle = image;

            path = wakkle.currentSrc || wakkle.src;
            path = path.replace('.jpg', '');
            path = path.replace('.wakkle', '');
            path = path + '/';

            wakkle.id = wakkle.id || Object(__WEBPACK_IMPORTED_MODULE_1__collector_generateUUID__["a" /* generateUUID */])(); // making sure the wakkle has an ID
            wakkle.sequence = getSequence(path);

            wakkle.wrapper = wakkle.parentElement.nodeName.toLowerCase() == 'wakkle-image' ? wakkle.parentElement : wrap(wakkle);
            wakkle.wrapper.id = wakkle.id;

            wakkle.wrapper.style.position = getCSSValue('position', wakkle.wrapper) == 'static' ? 'relative' : wakkle.wrapper.position;
            wakkle.wrapper.style.display = 'block';
            wakkle.wrapper.style.overflow = 'hidden';
            wakkle.wrapper.style.height = wakkle.naturalHeight * (wakkle.clientWidth / wakkle.naturalWidth) + 'px';

            __WEBPACK_IMPORTED_MODULE_0_simple_element_resize_detector___default()(wakkle.wrapper, function () {
                wakkle.wrapper.style.height = wakkle.naturalHeight * (wakkle.clientWidth / wakkle.naturalWidth) + 'px';
            });

            for (var i = 0; i < wakkle.wrapper.children.length; i++) {
                wakkle.wrapper.children[i].style.position = 'absolute';
            }

            wakkle.markup = wakkle.wrapper.querySelectorAll('wakkle-markup');
            wakkle.sound = {};
            wakkle.meta = {};

            loadJSON(path + 'meta.json', function (json) {

                wakkle.sound.Source = json[metaSelector].Sound ? path + json[metaSelector].Sound : wakkle.parentElement.querySelector('wakkle-sound').getAttribute('source') || '';

                wakkle.meta.FOV = json[metaSelector].FOV || wakkle.getAttribute('fov') || console.error('FOV is not defined.');
                wakkle.meta.Arc = json[metaSelector].Arc || wakkle.getAttribute('arc') || console.error('Arc is not defined.');
                wakkle.meta.ArcShift = json[metaSelector].ArcShift || wakkle.getAttribute('arc-shift') || 0;
                wakkle.meta.OriginX = json[metaSelector].OriginX || wakkle.getAttribute('origin-x') || 0;
                wakkle.meta.OriginY = json[metaSelector].OriginY || wakkle.getAttribute('origin-y') || 0;
            });

            components.push(wakkle);
        }

        this.initialized = true;
    };

    this.collect = function () {
        return components;
    };
};

function loadJSON(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (callback) callback(data);
            }
        }
    };
    xhr.open('GET', path, false); // make synchronous XMLHttpRequest in order receive value outside of the callback function
    xhr.send();
}

function getSequence(path) {

    var xhr,
        sequence = {};

    (function () {

        findNaming();
        findLength();

        sequence.path = path;
    })();

    return sequence;

    function findNaming() {

        var testNumber = 1,
            testPaddings = [2, 1, 3],
            // e.g 01, 1 or 001
        testExtensions = ['jpg', 'png', 'gif', 'jpeg'],
            e404 = false,
            found = false;

        for (var i = 0; i <= testPaddings.length; i++) {

            for (var j = 0; j < testExtensions.length; j++) {

                xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            // found

                            found = true;
                            sequence.padding = testPaddings[i];
                            sequence.extension = testExtensions[j];

                            e404 ? console.log('⬆ Good. The sequence has ' + sequence.padding + ' digits and the file extension ".' + sequence.extension + '".') : '';
                        }
                        if (xhr.status === 404) e404 = true;
                    }
                };

                xhr.open('HEAD', path + Object(__WEBPACK_IMPORTED_MODULE_2__collector_numberPadding__["a" /* pad */])(testNumber, testPaddings[i]) + '.' + testExtensions[j], false);
                xhr.send();

                if (found) break;
            }

            if (found) break;
        }
    }

    function findLength() {

        var maxLength = 60,
            found = false;

        if (sequence.padding == null && sequence.extension == null) return;

        sequence.images = [];

        for (var i = 0; i <= maxLength; i++) {

            var testImage = Object(__WEBPACK_IMPORTED_MODULE_2__collector_numberPadding__["a" /* pad */])(i + 1, sequence.padding) + '.' + sequence.extension;
            xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {

                    if (xhr.status === 200) {
                        // length not found

                        sequence.images.push(path + testImage);
                    }
                    if (xhr.status === 404) {
                        // length found

                        console.log('⬆ Good. ' + Object(__WEBPACK_IMPORTED_MODULE_2__collector_numberPadding__["a" /* pad */])(i, sequence.padding) + '.' + sequence.extension + ' is the last image in sequence.');
                        sequence.length = i;
                        found = true;
                    }
                }
            };

            xhr.open('HEAD', path + testImage, false);
            xhr.send();

            if (found) break;
        }
    }
}

function wrap(element) {

    var wrapper = document.createElement('wakkle-image');

    if (element.hasAttributes()) cloneAttributes(element, wrapper);

    element.parentNode.insertBefore(wrapper, element); // insert wrapper
    wrapper.appendChild(element); // move element into wrapper
    wrapper.removeAttribute('src');
    wrapper.removeAttribute('srcset');

    return wrapper;
}

function cloneAttributes(transmitter, receiver) {
    for (var i = 0; i < transmitter.attributes.length; i++) {
        var attribute = transmitter.attributes[i];
        receiver.setAttribute(attribute.name, attribute.value);
    }
}

function getCSSValue(property, element) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"display: none;\"><symbol id=\"icon-minimap\" viewBox=\"0 0 128 128\"><path d=\"M64,119 C68.418278,119 72,115.418278 72,111 C72,106.581722 68.418278,103 64,103 C59.581722,103 56,106.581722 56,111 C56,115.418278 59.581722,119 64,119 Z M78.938273,109.629971 C98.1338706,103.349696 112,85.2941521 112,64 C112,37.490332 90.509668,16 64,16 C37.490332,16 16,37.490332 16,64 C16,85.2941521 29.8661294,103.349696 49.061727,109.629971 C49.020873,110.081177 49,110.538151 49,111 C49,113.250695 49.4956988,115.385613 50.3838779,117.301537 C26.5941039,111.242637 9,89.6759799 9,64 C9,33.6243388 33.6243388,9 64,9 C94.3756612,9 119,33.6243388 119,64 C119,89.6759799 101.405896,111.242637 77.6161221,117.301537 C78.5043012,115.385613 79,113.250695 79,111 C79,110.538151 78.979127,110.081177 78.938273,109.629971 Z M76.7803962,103.143494 C74.1399332,98.8573181 69.4036478,96 64,96 C58.5364566,96 53.755152,98.9210119 51.1325752,103.286547 L33.2838959,92.942773 C39.5772353,82.1855522 50.9652037,75 63.968806,75 C76.8890191,75 88.2142533,82.0936892 94.5320152,92.7362639 L76.7803962,103.143494 Z\"></path></symbol><symbol id=\"icon-minimap-center\" viewBox=\"0 0 128 128\"><polygon points=\"62 55 62 48 69 48 69 55 76 55 65 70 54 55\"></polygon></symbol><symbol id=\"icon-fullscreen-on\" viewBox=\"0 0 128 128\"><path d=\"M23,16.5 L105,16.5 C108.589851,16.5 111.5,19.4101491 111.5,23 L111.5,105 C111.5,108.589851 108.589851,111.5 105,111.5 L23,111.5 C19.4101491,111.5 16.5,108.589851 16.5,105 L16.5,23 C16.5,19.4101491 19.4101491,16.5 23,16.5 Z M35.0502525,40.2928932 L29.3933983,45.9497475 L47.7781746,48.7781746 L44.9497475,30.3933983 L40,35.3431458 L35.0502525,30.3933983 L30.1005051,35.3431458 L35.0502525,40.2928932 Z M92.9497475,40.2928932 L97.8994949,35.3431458 L92.9497475,30.3933983 L88,35.3431458 L83.0502525,30.3933983 L80.2218254,48.7781746 L98.6066017,45.9497475 L92.9497475,40.2928932 Z M35.0502525,88.7071068 L30.1005051,93.6568542 L35.0502525,98.6066017 L40,93.6568542 L44.9497475,98.6066017 L47.7781746,80.2218254 L29.3933983,83.0502525 L35.0502525,88.7071068 Z M97.8994949,93.6568542 L92.9497475,88.7071068 L98.6066017,83.0502525 L80.2218254,80.2218254 L83.0502525,98.6066017 L88,93.6568542 L92.9497475,98.6066017 L97.8994949,93.6568542 Z\"></path></symbol><symbol id=\"icon-fullscreen-off\" viewBox=\"0 0 128 128\"><path d=\"M32.9497475,26.7071068 L37.8994949,31.6568542 L32.9497475,36.6066017 L28,31.6568542 L23.0502525,36.6066017 L20.2218254,18.2218254 L38.6066017,21.0502525 L32.9497475,26.7071068 Z M95.0502525,26.7071068 L89.3933983,21.0502525 L107.778175,18.2218254 L104.949747,36.6066017 L100,31.6568542 L95.0502525,36.6066017 L90.1005051,31.6568542 L95.0502525,26.7071068 Z M32.9497475,101.292893 L38.6066017,106.949747 L20.2218254,109.778175 L23.0502525,91.3933983 L28,96.3431458 L32.9497475,91.3933983 L37.8994949,96.3431458 L32.9497475,101.292893 Z M90.1005051,96.3431458 L95.0502525,91.3933983 L100,96.3431458 L104.949747,91.3933983 L107.778175,109.778175 L89.3933983,106.949747 L95.0502525,101.292893 L90.1005051,96.3431458 Z M47,40.5 L81,40.5 C84.5898509,40.5 87.5,43.4101491 87.5,47 L87.5,81 C87.5,84.5898509 84.5898509,87.5 81,87.5 L47,87.5 C43.4101491,87.5 40.5,84.5898509 40.5,81 L40.5,47 C40.5,43.4101491 43.4101491,40.5 47,40.5 Z\"></path></symbol><symbol id=\"icon-sound\" viewBox=\"0 0 128 128\"><path d=\"M42.1276596,46.6498376 L64.2204123,32.705555 C65.3713245,31.9791337 66.8932039,32.3232516 67.6196252,33.4741638 C67.8681172,33.8678645 68,34.3239033 68,34.7894659 L68,93.2111298 C68,94.5721172 66.8967017,95.6754155 65.5357143,95.6754155 C65.0701517,95.6754155 64.6141129,95.5435328 64.2204123,95.2950407 L42.1276596,81.3507581 L32.4642857,81.3507581 C31.1032983,81.3507581 30,80.2474598 30,78.8864724 L30,49.1141233 C30,47.7531358 31.1032983,46.6498376 32.4642857,46.6498376 L42.1276596,46.6498376 Z M74.5,79.5 L74.5,72.5 C79.4705627,72.5 83.5,68.4705627 83.5,63.5 C83.5,58.5294373 79.4705627,54.5 74.5,54.5 L74.5,47.5 C83.336556,47.5 90.5,54.663444 90.5,63.5 C90.5,72.336556 83.336556,79.5 74.5,79.5 Z M74.25,91 L74.25,84 C85.5718374,84 94.75,74.8218374 94.75,63.5 C94.75,52.1781626 85.5718374,43 74.25,43 L74.25,36 C89.4378306,36 101.75,48.3121694 101.75,63.5 C101.75,78.6878306 89.4378306,91 74.25,91 Z\"></path></symbol><symbol id=\"icon-sound-off\" viewBox=\"0 0 128 128\"><path d=\"M42.1276596,46.6498376 L64.2204123,32.705555 C65.3713245,31.9791337 66.8932039,32.3232516 67.6196252,33.4741638 C67.8681172,33.8678645 68,34.3239033 68,34.7894659 L68,93.2111298 C68,94.5721172 66.8967017,95.6754155 65.5357143,95.6754155 C65.0701517,95.6754155 64.6141129,95.5435328 64.2204123,95.2950407 L42.1276596,81.3507581 L32.4642857,81.3507581 C31.1032983,81.3507581 30,80.2474598 30,78.8864724 L30,49.1141233 C30,47.7531358 31.1032983,46.6498376 32.4642857,46.6498376 L42.1276596,46.6498376 Z M93.7939452,64.8441978 L102.829936,73.8801885 L97.8801885,78.8299359 L88.8441978,69.7939452 L79.8082071,78.8299359 L74.8584596,73.8801885 L83.8944503,64.8441978 L74.8584596,55.8082071 L79.8082071,50.8584596 L88.8441978,59.8944503 L97.8801885,50.8584596 L102.829936,55.8082071 L93.7939452,64.8441978 Z\"></path></symbol><symbol id=\"icon-head-move\" viewBox=\"0 0 128 128\"><path d=\"M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z M97.8184019,84.5518468 C99.7627119,85.6864569 100.911622,87.8683995 101,90.1376197 L101,96.6834473 C101,98.5162791 99.4975787,100 97.6416465,100 L31.3583535,100 C29.5024213,100 28,98.5162791 28,96.6834473 L28,90.1376197 C28,87.8683995 29.1489104,85.6864569 31.0932203,84.5518468 C34.4515738,82.5444596 40.2845036,79.4024624 47.1779661,77.0459644 C52.4806295,85.5119015 60.2578692,86.821067 64.5883777,86.821067 C68.8305085,86.821067 76.6077482,85.5119015 81.9987893,77.1332421 C88.7154964,79.4897401 94.4600484,82.5444596 97.8184019,84.5518468 Z M64.5883777,34 C73.779661,34 81.2033898,41.5931601 81.2033898,50.9318741 C81.2033898,60.2705882 79.6125908,79.8207934 64.5883777,79.8207934 C49.5641646,79.8207934 47.9733656,60.3578659 47.9733656,50.9318741 C47.9733656,41.5931601 55.3970944,34 64.5883777,34 Z\"></path></symbol><symbol id=\"icon-head-move-off\" viewBox=\"0 0 128 128\"><path d=\"M48.0321681,54.0117193 C48.0315053,53.9946954 48.0308489,53.9776881 48.030199,53.9606976 L18.4450028,24.3755014 C17.0781678,23.0086663 17.0781678,20.7925889 18.4450028,19.4257539 C19.8118378,18.0589189 22.0279153,18.0589189 23.3947503,19.4257539 L49.0075598,45.0385634 C51.3539626,38.598022 57.4360007,34 64.5883777,34 C73.779661,34 81.2033898,41.5931601 81.2033898,50.9318741 C81.2033898,56.6476481 80.6074653,66.1887185 76.7003557,72.7313593 L81.6417849,77.6727885 C81.7618826,77.4962848 81.8809065,77.3164536 81.9987893,77.1332421 C88.7154964,79.4897401 94.4600484,82.5444596 97.8184019,84.5518468 C99.7627119,85.6864569 100.911622,87.8683995 101,90.1376197 L101,96.6834473 C101,96.7951854 100.994416,96.9056259 100.983508,97.0145118 L108.39475,104.425754 C109.761585,105.792589 109.761585,108.008666 108.39475,109.375501 C107.027915,110.742336 104.811838,110.742336 103.445003,109.375501 L94.0695015,100 L94.0223633,100 L76.8226322,82.8009867 C76.8317105,82.7941229 76.8407881,82.7872485 76.8498643,82.7803628 L71.9009856,77.8314841 C71.8911561,77.8376779 71.8813164,77.8438591 71.8714666,77.8500276 L48.0321683,54.0117241 Z M49.5627717,65.4417134 L63.9297438,79.808086 C55.4720557,79.4785757 51.445917,72.7895263 49.5627717,65.4417134 Z M70.1876221,86.0657032 L84.1225004,100 L31.3583535,100 C29.5024213,100 28,98.5162791 28,96.6834473 L28,90.1376197 C28,87.8683995 29.1489104,85.6864569 31.0932203,84.5518468 C34.4515738,82.5444596 40.2845036,79.4024624 47.1779661,77.0459644 C52.4806295,85.5119015 60.2578692,86.821067 64.5883777,86.821067 C66.0966298,86.821067 68.0517532,86.6555761 70.1876221,86.0657032 Z M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z\"></path></symbol><symbol id=\"icon-touch-drag\" viewBox=\"0 0 128 128\"><path d=\"M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z M69.9621104,41 C69.9872171,40.6699584 70,40.336472 70,40 C70,32.8202983 64.1797017,27 57,27 C49.8202983,27 44,32.8202983 44,40 C44,40.336472 44.0127829,40.6699584 44.0378896,41 L44,41 L44,56.4935277 C39.1274959,52.6478094 36,46.6891376 36,40 C36,28.4020203 45.4020203,19 57,19 C68.5979797,19 78,28.4020203 78,40 C78,46.6891376 74.8725041,52.6478094 70,56.4935277 L70,41 L69.9621104,41 Z M67.4731547,59.838568 C72.4657245,59.838568 81.3112267,63.9016571 84.0522381,65.1740497 C86.7932495,66.4464422 88.4693079,67.7651397 89.3061282,70.7492444 C90.1641333,73.8087525 90.2181704,76.9246778 89.5140005,81.4868684 C88.8397289,85.8552662 87.5399773,90.3324995 85.8345008,94.1628423 C84.0411418,98.1904517 82.176069,100.934534 80.071127,102.541102 L55.3563842,102.541102 C48.9980168,95.2004977 43.2817655,85.0041384 37.8828997,72.0768932 C37.0323926,69.8867179 36.8184493,68.3567515 37.146203,67.1630432 C37.3587217,66.3924205 38.9767188,62.6139658 43.1096634,63.6593236 C43.9100166,63.8617593 44.9921488,64.3615988 46.0166435,66.2170448 C46.7113512,67.4752186 49.0648117,71.4601689 50.2590044,73.4092291 C50.8067348,74.3031884 51.8774381,74.0032372 51.8774381,73.154561 L51.8774381,41.6787565 C51.8774381,38.8901771 54.2009475,36.5681818 56.9913022,36.5681818 C59.7816569,36.5681818 62.1051663,38.8901771 62.1051663,41.6787565 L62.1051663,61.7308962 C63.7805457,60.469344 65.5698752,59.838568 67.4731547,59.838568 Z\"></path></symbol><symbol id=\"icon-touch-drag-off\" viewBox=\"0 0 128 128\"><path d=\"M36.1019046,42.0819584 C36.1001047,42.0636704 36.0983283,42.0453756 36.0965754,42.0270739 L18.4450028,24.3755014 C17.0781678,23.0086663 17.0781678,20.7925889 18.4450028,19.4257539 C19.8118378,18.0589189 22.0279153,18.0589189 23.3947503,19.4257539 L37.1365273,33.1675309 C39.9715481,24.923791 47.7939863,19 57,19 C68.5979797,19 78,28.4020203 78,40 C78,46.6891376 74.8725041,52.6478094 70,56.4935277 L70,41 L69.9621104,41 C69.9872171,40.6699584 70,40.336472 70,40 C70,32.8202983 64.1797017,27 57,27 C49.8202983,27 44,32.8202983 44,40 C44,40.0103495 44.0000121,40.0206961 44.0000363,40.0310399 L51.8774381,47.9084417 L51.8774381,41.6787565 C51.8774381,38.8901771 54.2009475,36.5681818 56.9913022,36.5681818 C59.7816569,36.5681818 62.1051663,38.8901771 62.1051663,41.6787565 L62.1051663,58.1361699 L64.3958414,60.426845 C65.3861883,60.0346603 66.4119594,59.838568 67.4731547,59.838568 C72.4657245,59.838568 81.3112267,63.9016571 84.0522381,65.1740497 C86.7932495,66.4464422 88.4693079,67.7651397 89.3061282,70.7492444 C90.1641333,73.8087525 90.2181704,76.9246778 89.5140005,81.4868684 C89.3389802,82.6207712 89.1218173,83.7620069 88.8663552,84.8973588 L108.39475,104.425754 C109.761585,105.792589 109.761585,108.008666 108.39475,109.375501 C107.027915,110.742336 104.811838,110.742336 103.445003,109.375501 L86.5437453,92.4742439 C86.5392611,92.4855779 86.5347704,92.4969039 86.5302762,92.5082256 L51.8774381,57.8568335 L51.8774381,57.8079367 L44,49.9304985 L44,49.9797241 L36.1018778,42.0819315 Z M51.8774381,67.7562833 L83.1960026,99.0735409 C82.2038122,100.55335 81.1701652,101.702276 80.071127,102.541102 L55.3563842,102.541102 C48.9980168,95.2004977 43.2817655,85.0041384 37.8828997,72.0768932 C37.0323926,69.8867179 36.8184493,68.3567515 37.146203,67.1630432 C37.3587217,66.3924205 38.9767188,62.6139658 43.1096634,63.6593236 C43.9100166,63.8617593 44.9921488,64.3615988 46.0166435,66.2170448 C46.7113512,67.4752186 49.0648117,71.4601689 50.2590044,73.4092291 C50.8067348,74.3031884 51.8774381,74.0032372 51.8774381,73.154561 L51.8774381,67.7562833 Z M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z\"></path></symbol><symbol id=\"icon-mouse-drag\" viewBox=\"0 0 128 128\"><path d=\"M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z M68.4731547,51.2723125 C73.4657245,51.2723125 82.3112267,55.337795 85.0522381,56.6109371 C87.7932495,57.8840791 89.4693079,59.2035534 90.3061282,62.1894158 C91.1641333,65.2507261 91.2181704,70.3684867 90.5140005,74.9333647 C89.8397289,79.3043356 88.5399773,83.7842062 86.8345008,87.6168052 C85.0411418,91.6467871 83.176069,94.3924861 81.071127,96 L56.3563842,96 C49.9980168,88.6550718 44.2817655,78.4527065 38.8828997,65.5178466 C38.0323926,63.3263812 37.8184493,61.7955136 38.146203,60.6011021 C38.3587217,59.8300255 39.9767188,56.0493452 44.1096634,57.0953188 C44.9100166,57.2978737 45.9921488,57.7980076 47.0166435,59.6545465 C47.7113512,60.9134615 50.0648117,64.9007591 51.2590044,66.8509673 C51.8067348,67.7454532 52.8774381,67.4453253 52.8774381,66.5961492 L52.8774381,53.1135851 C52.8774381,50.323363 55.0008843,48 58.9913022,48 C62.9817202,48 64.5,51.2723125 68.4731547,51.2723125 Z\"></path></symbol><symbol id=\"icon-mouse-drag-off\" viewBox=\"0 0 128 128\"><path d=\"M52.8774381,58.8567918 L52.8774381,58.8079367 L18.4450028,24.3755014 C17.0781678,23.0086663 17.0781678,20.7925889 18.4450028,19.4257539 C19.8118378,18.0589189 22.0279153,18.0589189 23.3947503,19.4257539 L53.9682086,49.9992122 C54.9748711,48.7888303 56.6661487,48 58.9913022,48 C62.9817202,48 64.5,51.2723125 68.4731547,51.2723125 C73.4657245,51.2723125 82.3112267,55.337795 85.0522381,56.6109371 C87.7932495,57.8840791 89.4693079,59.2035534 90.3061282,62.1894158 C91.1641333,65.2507261 91.2181704,70.3684867 90.5140005,74.9333647 C90.0310923,78.0638208 89.2273557,81.2501351 88.1835194,84.2145221 L108.39475,104.425754 C109.761585,105.792589 109.761585,108.008666 108.39475,109.375501 C107.027915,110.742336 104.811838,110.742336 103.445003,109.375501 L85.1145339,91.0450325 C85.1087592,91.0551054 85.1029833,91.0651664 85.0972061,91.0752153 L52.8774381,58.8567918 Z M41.2753142,57.1546018 L80.1223335,96 L56.3563842,96 C49.9980168,88.6550718 44.2817655,78.4527065 38.8828997,65.5178466 C38.0323926,63.3263812 37.8184493,61.7955136 38.146203,60.6011021 C38.3009729,60.0395541 39.2011659,57.8818035 41.2753142,57.1546018 Z M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z\"></path></symbol><symbol id=\"icon-device-orientation\" viewBox=\"0 0 128 128\"><path d=\"M101,84 L94,84 L94,77 L101,77 L101,69 L116,80 L101,91 L101,84 Z M27,43 L34,43 L34,50 L27,50 L27,57 L12,46 L27,35 L27,43 Z M66.8407542,33.7409949 L87.860469,45.8767329 C90.2519321,47.2574448 91.0713079,50.3153968 89.690596,52.7068599 L66.2608489,93.2883724 C64.880137,95.6798355 61.822185,96.4992113 59.4307218,95.1184994 L38.411007,82.9827614 C36.0195439,81.6020495 35.2001681,78.5440975 36.58088,76.1526344 L60.0106272,35.5711219 C61.391339,33.1796588 64.4492911,32.360283 66.8407542,33.7409949 Z\"></path></symbol><symbol id=\"icon-device-orientation-off\" viewBox=\"0 0 128 128\"><path d=\"M48.8764909,54.8560116 L48.8944343,54.8249328 L18.4450028,24.3755014 C17.0781678,23.0086663 17.0781678,20.7925889 18.4450028,19.4257539 C19.8118378,18.0589189 22.0279153,18.0589189 23.3947503,19.4257539 L52.5179009,48.5489045 L60.0106272,35.5711219 C61.391339,33.1796588 64.4492911,32.360283 66.8407542,33.7409949 L87.860469,45.8767329 C90.2519321,47.2574448 91.0713079,50.3153968 89.690596,52.7068599 L77.6063626,73.6373662 L108.39475,104.425754 C109.761585,105.792589 109.761585,108.008666 108.39475,109.375501 C107.027915,110.742336 104.811838,110.742336 103.445003,109.375501 L73.982896,79.9133945 L73.9653358,79.9438095 L48.8764909,54.8560116 Z M45.2529855,61.1321071 L70.3418304,86.2199051 L66.2608489,93.2883724 C64.880137,95.6798355 61.822185,96.4992113 59.4307218,95.1184994 L38.411007,82.9827614 C36.0195439,81.6020495 35.2001681,78.5440975 36.58088,76.1526344 L45.2529855,61.1321071 Z M27.1201217,43 L34,49.8795912 L34,50 L27,50 L27,57 L12,46 L22.453804,38.333877 L27,42.8798833 L27,43 L27.1201217,43 Z M101,84 L94,84 L94,77 L101,77 L101,69 L116,80 L101,91 L101,84 Z\"></path></symbol><symbol id=\"icon-mouse-move\" viewBox=\"0 0 128 128\"><path d=\"M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z M75.8857143,78.9539995 L81.4581429,92.5337243 C82.2561429,94.4945781 81.8625714,96.823769 80.2692857,98.4135772 C78.1494286,100.528808 74.7131429,100.528808 72.5932857,98.4135772 C72.064,97.8881551 71.6704286,97.2814821 71.3962857,96.6125168 L65.9052857,83.2223773 L52,89.1672309 L52,35 L90,72.9170616 L75.8857143,78.9539995 Z\"></path></symbol><symbol id=\"icon-mouse-move-off\" viewBox=\"0 0 128 128\"><path d=\"M77.9108548,83.8891638 L52,57.9793903 L52,57.9304985 L18.4450028,24.3755014 C17.0781678,23.0086663 17.0781678,20.7925889 18.4450028,19.4257539 C19.8118378,18.0589189 22.0279153,18.0589189 23.3947503,19.4257539 L52,48.0310036 L52,35 L90,72.9170616 L80.8147551,76.8457587 L108.39475,104.425754 C109.761585,105.792589 109.761585,108.008666 108.39475,109.375501 C107.027915,110.742336 104.811838,110.742336 103.445003,109.375501 L77.8775825,83.8080811 L77.9108548,83.8891638 Z M81.2335075,97.1111276 C80.9858155,97.5794927 80.6644496,98.0192758 80.2692857,98.4135772 C78.1494286,100.528808 74.7131429,100.528808 72.5932857,98.4135772 C72.064,97.8881551 71.6704286,97.2814821 71.3962857,96.6125168 L65.9052857,83.2223773 L52,89.1672309 L52,67.8788401 L81.2335075,97.1111276 Z M101,62 L94,62 L94,55 L101,55 L101,47 L116,58 L101,69 L101,62 Z M27,55 L34,55 L34,62 L27,62 L27,69 L12,58 L27,47 L27,55 Z\"></path></symbol></svg>"

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Controller; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UI__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controller_loadScript_js__ = __webpack_require__(9);




var Controller = function (wakkle) {

    this.initialized = false;
    this.q = 0.5;

    var trackers = [],
        UI = wakkle.ui.controllers;

    var that = this;

    var htracker, videoInput, canvasInput, debugCanvas, camFov;

    var active,
        history,
        pointerDownX,
        pointerDownY,
        pointerDown,
        pointerMoveX,
        dX = 0,
        easing = 0.05,
        q = 0.5;

    var updater,
        components = [],
        component;

    this.init = function () {

        if (UI && hasWebcam()) {
            trackers.push(__WEBPACK_IMPORTED_MODULE_0__UI__["c" /* head_move */]);
        }
        if (UI && hasMouse() && !hasTouch()) {
            trackers.push(__WEBPACK_IMPORTED_MODULE_0__UI__["f" /* mouse_move */]);
            trackers.push(__WEBPACK_IMPORTED_MODULE_0__UI__["e" /* mouse_drag */]);
        }
        if (UI && hasTouch()) {
            trackers.push(__WEBPACK_IMPORTED_MODULE_0__UI__["h" /* touch_drag */]);
        }
        if (UI && hasDeviceOrientation()) {
            // trackers.push( button.device_orientation );
            trackers.push(__WEBPACK_IMPORTED_MODULE_0__UI__["b" /* device_orientation_drag */]);
        }

        if (UI) this.UI.init();
        if (hasMouse() && !hasTouch()) this.setActive('mouse_move');
        if (hasDeviceOrientation()) this.setActive('device_orientation_drag');

        this.initialized = true;

        update();
    };

    this.connect = function (obj) {
        components.push(obj);
    };

    this.setActive = function (tracker) {
        set(tracker);
        that.UI.set(tracker);
    };

    this.getActive = function () {
        return active;
    };

    this.icons = __WEBPACK_IMPORTED_MODULE_0__UI__["d" /* icons */];

    this.UI = {

        init: function () {

            var ul = document.createElement('ul'),
                li,
                tracker;

            for (var i = 0; i < trackers.length; i++) {

                tracker = trackers[i];

                li = document.createElement('li');
                li.className = __WEBPACK_IMPORTED_MODULE_0__UI__["g" /* pref */] + 'controller-button ' + tracker.name;
                li.style.width = '2em';
                li.style.height = '2em';
                li.style.cursor = 'pointer';
                li.dataset.tracker = tracker.name;

                li.appendChild(that.icons.use(tracker.icon.selector));

                li.addEventListener('click', function (e) {
                    that.setActive(this.dataset.tracker);
                }, false);

                ul.className = __WEBPACK_IMPORTED_MODULE_0__UI__["g" /* pref */] + 'controller-buttons ';
                ul.appendChild(li);
            }

            ul.style.position = 'absolute';
            wakkle.ui.wrapper.appendChild(ul);
        },
        set: function (tracker) {

            if (!UI) return;

            var controllerButtons = wakkle.ui.wrapper.querySelectorAll('.' + __WEBPACK_IMPORTED_MODULE_0__UI__["g" /* pref */] + 'controller-button');

            controllerButtons.forEach(function (item, index) {
                item.classList.remove('active');

                var icon = item.querySelector('use');
                var href = icon.getAttribute('xlink:href').replace('-off', '');

                icon.setAttribute('xlink:href', href + '-off');
            });

            var item = wakkle.ui.wrapper.querySelector('[data-tracker=' + tracker + ']');
            var icon = item.querySelector('use');
            var href = icon.getAttribute('xlink:href').replace('-off', '');

            item.classList.add('active');
            icon.setAttribute('xlink:href', href);
        }
    };

    function update() {
        // TODO: performance optimisation -> delay in dependence of distance between last and current mouse position 
        // look up: ease to value in certain speed
        // Introduction to Easing in JavaScript https://www.kirupa.com/html5/introduction_to_easing_in_javascript.htm
        // TODO: visibilityState within viewport
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            that.q += (q - that.q) * easing;
            component.q = that.q;
            component.update();
        }
    }

    function pointerOverElement(e, rect) {
        var pageX = e.pageX || e.changedTouches[0].pageX,
            pageY = e.pageY || e.changedTouches[0].pageY;
        return pageX >= rect.left && pageX <= rect.right && pageY >= rect.top && pageY <= rect.bottom;
    }

    function mouseHandler(e) {

        var rect = wakkle.wrapper.getBoundingClientRect();
        if (!pointerOverElement(e, rect)) return;

        q = (e.pageX - rect.left) / rect.width;
        update();
    }

    function dragStart(e) {
        pointerDown = 1;
        pointerDownX = e.pageX || e.changedTouches[0].pageX;
    }

    function dragEnd(e) {
        pointerDown = 0;
        pointerMoveX = 0;
    }

    function dragHandler(e) {

        var rect = wakkle.wrapper.getBoundingClientRect();
        if (!pointerDown || !pointerOverElement(e, rect)) return;

        e.preventDefault();

        var pageX = e.pageX || e.changedTouches[0].pageX;

        var _dX = pageX - (pointerMoveX || pointerDownX);

        pointerMoveX = pageX;
        if (dX > 0 && _dX < 0 || dX < 0 && _dX > 0) {
            pointerDownX = pointerMoveX;
        }

        dX = _dX;
        var dQ = dX / rect.width;
        dQ = -dQ;

        q = 1 - q;
        q = q + dQ;
        q = q > 1 ? 1 : q;
        q = q < 0 ? 0 : q;
        q = 1 - q;

        update();
    }

    function deviceOrientationHandler(e) {

        if (pointerDown) return;

        var orientation, angle;

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
        angle = angle > 45 ? 45 : angle;

        q = 1 - (angle + 45) * (1 / 90);
        q = q < 0 ? 0 : q;
        q = q > 1 ? 1 : q;

        update();
    }

    var headtrackingDialogVisibility;

    function headtrackingStatus(e) {
        if (e.status == "found") {
            removeHeadtrackingDialog();
        }
    }

    function removeHeadtrackingDialog() {
        var headtrackingDialog = document.querySelector('.dialog-container');
        if (headtrackingDialog.style.opacity == '0') {
            setTimeout(function () {
                headtrackingDialog.remove();
            }, 300); // wait for fadeOut and remove
            cancelAnimationFrame(headtrackingDialogVisibility);
        } else {
            headtrackingDialogVisibility = requestAnimationFrame(removeHeadtrackingDialog);
        }
    }

    function head_moveHandler(e) {
        camFov = Math.floor(htracker.getFOV()) / 2;
        q = e.x / camFov + 0.5 - 1;
        q = q * 0.1;
        q = q >= 1 ? 1 : q;
        q = q <= 0 ? 0 : q;
        update();
    }

    function facetrackHandler(e) {
        camFov = Math.floor(htracker.getFOV()) / 2;
        q = e.x / camFov + 0.5 - 1;
        q = q * 0.1;
        q = q >= 1 ? 1 : q;
        q = q <= 0 ? 0 : q;
        update();
    }

    function set(mode) {
        unsetHeadtrackr();
        unsetMousemove();
        unsetMousedrag();
        unsetTouchdrag();
        unsetDeviceorientation();

        switch (mode) {

            case 'mouse_move':
                setMousemove();
                break;

            case 'mouse_drag':
                setMousedrag();
                break;

            case 'head_move':
                setHeadtrackr();
                break;

            case 'device_orientation':
                setDeviceorientation();
                break;

            case 'touch_drag':
                setTouchdrag();
                break;

            case 'device_orientation_drag':
                setDeviceOrientationDrag();
                break;
        }
    }

    function setMousemove() {
        document.addEventListener('mousemove', mouseHandler, false);
    }

    function unsetMousemove() {
        document.removeEventListener('mousemove', mouseHandler, false);
    }

    function setDeviceorientation() {
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
    }

    function unsetDeviceorientation() {
        window.removeEventListener('deviceorientation', deviceOrientationHandler, false);
    }

    function setMousedrag() {
        wakkle.wrapper.classList.add('grabbable');
        document.addEventListener('mousedown', dragStart);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('mousemove', dragHandler);
    }

    function unsetMousedrag(status) {
        wakkle.wrapper.classList.remove('grabbable');
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
        window.addEventListener('deviceorientation', deviceOrientationHandler, false);
        document.addEventListener('touchstart', dragStart);
        document.addEventListener('touchmove', dragHandler);
        document.addEventListener('touchend', dragEnd);
    }

    function unsetDeviceOrientationDrag() {
        window.removeEventListener('deviceorientation', deviceOrientationHandler, false);
        document.removeEventListener('touchstart', dragStart);
        document.removeEventListener('touchend', dragEnd);
        document.removeEventListener('touchmove', dragHandler);
    }

    if (hasWebcam()) {
        Object(__WEBPACK_IMPORTED_MODULE_1__controller_loadScript_js__["a" /* loadScript */])(__WEBPACK_IMPORTED_MODULE_0__UI__["c" /* head_move */].lib, initHeadtrackr);
    }

    function initHeadtrackr() {

        videoInput = document.createElement('video');
        videoInput.id = 'inputVideo';
        videoInput.autoplay = true;
        videoInput.style.display = 'none';
        wakkle.wrapper.appendChild(videoInput);

        canvasInput = document.createElement('canvas');
        canvasInput.id = 'inputCanvas';
        canvasInput.style.visibility = 'hidden';
        canvasInput.style.position = 'absolute';
        wakkle.wrapper.appendChild(canvasInput);

        debugCanvas = document.createElement('canvas');
        debugCanvas.id = 'debugCanvas';
        debugCanvas.width = 320;
        debugCanvas.height = 240;
        debugCanvas.style.position = 'absolute';
        debugCanvas.style.zIndex = '9';
        debugCanvas.style.display = this.debug ? 'block' : 'none';
        debugCanvas.style.transform = 'scaleX(-1)';
        wakkle.wrapper.appendChild(debugCanvas);

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
        document.removeEventListener('facetrackingEvent', facetrackHandler);
        htracker.stop();
        htracker.stopStream();
    }

    function isMobile() {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
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
};

function round(value, exp) {
    if (typeof exp === 'undefined' || +exp === 0) return Math.round(value);

    value = +value;
    exp = +exp;

    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) return NaN;

    // Shift
    value = value.toString().split('e');
    value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] + exp : exp)));

    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp));
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadScript;
function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Check if already embeded
    var scripts = document.getElementsByTagName('script');
    var exists = false;
    var src;
    for (var i = 0; i < scripts.length; i++) {
        src = scripts[i].getAttribute('src');
        if (src != null) {
            if (src.search(url) > -1) {
                exists = true;
            }
        }
    }
    if (!exists) {
        // Fire the loading
        head.appendChild(script);
    }
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sequence; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collector_numberPadding__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image_removeFromArray__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__image_sortArrayMiddleToOut__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__image_imagePreload__ = __webpack_require__(13);







var Sequence = function (wakkle) {
    // rather call "new Sequence()" as "new Image()" is protected

    this.initialized = false;
    this.q = 0.5;
    this.idx; // absolute image index
    this._idx; // temp absolute image index (easing)

    var that = this,
        image = new Image(),
        q,
        // relative image index
    count; // number of loaded image

    this.init = function () {

        count = 0;
        image.onload = function () {
            // TODO: test if onload gets fired again inside init-function when currentSrc changes

            loadImages();
        };
        image.src = wakkle.currentSrc || wakkle.src;
    };

    function loadImages() {

        wakkle.style.position = 'absolute';

        var images = Object(__WEBPACK_IMPORTED_MODULE_2__image_sortArrayMiddleToOut__["a" /* sortArrayMiddleToOut */])(wakkle.sequence.images),
            // in order to load progressively starting from the middle
        loaded = [],
            currBefore,
            prevBefore = wakkle,
            currAfter,
            prevAfter = wakkle;

        var progress = document.createElement('progress');
        progress.setAttribute('max', images.length);
        progress.setAttribute('value', 0);
        document.body.appendChild(progress); // TODO: add to wakkle.wrapper instead of body

        var b = wakkle.sequence.length / 2 % 2 ? Math.round(wakkle.sequence.length / 2) - 1 : wakkle.sequence.length / 2,
            a = wakkle.sequence.length / 2 % 2 ? Math.round(wakkle.sequence.length / 2) : wakkle.sequence.length / 2;

        new __WEBPACK_IMPORTED_MODULE_3__image_imagePreload__["a" /* imagePreload */](images, {
            onProgress: function (image, imageEl, index) {
                var percent = Math.floor(100 / this.queue.length * this.completed.length);
                progress.value = index;

                //if (prevBefore != wakkle && prevAfter != wakkle && wakkle) wakkle.remove();
                if (count > 3) that.update();

                loaded.push(image);

                for (var i = 0; i < loaded.length; i++) {
                    // to keep the loaded as short as possible

                    if (loaded.indexOf(wakkle.sequence.images[b]) >= 0) {
                        Object(__WEBPACK_IMPORTED_MODULE_1__image_removeFromArray__["a" /* removeFromArray */])(loaded, wakkle.sequence.images[b]);

                        currBefore = createImage(wakkle.sequence.images[b]);
                        placeBefore(currBefore, prevBefore);

                        prevBefore = currBefore;
                        b--;
                    }
                    if (loaded.indexOf(wakkle.sequence.images[a]) >= 0) {
                        Object(__WEBPACK_IMPORTED_MODULE_1__image_removeFromArray__["a" /* removeFromArray */])(loaded, wakkle.sequence.images[a]);

                        currAfter = createImage(wakkle.sequence.images[a]);
                        placeAfter(currAfter, prevAfter);

                        prevAfter = currAfter;
                        a++;
                    }
                }
            },
            onComplete: function (loaded, errors) {
                //wakkle.remove();
                progress.style.display = 'none';
                this.initialized = true;
            }
        });
    }

    function createImage(source) {
        var objectFit = window.getComputedStyle(wakkle, null).getPropertyValue('object-fit');
        var image = document.createElement('img');
        image.src = source;
        image.style.filter = "alpha(opacity = 0)"; // Internet Explorer
        image.style.opacity = 0;
        image.style.position = 'absolute'; // stack images on z axis

        if (objectFit != 'fill' && objectFit != 'none') {
            image.style.objectFit = objectFit;
            image.style.top = image.style.right = image.style.bottom = image.style.left = 0;
        }
        return image;
    }

    function placeAfter(image, referenceNode) {
        referenceNode.parentNode.insertBefore(image, referenceNode.nextSibling);
        count++;
    }

    function placeBefore(image, referenceNode) {
        referenceNode.parentNode.insertBefore(image, referenceNode);
        count++;
    }

    this.update = function () {
        that._idx = that._idx || 0;
        that.idx = Math.round((count - 1) * that.q);

        var image = document.getElementById(wakkle.id).getElementsByTagName('img');

        if (!that.initialized) {
            for (var i = 0; i < image.length; i++) {
                image[i].style.filter = "alpha(opacity = 0)"; // Internet Explorer
                image[i].style.opacity = 0;
            }
        }
        // this is more performant than a for-loop each time but
        // for some reasons not every image is hidden fromt he beginning
        // so I have added it as long as the sequence is not completely initialized
        image[that._idx].style.filter = "alpha(opacity = 0)"; // Internet Explorer
        image[that._idx].style.opacity = 0;

        image[that.idx].style.filter = "alpha(opacity = 1)"; // Internet Explorer
        image[that.idx].style.opacity = 1;

        that._idx = that.idx;
    };
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = removeFromArray;
function removeFromArray(arr) {
    var what,
        a = arguments,
        L = a.length,
        ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sortArrayMiddleToOut;
function sortArrayMiddleToOut(array) {
    var startIndex = Math.ceil(array.length / 2),
        newArray = [],
        i = startIndex,
        j = i + 1;
    while (j < array.length || i >= 0) {
        if (i >= 0) newArray.push(array[i]);
        if (j < array.length) newArray.push(array[j]);
        i--;
        j++;
    };
    return newArray;
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return imagePreload; });
// http://fragged.org/preloading-images-using-javascript-the-right-way-and-without-frameworks_744.html
//(function() {


var imagePreload = function (images, options) {
    this.options = {
        pipeline: false,
        auto: true,
        /* onProgress: function(){}, */
        /* onError: function(){}, */
        onComplete: function () {}
    };

    options && typeof options == 'object' && this.setOptions(options);

    this.addQueue(images);
    this.queue.length && this.options.auto && this.processQueue();
};

imagePreload.prototype.setOptions = function (options) {
    // shallow copy
    var o = this.options,
        key;

    for (key in options) {
        options.hasOwnProperty(key) && (o[key] = options[key]);
    }return this;
};

imagePreload.prototype.addQueue = function (images) {
    // stores a local array, dereferenced from original
    this.queue = images.slice();

    return this;
};

imagePreload.prototype.reset = function () {
    // reset the arrays
    this.completed = [];
    this.errors = [];

    return this;
};

imagePreload.prototype.load = function (src, index) {
    var image = new Image(),
        self = this,
        o = this.options;

    // set some event handlers
    image.onerror = image.onabort = function () {
        this.onerror = this.onabort = this.onload = null;

        self.errors.push(src);
        o.onError && o.onError.call(self, src);
        checkProgress.call(self, src);
        o.pipeline && self.loadNext(index);
    };

    image.onload = function () {
        this.onerror = this.onabort = this.onload = null;

        // store progress. this === image
        self.completed.push(src); // this.src may differ
        checkProgress.call(self, src, this);
        o.pipeline && self.loadNext(index);
    };

    // actually load
    image.src = src;

    return this;
};

imagePreload.prototype.loadNext = function (index) {
    // when pipeline loading is enabled, calls next item
    index++;
    this.queue[index] && this.load(this.queue[index], index);

    return this;
};

imagePreload.prototype.processQueue = function () {
    // runs through all queued items.
    var i = 0,
        queue = this.queue,
        len = queue.length;

    // process all queue items
    this.reset();

    if (!this.options.pipeline) for (; i < len; ++i) {
        this.load(queue[i], i);
    } else this.load(queue[0], 0);

    return this;
};

function checkProgress(src, image) {
    // intermediate checker for queue remaining. not exported.
    // called on imagePreload instance as scope
    var args = [],
        o = this.options;

    // call onProgress
    o.onProgress && src && o.onProgress.call(this, src, image, this.completed.length);

    if (this.completed.length + this.errors.length === this.queue.length) {
        args.push(this.completed);
        this.errors.length && args.push(this.errors);
        o.onComplete.apply(this, args);
    }

    return this;
}

if (typeof define === 'function' && __webpack_require__(14)) {
    // we have an AMD loader.
    define(function () {
        return imagePreload;
    });
} else {
    this.imagePreload = imagePreload;
}
//}).call(this);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mask; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__collector_generateUUID__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__collector_numberPadding__ = __webpack_require__(1);



var Mask = function (wakkle) {

    this.initialized = false;
    this.q = 0.5;

    var that = this,
        markup,
        masks,
        masked = [];

    this.init = function () {
        for (var i = 0; i < wakkle.markup.length; i++) {

            markup = wakkle.markup[i];

            if (wakkle.markup[i].hasAttribute('mask') && wakkle.markup[i].getAttribute('mask') != '') {

                masked.push(markup);

                var xhr = new XMLHttpRequest();

                console.log('waiting to insert ' + wakkle.markup[i].getAttribute('mask'));
                xhr.url = wakkle.markup[i].getAttribute('mask');
                xhr.open('GET', xhr.url, true);
                xhr.send();

                xhr.onload = function (e) {

                    if (xhr.status >= 200 && xhr.status < 400) {

                        var tmp = document.createElement('div');
                        tmp.innerHTML = xhr.responseText;

                        wakkle.wrapper.appendChild(tmp);
                        // https://stackoverflow.com/a/22277907

                        var svg = tmp.getElementsByTagName('svg')[0],
                            viewBox = svg.getAttribute('viewBox').replace(/^\s+|\s+$/gm, '').split(' '),
                            clipPaths = tmp.getElementsByTagName('clipPath'),
                            clipPath,
                            markup = wakkle.wrapper.querySelector('[mask="' + xhr.url + '"]'),
                            id = markup.id || Object(__WEBPACK_IMPORTED_MODULE_0__collector_generateUUID__["a" /* generateUUID */])();

                        markup.id = markup.id || id;

                        // Remove some of the attributes that aren't needed
                        svg.removeAttribute('xmlns:a');
                        svg.removeAttribute('width');
                        svg.removeAttribute('height');
                        svg.removeAttribute('x');
                        svg.removeAttribute('y');
                        svg.removeAttribute('enable-background');
                        svg.removeAttribute('xmlns:xlink');
                        svg.removeAttribute('xml:space');
                        svg.removeAttribute('version');

                        svg.style.top = '-100%';

                        for (var i = 0; i < clipPaths.length; i++) {
                            clipPath = clipPaths[i];

                            clipPath.setAttributeNS('http://www.w3.org/2000/svg', 'clipPathUnits', 'objectBoundingBox');
                            clipPath.setAttributeNS('http://www.w3.org/2000/svg', 'transform', 'scale(' + 1 / viewBox[2] + ',' + 1 / viewBox[3] + ')');
                            // http://meyerweb.com/eric/thoughts/2017/02/24/scaling-svg-clipping-paths-for-css-use/

                            clipPath.id = id + '--' + Object(__WEBPACK_IMPORTED_MODULE_1__collector_numberPadding__["a" /* pad */])(clipPath.id ? clipPath.id : i, wakkle.sequence.padding);
                        }

                        wakkle.wrapper.appendChild(svg);

                        svg.innerHTML = svg.innerHTML;

                        console.log('mask inserted');
                    }
                };
            }
        }
    };

    this.update = function () {

        for (var i = 0; i < masked.length; i++) {

            masked[i].style.clipPath = 'url(#' + masked[i].id + '--' + Object(__WEBPACK_IMPORTED_MODULE_1__collector_numberPadding__["a" /* pad */])(Math.round((wakkle.sequence.length - 1) * that.q), wakkle.sequence.padding) + ')';
            masked[i].style.WebkitClipPath = 'url(#' + masked[i].id + '--' + Object(__WEBPACK_IMPORTED_MODULE_1__collector_numberPadding__["a" /* pad */])(Math.round((wakkle.sequence.length - 1) * that.q), wakkle.sequence.padding) + ')';
        }
    };
};

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sound; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UI__ = __webpack_require__(0);



var Sound = function (wakkle) {

    this.initialized = false;
    this.q = 0.5;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    var that = this,
        audio = new Audio(),
        context = new AudioContext(),
        panner = context.createPanner(),
        volume = context.createGain(),
        source = context.createMediaElementSource(audio),
        target;

    this.init = function () {

        if (!wakkle.sound) return;

        audio.src = wakkle.sound.Source;
        audio.autoplay = wakkle.sound.Autoplay || false;
        audio.loop = wakkle.sound.Loop || true;
        audio.crossOrigin = "anonymous";

        panner.setPosition(0, 0, 1);
        panner.panningModel = 'equalpower';

        // Source -> Panner -> Volume -> Destination / Output
        source.connect(panner);
        panner.connect(volume);
        volume.connect(context.destination);

        document.addEventListener('visibilitychange', volumeHandler);

        var promise = audio.play();
        if (promise !== undefined) promise.then(function () {
            audio.play();
        }).catch(function (e) {/**/});

        this.UI.init();

        this.initialized = true;
    };

    this.icons = __WEBPACK_IMPORTED_MODULE_0__UI__["d" /* icons */];

    this.UI = {
        init: function () {

            var soundButton = document.createElement('div');

            soundButton.appendChild(that.icons.use('#icon-sound' + (audio.paused ? '-off' : '')));
            soundButton.className = __WEBPACK_IMPORTED_MODULE_0__UI__["g" /* pref */] + 'sound-button ';
            soundButton.style.position = 'absolute';
            soundButton.style.cursor = 'pointer';
            soundButton.addEventListener('click', toggle);

            wakkle.ui.wrapper.appendChild(soundButton);
        },
        set: function (playing) {
            var soundButton = wakkle.wrapper.querySelector('.' + __WEBPACK_IMPORTED_MODULE_0__UI__["g" /* pref */] + 'sound-button use');
            soundButton.setAttribute('xlink:href', '#icon-sound' + (playing ? '' : '-off'));
        }
    };

    this.update = function () {
        var x = -1 * (that.q - 0.5) * 2,
            // values between 1 and -1
        y = 0,
            z = 0.5;

        panner.setPosition(x, y, z);
    };

    function toggle() {

        if (audio.paused) audio.play();

        if (Math.round(volume.gain.value) > 0) target = 0;
        if (Math.round(volume.gain.value) < 1) target = 1;

        volume.gain.setTargetAtTime(target, audio.currentTime + 1, 0.5);
        that.UI.set(target);
    }

    function volumeHandler() {
        // TODO: visibilityState within viewport
        if (document.visibilityState == 'hidden') volume.gain.setTargetAtTime(0, audio.currentTime, 0.1);
        if (document.visibilityState == 'visible') volume.gain.setTargetAtTime(1, audio.currentTime, 0.1);
    }
};

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Markup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_simple_element_resize_detector__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_simple_element_resize_detector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_simple_element_resize_detector__);



var Markup = function (wakkle) {

    this.initialized = false;
    this.q = 0.5;

    var that = this,
        arc = wakkle.meta.Arc,
        arcShift = wakkle.meta.ArcShift,
        fontSize;

    var markups, markup, markupAllChildren, markupChildren, markupChild, position, rotation;

    var q,
        DDD,
        dimensions = [];

    var markups = wakkle.markup;

    this.init = function () {

        if (!wakkle.markup) return;

        for (var i = 0; i < markups.length; i++) {

            var markup = markups[i];
            markup.i = i;

            convertAttributes(markup);
            bindFontSizes(markup);
        }

        __WEBPACK_IMPORTED_MODULE_0_simple_element_resize_detector___default()(wakkle.wrapper, function () {

            for (var i = 0; i < markups.length; i++) {

                var markup = markups[i],
                    width = markups[i].clientWidth,
                    height = markups[i].clientHeight;

                markup.style.perspective = getCSSPerspective(wakkle.meta.FOV, width, height);

                scaleFontSize(markup);
            }

            for (var i = 0; i < dimensions.length; i++) {

                var DDD = dimensions[i];

                position = {
                    x: DDD.getAttribute('x') || 0,
                    y: DDD.getAttribute('y') || 0,
                    z: DDD.getAttribute('z') || 0
                };

                rotation = {
                    x: DDD.getAttribute('rotation-x') || 0,
                    y: DDD.getAttribute('rotation-y') || 0,
                    z: DDD.getAttribute('rotation-z') || 0
                };

                DDD.style.transform = getCSSTransform(position.x, position.y, position.z, rotation.x, rotation.y, rotation.z);
            }
        });

        this.initialized = true;
    };

    this.update = function () {

        for (var i = 0; i < markups.length; i++) {

            var q = markups[i].querySelector('.q');
            q.style.transform = 'rotateY(' + (Math.round(that.q * (wakkle.sequence.length - 1)) * arc / wakkle.sequence.length + arcShift) + 'deg)';

            // (too) smooth version:
            // q.style.transform = 'rotateY( ' + ( that.q * arc + arcShift ) + 'deg )';
        }
    };

    this.insert = function (attr) {

        var markup = document.createElement('wakkle-markup'); // = where the css perspective is applied to
        var markupChild = document.createElement('div'); // = where attributes are assigned to 

        markupChild.id = attr.id || '';
        markupChild.class = attr.className;

        attr.position = attr.position || {};

        markupChild.setAttribute('x', attr.position.x || 0);
        markupChild.setAttribute('y', attr.position.y || 0);
        markupChild.setAttribute('z', attr.position.z || 0);

        attr.rotation = attr.rotation || {};

        markupChild.setAttribute('rotation-x', attr.rotation.x || 0);
        markupChild.setAttribute('rotation-y', attr.rotation.y || 0);
        markupChild.setAttribute('rotation-z', attr.rotation.z || 0);

        // Add markup to DOM and wakkle.markup HTMLCollection
        markup.appendChild(markupChild);
        wakkle.wrapper.appendChild(markup);

        // Translate 3D attributes into CSS
        convertAttributes(markup);
    };

    function convertAttributes(markup) {

        Object.assign(markup.style, {
            'position': 'absolute',
            'top': '0',
            'right': '0',
            'bottom': '0',
            'left': '0',
            'perspective': getCSSPerspective(wakkle.meta.FOV, wakkle.width, wakkle.height),
            'perspective-origin': (wakkle.meta.OriginX || '50%') + ' ' + (wakkle.meta.OriginY || '50%')
        });

        q = document.createElement('div'); // = where the controller is applied to
        q.className = 'q';

        Object.assign(q.style, {
            'position': 'absolute',
            'top': '0',
            'right': '0',
            'bottom': '0',
            'left': '0',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'perspective': 'inherit',
            'transform-style': 'preserve-3d'
        });

        markupChildren = wakkle.markup[markup.i].querySelectorAll('wakkle-markup > *');

        for (var i = 0; i < markupChildren.length; i++) {

            markupChild = markupChildren[i];
            markupChild.style.transformStyle = 'preserve-3d';

            q.appendChild(markupChild);

            // Parse transformation attributes
            position = {
                x: markupChild.getAttribute('x') || 0,
                y: markupChild.getAttribute('y') || 0,
                z: markupChild.getAttribute('z') || 0
            };

            rotation = {
                x: markupChild.getAttribute('rotation-x') || 0,
                y: markupChild.getAttribute('rotation-y') || 0,
                z: markupChild.getAttribute('rotation-z') || 0
            };

            var transform = getCSSTransform(position.x, position.y, position.z, rotation.x, rotation.y, rotation.z);

            if (transform) {

                DDD = document.createElement('div'); // = where the transformation attributes are applied to
                dimensions.push(DDD);

                DDD.className = '3D';
                Object.assign(DDD.style, {
                    'position': 'absolute',
                    'width': '50%',
                    'height': 50 * wakkle.width / wakkle.height + '%',
                    'display': 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                    'transform-style': 'preserve-3d',
                    'transform-orign': 'center',
                    'transform': transform
                });

                DDD.setAttribute('x', position.x);
                DDD.setAttribute('y', position.y);
                DDD.setAttribute('z', position.z);
                DDD.setAttribute('rotation-x', rotation.x);
                DDD.setAttribute('rotation-y', rotation.y);
                DDD.setAttribute('rotation-z', rotation.z);

                markupChild.removeAttribute('x');
                markupChild.removeAttribute('y');
                markupChild.removeAttribute('z');
                markupChild.removeAttribute('rotation-x');
                markupChild.removeAttribute('rotation-y');
                markupChild.removeAttribute('rotation-z');

                markupChild.parentNode.appendChild(DDD);
                DDD.appendChild(markupChild);
                //wrap( DDD, markupChild )
            }
        }

        markup.appendChild(q);
    }

    function getCSSPerspective(fov, width, height) {
        if (!fov || !width || !height) return 0;
        return Math.pow(width / 2 * width / 2 + height / 2 * height / 2, 0.5) / Math.tan(fov / 2 * Math.PI / 180) + 'px';
    }

    function getCSSTransform(x, y, z, rotationX, rotationY, rotationZ) {
        var transform = '';

        transform += x ? ' translateX(' + (1 * parseFloat(x) + parseFloat(wakkle.meta.OriginX)) + '%)' : '';
        transform += y ? ' translateY(' + (-1 * parseFloat(y) + parseFloat(wakkle.meta.OriginY)) + '%)' : '';
        transform += z ? ' translateZ(' + 1 * parseFloat(z) / 100 * getCSSPerspective(wakkle.meta.FOV, wakkle.width, wakkle.height).replace('px', '') / 2 + 'px)' : '';

        transform += rotationX ? ' rotateX(' + parseFloat(rotationX) + 'deg)' : '';
        transform += rotationY ? ' rotateY(' + parseFloat(rotationY) + 'deg)' : '';
        transform += rotationZ ? ' rotateZ(' + parseFloat(rotationZ) + 'deg)' : '';

        return transform;
    }

    function bindFontSizes(markup) {

        var markupAllChildren = markup.querySelectorAll('*'),
            fontSizes = [];

        for (var i = 0; i < markupAllChildren.length; i++) {
            fontSizes[i] = parseFloat(window.getComputedStyle(markupAllChildren[i], null).getPropertyValue('font-size'));
            markupAllChildren[i].setAttribute('data-naturalFontSize', fontSizes[i]);
        }

        scaleFontSize(markup);
    }

    function scaleFontSize(markup) {
        var markupAllChildren = markup.querySelectorAll('*');

        for (var i = 0; i < markupAllChildren.length; i++) {

            markupAllChildren[i].style.fontSize = markupAllChildren[i].getAttribute('data-naturalFontSize') * (wakkle.clientWidth / wakkle.naturalWidth) + 'px';
            markupAllChildren[i].style.backfaceVisibility = 'hidden';
        }
    }

    function wrap(el, wrapper) {
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    }
};

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Minimap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UI__ = __webpack_require__(0);



var Minimap = function (wakkle) {

    this.initialized = false;
    this.q = 0.5;
    this.icons = __WEBPACK_IMPORTED_MODULE_0__UI__["d" /* icons */];

    var that = this,
        minimap,
        iconMinimap = that.icons.use('#icon-minimap'),
        iconMinimapCenter = that.icons.use('#icon-minimap-center'),
        arc = wakkle.meta.Arc,
        arcShift = wakkle.meta.ArcShift;;

    this.init = function () {

        if (!wakkle.ui.minimap) return;

        iconMinimap.style.position = 'absolute';

        minimap = document.createElement('div');

        minimap.style.position = 'absolute';
        minimap.className = __WEBPACK_IMPORTED_MODULE_0__UI__["g" /* pref */] + 'minimap ';
        minimap.appendChild(iconMinimap);
        minimap.appendChild(iconMinimapCenter);

        wakkle.ui.wrapper.appendChild(minimap);
    };

    this.update = function () {

        if (!wakkle.ui.minimap) return;

        iconMinimap.style.transform = 'rotateZ( ' + (that.q * arc + arcShift) + 'deg )';
    };
};

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Fullscreen; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UI__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_screenfull__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_screenfull___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_screenfull__);




var Fullscreen = function (wakkle) {

    var that = this,
        fullscreen = false;

    this.icons = __WEBPACK_IMPORTED_MODULE_0__UI__["d" /* icons */];

    this.init = function () {

        if (!wakkle.ui.fullscreen || !__WEBPACK_IMPORTED_MODULE_1_screenfull__["enabled"]) return;

        var fullscreenButton = document.createElement('div');

        fullscreenButton.appendChild(that.icons.use('#icon-fullscreen-off'));
        fullscreenButton.className = __WEBPACK_IMPORTED_MODULE_0__UI__["g" /* pref */] + 'fullscreen-button ';
        fullscreenButton.style.position = 'absolute';
        fullscreenButton.style.cursor = 'pointer';
        fullscreenButton.addEventListener('click', function () {
            that.toggleFullscreen();
            that.toggleUI();
        });

        __WEBPACK_IMPORTED_MODULE_1_screenfull__["on"]('change', function () {
            fullscreen = !fullscreen;
            that.toggleUI();
        });

        wakkle.ui.wrapper.appendChild(fullscreenButton);
    };

    this.toggleUI = function () {

        var fullscreenButton = wakkle.wrapper.querySelector('.' + __WEBPACK_IMPORTED_MODULE_0__UI__["g" /* pref */] + 'fullscreen-button');
        fullscreenButton.innerHTML = '';
        fullscreenButton.appendChild(that.icons.use('#icon-fullscreen-' + (fullscreen ? 'on' : 'off ')));

        fullscreen ? wakkle.wrapper.classList.add('fullscreen') : wakkle.wrapper.classList.remove('fullscreen');
    };

    this.toggleFullscreen = function () {
        !fullscreen ? __WEBPACK_IMPORTED_MODULE_1_screenfull__["request"](wakkle.wrapper) : __WEBPACK_IMPORTED_MODULE_1_screenfull__["exit"]();
    };
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

/*!
* screenfull
* v3.3.2 - 2017-10-27
* (c) Sindre Sorhus; MIT License
*/
(function () {
	'use strict';

	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
	var isCommonjs = typeof module !== 'undefined' && module.exports;
	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

	var fn = (function () {
		var val;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// New WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// Old WebKit (Safari 5.1)
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0; i < val.length; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var eventNameMap = {
		change: fn.fullscreenchange,
		error: fn.fullscreenerror
	};

	var screenfull = {
		request: function (elem) {
			var request = fn.requestFullscreen;

			elem = elem || document.documentElement;

			// Work around Safari 5.1 bug: reports support for
			// keyboard in fullscreen even though it doesn't.
			// Browser sniffing, since the alternative with
			// setTimeout is even worse.
			if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
				elem[request]();
			} else {
				elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
			}
		},
		exit: function () {
			document[fn.exitFullscreen]();
		},
		toggle: function (elem) {
			if (this.isFullscreen) {
				this.exit();
			} else {
				this.request(elem);
			}
		},
		onchange: function (callback) {
			this.on('change', callback);
		},
		onerror: function (callback) {
			this.on('error', callback);
		},
		on: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.addEventListener(eventName, callback, false);
			}
		},
		off: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.removeEventListener(eventName, callback, false);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = false;
		} else {
			window.screenfull = false;
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return Boolean(document[fn.fullscreenElement]);
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		enabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return Boolean(document[fn.fullscreenEnabled]);
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_wakkle_scss__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scss_wakkle_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__scss_wakkle_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return __WEBPACK_IMPORTED_MODULE_1__main__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return __WEBPACK_IMPORTED_MODULE_1__main__["a"]; });




/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.wakkl=n():e.wakkl=n()}("undefined"!=typeof self?self:this,function(){return function(e){function n(e){delete installedChunks[e]}function r(e){var n=document.getElementsByTagName("head")[0],r=document.createElement("script");r.type="text/javascript",r.charset="utf-8",r.src=f.p+""+e+"."+j+".hot-update.js",n.appendChild(r)}function t(e){return e=e||1e4,new Promise(function(n,r){if("undefined"==typeof XMLHttpRequest)return r(new Error("No browser support"));try{var t=new XMLHttpRequest,o=f.p+""+j+".hot-update.json";t.open("GET",o,!0),t.timeout=e,t.send(null)}catch(e){return r(e)}t.onreadystatechange=function(){if(4===t.readyState)if(0===t.status)r(new Error("Manifest request to "+o+" timed out."));else if(404===t.status)n();else if(200!==t.status&&304!==t.status)r(new Error("Manifest request to "+o+" failed."));else{try{var e=JSON.parse(t.responseText)}catch(e){return void r(e)}n(e)}}})}function o(e){var n=M[e];if(!n)return f;var r=function(r){return n.hot.active?(M[r]?M[r].parents.indexOf(e)<0&&M[r].parents.push(e):(_=[e],y=r),n.children.indexOf(r)<0&&n.children.push(r)):(console.warn("[HMR] unexpected require("+r+") from disposed module "+e),_=[]),f(r)};for(var t in f)Object.prototype.hasOwnProperty.call(f,t)&&"e"!==t&&Object.defineProperty(r,t,function(e){return{configurable:!0,enumerable:!0,get:function(){return f[e]},set:function(n){f[e]=n}}}(t));return r.e=function(e){function n(){H--,"prepare"===E&&(P[e]||l(e),0===H&&0===k&&p())}return"ready"===E&&i("prepare"),H++,f.e(e).then(n,function(e){throw n(),e})},r}function c(e){var n={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:y!==e,active:!0,accept:function(e,r){if(void 0===e)n._selfAccepted=!0;else if("function"==typeof e)n._selfAccepted=e;else if("object"==typeof e)for(var t=0;t<e.length;t++)n._acceptedDependencies[e[t]]=r||function(){};else n._acceptedDependencies[e]=r||function(){}},decline:function(e){if(void 0===e)n._selfDeclined=!0;else if("object"==typeof e)for(var r=0;r<e.length;r++)n._declinedDependencies[e[r]]=!0;else n._declinedDependencies[e]=!0},dispose:function(e){n._disposeHandlers.push(e)},addDisposeHandler:function(e){n._disposeHandlers.push(e)},removeDisposeHandler:function(e){var r=n._disposeHandlers.indexOf(e);r>=0&&n._disposeHandlers.splice(r,1)},check:s,apply:u,status:function(e){if(!e)return E;D.push(e)},addStatusHandler:function(e){D.push(e)},removeStatusHandler:function(e){var n=D.indexOf(e);n>=0&&D.splice(n,1)},data:g[e]};return y=void 0,n}function i(e){E=e;for(var n=0;n<D.length;n++)D[n].call(null,e)}function d(e){return+e+""===e?+e:e}function s(e){if("idle"!==E)throw new Error("check() is only allowed in idle status");return b=e,i("check"),t(O).then(function(e){if(!e)return i("idle"),null;I={},P={},A=e.c,w=e.h,i("prepare");var n=new Promise(function(e,n){v={resolve:e,reject:n}});m={};return l(1),"prepare"===E&&0===H&&0===k&&p(),n})}function a(e,n){if(A[e]&&I[e]){I[e]=!1;for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(m[r]=n[r]);0==--k&&0===H&&p()}}function l(e){A[e]?(I[e]=!0,k++,r(e)):P[e]=!0}function p(){i("ready");var e=v;if(v=null,e)if(b)Promise.resolve().then(function(){return u(b)}).then(function(n){e.resolve(n)},function(n){e.reject(n)});else{var n=[];for(var r in m)Object.prototype.hasOwnProperty.call(m,r)&&n.push(d(r));e.resolve(n)}}function u(r){function t(e,n){for(var r=0;r<n.length;r++){var t=n[r];e.indexOf(t)<0&&e.push(t)}}if("ready"!==E)throw new Error("apply() is only allowed in ready status");r=r||{};var o,c,s,a,l,p={},u=[],h={},y=function(){console.warn("[HMR] unexpected require("+b.moduleId+") to disposed module")};for(var v in m)if(Object.prototype.hasOwnProperty.call(m,v)){l=d(v);var b;b=m[v]?function(e){for(var n=[e],r={},o=n.slice().map(function(e){return{chain:[e],id:e}});o.length>0;){var c=o.pop(),i=c.id,d=c.chain;if((a=M[i])&&!a.hot._selfAccepted){if(a.hot._selfDeclined)return{type:"self-declined",chain:d,moduleId:i};if(a.hot._main)return{type:"unaccepted",chain:d,moduleId:i};for(var s=0;s<a.parents.length;s++){var l=a.parents[s],p=M[l];if(p){if(p.hot._declinedDependencies[i])return{type:"declined",chain:d.concat([l]),moduleId:i,parentId:l};n.indexOf(l)>=0||(p.hot._acceptedDependencies[i]?(r[l]||(r[l]=[]),t(r[l],[i])):(delete r[l],n.push(l),o.push({chain:d.concat([l]),id:l})))}}}}return{type:"accepted",moduleId:e,outdatedModules:n,outdatedDependencies:r}}(l):{type:"disposed",moduleId:v};var O=!1,x=!1,D=!1,k="";switch(b.chain&&(k="\nUpdate propagation: "+b.chain.join(" -> ")),b.type){case"self-declined":r.onDeclined&&r.onDeclined(b),r.ignoreDeclined||(O=new Error("Aborted because of self decline: "+b.moduleId+k));break;case"declined":r.onDeclined&&r.onDeclined(b),r.ignoreDeclined||(O=new Error("Aborted because of declined dependency: "+b.moduleId+" in "+b.parentId+k));break;case"unaccepted":r.onUnaccepted&&r.onUnaccepted(b),r.ignoreUnaccepted||(O=new Error("Aborted because "+l+" is not accepted"+k));break;case"accepted":r.onAccepted&&r.onAccepted(b),x=!0;break;case"disposed":r.onDisposed&&r.onDisposed(b),D=!0;break;default:throw new Error("Unexception type "+b.type)}if(O)return i("abort"),Promise.reject(O);if(x){h[l]=m[l],t(u,b.outdatedModules);for(l in b.outdatedDependencies)Object.prototype.hasOwnProperty.call(b.outdatedDependencies,l)&&(p[l]||(p[l]=[]),t(p[l],b.outdatedDependencies[l]))}D&&(t(u,[b.moduleId]),h[l]=y)}var H=[];for(c=0;c<u.length;c++)l=u[c],M[l]&&M[l].hot._selfAccepted&&H.push({module:l,errorHandler:M[l].hot._selfAccepted});i("dispose"),Object.keys(A).forEach(function(e){!1===A[e]&&n(e)});for(var P,I=u.slice();I.length>0;)if(l=I.pop(),a=M[l]){var U={},q=a.hot._disposeHandlers;for(s=0;s<q.length;s++)(o=q[s])(U);for(g[l]=U,a.hot.active=!1,delete M[l],delete p[l],s=0;s<a.children.length;s++){var R=M[a.children[s]];R&&((P=R.parents.indexOf(l))>=0&&R.parents.splice(P,1))}}var S,N;for(l in p)if(Object.prototype.hasOwnProperty.call(p,l)&&(a=M[l]))for(N=p[l],s=0;s<N.length;s++)S=N[s],(P=a.children.indexOf(S))>=0&&a.children.splice(P,1);i("apply"),j=w;for(l in h)Object.prototype.hasOwnProperty.call(h,l)&&(e[l]=h[l]);var T=null;for(l in p)if(Object.prototype.hasOwnProperty.call(p,l)&&(a=M[l])){N=p[l];var C=[];for(c=0;c<N.length;c++)if(S=N[c],o=a.hot._acceptedDependencies[S]){if(C.indexOf(o)>=0)continue;C.push(o)}for(c=0;c<C.length;c++){o=C[c];try{o(N)}catch(e){r.onErrored&&r.onErrored({type:"accept-errored",moduleId:l,dependencyId:N[c],error:e}),r.ignoreErrored||T||(T=e)}}}for(c=0;c<H.length;c++){var L=H[c];l=L.module,_=[l];try{f(l)}catch(e){if("function"==typeof L.errorHandler)try{L.errorHandler(e)}catch(n){r.onErrored&&r.onErrored({type:"self-accept-error-handler-errored",moduleId:l,error:n,orginalError:e,originalError:e}),r.ignoreErrored||T||(T=n),T||(T=e)}else r.onErrored&&r.onErrored({type:"self-accept-errored",moduleId:l,error:e}),r.ignoreErrored||T||(T=e)}}return T?(i("fail"),Promise.reject(T)):(i("idle"),new Promise(function(e){e(u)}))}function f(n){if(M[n])return M[n].exports;var r=M[n]={i:n,l:!1,exports:{},hot:c(n),parents:(x=_,_=[],x),children:[]};return e[n].call(r.exports,r,r.exports,o(n)),r.l=!0,r.exports}var h=window.webpackHotUpdatewakkl;window.webpackHotUpdatewakkl=function(e,n){a(e,n),h&&h(e,n)};var y,v,m,w,b=!0,j="260a903e074d2d8dd852",O=1e4,g={},_=[],x=[],D=[],E="idle",k=0,H=0,P={},I={},A={},M={};return f.m=e,f.c=M,f.d=function(e,n,r){f.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},f.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(n,"a",n),n},f.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},f.p="",f.h=function(){return j},o("./src/js/index.js")(f.s="./src/js/index.js")}({"./src/js/index.js":function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=r("./src/scss/style.scss");r.n(t);console.log("hello from index.js")},"./src/scss/style.scss":function(e,n){}})});
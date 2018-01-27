// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped, ModuleConfig) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(ModuleConfig);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({53:[function(require,module,exports) {
/** Shrinkwrap URL:
 *      /v2/bundles/js?modules=fastclick%401.0.6%2Co-autoinit%401.3.3&shrinkwrap=
 */
!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=12)}([function(t,e){var n=Object;t.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var o=n(26),r=n(27);t.exports=function(t){return o(r(t))}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){t.exports=!n(5)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){var n=t.exports={version:"1.2.6"};"number"==typeof __e&&(__e=n)},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var o=n(1),r=o["__core-js_shared__"]||(o["__core-js_shared__"]={});t.exports=function(t){return r[t]||(r[t]={})}},function(t,e,n){var o=n(8)("wks"),r=n(10),i=n(1).Symbol;t.exports=function(t){return o[t]||(o[t]=i&&i[t]||(i||r)("Symbol."+t))}},function(t,e){var n=0,o=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+o).toString(36))}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){"use strict";n(13);var o={fastclick:n(14),"o-autoinit":n(35)};window.Origami=o},function(t,e){t.exports={name:"__MAIN__",dependencies:{fastclick:"fastclick#*","o-autoinit":"o-autoinit#^1.0.0"}}},function(t,e,n){"use strict";var o=n(15),r=function(t){return t&&t.__esModule?t:{default:t}}(o),i=!1;!function(){/**
  * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
  *
  * @codingstandard ftlabs-jsv2
  * @copyright The Financial Times Limited [All Rights Reserved]
  * @license MIT License (see LICENSE.txt)
  */
function e(t,n){var r;if(n=n||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=n.touchBoundary||10,this.layer=t,this.tapDelay=n.tapDelay||200,this.tapTimeout=n.tapTimeout||700,!e.notNeeded(t)){for(var i=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,a=0,u=i.length;a<u;a++)c[i[a]]=function(t,e){return function(){return t.apply(e,arguments)}}(c[i[a]],c);o&&(t.addEventListener("mouseover",this.onMouse,!0),t.addEventListener("mousedown",this.onMouse,!0),t.addEventListener("mouseup",this.onMouse,!0)),t.addEventListener("click",this.onClick,!0),t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1),t.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(t.removeEventListener=function(e,n,o){var r=Node.prototype.removeEventListener;"click"===e?r.call(t,e,n.hijacked||n,o):r.call(t,e,n,o)},t.addEventListener=function(e,n,o){var r=Node.prototype.addEventListener;"click"===e?r.call(t,e,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):r.call(t,e,n,o)}),"function"==typeof t.onclick&&(r=t.onclick,t.addEventListener("click",function(t){r(t)},!1),t.onclick=null)}}var n=navigator.userAgent.indexOf("Windows Phone")>=0,o=navigator.userAgent.indexOf("Android")>0&&!n,c=/iP(ad|hone|od)/.test(navigator.userAgent)&&!n,a=c&&/OS 4_\d(_\d)?/.test(navigator.userAgent),u=c&&/OS [6-7]_\d/.test(navigator.userAgent),s=navigator.userAgent.indexOf("BB10")>0;e.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(c&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},e.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!o;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},e.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},e.prototype.determineEventType=function(t){return o&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},e.prototype.focus=function(t){var e;c&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},e.prototype.updateScrollParent=function(t){var e,n;if(!(e=t.fastClickScrollParent)||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},e.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},e.prototype.onTouchStart=function(t){var e,n,o;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],c){if(o=window.getSelection(),o.rangeCount&&!o.isCollapsed)return!0;if(!a){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},e.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n},e.prototype.onTouchMove=function(t){return!this.trackingClick||((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0)},e.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},e.prototype.onTouchEnd=function(t){var e,n,r,i,s,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,n=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,u&&(s=t.changedTouches[0],l=document.elementFromPoint(s.pageX-window.pageXOffset,s.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),"label"===(r=l.tagName.toLowerCase())){if(e=this.findControl(l)){if(this.focus(l),o)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-n>100||c&&window.top!==window&&"input"===r?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),c&&"select"===r||(this.targetElement=null,t.preventDefault()),!1);return!(!c||a||!(i=l.fastClickScrollParent)||i.fastClickLastScrollTop===i.scrollTop)||(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},e.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},e.prototype.onMouse=function(t){return!this.targetElement||(!!t.forwardedTouchEvent||(!t.cancelable||(!(!this.needsClick(this.targetElement)||this.cancelNextClick)||(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1))))},e.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail||(e=this.onMouse(t),e||(this.targetElement=null),e)},e.prototype.destroy=function(){var t=this.layer;o&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},e.notNeeded=function(t){var e,n,r;if(void 0===window.ontouchstart)return!0;if(n=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!o)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(n>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(s&&(r=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),r[1]>=10&&r[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction||(!!(+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]>=27&&(e=document.querySelector("meta[name=viewport]"))&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))||("none"===t.style.touchAction||"manipulation"===t.style.touchAction))},e.attach=function(t,n){return new e(t,n)},"function"==typeof i&&"object"===(0,r.default)(i.amd)&&i.amd?i(function(){return e}):void 0!==t&&t.exports?(t.exports=e.attach,t.exports.FastClick=e):window.FastClick=e}()},function(t,e,n){"use strict";var o=n(16).default;e.default=function(t){return t&&t.constructor===o?"symbol":typeof t},e.__esModule=!0},function(t,e,n){t.exports={default:n(17),__esModule:!0}},function(t,e,n){n(18),n(34),t.exports=n(6).Symbol},function(t,e,n){"use strict";var o=n(0),r=n(1),i=n(3),c=n(4),a=n(19),u=n(22),s=n(5),l=n(8),f=n(24),d=n(10),p=n(9),h=n(25),m=n(28),v=n(29),g=n(30),y=n(31),E=n(2),b=n(7),S=o.getDesc,k=o.setDesc,w=o.create,C=m.get,x=r.Symbol,T=r.JSON,O=T&&T.stringify,M=!1,L=p("_hidden"),_=o.isEnum,P=l("symbol-registry"),D=l("symbols"),N="function"==typeof x,j=Object.prototype,A=c&&s(function(){return 7!=w(k({},"a",{get:function(){return k(this,"a",{value:7}).a}})).a})?function(t,e,n){var o=S(j,e);o&&delete j[e],k(t,e,n),o&&t!==j&&k(j,e,o)}:k,F=function(t){var e=D[t]=w(x.prototype);return e._k=t,c&&M&&A(j,t,{configurable:!0,set:function(e){i(this,L)&&i(this[L],t)&&(this[L][t]=!1),A(this,t,b(1,e))}}),e},I=function(t){return"symbol"==typeof t},W=function(t,e,n){return n&&i(D,e)?(n.enumerable?(i(t,L)&&t[L][e]&&(t[L][e]=!1),n=w(n,{enumerable:b(0,!1)})):(i(t,L)||k(t,L,b(1,{})),t[L][e]=!0),A(t,e,n)):k(t,e,n)},X=function(t,e){y(t);for(var n,o=v(e=E(e)),r=0,i=o.length;i>r;)W(t,n=o[r++],e[n]);return t},Y=function(t,e){return void 0===e?w(t):X(w(t),e)},B=function(t){var e=_.call(this,t);return!(e||!i(this,t)||!i(D,t)||i(this,L)&&this[L][t])||e},q=function(t,e){var n=S(t=E(t),e);return!n||!i(D,e)||i(t,L)&&t[L][e]||(n.enumerable=!0),n},H=function(t){for(var e,n=C(E(t)),o=[],r=0;n.length>r;)i(D,e=n[r++])||e==L||o.push(e);return o},J=function(t){for(var e,n=C(E(t)),o=[],r=0;n.length>r;)i(D,e=n[r++])&&o.push(D[e]);return o},G=function(t){if(void 0!==t&&!I(t)){for(var e,n,o=[t],r=1,i=arguments;i.length>r;)o.push(i[r++]);return e=o[1],"function"==typeof e&&(n=e),!n&&g(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!I(e))return e}),o[1]=e,O.apply(T,o)}},K=s(function(){var t=x();return"[null]"!=O([t])||"{}"!=O({a:t})||"{}"!=O(Object(t))});N||(x=function(){if(I(this))throw TypeError("Symbol is not a constructor");return F(d(arguments.length>0?arguments[0]:void 0))},u(x.prototype,"toString",function(){return this._k}),I=function(t){return t instanceof x},o.create=Y,o.isEnum=B,o.getDesc=q,o.setDesc=W,o.setDescs=X,o.getNames=m.get=H,o.getSymbols=J,c&&!n(33)&&u(j,"propertyIsEnumerable",B,!0));var R={for:function(t){return i(P,t+="")?P[t]:P[t]=x(t)},keyFor:function(t){return h(P,t)},useSetter:function(){M=!0},useSimple:function(){M=!1}};o.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),function(t){var e=p(t);R[t]=N?e:F(e)}),M=!0,a(a.G+a.W,{Symbol:x}),a(a.S,"Symbol",R),a(a.S+a.F*!N,"Object",{create:Y,defineProperty:W,defineProperties:X,getOwnPropertyDescriptor:q,getOwnPropertyNames:H,getOwnPropertySymbols:J}),T&&a(a.S+a.F*(!N||K),"JSON",{stringify:G}),f(x,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},function(t,e,n){var o=n(1),r=n(6),i=n(20),c=function(t,e,n){var a,u,s,l=t&c.F,f=t&c.G,d=t&c.S,p=t&c.P,h=t&c.B,m=t&c.W,v=f?r:r[e]||(r[e]={}),g=f?o:d?o[e]:(o[e]||{}).prototype;f&&(n=e);for(a in n)(u=!l&&g&&a in g)&&a in v||(s=u?g[a]:n[a],v[a]=f&&"function"!=typeof g[a]?n[a]:h&&u?i(s,o):m&&g[a]==s?function(t){var e=function(e){return this instanceof t?new t(e):t(e)};return e.prototype=t.prototype,e}(s):p&&"function"==typeof s?i(Function.call,s):s,p&&((v.prototype||(v.prototype={}))[a]=s))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,t.exports=c},function(t,e,n){var o=n(21);t.exports=function(t,e,n){if(o(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,o){return t.call(e,n,o)};case 3:return function(n,o,r){return t.call(e,n,o,r)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){t.exports=n(23)},function(t,e,n){var o=n(0),r=n(7);t.exports=n(4)?function(t,e,n){return o.setDesc(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var o=n(0).setDesc,r=n(3),i=n(9)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,i)&&o(t,i,{configurable:!0,value:e})}},function(t,e,n){var o=n(0),r=n(2);t.exports=function(t,e){for(var n,i=r(t),c=o.getKeys(i),a=c.length,u=0;a>u;)if(i[n=c[u++]]===e)return n}},function(t,e,n){var o=n(11);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==o(t)?t.split(""):Object(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var o=n(2),r=n(0).getNames,i={}.toString,c="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return r(t)}catch(t){return c.slice()}};t.exports.get=function(t){return c&&"[object Window]"==i.call(t)?a(t):r(o(t))}},function(t,e,n){var o=n(0);t.exports=function(t){var e=o.getKeys(t),n=o.getSymbols;if(n)for(var r,i=n(t),c=o.isEnum,a=0;i.length>a;)c.call(t,r=i[a++])&&e.push(r);return e}},function(t,e,n){var o=n(11);t.exports=Array.isArray||function(t){return"Array"==o(t)}},function(t,e,n){var o=n(32);t.exports=function(t){if(!o(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports=!0},function(t,e){},function(t,e,n){"use strict";function o(t){t in r||(r[t]=!0,document.dispatchEvent(new CustomEvent("o."+t)))}var r={};if(window.addEventListener("load",o.bind(null,"load")),window.addEventListener("load",o.bind(null,"DOMContentLoaded")),document.addEventListener("DOMContentLoaded",o.bind(null,"DOMContentLoaded")),document.onreadystatechange=function(){"complete"===document.readyState?(o("DOMContentLoaded"),o("load")):"interactive"!==document.readyState||document.attachEvent||o("DOMContentLoaded")},"complete"===document.readyState?(o("DOMContentLoaded"),o("load")):"interactive"!==document.readyState||document.attachEvent||o("DOMContentLoaded"),document.attachEvent){var i=!1,c=50;try{i=null===window.frameElement&&document.documentElement}catch(t){}i&&i.doScroll&&function t(){if(!("DOMContentLoaded"in r)){try{i.doScroll("left")}catch(e){return c<5e3?setTimeout(t,c*=1.2):void 0}o("DOMContentLoaded")}}()}}]);
},{}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(config) {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    },
    data: config && config.hot
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://localhost:51746/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id, undefined, {
    hot: true
  });

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,53])
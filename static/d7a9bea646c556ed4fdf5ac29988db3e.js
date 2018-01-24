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
})({8:[function(require,module,exports) {
const e=document.querySelector(".rightcircle"),t=document.querySelector(".leftcircle"),n=document.querySelector(".inner"),i=10;let s=!1;function o(){s=!0,e.style.cssText="animation-play-state:paused;",t.style.cssText="animation-play-state:paused;"}function c(){s=!1;const o=(new Date).getTime();e.style.webkitAnimation="none",t.style.webkitAnimation="none",setTimeout(function(){e.style.webkitAnimation="",t.style.webkitAnimation="",e.style.cssText="animation-play-state:running;",t.style.cssText="animation-play-state:running;"},10);const c=setInterval(()=>{const e=(new Date).getTime(),t=i-Math.floor((e-o)/1e3);t>=0&&!s?n.innerHTML=t:clearInterval(c)},10)}document.querySelector("#answer").addEventListener("click",function(e){document.querySelector(".score-bar.right > .score").innerHTML=200,document.querySelector(".score-bar.right > .score-process-bar").style.cssText="height: 1rem;",o()}),setTimeout(()=>{c()},1e3);
},{}]},{},[8])
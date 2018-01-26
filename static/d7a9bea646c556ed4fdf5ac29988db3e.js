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
})({14:[function(require,module,exports) {
const e=document.querySelector("#countdown svg circle");e.style.webkitAnimation="none";const t=document.querySelector(".inner"),s=10;let n=!1,o=0,i=0;function a(){n=!0,e.style.animationPlayState="paused",e.style.webkitAnimationPlayState="paused"}function r(){n=!1;const o=(new Date).getTime();e.style.webkitAnimation="none",setTimeout(function(){e.style.webkitAnimation="",e.style.animationPlayState="running"},10);const i=setInterval(()=>{const e=(new Date).getTime(),a=s-Math.floor((e-o)/1e3);a>=0&&!n?t.innerHTML=a:(a<=0&&(document.querySelectorAll(".options-wrapper .option").forEach(e=>{e.classList.add("zoomOut")}),l.nu<1&&(l.nu+=1)),clearInterval(i))},10)}function c(e){a(),o+=200,i+=1.33,document.querySelector(".score-bar.right > .score").innerHTML=o,document.querySelector(".score-bar.right > .score-process-bar").style.cssText=`height: ${i}rem;`}setTimeout(()=>{document.querySelector(".head .left").classList.add("slideInLeft"),document.querySelector(".head .right").classList.add("slideInRight"),document.querySelector(".head .decoration").classList.add("zoomIn")},1e3);const l=new Vue({data:()=>({isShow:!1,nu:0,qs:[{title:"2016年的G20峰会是在中国的哪个城市举办的？",options:[{name:"深圳",isAnswer:!1},{name:"北京",isAnswer:!1},{name:"上海",isAnswer:!1},{name:"杭州",isAnswer:!0}]},{title:"下列城市不属于直辖市的是？",options:[{name:"深圳",isAnswer:!0},{name:"北京",isAnswer:!1},{name:"上海",isAnswer:!1},{name:"重庆",isAnswer:!1}]}]}),mounted(){setTimeout(()=>{r(),this.isShow=!0},2e3)},watch:{nu(e){setTimeout(()=>{r(),document.querySelectorAll(".options-wrapper .option").forEach(e=>{e.classList.remove("zoomOut"),e.classList.add("zoomIn")})},1e3)}},methods:{onClickOption(e,t){e.target.classList.remove("zoomIn"),e.target.classList.add("pulse"),this.qs[this.nu].options[t].isAnswer?(e.target.classList.add("check"),c()):e.target.classList.add("fail"),a(),setTimeout(()=>{document.querySelectorAll(".options-wrapper .option").forEach(e=>{e.classList.add("zoomOut")}),setTimeout(()=>{e.target.classList.remove("check"),e.target.classList.remove("fail"),this.nu<1&&(this.nu+=1)},1e3)},2e3)}}}).$mount("#vue-app");
},{}]},{},[14])
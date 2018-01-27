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
const t=document.querySelector("#countdown svg circle");t.style.webkitAnimation="none";const e=document.querySelector(".inner"),o=10;let s=!1,i=0,n=0,c=0,r=0;function a(){s=!0,t.style.animationPlayState="paused",t.style.webkitAnimationPlayState="paused"}function l(){s=!1;const i=(new Date).getTime();t.style.webkitAnimation="none",setTimeout(function(){t.style.webkitAnimation="",t.style.animationPlayState="running"},10);const n=setInterval(()=>{const t=(new Date).getTime(),c=o-Math.floor((t-i)/1e3);c>=0&&!s?e.innerHTML=c:(c<=0&&(document.querySelectorAll(".options-wrapper .option").forEach(t=>{t.classList.add("zoomOut")}),m.topicIndex<m.qs.length-1&&(m.stopNum=0,m.topicIndex+=1)),clearInterval(n))},10)}function d(t){"man"===t?(i+=200,n+=1.33,document.querySelector(".score-bar.right > .score").innerHTML=i,document.querySelector(".score-bar.right > .score-process-bar").style.cssText=`height: ${n}rem;`):(c+=200,r+=1.33,document.querySelector(".score-bar.left > .score").innerHTML=c,document.querySelector(".score-bar.left > .score-process-bar").style.cssText=`height: ${r}rem;`)}setTimeout(()=>{document.querySelector(".head .left").classList.add("slideInLeft"),document.querySelector(".head .right").classList.add("slideInRight"),document.querySelector(".head .decoration").classList.add("zoomIn"),document.querySelector(".head .timer-process").classList.add("zoomIn")},1e3);const m=new Vue({data:()=>({isShow:!1,stopNum:0,topicIndex:0,qs:[{title:"2016年的G20峰会是在中国的哪个城市举办的？",options:["深圳","上海","北京","杭州"],answer:3,robot:{select:3,time:2}},{title:"下列城市不属于直辖市的是？",options:["深圳","北京","上海","重庆"],answer:0,robot:{select:3,time:3}},{title:"太阳光从发射需多久可到达地球？",options:["8天","8分钟","8小时","8秒"],answer:1,robot:{select:1,time:4}},{title:"太平洋上哪些异常的气候现象别称为“圣婴现象？”",options:["温带季风","热带季风","海市蜃楼","厄尔尼诺"],answer:3,robot:{select:3,time:1}},{title:"战国七雄不包括以下哪个国家？",options:["魏国","韩国","秦国","吴国"],answer:3,robot:{select:3,time:2}}]}),mounted(){setTimeout(()=>{l(),this.isShow=!0,this.setRobot()},2e3)},watch:{topicIndex(t){t<this.qs.length&&setTimeout(()=>{l(),document.querySelectorAll(".options-wrapper .option").forEach(t=>{t.classList.add("zoomIn")}),this.setRobot()},1e3)},stopNum(t){if(2===t){a();const t=this.qs[this.topicIndex].answer;document.querySelectorAll(".options-wrapper .option")[t].classList.add("check");const e=this.qs[this.topicIndex].robot.select,o=document.querySelectorAll(".options-wrapper .option")[e];e===t?o.classList.add("check"):o.classList.add("fail"),setTimeout(()=>{document.querySelectorAll(".options-wrapper .option").forEach(t=>{t.classList.add("zoomOut"),setTimeout(()=>{t.classList.remove("zoomOut"),t.classList.remove("check"),t.classList.remove("fail"),t.classList.remove("by-man"),t.classList.remove("by-robot")},1e3)})},2e3),setTimeout(()=>{this.topicIndex<this.qs.length-1&&(this.stopNum=0,this.topicIndex+=1)},3e3)}}},methods:{onClickOption(t,e){this.stopNum<2&&(t.target.classList.remove("zoomIn"),t.target.classList.add("pulse"),t.target.classList.add("by-man"),this.qs[this.topicIndex].answer===e?(t.target.classList.add("check"),d("man")):t.target.classList.add("fail"),this.stopNum++)},setRobot(){const t=1e3*this.qs[this.topicIndex].robot.time,e=this.qs[this.topicIndex].robot.select,o=this.qs[this.topicIndex].answer,s=document.querySelectorAll(".options-wrapper .option")[e];setTimeout(()=>{s.classList.add("by-robot"),e===o&&d("robot"),this.stopNum++},t)}}}).$mount("#vue-app");
},{}]},{},[14])
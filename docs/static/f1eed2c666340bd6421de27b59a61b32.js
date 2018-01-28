// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
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

      var module = cache[name] = new newRequire.Module;

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
})({16:[function(require,module,exports) {
const circle = document.querySelector('#countdown svg circle')
circle.style.webkitAnimation = 'none'
const show = document.querySelector('.inner')
const initSecond = 10
let isEnd = false
let score = 0
let progress = 0
let robotScore = 0
let robotProgress = 0

function end() {
  isEnd = true
  circle.style.animationPlayState = 'paused'
  circle.style.webkitAnimationPlayState = 'paused'
}

function run() {
  isEnd = false
  const startTime = new Date().getTime()
  circle.style.webkitAnimation = 'none'
  setTimeout(function() {
    circle.style.webkitAnimation = ''
    circle.style.animationPlayState = 'running'
  }, 10)
  const i = setInterval(() => {
    const currentTime = new Date().getTime()
    const leftTime = initSecond - Math.floor((currentTime - startTime) / 1000)
    if (leftTime >= 0 && !isEnd) {
      show.innerHTML = leftTime
    } else {
      // man over the time
      if (leftTime <= 0) {
        document.querySelectorAll('.options-wrapper .option').forEach(ele => {
          ele.classList.add('zoomOut')
        })
        if (app.topicIndex < app.qs.length - 1) {
          app.stopNum = 0
          app.topicIndex += 1
        }
      }
      clearInterval(i)
    }
  }, 10)
}

function upScore(who) {
  if (who === 'man') {
    score += 200
    progress += 1.33
    document.querySelector('.score-bar.right > .score').innerHTML = score
    document.querySelector('.score-bar.right > .score-process-bar').style.cssText = `height: ${progress}rem;`
  } else {
    robotScore += 200
    robotProgress += 1.33
    document.querySelector('.score-bar.left > .score').innerHTML = robotScore
    document.querySelector('.score-bar.left > .score-process-bar').style.cssText = `height: ${robotProgress}rem;`
  }
}

// head element enter
setTimeout(() => {
  document.querySelector('.head .left').classList.add('slideInLeft')
  document.querySelector('.head .right').classList.add('slideInRight')
  document.querySelector('.head .decoration').classList.add('zoomIn')
  document.querySelector('.head .timer-process').classList.add('zoomIn')
}, 1000)

const app = new Vue({
  data() {
    return {
      isShow: false,
      stopNum: 0, // stopNum equal to 2 will execute end function
      topicIndex: 0,
      qs: [
        {
          title: '2016年的G20峰会是在中国的哪个城市举办的？',
          options: ['深圳', '上海', '北京', '杭州'],
          answer: 3,
          robot: {
            select: 3,
            time: 2
          }
        },
        {
          title: '下列城市不属于直辖市的是？',
          options: ['深圳', '北京', '上海', '重庆'],
          answer: 0,
          robot: {
            select: 3,
            time: 3
          }
        },
        {
          title: '太阳光从发射需多久可到达地球？',
          options: ['8天', '8分钟', '8小时', '8秒'],
          answer: 1,
          robot: {
            select: 1,
            time: 4
          }
        },
        {
          title: '太平洋上哪些异常的气候现象别称为“圣婴现象？”',
          options: ['温带季风', '热带季风', '海市蜃楼', '厄尔尼诺'],
          answer: 3,
          robot: {
            select: 3,
            time: 1
          }
        },
        {
          title: '战国七雄不包括以下哪个国家？',
          options: ['魏国', '韩国', '秦国', '吴国'],
          answer: 3,
          robot: {
            select: 3,
            time: 2
          }
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      run()
      this.isShow = true
      this.setRobot()
    }, 2000)
  },
  watch: {
    topicIndex(n) {
      if (n < this.qs.length) {
        setTimeout(() => {
          run()
          document.querySelectorAll('.options-wrapper .option').forEach(ele => {
            ele.classList.add('zoomIn')
          })

          this.setRobot()
        }, 1000)
      }
    },
    stopNum(n) {
      if (n === 2) {
        // stop cut time
        end()

        // show correct answer
        const correctIndex = this.qs[this.topicIndex]['answer']
        const correctElm = document.querySelectorAll('.options-wrapper .option')[correctIndex]
        correctElm.classList.add('check')

        // show robot answer
        const robotSelectIndex = this.qs[this.topicIndex]['robot']['select']
        const robotSelectElm = document.querySelectorAll('.options-wrapper .option')[robotSelectIndex]
        if (robotSelectIndex === correctIndex) {
          robotSelectElm.classList.add('check')
        } else {
          robotSelectElm.classList.add('fail')
        }

        // hide options
        setTimeout(() => {
          document.querySelectorAll('.options-wrapper .option').forEach(ele => {
            ele.classList.add('zoomOut')

            // clear class
            setTimeout(() => {
              ele.classList.remove('zoomOut')
              ele.classList.remove('check')
              ele.classList.remove('fail')
              ele.classList.remove('by-man')
              ele.classList.remove('by-robot')
            }, 1000)
          })
        }, 2000)

        // next topic
        setTimeout(() => {
          if (this.topicIndex < this.qs.length - 1) {
            this.stopNum = 0
            this.topicIndex += 1
            console.log(this.topicIndex, 'this.topicIndex')
          }
        }, 3000)
      }
    }
  },
  methods: {
    onClickOption(e, index) {
      // man select
      if (this.stopNum < 2) {
        e.target.classList.remove('zoomIn')
        e.target.classList.add('pulse')
        e.target.classList.add('by-man')
        if (this.qs[this.topicIndex]['answer'] === index) {
          e.target.classList.add('check')
          upScore('man')
        } else {
          e.target.classList.add('fail')
        }
        this.stopNum++
      }
    },
    setRobot() {
      const d = this.qs[this.topicIndex]['robot']['time'] * 1000
      const index = this.qs[this.topicIndex]['robot']['select']
      const correctIndex = this.qs[this.topicIndex]['answer']
      const selectElm = document.querySelectorAll('.options-wrapper .option')[index]
      setTimeout(() => {
        selectElm.classList.add('by-robot')
        if (index === correctIndex) {
          upScore('robot')
        }
        this.stopNum++
      }, d)
    }
  }
}).$mount('#vue-app')

},{}]},{},[16])
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
})({9:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var markColorWarn = '#BA5151';
var markColorRun = '#00AAEE';
var markColorDefault = '#E0E0E0';
var sliceUp = markColorRun;
var sliceDown = markColorDefault;
var intervalStartTime = null;
var intervalCutdownTime = null;
var intervalAnimateZero = null;
var intervalAnimateTwo = null;
var startTimeVBack = 0;
var timeZone = +8; // 东8区
var cdTime = '0000000120000'; // 倒计时时间
var cTime = '0000000030000'; // 计时器一圈用时

function calcDeg(deg) {
  return Math.PI / 180 * (deg - 90);
}

// handle zeros for minutes and seconds
function numPad0(str) {
  var cStr = str.toString();
  if (cStr.length < 2) {
    str = 0 + cStr;
  }
  return str;
}

function createNSElm(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function IsCrossMidNight(newTimeStamp, oldTimeStamp) {
  // 隔天重置
  var newTimeYear = new Date(newTimeStamp).getFullYear();
  var newTimeMonth = new Date(newTimeStamp).getMonth();
  var newTimeDate = new Date(newTimeStamp).getDate();
  var oldTimeYear = new Date(oldTimeStamp).getFullYear();
  var oldTimeMonth = new Date(oldTimeStamp).getMonth();
  var oldTimeDate = new Date(oldTimeStamp).getDate();
  return newTimeYear > oldTimeYear || newTimeMonth > oldTimeMonth || newTimeDate > oldTimeDate;
}

var Dial = function (container) {
  this.container = container;
  this.designBase = 604;
  this.size = this.container.clientWidth;
  this.pointR = this.size * 12 / this.designBase;
  this.strokeWidth = this.size * 4 / this.designBase;
  this.margin = this.pointR - this.strokeWidth / 2;
  this.radius = this.size - this.margin * 2;
  this.progress = this.container.dataset.progress;
  this.svg;
  this.defs;
  this.slice;
  this.sliceOverlay;
  this.overlay;
  this.text;
  this.point;
  this.create();
};

Dial.prototype.create = function () {
  this.createSvg();
  this.createSlice();
  this.createSliceOverylay();
  this.createOverlay();
  this.createText();
  this.container.appendChild(this.svg);
};

Dial.prototype.createSvg = function () {
  var svg = createNSElm('svg');
  svg.setAttribute('width', this.size + 'px');
  svg.setAttribute('height', this.size + 'px');
  this.svg = svg;
};

Dial.prototype.createSlice = function () {
  var slice = createNSElm('path');
  slice.setAttribute('fill', 'none');
  slice.setAttribute('stroke', sliceDown);
  slice.setAttribute('stroke-width', this.strokeWidth);
  slice.setAttribute('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  var xy = this.size / 2 - this.margin;
  var d = this.describeArc(xy, xy, xy, 0, 359.99);
  slice.setAttribute('d', d);
  this.svg.appendChild(slice);
  this.slice = slice;
};

Dial.prototype.createSliceOverylay = function () {
  var sliceOverlay = createNSElm('path');
  sliceOverlay.setAttribute('fill', 'none');
  sliceOverlay.setAttribute('stroke', sliceUp);
  sliceOverlay.setAttribute('stroke-width', this.strokeWidth);
  sliceOverlay.setAttribute('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  this.svg.appendChild(sliceOverlay);
  this.sliceOverlay = sliceOverlay;
};

Dial.prototype.createOverlay = function () {
  var r = this.size / 2 - this.margin - this.strokeWidth;
  var circle = createNSElm('circle');
  circle.setAttribute('cx', this.size / 2);
  circle.setAttribute('cy', this.size / 2);
  circle.setAttribute('r', r);
  circle.setAttribute('fill', '#fff');
  this.svg.appendChild(circle);
  this.overlay = circle;
};

Dial.prototype.createText = function () {
  var fontSize = this.size * 138 / this.designBase;
  var text = createNSElm('text');
  text.setAttribute('x', this.size / 2);
  text.setAttribute('y', this.size * 353 / this.designBase);
  text.setAttribute('font-family', 'Helvetica,STHeiTi,sans-serif');
  text.setAttribute('font-size', fontSize);
  text.setAttribute('font-weight', 'lighter');
  text.setAttribute('fill', '#333333');
  text.setAttribute('text-anchor', 'middle');

  // 读取之前时长
  var passDurationTime = localStorage.getItem('passDurationTime') || 0;
  var todayFirstStartTimeStamp = +localStorage.getItem('todayFirstStartTimeStamp');
  if (!todayFirstStartTimeStamp) {
    localStorage.setItem('todayFirstStartTimeStamp', +new Date());
    todayFirstStartTimeStamp = +new Date();
  }
  var startDateStamp = +new Date() - passDurationTime;
  var currentDateStamp = +new Date();
  if (IsCrossMidNight(currentDateStamp, todayFirstStartTimeStamp)) {
    localStorage.setItem('todayFirstStartTimeStamp', +new Date());
    localStorage.setItem('passDurationTime', 0);
    startDateStamp = currentDateStamp;
  }
  var timeDuration = currentDateStamp - startDateStamp;
  var currentZoneTimeDuration = timeDuration - timeZone * 60 * 60 * 1000;
  var runHr = new Date(currentZoneTimeDuration).getHours();
  var runMin = new Date(currentZoneTimeDuration).getMinutes();
  var runSec = new Date(currentZoneTimeDuration).getSeconds();
  var runTime = numPad0(runHr) + ':' + numPad0(runMin) + ':' + numPad0(runSec);

  text.appendChild(document.createTextNode(runTime));
  this.svg.appendChild(text);
  this.text = text;
};

Dial.prototype.createPoint = function () {
  var r = this.pointR;
  var circle = createNSElm('circle');
  circle.setAttribute('cx', this.size / 2);
  circle.setAttribute('cy', this.strokeWidth / 2 + this.margin);
  circle.setAttribute('r', r);
  circle.setAttribute('fill', markColorRun);
  circle.setAttribute('class', '_cp-point_js');
  this.svg.appendChild(circle);
  this.point = circle;
};
Dial.prototype.removePoint = function () {
  var p = document.querySelector('svg ._cp-point_js');
  if (p) {
    p.remove();
    this.point = null;
  }
};

Dial.prototype.animateStart = function (mode, initV, callback) {
  var v = initV || 0;
  var self = this;
  if (mode === 1) {
    // 顺时针展示进度
    var intervalAnimateOne = setInterval(function () {
      var p = +(v / self.progress).toFixed(2);
      var a = p < 0.95 ? 2 - 2 * p : 0.05;
      v += a;
      // Stop
      if (v >= +self.progress) {
        v = self.progress;
        clearInterval(intervalAnimateOne);
      }
      self.setValue(v);
    }, 10);
  } else if (mode === 2) {
    // 逆时针2分钟转一周
    let startDateStamp = +new Date();
    intervalAnimateTwo = setInterval(function () {
      var currentDateStamp = +new Date();
      var _s = currentDateStamp - startDateStamp;
      v = (1 - _s / cdTime) * 100;
      if (v <= 0) {
        clearInterval(intervalAnimateTwo);
        sliceUp = markColorWarn;
        self.slice.setAttribute('stroke', sliceUp);
        callback();
      }
      self.setValue(v, 0);
    }, 25);
  } else if (mode === 3) {
    // 逆时针回退进度
    var intervalAnimateThree = setInterval(function () {
      v -= 5;
      // Stop
      if (v <= +self.progress) {
        v = self.progress;
        clearInterval(intervalAnimateThree);
      }
      self.setValue(v);
    }, 10);
  } else {
    // 顺时针不停匀速转动
    let startDateStamp = +new Date();
    intervalAnimateZero = setInterval(function () {
      var currentDateStamp = +new Date();
      var _s = currentDateStamp - startDateStamp;
      v = _s / cTime * 100;
      startTimeVBack = v % 100;
      self.setValue(v % 100);
    }, 25);
  }
};

Dial.prototype.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
};

Dial.prototype.describeArc = function (x, y, radius, startAngle, endAngle) {
  var start = this.polarToCartesian(x, y, radius, endAngle);
  var end = this.polarToCartesian(x, y, radius, startAngle);
  var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  return d;
};

Dial.prototype.setValue = function (value, dir) {
  var c = value / 100 * 360;
  if (c === 360) {
    c = 359.99;
  }
  var xy = this.size / 2 - this.margin;
  var d = this.describeArc(xy, xy, xy, 0, 0 + c);
  var _c = calcDeg(c);
  if (dir === 0) {
    _c = calcDeg(-c);
    d = this.describeArc(xy, xy, xy, 0 - c, 0);
  }
  this.sliceOverlay.setAttribute('d', d);
  if (this.point) {
    var r = this.size / 2 - this.margin - this.strokeWidth / 2;
    this.point.setAttribute('cx', r * Math.cos(_c) + this.size / 2);
    this.point.setAttribute('cy', r * Math.sin(_c) + this.size / 2);
  }
};

Dial.prototype.updateTime = function () {
  var _this = this;
  var passDurationTime = localStorage.getItem('passDurationTime') || 0;
  var todayFirstStartTimeStamp = +localStorage.getItem('todayFirstStartTimeStamp');
  if (!todayFirstStartTimeStamp) {
    localStorage.setItem('todayFirstStartTimeStamp', +new Date());
    todayFirstStartTimeStamp = +new Date();
  }
  var startDateStamp = +new Date() - passDurationTime;
  intervalStartTime = setInterval(function () {
    var currentDateStamp = +new Date();
    if (IsCrossMidNight(currentDateStamp, todayFirstStartTimeStamp)) {
      localStorage.setItem('todayFirstStartTimeStamp', +new Date());
      startDateStamp = currentDateStamp;
    }
    var timeDuration = currentDateStamp - startDateStamp;
    // console.log('当前在线时长并存储', timeDuration)
    localStorage.setItem('passDurationTime', timeDuration);
    var currentZoneTimeDuration = timeDuration - timeZone * 60 * 60 * 1000;
    var runHr = new Date(currentZoneTimeDuration).getHours();
    var runMin = new Date(currentZoneTimeDuration).getMinutes();
    var runSec = new Date(currentZoneTimeDuration).getSeconds();
    var runTime = numPad0(runHr) + ':' + numPad0(runMin) + ':' + numPad0(runSec);
    _this.text.textContent = runTime;
  }, 100);
};

Dial.prototype.updateCutDownTime = function (cT) {
  var _this = this;
  var startDateStamp = +new Date();
  intervalCutdownTime = setInterval(function () {
    var currentDateStamp = +new Date();
    var _s = cT - (currentDateStamp - startDateStamp);
    if (_s <= 0) {
      clearInterval(intervalCutdownTime);
      _this.text.textContent = '00:00:00';
      return false;
    }
    var cDT = new Date(_s);
    var runMin = cDT.getMinutes();
    var runSec = cDT.getSeconds();
    var runMilliSec = cDT.getMilliseconds();
    var runTime = numPad0(runMin) + ':' + numPad0(runSec) + ':' + numPad0(Math.floor(runMilliSec / 10));
    _this.text.textContent = runTime;
  }, 50);
};

Dial.prototype.timeStart = function () {
  this.createPoint();
  this.updateTime();
  this.animateStart(0);
};

Dial.prototype.timeStop = function () {
  this.removePoint();
  clearInterval(intervalStartTime);
  clearInterval(intervalAnimateZero);
  this.progress = 0.01;
  this.animateStart(3, startTimeVBack);
};

Dial.prototype.timeReset = function () {
  this.removePoint();
  clearInterval(intervalStartTime);
  clearInterval(intervalAnimateZero);
  this.progress = 0.01;
  this.animateStart(3, startTimeVBack);
  this.text.textContent = '00:00:00';
};

Dial.prototype.cutDownStart = function (callback) {
  sliceUp = markColorWarn;
  this.sliceOverlay.setAttribute('stroke', sliceUp);
  this.text.setAttribute('fill', markColorWarn);
  this.updateCutDownTime(cdTime);
  this.animateStart(2, null, callback);
};

Dial.prototype.cutDownReset = function () {
  clearInterval(intervalCutdownTime);
  clearInterval(intervalAnimateTwo);
  sliceUp = markColorRun;
  sliceDown = markColorDefault;
  this.sliceOverlay.setAttribute('stroke', sliceUp);
  this.slice.setAttribute('stroke', sliceDown);
  this.text.setAttribute('fill', '#000');
  this.setValue(0);
  this.text.textContent = '00:00:00';
};

Dial.prototype.warn = function () {
  this.slice.setAttribute('stroke', markColorWarn);
  this.text.setAttribute('fill', markColorWarn);
  this.text.textContent = '00:00:00';
};

exports.default = Dial;
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
  var ws = new WebSocket('ws://localhost:54998/');
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
},{}]},{},[0,9])
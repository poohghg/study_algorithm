// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/6.sort/sort.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function jsSort(arr) {
  // 올림차순
  // -(음수)를 반환하면 a,b
  console.log(arr.sort(function (a, b) {
    return a - b;
  })); // 내림차순
  // +(양수)를 반환하면 b,a

  console.log(arr.sort(function (a, b) {
    return b - a;
  }));
}

function bubbleSort(arr) {
  function swap(arr, inx1, inx2) {
    var temp = arr[inx1];
    arr[inx1] = arr[inx2];
    arr[inx2] = temp;
  }

  for (var i = arr.length; i >= 1; i--) {
    for (var j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) swap(arr, j, j + 1);
    }
  }

  return arr;
}

function refactBubbleSort(arr) {
  function swap(arr, inx1, inx2) {
    var temp = arr[inx1];
    arr[inx1] = arr[inx2];
    arr[inx2] = temp;
  } // 비교를 수행할 횟수.


  for (var i = arr.length; i > 0; i--) {
    // 현재루프에서 스왑을 하고있는지 확인.
    var isSwap = true;

    for (var j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        isSwap = false;
      }
    }

    if (isSwap) {
      break;
    }
  }

  return arr;
} // console.log(refactBubbleSort([1, 2, 3, 5, 6, 3]));


function selectionSort(arr) {
  function swap(arr, inx1, inx2) {
    var temp = arr[inx1];
    arr[inx1] = arr[inx2];
    arr[inx2] = temp;
  }

  for (var i = 0; i < arr.length; i++) {
    var minIndex = i;

    for (var j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) minIndex = j;
    }

    if (i !== minIndex) {
      swap(arr, i, minIndex);
    }
  }

  return arr;
} // console.log(selectionSort([4, 1, 2, 3]));


function insertionSort(arr) {
  function swap(arr, idx1, idx2) {
    var temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  }

  for (var i = 1; i < arr.length; i++) {
    var curV = arr[i];
    var lastJ = void 0; // 순서를 바꿔야 하는 조건

    for (var j = i - 1; j >= 0 && arr[j] > curV; j--) {
      arr[j + 1] = arr[j];
      lastJ = j;
    }

    if (lastJ >= 0) arr[lastJ] = curV;
  }

  return arr;
} // console.log(insertionSort([1, 0, 1, 2, 3, 0]));
// 1, 2, 0, 3;


function mergeSort(arr) {
  function merge(arr1, arr2) {
    var i = 0,
        j = 0,
        newArr = [];

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        newArr.push(arr1[i]);
        i++;
      } else {
        newArr.push(arr2[j]);
        j++;
      }
    }

    while (i < arr1.length) {
      newArr.push(arr1[i]);
      i++;
    }

    while (j < arr2.length) {
      newArr.push(arr2[j]);
      j++;
    }

    return newArr;
  }

  function sort(arr) {
    if (arr.length <= 1) return arr;
    var middle = Math.floor(arr.length / 2);
    var left = sort(arr.slice(0, middle));
    var right = sort(arr.slice(middle));
    return merge(left, right);
  }

  return sort(arr);
} // console.log(mergeSort([1, 0, 1, 2, 3, 0]));


function refactMergeSort(arr) {
  function merge(arr1, arr2) {
    var i = 0,
        j = 0,
        newArr = [];

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        newArr.push(arr1[i]);
        i++;
      } else {
        newArr.push(arr2[j]);
        j++;
      }
    }

    while (i < arr1.length) {
      newArr.push(arr1[i]);
      i++;
    }

    while (j < arr2.length) {
      newArr.push(arr2[j]);
      j++;
    }

    return newArr;
  }

  function splitArr(arr) {
    // console.log(arr);
    if (arr.length <= 1) return arr;
    var middle = Math.floor(arr.length / 2);
    var left = splitArr(arr.slice(0, middle));
    var right = splitArr(arr.slice(middle));
    return merge(left, right);
  }

  return splitArr(arr);
} // console.log(refactMergeSort([1, 0, 1, 2]));


function quickSort(arr) {
  function refactQuickSort(arr) {
    function swap(arr, i, j) {
      if (i === j) return;
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    function pivot(arr) {
      if (arr.length <= 1) return arr;
      var selectedPivot = arr[0];
      var index = 0;

      for (var i = 1; i < arr.length; i++) {
        // 피벗값보다 작은면 왼쪽
        // 아니면 오른쪽으로 배열을 정렬하자
        if (arr[i] < selectedPivot) {
          arr[index] = arr[i];
          arr[i] = arr[index + 1];
          index++;
        }
      }

      arr[index] = selectedPivot;
      return index;
    }

    pivot([5, 1, 7, 9, 1]);
  }

  function pivot(arr, start, end) {
    var selectedPivot = arr[start]; // 피봇의 index, 피봇값의 자리

    var swapIdx = start;

    for (var i = start + 1; i <= end; i++) {
      if (selectedPivot > arr[i]) {
        swapIdx++;
        swap(arr, swapIdx, i);
      }
    }

    swap(arr, start, swapIdx);
    return swapIdx;
  }

  function main(arr, left, right) {
    if (left < right) {
      var pivotIndex = pivot(arr, left, right);
      main(arr, left, pivotIndex - 1);
      main(arr, pivotIndex + 1, right);
    }

    return arr;
  }

  main(arr, 0, arr.length - 1);
  return arr;
}

function qsort(arr) {
  function swap(arr, i, j) {
    if (i === j) return;
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  function pivot(arr, start, end) {
    var middle = Math.floor((start + end) / 2);
    var curPivot = arr[middle];
    var index = middle;

    for (var i = start; i <= end; i++) {
      if (i < middle && arr[i] > curPivot) {
        index--;
        swap(arr, index, i);
      } else if (i > middle && arr[i] < curPivot) {
        index++;
        swap(arr, index, i);
      } else if (i === middle) {
        swap(arr, middle, index); // 현재 인덱스

        middle = index;
      }
    }

    swap(arr, middle, index);
    return index;
  }

  function main(arr, left, right) {
    if (left < right) {
      var pivotIndex = pivot(arr, left, right);
      console.log('pivotIndex', pivotIndex);
      main(arr, left, pivotIndex - 1);
      main(arr, pivotIndex + 1, right);
    }

    return arr;
  }

  main(arr, 0, arr.length - 1);
  return arr;
} // console.clear();
// console.log(qsort([1, 5, 3, 4, 5, 1, 3, 12, 312, 31]));


function radixSort(arr) {
  // 수와 자릿수를 입력받아
  // 해당 자릿수의 수를 리턴해주는 함수
  function getDigit(num, digit) {
    return Math.floor(Math.abs(num) / Math.pow(10, digit) % 10);
  }

  function getMaxCnt(arr) {
    var max = 0; // 해당수가 몇의 자리수인지 구한다.

    function digitCount(num) {
      if (num === 0) return 1;
      return Math.floor(Math.log10(Math.abs(num)) + 1); // return num.toString().length;
    }

    arr.forEach(function (i) {
      var cnt = digitCount(i);
      if (cnt > max) max = cnt;
    });
    return max;
  }

  var maxCnt = getMaxCnt(arr); // const cnt

  for (var i = 0; i < maxCnt; i++) {
    var _ref;

    var buffer = Array.from({
      length: 10
    }, function () {
      return [];
    });

    for (var j = 0; j < arr.length; j++) {
      var digit = getDigit(arr[j], i);
      buffer[digit].push(arr[j]);
    }

    arr = (_ref = []).concat.apply(_ref, _toConsumableArray(buffer));
  }

  return arr;
}

radixSort([1, 321, 12, 5, 3, 27, 1]);

function rSort(arr) {
  var getDigit = function getDigit(nums, digit) {
    return Math.floor(Math.abs(nums) / Math.pow(10, digit) % 10);
  };

  var getMaxCnt = function getMaxCnt(arr) {
    var max = 0;

    var getNumsLen = function getNumsLen(num) {
      return num.toString().length;
    };

    arr.forEach(function (v) {
      var curVLen = getNumsLen(v);
      if (curVLen > max) max = curVLen;
    });
    return max;
  }; // 최대 자릿수


  var maxCnt = getMaxCnt(arr);

  for (var k = 0; k < maxCnt; k++) {
    var _ref2;

    var buffer = Array.from({
      length: 10
    }, function () {
      return [];
    });

    for (var i = 0; i < arr.length; i++) {
      var digit = getDigit(arr[i], k);
      buffer[digit].push(arr[i]);
    } // flatten


    arr = (_ref2 = []).concat.apply(_ref2, _toConsumableArray(buffer));
  }

  console.log(arr);
  return arr;
}

rSort([3, 1, 3, 41, 312]);
},{}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49476" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
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

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/6.sort/sort.js"], null)
//# sourceMappingURL=/sort.f691b840.js.map
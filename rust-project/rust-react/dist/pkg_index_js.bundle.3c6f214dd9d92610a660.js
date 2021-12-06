"use strict";
(self["webpackChunkreact_wasm"] = self["webpackChunkreact_wasm"] || []).push([["pkg_index_js"],{

/***/ "./pkg/index.js":
/*!**********************!*\
  !*** ./pkg/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__wbg_alert_8e43add6d29df9d1": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_alert_8e43add6d29df9d1),
/* harmony export */   "__wbindgen_throw": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_throw),
/* harmony export */   "big_computation": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.big_computation),
/* harmony export */   "welcome": () => (/* reexport safe */ _index_bg_js__WEBPACK_IMPORTED_MODULE_0__.welcome)
/* harmony export */ });
/* harmony import */ var _index_bg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index_bg.js */ "./pkg/index_bg.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index_bg_js__WEBPACK_IMPORTED_MODULE_0__]);
_index_bg_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];


});

/***/ }),

/***/ "./pkg/index_bg.js":
/*!*************************!*\
  !*** ./pkg/index_bg.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__) => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "big_computation": () => (/* binding */ big_computation),
/* harmony export */   "welcome": () => (/* binding */ welcome),
/* harmony export */   "__wbg_alert_8e43add6d29df9d1": () => (/* binding */ __wbg_alert_8e43add6d29df9d1),
/* harmony export */   "__wbindgen_throw": () => (/* binding */ __wbindgen_throw)
/* harmony export */ });
/* harmony import */ var _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index_bg.wasm */ "./pkg/index_bg.wasm");
/* module decorator */ module = __webpack_require__.hmd(module);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__]);
_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? await __webpack_async_dependencies__ : __webpack_async_dependencies__)[0];

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;
let cachedTextDecoder = new lTextDecoder('utf-8', {
  ignoreBOM: true,
  fatal: true
});
cachedTextDecoder.decode();
let cachegetUint8Memory0 = null;

function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(_index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);
  }

  return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function logError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    let error = function () {
      try {
        return e instanceof Error ? `${e.message}\n\nStack:\n${e.stack}` : e.toString();
      } catch (_) {
        return "<failed to stringify thrown value>";
      }
    }();

    console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", error);
    throw e;
  }
}
/**
*/


function big_computation() {
  _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.big_computation();
}
let WASM_VECTOR_LEN = 0;
const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;
let cachedTextEncoder = new lTextEncoder('utf-8');
const encodeString = typeof cachedTextEncoder.encodeInto === 'function' ? function (arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function (arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};

function passStringToWasm0(arg, malloc, realloc) {
  if (typeof arg !== 'string') throw new Error('expected a string argument');

  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length);
    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len);
  const mem = getUint8Memory0();
  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }

    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    if (ret.read !== arg.length) throw new Error('failed to pass whole string');
    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}
/**
* @param {string} name
*/


function welcome(name) {
  var ptr0 = passStringToWasm0(name, _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc, _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_realloc);
  var len0 = WASM_VECTOR_LEN;
  _index_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.welcome(ptr0, len0);
}
function __wbg_alert_8e43add6d29df9d1() {
  return logError(function (arg0, arg1) {
    alert(getStringFromWasm0(arg0, arg1));
  }, arguments);
}
;
function __wbindgen_throw(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
}
;
});

/***/ }),

/***/ "./pkg/index_bg.wasm":
/*!***************************!*\
  !*** ./pkg/index_bg.wasm ***!
  \***************************/
/***/ ((module, exports, __webpack_require__) => {

var __webpack_instantiate__ = ([WEBPACK_IMPORTED_MODULE_0]) => {
	return __webpack_require__.v(exports, module.id, "ec280846a5bcd4d0bf44", {
		"./index_bg.js": {
			"__wbg_alert_8e43add6d29df9d1": WEBPACK_IMPORTED_MODULE_0.__wbg_alert_8e43add6d29df9d1,
			"__wbindgen_throw": WEBPACK_IMPORTED_MODULE_0.__wbindgen_throw
		}
	});
}
__webpack_require__.a(module, (__webpack_handle_async_dependencies__) => {
	/* harmony import */ var WEBPACK_IMPORTED_MODULE_0 = __webpack_require__(/*! ./index_bg.js */ "./pkg/index_bg.js");
	var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([WEBPACK_IMPORTED_MODULE_0]);
	return __webpack_async_dependencies__.then ? __webpack_async_dependencies__.then(__webpack_instantiate__) : __webpack_instantiate__(__webpack_async_dependencies__);
}, 1);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGtnX2luZGV4X2pzLmJ1bmRsZS4zYzZmMjE0ZGQ5ZDkyNjEwYTY2MC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUVBLE1BQU1DLFlBQVksR0FBRyxPQUFPQyxXQUFQLEtBQXVCLFdBQXZCLEdBQXFDLENBQUMsR0FBR0MsTUFBTSxDQUFDQyxPQUFYLEVBQW9CLE1BQXBCLEVBQTRCRixXQUFqRSxHQUErRUEsV0FBcEc7QUFFQSxJQUFJRyxpQkFBaUIsR0FBRyxJQUFJSixZQUFKLENBQWlCLE9BQWpCLEVBQTBCO0FBQUVLLEVBQUFBLFNBQVMsRUFBRSxJQUFiO0FBQW1CQyxFQUFBQSxLQUFLLEVBQUU7QUFBMUIsQ0FBMUIsQ0FBeEI7QUFFQUYsaUJBQWlCLENBQUNHLE1BQWxCO0FBRUEsSUFBSUMsb0JBQW9CLEdBQUcsSUFBM0I7O0FBQ0EsU0FBU0MsZUFBVCxHQUEyQjtBQUN2QixNQUFJRCxvQkFBb0IsS0FBSyxJQUF6QixJQUFpQ0Esb0JBQW9CLENBQUNFLE1BQXJCLEtBQWdDWCx5REFBckUsRUFBeUY7QUFDckZTLElBQUFBLG9CQUFvQixHQUFHLElBQUlJLFVBQUosQ0FBZWIseURBQWYsQ0FBdkI7QUFDSDs7QUFDRCxTQUFPUyxvQkFBUDtBQUNIOztBQUVELFNBQVNLLGtCQUFULENBQTRCQyxHQUE1QixFQUFpQ0MsR0FBakMsRUFBc0M7QUFDbEMsU0FBT1gsaUJBQWlCLENBQUNHLE1BQWxCLENBQXlCRSxlQUFlLEdBQUdPLFFBQWxCLENBQTJCRixHQUEzQixFQUFnQ0EsR0FBRyxHQUFHQyxHQUF0QyxDQUF6QixDQUFQO0FBQ0g7O0FBRUQsU0FBU0UsUUFBVCxDQUFrQkMsQ0FBbEIsRUFBcUJDLElBQXJCLEVBQTJCO0FBQ3ZCLE1BQUk7QUFDQSxXQUFPRCxDQUFDLENBQUNFLEtBQUYsQ0FBUSxJQUFSLEVBQWNELElBQWQsQ0FBUDtBQUNILEdBRkQsQ0FFRSxPQUFPRSxDQUFQLEVB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QUFDSCxHQUYrRCxFQUU3REUsU0FGNkQsQ0FBZjtBQUVsQztBQUFBO0FBRVIsU0FBU0MsZ0JBQVQsQ0FBMEJKLElBQTFCLEVBQWdDQyxJQUFoQyxFQUFzQztBQUN6QyxRQUFNLElBQUl2QyxLQUFKLENBQVVWLGtCQUFrQixDQUFDZ0QsSUFBRCxFQUFPQyxJQUFQLENBQTVCLENBQU47QUFDSDtBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3Qtd2FzbS8uL3BrZy9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZWFjdC13YXNtLy4vcGtnL2luZGV4X2JnLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHdhc20gZnJvbSBcIi4vaW5kZXhfYmcud2FzbVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vaW5kZXhfYmcuanNcIjsiLCJpbXBvcnQgKiBhcyB3YXNtIGZyb20gJy4vaW5kZXhfYmcud2FzbSc7XG5cbmNvbnN0IGxUZXh0RGVjb2RlciA9IHR5cGVvZiBUZXh0RGVjb2RlciA9PT0gJ3VuZGVmaW5lZCcgPyAoMCwgbW9kdWxlLnJlcXVpcmUpKCd1dGlsJykuVGV4dERlY29kZXIgOiBUZXh0RGVjb2RlcjtcblxubGV0IGNhY2hlZFRleHREZWNvZGVyID0gbmV3IGxUZXh0RGVjb2RlcigndXRmLTgnLCB7IGlnbm9yZUJPTTogdHJ1ZSwgZmF0YWw6IHRydWUgfSk7XG5cbmNhY2hlZFRleHREZWNvZGVyLmRlY29kZSgpO1xuXG5sZXQgY2FjaGVnZXRVaW50OE1lbW9yeTAgPSBudWxsO1xuZnVuY3Rpb24gZ2V0VWludDhNZW1vcnkwKCkge1xuICAgIGlmIChjYWNoZWdldFVpbnQ4TWVtb3J5MCA9PT0gbnVsbCB8fCBjYWNoZWdldFVpbnQ4TWVtb3J5MC5idWZmZXIgIT09IHdhc20ubWVtb3J5LmJ1ZmZlcikge1xuICAgICAgICBjYWNoZWdldFVpbnQ4TWVtb3J5MCA9IG5ldyBVaW50OEFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWdldFVpbnQ4TWVtb3J5MDtcbn1cblxuZnVuY3Rpb24gZ2V0U3RyaW5nRnJvbVdhc20wKHB0ciwgbGVuKSB7XG4gICAgcmV0dXJuIGNhY2hlZFRleHREZWNvZGVyLmRlY29kZShnZXRVaW50OE1lbW9yeTAoKS5zdWJhcnJheShwdHIsIHB0ciArIGxlbikpO1xufVxuXG5mdW5jdGlvbiBsb2dFcnJvcihmLCBhcmdzKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGYuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsZXQgZXJyb3IgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIEVycm9yID8gYCR7ZS5tZXNzYWdlfVxcblxcblN0YWNrOlxcbiR7ZS5zdGFja31gIDogZS50b1N0cmluZygpO1xuICAgICAgICAgICAgfSBjYXRjaChfKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiPGZhaWxlZCB0byBzdHJpbmdpZnkgdGhyb3duIHZhbHVlPlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KCkpO1xuICAgICAgICBjb25zb2xlLmVycm9yKFwid2FzbS1iaW5kZ2VuOiBpbXBvcnRlZCBKUyBmdW5jdGlvbiB0aGF0IHdhcyBub3QgbWFya2VkIGFzIGBjYXRjaGAgdGhyZXcgYW4gZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgICAgdGhyb3cgZTtcbiAgICB9XG59XG4vKipcbiovXG5leHBvcnQgZnVuY3Rpb24gYmlnX2NvbXB1dGF0aW9uKCkge1xuICAgIHdhc20uYmlnX2NvbXB1dGF0aW9uKCk7XG59XG5cbmxldCBXQVNNX1ZFQ1RPUl9MRU4gPSAwO1xuXG5jb25zdCBsVGV4dEVuY29kZXIgPSB0eXBlb2YgVGV4dEVuY29kZXIgPT09ICd1bmRlZmluZWQnID8gKDAsIG1vZHVsZS5yZXF1aXJlKSgndXRpbCcpLlRleHRFbmNvZGVyIDogVGV4dEVuY29kZXI7XG5cbmxldCBjYWNoZWRUZXh0RW5jb2RlciA9IG5ldyBsVGV4dEVuY29kZXIoJ3V0Zi04Jyk7XG5cbmNvbnN0IGVuY29kZVN0cmluZyA9ICh0eXBlb2YgY2FjaGVkVGV4dEVuY29kZXIuZW5jb2RlSW50byA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gZnVuY3Rpb24gKGFyZywgdmlldykge1xuICAgIHJldHVybiBjYWNoZWRUZXh0RW5jb2Rlci5lbmNvZGVJbnRvKGFyZywgdmlldyk7XG59XG4gICAgOiBmdW5jdGlvbiAoYXJnLCB2aWV3KSB7XG4gICAgY29uc3QgYnVmID0gY2FjaGVkVGV4dEVuY29kZXIuZW5jb2RlKGFyZyk7XG4gICAgdmlldy5zZXQoYnVmKTtcbiAgICByZXR1cm4ge1xuICAgICAgICByZWFkOiBhcmcubGVuZ3RoLFxuICAgICAgICB3cml0dGVuOiBidWYubGVuZ3RoXG4gICAgfTtcbn0pO1xuXG5mdW5jdGlvbiBwYXNzU3RyaW5nVG9XYXNtMChhcmcsIG1hbGxvYywgcmVhbGxvYykge1xuXG4gICAgaWYgKHR5cGVvZihhcmcpICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKCdleHBlY3RlZCBhIHN0cmluZyBhcmd1bWVudCcpO1xuXG4gICAgaWYgKHJlYWxsb2MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBidWYgPSBjYWNoZWRUZXh0RW5jb2Rlci5lbmNvZGUoYXJnKTtcbiAgICAgICAgY29uc3QgcHRyID0gbWFsbG9jKGJ1Zi5sZW5ndGgpO1xuICAgICAgICBnZXRVaW50OE1lbW9yeTAoKS5zdWJhcnJheShwdHIsIHB0ciArIGJ1Zi5sZW5ndGgpLnNldChidWYpO1xuICAgICAgICBXQVNNX1ZFQ1RPUl9MRU4gPSBidWYubGVuZ3RoO1xuICAgICAgICByZXR1cm4gcHRyO1xuICAgIH1cblxuICAgIGxldCBsZW4gPSBhcmcubGVuZ3RoO1xuICAgIGxldCBwdHIgPSBtYWxsb2MobGVuKTtcblxuICAgIGNvbnN0IG1lbSA9IGdldFVpbnQ4TWVtb3J5MCgpO1xuXG4gICAgbGV0IG9mZnNldCA9IDA7XG5cbiAgICBmb3IgKDsgb2Zmc2V0IDwgbGVuOyBvZmZzZXQrKykge1xuICAgICAgICBjb25zdCBjb2RlID0gYXJnLmNoYXJDb2RlQXQob2Zmc2V0KTtcbiAgICAgICAgaWYgKGNvZGUgPiAweDdGKSBicmVhaztcbiAgICAgICAgbWVtW3B0ciArIG9mZnNldF0gPSBjb2RlO1xuICAgIH1cblxuICAgIGlmIChvZmZzZXQgIT09IGxlbikge1xuICAgICAgICBpZiAob2Zmc2V0ICE9PSAwKSB7XG4gICAgICAgICAgICBhcmcgPSBhcmcuc2xpY2Uob2Zmc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBwdHIgPSByZWFsbG9jKHB0ciwgbGVuLCBsZW4gPSBvZmZzZXQgKyBhcmcubGVuZ3RoICogMyk7XG4gICAgICAgIGNvbnN0IHZpZXcgPSBnZXRVaW50OE1lbW9yeTAoKS5zdWJhcnJheShwdHIgKyBvZmZzZXQsIHB0ciArIGxlbik7XG4gICAgICAgIGNvbnN0IHJldCA9IGVuY29kZVN0cmluZyhhcmcsIHZpZXcpO1xuICAgICAgICBpZiAocmV0LnJlYWQgIT09IGFyZy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcignZmFpbGVkIHRvIHBhc3Mgd2hvbGUgc3RyaW5nJyk7XG4gICAgICAgIG9mZnNldCArPSByZXQud3JpdHRlbjtcbiAgICB9XG5cbiAgICBXQVNNX1ZFQ1RPUl9MRU4gPSBvZmZzZXQ7XG4gICAgcmV0dXJuIHB0cjtcbn1cbi8qKlxuKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuKi9cbmV4cG9ydCBmdW5jdGlvbiB3ZWxjb21lKG5hbWUpIHtcbiAgICB2YXIgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20wKG5hbWUsIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcbiAgICB2YXIgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcbiAgICB3YXNtLndlbGNvbWUocHRyMCwgbGVuMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX3diZ19hbGVydF84ZTQzYWRkNmQyOWRmOWQxKCkgeyByZXR1cm4gbG9nRXJyb3IoZnVuY3Rpb24gKGFyZzAsIGFyZzEpIHtcbiAgICBhbGVydChnZXRTdHJpbmdGcm9tV2FzbTAoYXJnMCwgYXJnMSkpO1xufSwgYXJndW1lbnRzKSB9O1xuXG5leHBvcnQgZnVuY3Rpb24gX193YmluZGdlbl90aHJvdyhhcmcwLCBhcmcxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGdldFN0cmluZ0Zyb21XYXNtMChhcmcwLCBhcmcxKSk7XG59O1xuXG4iXSwibmFtZXMiOlsid2FzbSIsImxUZXh0RGVjb2RlciIsIlRleHREZWNvZGVyIiwibW9kdWxlIiwicmVxdWlyZSIsImNhY2hlZFRleHREZWNvZGVyIiwiaWdub3JlQk9NIiwiZmF0YWwiLCJkZWNvZGUiLCJjYWNoZWdldFVpbnQ4TWVtb3J5MCIsImdldFVpbnQ4TWVtb3J5MCIsImJ1ZmZlciIsIm1lbW9yeSIsIlVpbnQ4QXJyYXkiLCJnZXRTdHJpbmdGcm9tV2FzbTAiLCJwdHIiLCJsZW4iLCJzdWJhcnJheSIsImxvZ0Vycm9yIiwiZiIsImFyZ3MiLCJhcHBseSIsImUiLCJlcnJvciIsIkVycm9yIiwibWVzc2FnZSIsInN0YWNrIiwidG9TdHJpbmciLCJfIiwiY29uc29sZSIsImJpZ19jb21wdXRhdGlvbiIsIldBU01fVkVDVE9SX0xFTiIsImxUZXh0RW5jb2RlciIsIlRleHRFbmNvZGVyIiwiY2FjaGVkVGV4dEVuY29kZXIiLCJlbmNvZGVTdHJpbmciLCJlbmNvZGVJbnRvIiwiYXJnIiwidmlldyIsImJ1ZiIsImVuY29kZSIsInNldCIsInJlYWQiLCJsZW5ndGgiLCJ3cml0dGVuIiwicGFzc1N0cmluZ1RvV2FzbTAiLCJtYWxsb2MiLCJyZWFsbG9jIiwidW5kZWZpbmVkIiwibWVtIiwib2Zmc2V0IiwiY29kZSIsImNoYXJDb2RlQXQiLCJzbGljZSIsInJldCIsIndlbGNvbWUiLCJuYW1lIiwicHRyMCIsIl9fd2JpbmRnZW5fbWFsbG9jIiwiX193YmluZGdlbl9yZWFsbG9jIiwibGVuMCIsIl9fd2JnX2FsZXJ0XzhlNDNhZGQ2ZDI5ZGY5ZDEiLCJhcmcwIiwiYXJnMSIsImFsZXJ0IiwiYXJndW1lbnRzIiwiX193YmluZGdlbl90aHJvdyJdLCJzb3VyY2VSb290IjoiIn0=
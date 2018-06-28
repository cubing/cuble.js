(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cuble"] = factory();
	else
		root["cuble"] = factory();
})(typeof self !== "undefined" ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var giiker_1 = __webpack_require__(1);
exports.GiikerCube = giiker_1.GiikerCube;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug = console.info ? console.log.bind(console) : console.info.bind(console);
var UUIDs = {
    cubeService: "0000aadb-0000-1000-8000-00805f9b34fb",
    cubeCharacteristic: "0000aadc-0000-1000-8000-00805f9b34fb"
};
var GiiKerEvent = /** @class */ (function () {
    function GiiKerEvent() {
    }
    return GiiKerEvent;
}());
var GiikerCube = /** @class */ (function () {
    function GiikerCube() {
        this.listeners = []; // TODO: type
    }
    GiikerCube.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        debug("Attempting to pair.");
                        _a = this;
                        return [4 /*yield*/, navigator.bluetooth.requestDevice({
                                filters: [{
                                        namePrefix: "GiC"
                                    }],
                                optionalServices: [
                                    "00001530-1212-efde-1523-785feabcd123",
                                    "0000aaaa-0000-1000-8000-00805f9b34fb",
                                    "0000aadb-0000-1000-8000-00805f9b34fb",
                                    "0000180f-0000-1000-8000-00805f9b34fb",
                                    "0000180a-0000-1000-8000-00805f9b34fb"
                                ]
                            })];
                    case 1:
                        _a.device = _f.sent();
                        debug("Device:", this.device);
                        _b = this;
                        return [4 /*yield*/, this.device.gatt.connect()];
                    case 2:
                        _b.server = _f.sent();
                        debug("Server:", this.server);
                        _c = this;
                        return [4 /*yield*/, this.server.getPrimaryService(UUIDs.cubeService)];
                    case 3:
                        _c.cubeService = _f.sent();
                        debug("Service:", this.cubeService);
                        _d = this;
                        return [4 /*yield*/, this.cubeService.getCharacteristic(UUIDs.cubeCharacteristic)];
                    case 4:
                        _d.cubeCharacteristic = _f.sent();
                        debug(this.cubeCharacteristic);
                        return [4 /*yield*/, this.cubeCharacteristic.startNotifications()];
                    case 5:
                        _f.sent();
                        // TODO: Can we safely save the async promise instead of waiting for the response?
                        _e = this;
                        return [4 /*yield*/, this.cubeCharacteristic.readValue()];
                    case 6:
                        // TODO: Can we safely save the async promise instead of waiting for the response?
                        _e._originalValue = _f.sent();
                        debug("Original value:", this._originalValue);
                        this.cubeCharacteristic.addEventListener("characteristicvaluechanged", this.onCubeCharacteristicChanged.bind(this));
                        return [2 /*return*/];
                }
            });
        });
    };
    GiikerCube.prototype.giikerMoveToAlgMove = function (face, amount) {
        if (amount == 9) {
            console.error("Encountered 9", face, amount);
            amount = 2;
        }
        return {
            type: "move",
            base: ["?", "B", "D", "L", "U", "R", "F"][face],
            amount: [0, 1, 2, -1][amount]
        };
    };
    // TODO: Web Bluetooth types
    GiikerCube.prototype.onCubeCharacteristicChanged = function (event) {
        var val = event.target.value;
        if (this._originalValue) {
            debug("Comparing against original value.");
            var same = true;
            for (var i = 0; i < 20; i++) {
                if (this._originalValue.getUint8(i) != val.getUint8(i)) {
                    debug("Different at index ", i);
                    same = false;
                    break;
                }
            }
            this._originalValue = null;
            if (same) {
                debug("Skipping extra first event.");
                return;
            }
        }
        debug(val);
        // debug(event.target);
        debug(event);
        var giikerState = [];
        for (var i = 0; i < 20; i++) {
            giikerState.push(Math.floor(val.getUint8(i) / 16));
            giikerState.push(val.getUint8(i) % 16);
        }
        var str = "";
        str += giikerState.slice(0, 8).join(".");
        str += "\n";
        str += giikerState.slice(8, 16).join(".");
        str += "\n";
        str += giikerState.slice(16, 28).join(".");
        str += "\n";
        str += giikerState.slice(28, 32).join(".");
        str += "\n";
        str += giikerState.slice(32, 40).join(".");
        debug(str);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var l = _a[_i];
            l({
                latestMove: this.giikerMoveToAlgMove(giikerState[32], giikerState[33]),
                timeStamp: event.timeStamp,
                stateStr: str
            });
        }
    };
    GiikerCube.prototype.addEventListener = function (listener) {
        this.listeners.push(listener);
    };
    return GiikerCube;
}());
exports.GiikerCube = GiikerCube;


/***/ })
/******/ ]);
});
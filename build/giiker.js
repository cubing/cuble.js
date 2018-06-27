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
var GiikerCube = function () {
    this.listeners = [];
};
var debug = console.info ? console.log.bind(console) : console.info.bind(console);
GiikerCube.prototype = {
    UUIDs: {
        cubeService: "0000aadb-0000-1000-8000-00805f9b34fb",
        cubeCharacteristic: "0000aadc-0000-1000-8000-00805f9b34fb"
    },
    connect: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        console.log("Attempting to pair.");
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
                        console.log("Device:", this.device);
                        _b = this;
                        return [4 /*yield*/, this.device.gatt.connect()];
                    case 2:
                        _b.server = _f.sent();
                        console.log("Server:", this.server);
                        _c = this;
                        return [4 /*yield*/, this.server.getPrimaryService(this.UUIDs.cubeService)];
                    case 3:
                        _c.cubeService = _f.sent();
                        console.log("Service:", this.cubeService);
                        _d = this;
                        return [4 /*yield*/, this.cubeService.getCharacteristic(this.UUIDs.cubeCharacteristic)];
                    case 4:
                        _d.cubeCharacteristic = _f.sent();
                        console.log(this.cubeCharacteristic);
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
    },
    giikerMoveToAlgMove: function (face, amount) {
        if (amount == 9) {
            console.err("Encountered 9", face, amount);
            amount = 2;
        }
        return {
            type: "move",
            base: ["?", "B", "D", "L", "U", "R", "F"][face],
            amount: [0, 1, 2, -1][amount]
        };
    },
    onCubeCharacteristicChanged: function (event) {
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
        console.log(val);
        // console.log(event.target);
        console.log(event);
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
        console.log(str);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var l = _a[_i];
            l({
                latestMove: this.giikerMoveToAlgMove(giikerState[32], giikerState[33]),
                timeStamp: event.timeStamp,
                stateStr: str
            });
        }
    },
    addEventListener: function (listener) {
        this.listeners.push(listener);
    }
};
//# sourceMappingURL=giiker.js.map
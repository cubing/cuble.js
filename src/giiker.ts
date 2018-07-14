import {BlockMove} from "alg"

var debug = console.info ? console.log.bind(console) : console.info.bind(console);

const UUIDs = {
  cubeService: "0000aadb-0000-1000-8000-00805f9b34fb",
  cubeCharacteristic: "0000aadc-0000-1000-8000-00805f9b34fb"
};

class GiiKerEvent {
  latestMove: BlockMove;
  timeStamp: number;
  stateStr: string;
}

export abstract class BluetoothCube {
  abstract async connect(): Promise<void>;
}

export class GiiKerCube {
  private listeners: any[] = []; // TODO: type
  private _originalValue: any; // TODO: type
  private cubeCharacteristic: any; // TODO: type
  private cubeService: any; // TODO: type
  private server: any; // TODO: type
  private device: any; // TODO: type

  async connect(): Promise<void> {
    debug("Attempting to pair.")
    this.device = await navigator.bluetooth.requestDevice({
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
    });
    debug("Device:", this.device);
    this.server = await this.device.gatt.connect();
    var x = debug("Server:", this.server);
    this.cubeService = await this.server.getPrimaryService(UUIDs.cubeService);
    debug("Service:", this.cubeService);
    this.cubeCharacteristic = await this.cubeService.getCharacteristic(UUIDs.cubeCharacteristic);
    debug(this.cubeCharacteristic);
    await this.cubeCharacteristic.startNotifications();
    // TODO: Can we safely save the async promise instead of waiting for the response?
    this._originalValue = await this.cubeCharacteristic.readValue();
    debug("Original value:", this._originalValue);
    this.cubeCharacteristic.addEventListener("characteristicvaluechanged",
    this.onCubeCharacteristicChanged.bind(this));
  }

  giikerMoveToAlgMove(face: number, amount: number): BlockMove {
    if (amount == 9) {
      console.error("Encountered 9", face, amount);
      amount = 2;
    }
    amount = [0, 1, 2, -1][amount];

    const family = ["?", "B", "D", "L", "U", "R", "F"][face];
    return new BlockMove(family, amount);
  }

  // TODO: Web Bluetooth types
  onCubeCharacteristicChanged(event: any): void {
    var val = event.target.value;

    if (this._originalValue) {
      debug("Comparing against original value.")
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
        debug("Skipping extra first event.")
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
    str += "\n"
    str += giikerState.slice(8, 16).join(".");
    str += "\n"
    str += giikerState.slice(16, 28).join(".");
    str += "\n"
    str += giikerState.slice(28, 32).join(".");
    str += "\n"
    str += giikerState.slice(32, 40).join(".");
    debug(str);

    for (var l of this.listeners) {
      l(<GiiKerEvent>{
        latestMove: this.giikerMoveToAlgMove(giikerState[32], giikerState[33]),
        timeStamp: event.timeStamp,
        stateStr: str
      });
    }
  }

  addEventListener(listener: () => GiiKerEvent): void {
    this.listeners.push(listener);
  }
}

import {SiGNMove, BareSiGNMove} from "alg"

import {MoveEvent, BluetoothConfig, BluetoothPuzzle} from "./bluetooth-puzzle"
import {debugLog} from "./debug"

const UUIDs = {
  cubeService: "0000aadb-0000-1000-8000-00805f9b34fb",
  cubeCharacteristic: "0000aadc-0000-1000-8000-00805f9b34fb"
};

// TODO: Move this into a factory?
export const giiKERi3Config: BluetoothConfig = {
  filter: {
    namePrefix: "GiC"
  },
  optionalServices: [
    // "00001530-1212-efde-1523-785feabcd123",
    // "0000aaaa-0000-1000-8000-00805f9b34fb",
    UUIDs.cubeService
    // "0000180f-0000-1000-8000-00805f9b34fb",
    // "0000180a-0000-1000-8000-00805f9b34fb"
  ]
}

// TODO: Expose for testing.
function giikerMoveToSiGNMove(face: number, amount: number): SiGNMove {
  if (amount == 9) {
    console.error("Encountered 9", face, amount);
    amount = 2;
  }
  amount = [0, 1, 2, -1][amount];

  const family = ["?", "B", "D", "L", "U", "R", "F"][face];
  return BareSiGNMove(family, amount);
}

export {giikerMoveToSiGNMove as giikerMoveToSiGNMoveForTesting};

function giikerStateStr(giikerState: Array<number>): string {
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
  return str;
}

export class GiiKERi3Cube extends BluetoothPuzzle {
  private originalValue: DataView | null | undefined = undefined;

  static async connect(server: BluetoothRemoteGATTServer): Promise<GiiKERi3Cube> {

    const cubeService = await server.getPrimaryService(UUIDs.cubeService);
    debugLog("Service:", cubeService);
    
    const cubeCharacteristic = await cubeService.getCharacteristic(UUIDs.cubeCharacteristic);
    debugLog("Characteristic:", cubeCharacteristic);

    // TODO: Can we safely save the async promise instead of waiting for the response?

    var cube = new GiiKERi3Cube();
    cube.originalValue = await cubeCharacteristic.readValue();
    debugLog("Original value:", cube.originalValue);

    await cubeCharacteristic.startNotifications();
    cubeCharacteristic.addEventListener(
      "characteristicvaluechanged",
      cube.onCubeCharacteristicChanged.bind(cube)
    );

    return cube;
  }

  private onCubeCharacteristicChanged(event: any): void {
    var val = event.target.value;
    debugLog(val);

    if (this.isRepeatedInitialValue(val)) {
        debugLog("Skipping repeated initial value.")
      return;
    }

    var giikerState = [];
    for (var i = 0; i < 20; i++) {
      giikerState.push(Math.floor(val.getUint8(i) / 16));
      giikerState.push(val.getUint8(i) % 16);
    }
    const str = giikerStateStr(giikerState);
    debugLog(str);

    this.dispatchMove({
      latestMove: giikerMoveToSiGNMove(giikerState[32], giikerState[33]),
      timeStamp: event.timeStamp,
      debug: {
        stateStr: str
      }
    });
  }

  private isRepeatedInitialValue(val: DataView): boolean {
    if (typeof (this.originalValue) === "undefined") {
      // TODO: Test this branch.
      throw "GiiKERCube has uninitialized original value."
    }

    if (this.originalValue === null) {
      return false;
    }

    const originalValue = this.originalValue;
    // Reset the value here, so we can return early below.
    this.originalValue = null;

    debugLog("Comparing against original value.")
    for (var i = 0; i < 20; i++) {
      if (originalValue.getUint8(i) != val.getUint8(i)) {
        debugLog("Different at index ", i);
        return false;
      }
    }
    return true;
  }
}

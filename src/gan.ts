import {BareBlockMove, BlockMove} from "alg"
import {Transformation, KPuzzle, Puzzles} from "kpuzzle"

import {MoveEvent, BluetoothConfig, BluetoothPuzzle, PuzzleState} from "./bluetooth-puzzle"
import {debugLog} from "./debug"

// This needs to be short enough to capture 6 moves (OBQTM).
const DEFAULT_INTERVAL_MS = 150;
// Number of latest moves provided by the Gan 356i.
const MAX_LATEST_MOVES = 6;

const ganMoveToBlockMove: {[i: number]: BlockMove} = {
  0x00: BareBlockMove("U"),
  0x02: BareBlockMove("U", -1),
  0x03: BareBlockMove("R"),
  0x05: BareBlockMove("R", -1),
  0x06: BareBlockMove("F"),
  0x08: BareBlockMove("F", -1),
  0x09: BareBlockMove("D"),
  0x0b: BareBlockMove("D", -1),
  0x0c: BareBlockMove("L"),
  0x0e: BareBlockMove("L", -1),
  0x0f: BareBlockMove("B"),
  0x11: BareBlockMove("B", -1)
}

class PhysicalState {
  public static characteristic = "0000fff5-0000-1000-8000-00805f9b34fb";
  private arr: Uint8Array;
  private arrLen = 19;
  private constructor(dataView: DataView, public timeStamp: number) {
    this.arr = new Uint8Array(dataView.buffer);
    if (this.arr.length != this.arrLen) {
      throw "Unexpected array length";
    }
  }

  public static async read(characteristic: BluetoothRemoteGATTCharacteristic): Promise<PhysicalState> {
    const value = await characteristic.readValue();
    const timeStamp = Date.now();
    return new PhysicalState(value, timeStamp);
  }

  // Loops from 255 to 0.
  moveCounter(): number {
    return this.arr[12];
  }

  numMovesSince(previousMoveCounter: number): number {
    return (this.moveCounter() - previousMoveCounter) & 0xff
  }
  
  // Due to the design of the Gan356i protocol, it's common to query for the
  // latest physical state and find 0 moves have been performed since the last
  // query. Therefore, it's useful to allow 0 as an argument.
  latestMoves(n: number): BlockMove[] {
    if (n < 0 || n > MAX_LATEST_MOVES) {
      throw `Must ask for 0 to 6 latest moves. (Asked for ${n})`;
    }
    return Array.from(this.arr.slice(19 - n, 19)).map((i) => ganMoveToBlockMove[i]);
  }

  debugInfo(): {arr: Uint8Array} {
    return {
      arr: this.arr
    }
  }
}

const UUIDs = {
  ganCubeService: "0000fff0-0000-1000-8000-00805f9b34fb",
  physicalStateCharacteristic: PhysicalState.characteristic,
  // cubeCharacteristic: "0000fff7-0000-1000-8000-00805f9b34fb"
};

// // TODO: Move this into a factory?
export const ganConfig: BluetoothConfig = {
  filters: [
    {namePrefix: "GAN"}
  ],
  optionalServices: [
    UUIDs.ganCubeService
  ]
}

function buf2hex(buffer: ArrayBuffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), (x: number) => ('00' + x.toString(16)).slice(-2)).join(' ');
}

export class GanCube extends BluetoothPuzzle {

  INTERVAL_MS: number = DEFAULT_INTERVAL_MS;
  private intervalHandle: number | null = null;
  // TODO: Find out how to read the state from the cube.
  private kpuzzle: KPuzzle = new KPuzzle(Puzzles["333"]);

  private constructor(private server: BluetoothRemoteGATTServer, private physicalStateCharacteristic: BluetoothRemoteGATTCharacteristic, private lastMoveCounter: number) {
    super();
    this.startTrackingMoves();
  }

  public name(): string | undefined {
    return this.server.device.name;
  }

  // We have to perform async operations before we call the constructor.
  static async connect(server: BluetoothRemoteGATTServer): Promise<GanCube> {

    const ganCubeService = await server.getPrimaryService(UUIDs.ganCubeService);
    debugLog("Service:", ganCubeService);
    
    const physicalStateCharacteristic = await ganCubeService.getCharacteristic(UUIDs.physicalStateCharacteristic);
    debugLog("Characteristic:", physicalStateCharacteristic);

    const initialMoveCounter = (await PhysicalState.read(physicalStateCharacteristic)).moveCounter();
    debugLog("Initial Move Counter:", initialMoveCounter);
    var cube = new GanCube(server, physicalStateCharacteristic, initialMoveCounter);
    return cube;
  }

  startTrackingMoves(): void {
    this.intervalHandle = setInterval(this.intervalHandler.bind(this), this.INTERVAL_MS);
  }

  stopTrackingMoves(): void {
    if (!this.intervalHandle) {
      throw "Not tracking moves!";
    }
    clearInterval(this.intervalHandle);
    this.intervalHandle = null;
  }

  // TODO: Can we ever receive async responses out of order?
  async intervalHandler(): Promise<void> {
    const physicalState = await PhysicalState.read(this.physicalStateCharacteristic);
    var numInterveningMoves = physicalState.numMovesSince(this.lastMoveCounter);
    // console.log(numInterveningMoves);
    if (numInterveningMoves > MAX_LATEST_MOVES) {
      debugLog(`Too many moves! Dropping ${numInterveningMoves - MAX_LATEST_MOVES} moves`)
      numInterveningMoves = MAX_LATEST_MOVES;
    }
    for (const move of physicalState.latestMoves(numInterveningMoves)) {
      // console.log(move);
      this.kpuzzle.applyBlockMove(move);
      this.dispatchMove({
        latestMove: move,
        timeStamp: physicalState.timeStamp,
        debug: physicalState.debugInfo(),
        state: this.kpuzzle.state
      });
    }
    this.lastMoveCounter = physicalState.moveCounter();
  }

  async getState(): Promise<PuzzleState> {
    return this.kpuzzle.state
  }

  private onphysicalStateCharacteristicChanged(event: any): void {
    var val = event.target.value;
    debugLog(val);
  }
}

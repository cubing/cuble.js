import {BlockMove} from "alg"
import {Transformation} from "kpuzzle"

/******** BluetoothPuzzle ********/

// TODO: Make compatible with Twisty.
export type PuzzleState = Transformation

// TODO: Use actual `CustomEvent`s?
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
export class MoveEvent {
  latestMove: BlockMove;
  timeStamp: number;
  debug?: Object;
  state?: PuzzleState
}

export type BluetoothConfig = {
  filters: BluetoothRequestDeviceFilter[];
  optionalServices: BluetoothServiceUUID[];
};

// TODO: Expose device name (and/or globally unique identifier)?
export abstract class BluetoothPuzzle {
  protected listeners: ((e: MoveEvent) => void)[] = []; // TODO: type

  public abstract name(): string | undefined;

  // There may be puzzles in the future that always return null.
  // TODO: move this to a separate interface?
  public async getState(): Promise<PuzzleState | null> {
    return null;
  }

  public addMoveListener(listener: (e: MoveEvent) => void): void {
    this.listeners.push(listener);
  }

  protected dispatchMove(moveEvent: MoveEvent): void {
    for (var l of this.listeners) {
      l(moveEvent);
    }
  }
}

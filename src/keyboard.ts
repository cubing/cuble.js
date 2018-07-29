import {keyToMove} from "alg"
import {BluetoothPuzzle} from "./bluetooth-puzzle"

export class KeyboardPuzzle extends BluetoothPuzzle {
  // TODO: Decide on the right arguments.
  constructor(target: any) {
    super();
    // TODO: Filter out repeated keydown?
    target.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  public name(): string | undefined {
    return "Keyboard Input";
  }

  private onKeyDown(e: KeyboardEvent) {
    const move = keyToMove(e);
    if (move) {
      this.dispatchMove({
        latestMove: move,
        timeStamp: e.timeStamp
      });
    } else {
      e.preventDefault();
    }
  }
}

// TODO: Type
export async function debugKeyboardConnect(target: any = window): Promise<KeyboardPuzzle> {
  return new KeyboardPuzzle(target);
}

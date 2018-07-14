import {BlockMove, structureEquals} from "alg"
import {GiiKerCube} from "../src/giiker"

import { expect } from "chai";

describe("GiiKerCube", () => {
  it("should be possible to construct", () => {
    new GiiKerCube();
  });

  it("should calculate giikerMoveToAlgMove() correctly", () => {
    var cube = new GiiKerCube();
    expect(structureEquals(cube.giikerMoveToAlgMove(1, 1), new BlockMove("B", 1))).to.be.true;
    expect(structureEquals(cube.giikerMoveToAlgMove(2, 3), new BlockMove("D", -1))).to.be.true;
    expect(structureEquals(cube.giikerMoveToAlgMove(3, 9), new BlockMove("L", 2))).to.be.true;
  });
});

// TODO: create a mock BluetoothCube for testing.

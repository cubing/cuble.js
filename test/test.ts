import {Sequence, structureEquals, parse} from "alg"

import {GiiKERi3Cube, giikerMoveToBlockMoveForTesting} from "../src/giiker"

import { expect } from "chai";

describe("GiiKerCube", () => {
  // it("should be possible to construct", () => {
  //   new GiiKERi3Cube();
  // });

  it("should calculate giikerMoveToAlgMove() correctly", () => {
    expect(structureEquals(
      new Sequence([giikerMoveToBlockMoveForTesting(1, 1)]),
      parse("B")
    )).to.be.true;
    expect(structureEquals(
      new Sequence([giikerMoveToBlockMoveForTesting(2, 3)]),
      parse("D'")
    )).to.be.true;
    expect(structureEquals(
      new Sequence([giikerMoveToBlockMoveForTesting(3, 9)]),
      parse("L2")
    )).to.be.true;
  });
});

// TODO: create a mock BluetoothCube for testing.

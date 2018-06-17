
var GiikerCube = function() {
  this.listeners = [];
}

GiikerCube.prototype = {
  UUIDs: {
    cubeService: "0000aadb-0000-1000-8000-00805f9b34fb",
    cubeCharacteristic: "0000aadc-0000-1000-8000-00805f9b34fb"
  },

  connect: async function() {
    console.log("Attempting to pair.")
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
    console.log("Device:", this.device);
    this.server = await this.device.gatt.connect();
    console.log("Server:", this.server);
    this.cubeService = await this.server.getPrimaryService(this.UUIDs.cubeService);
    console.log("Service:", this.cubeService);
    this.cubeCharacteristic = await this.cubeService.getCharacteristic(this.UUIDs.cubeCharacteristic);
    console.log(this.cubeCharacteristic);
    await this.cubeCharacteristic.startNotifications();
    this.cubeCharacteristic.addEventListener("characteristicvaluechanged",
      this.onCubeCharacteristicChanged.bind(this));
  },

  giikerMoveToAlgMove(face, amount) {
    if (amount == 9) {
      console.err("Encountered 9", face, amount);
      amount = 2;
    }

    return {
      type: "move",
      base: ["?", "B", "D", "L", "U", "R", "F"][face],
      amount: [0, 1, 2, -1][amount]
    }
  },

  onCubeCharacteristicChanged(event) {
    var val = event.target.value;
    // console.log(event.target);
    console.log(event);
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
    console.log(str);

    for (var l of this.listeners) {
      l({
        latestMove: this.giikerMoveToAlgMove(giikerState[32], giikerState[33]),
        timeStamp: event.timeStamp,
        stateStr: str
      });
    }
  },

  addEventListener(listener) {
    this.listeners.push(listener);
  }
}

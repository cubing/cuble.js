
function decimalToHexString(number)
{
  if (number < 0)
  {
    number = 0xFFFFFFFF + number + 1;
  }

  return number.toString(16).toUpperCase();
}

function padLeft(number, length, str){
    return Array(length-number.length+1).join(str||'0')+number;
}

function toBinaryString(number) {
  return padLeft(parseInt(number).toString(2), 8)
}

function isSolved(cornerPositions, cornerOrientations, edgePositions, edgeBitFlags) {
  for(var i = 1; i <= 8; i++) {
   if(cornerPositions[i - 1] != i) {
     return false;
   }
   if(cornerOrientations[i - 1] != 3) {
     return false;
   }
  }

  for(i = 1; i <= 12; i++) {
    if(edgePositions[i - 1] != i) {
      return false;
    }
  }

  return edgeBitFlags == '0000000000000000';
}

function translateCornerColors(colors, orientation, position) {
    var translation = {};

    translation[orientation] = colors[0];
    var color1 = 1;
    var color2 = 2;

    if ([2,4,5,7].indexOf(position) >= 0) {
      console.log('swap colors');
      color1 = 2;
      color2 = 1;
    }

    if (orientation == 1) {
        translation[2] = colors[color2];
        translation[3] = colors[color1];
    } else if (orientation == 2) {
        translation[1] = colors[color1];
        translation[3] = colors[color2];
    } else if (orientation == 3) {
        translation[1] = colors[color2];
        translation[2] = colors[color1];
    }

    return translation;
}

var GiikerCube = function() {
  this.listeners = [];
}

var debug = console.info ? console.log.bind(console) : console.info.bind(console);

GiikerCube.prototype = {
  UUIDs: {
    cubeService: "0000aadb-0000-1000-8000-00805f9b34fb",
    cubeCharacteristic: "0000aadc-0000-1000-8000-00805f9b34fb"
  },

  corners: {
    1: [
      'green',
      'red',
      'yellow'
    ],
    2: [
      'green',
      'white',
      'red'
    ],
    3: [
      'green',
      'orange',
      'white'
    ],
    4: [
      'green',
      'yellow',
      'orange'
    ],
    5: [
      'blue',
      'yellow',
      'red'
    ],
    6: [
      'blue',
      'red',
      'white'
    ],
    7: [
      'blue',
      'white',
      'orange'
    ],
    8: [
      'blue',
      'orange',
      'yellow'
    ],

  },

  edges: {
    1: [
      'green',
      'yellow',
    ],
    2: [
      'green',
      'red',
    ],
    3: [
      'green',
      'white',
    ],
    4: [
      'green',
      'orange',
    ],
    5: [
      'yellow',
      'red',
    ],
    6: [
      'white',
      'red',
    ],
    7: [
      'white',
      'orange',
    ],
    8: [
      'yellow',
      'orange',
    ],
    9: [
      'blue',
      'yellow',
    ],
    10: [
     'blue',
      'red',
    ],
    11: [
      'blue',
      'white',
    ],
    12: [
      'blue',
      'orange',
    ]
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
    // TODO: Can we safely save the async promise instead of waiting for the response?
    this._originalValue = await this.cubeCharacteristic.readValue();
    debug("Original value:", this._originalValue);
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
    var moved = true;
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
        moved = false;
      }
    }

    console.log(val);
    // console.log(event.target);
    console.log(event);
    var giikerState = [];
    var testState = [];
    for (var i = 0; i < 20; i++) {
      giikerState.push(Math.floor(val.getUint8(i) / 16));
      giikerState.push(val.getUint8(i) % 16);
    }

    var cornerPositions = giikerState.slice(0, 8);
    var cornerOrientations = giikerState.slice(8, 16);
    var edgePositions = giikerState.slice(16, 28);
    var edgeBitFlags = toBinaryString(val.getUint8(14)) + toBinaryString(val.getUint8(15));

    for (var position = 1; position <= 8; position++) {
      var corner = cornerPositions[position-1];
      var orientation = cornerOrientations[position-1];
      debug(corner + ' at ' + position + ' with orientation ' + orientation);
      var colors = translateCornerColors(this.corners[corner], orientation, position);
      for (var side = 1; side <= 3; side++) {
        var td = $('#c'+position+'-'+side)
          // .html(corner + '.' + orientation);
          .removeClass()
          .addClass('cube')
          .addClass(colors[side]);
      }
    }

    for (position = 1; position <= 12; position++) {
      var edge = edgePositions[position - 1];
      orientation = parseInt(edgeBitFlags[position - 1]);
      debug(edge + ' at ' + position + ' with orientation ' + orientation);
      colors = this.edges[edge];
      for (side = 0; side <= 1; side++) {
        $('#e'+position+'-'+side)
          // .html(edge+'.'+orientation)
          .removeClass()
          .addClass('cube')
          .addClass(colors[(orientation+side)%2]);
      }
    }

    $('#solve-state').html(isSolved(cornerPositions, cornerOrientations, edgePositions, edgeBitFlags) ? 'solved' : 'scrambled');

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

    if (moved) {
      for (var l of this.listeners) {
        l({
          latestMove: this.giikerMoveToAlgMove(giikerState[32], giikerState[33]),
          timeStamp: event.timeStamp,
          stateStr: str
        });
      }
    }
  },

  addEventListener(listener) {
    this.listeners.push(listener);
  }
}

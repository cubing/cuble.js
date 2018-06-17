var moves = [];
var lastMoveTimestamp = 0;

var SPLIT_LINES_MS = 500;

// From alg.cubing.net. Not future-proof.
function escape_alg(alg) {
  if (!alg) {return alg;}
  var escaped = alg;
  escaped = escaped.replace(/_/g, "&#95;").replace(/ /g, "_");
  escaped = escaped.replace(/\+/g, "&#2b;");
  escaped = escaped.replace(/-/g, "&#45;").replace(/'/g, "-");
  return escaped;
}

var cube = new GiikerCube();
window.addEventListener("load", function() {
  // document.querySelector("#connect").addEventListener("click", function() {
  //   cube.connect();
  // });

  document.getElementById("connect").addEventListener("click", function f() {
    console.log("Connecting...");
    cube.connect();
  });

  document.getElementById("view").addEventListener("click", function f() {
    console.log("Connecting...");
    location.href = "https://alg.cubing.net?alg=" + encodeURIComponent(escape_alg(alg.cube.toString(moves))) + "&title=Giiker%20Cube%20Reconstruction%0A" + encodeURIComponent(new Date().toISOString().substring(0, 10));
  });
});


cube.addEventListener(function(d) {
  console.log(d);
  twistyScene.queueMoves([d.latestMove]);
  twistyScene.play.start();

  var now = Date.now();
  if (now - lastMoveTimestamp > SPLIT_LINES_MS && moves.length > 0 && moves[moves.length - 1].type != "newline") {
    moves.push({type: "newline"});
  }
  lastMoveTimestamp = now;
  moves.push(d.latestMove)
  moves = alg.cube.simplify(moves);
  // console.log(alg.cube.toString(moves));
  document.getElementById("moves").textContent = alg.cube.toString(moves);
});

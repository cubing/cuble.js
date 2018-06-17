
var cube = new GiikerCube();
window.addEventListener("load", function() {
  // document.querySelector("#connect").addEventListener("click", function() {
  //   cube.connect();
  // });

  document.body.addEventListener("click", function f() {
    console.log("Connecting...");
    cube.connect();
    document.body.removeEventListener("click", f);
  });
});


cube.addEventListener(function(d) {
  console.log(d);
  twistyScene.queueMoves([d.latestMove]);
  twistyScene.play.start();
});

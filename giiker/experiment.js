
var cube = new GiikerCube();
window.addEventListener("load", function() {
  document.querySelector("#connect").addEventListener("click", function() {
    cube.connect();
  });
});

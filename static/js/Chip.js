function Chip() {

  var geometry = new THREE.CylinderGeometry(3.3, 3.3, 1, 32);
  var material = new THREE.MeshBasicMaterial({
    // wireframe: true,
    color: "red",
  });
  var chip = new THREE.Mesh(geometry, material);
  chip.name = "R"
  chip.rotateX(Math.PI / 2)
  chip.rotateZ(Math.PI / 2)
  chip.position.set(0, 63, 0)//63
  //var axes = new THREE.AxesHelper(10)
  //chip.add(axes)

  this.getChip = function() {

    return chip;
  }

}

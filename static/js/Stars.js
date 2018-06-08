

function Stars() {

  var geometry = new THREE.OctahedronGeometry(1, 0)
  var material = new THREE.MeshBasicMaterial({
    wireframe: false,
    color: "yellow",
  });
  var stars = new THREE.Object3D();

  for (var i = 0; i < 7; i++) {
    var star = new THREE.Mesh(geometry, material);
    star.name = "CHIP"
    star.rotateX(Math.PI / 2)
    star.rotateZ(Math.PI / 2)
    star.position.set(0, 49 + 14, 7 * i - 21)
    //var axes = new THREE.AxesHelper(100)
    //  star.add(axes)

    stars.add(star)
  }
  console.log(stars);


  this.getStar = function() {
    return stars;
  }
}

function Wall() {

  this.loadModel = function(callback) {

    var loader = new THREE.JSONLoader();

    var material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load('img/texture.jpg'),
      transparent: true,
      opacity: 1,
    });
    loader.load('model/model.json', function(geometry) {
      var wall = new THREE.Mesh(geometry, material)

      wall.scale.set(7, 7, 7)

      var box = new THREE.Box3().setFromObject(wall);

      console.log(box.min, box.max, box.size());

      // zwrócenie kontenera

      callback(wall);

    });
  }
}

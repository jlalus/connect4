function Plansza() {

  this.loadModel = function(callback) {

    var loader = new THREE.ObjectLoader();

    var material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load('img/wood.jpg'),
      transparent: true,
      opacity: 1,
    });

    loader.load('model/table.json', function(obj) {
console.log("this",obj)

  obj.material=material
  obj.castShadow = true; //default is false
obj.receiveShadow = true; //default


//obj.rotateY(Math.PI/2)
obj.scale.set(5.6,5.6,5.6)
obj.position.set(-10,-158,0)

///test

var box = new THREE.Box3().setFromObject(obj);

console.log(box.min, box.max, box.size());
      // zwrócenie kontenera

  //    var axes = new THREE.AxesHelper(1000)
    //  obj.add(axes)
      callback(obj);

    });
  }
}

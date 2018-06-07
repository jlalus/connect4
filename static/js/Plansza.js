function Plansza() {

  this.loadModel = function(callback) {

    var loader = new THREE.ObjectLoader();


    loader.load('model/table.json', function(obj) {
console.log(obj)
obj.rotateY(Math.PI/2)
obj.scale.set(5,5,5)
obj.position.set(-10,-158,-150)

///test

var box = new THREE.Box3().setFromObject(obj);

console.log(box.min, box.max, box.size());
      // zwrócenie kontenera

      var axes = new THREE.AxesHelper(1000)
      obj.add(axes)
      callback(obj);

    });
  }
}

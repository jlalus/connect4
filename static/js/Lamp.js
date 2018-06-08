function Lamp() {

  this.loadModel = function(callback) {

    var loader = new THREE.ObjectLoader();


    loader.load('model/lamp.json', function(obj) {
console.log(obj)
obj.rotateY(Math.PI/2)
obj.scale.set(0.2,0.2,0.2)
obj.position.set(0,350,12)


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

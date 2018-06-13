function Light(intensity, color, range, angle) {


  var light
  var container = new THREE.Object3D();

  // init

  function init() {

    light = new THREE.SpotLight(color, intensity, 1000, angle);
    light.position.set(0, 0, 0);
    //light.castShadow = true;
    //light.shadow.mapSize.width = 2000; // default
    //light.shadow.mapSize.height = 2000; // default
    //light.shadow.camera.near = 500; // default
    //light.shadow.camera.far = 500 // default

    var geometry = new THREE.SphereGeometry(10, 5, 100);
    var material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true
    });
    var sphere = new THREE.Mesh(geometry, material);
    container.add(sphere);
    container.position.set(0, 350, 0);
    light.rotateX(Math.PI / 2)
    container.add(light)


    // tu utwórz materiał , geometrię, światło, mesh
    // i dodaj je do kontenera (add)

  }

  init();

  // funkcja publiczna zwracająca obiekt kontenera
  // czyli nasze światło wraz z bryłą

  this.getLightCon = function() {
    return container;
  }

  this.getLight = function() {
    return light
  }






}

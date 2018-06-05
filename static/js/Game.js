function Game() {

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(
    45, // kąt patrzenia kamery (FOV - field of view)
    $(window).width() / $(window).height(), // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
    0.1, // minimalna renderowana odległość
    10000 // maxymalna renderowana odległość
  );
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  //  renderer.shadowMap.enabled = true
  //  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setClearColor(0xFFFFFF);
  renderer.setSize($(window).width(), $(window).height());
  $("#root").append(renderer.domElement);

//=============OrbitControls
  var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControl.addEventListener('change', function () {
      renderer.render(scene, camera)
  });



  var plansza = new Plansza;
  var axes = new THREE.AxesHelper(1000)
  scene.add(axes)
  scene.add(plansza.getPlane())

var chip = new Chip;
scene.add(chip.getChip())

var wall = new Wall;;
wall.loadModel(function(data) {
scene.add(data)
})


  camera.position.set(80, 100, 80)
  camera.lookAt(scene.position)





  function render() {


    requestAnimationFrame(render);




    renderer.render(scene, camera);

  }



  render();



}

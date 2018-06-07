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

  //========ZMIENNE

  var move = false;
  var gravity = 1;

  var tab_wall = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],

  ]
  //=============OrbitControls
  var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControl.addEventListener('change', function() {
    renderer.render(scene, camera)
  });

  var axes = new THREE.AxesHelper(1000)
  scene.add(axes)


  var chip = new Chip();
  scene.add(chip.getChip())

  var wall = new Wall();
  wall.loadModel(function(data) {
    scene.add(data)
  })

  var plansza = new Plansza();
  plansza.loadModel(function(data) {
    scene.add(data)

  })
  var stars = new Stars();
  scene.add(stars.getStar())


  camera.position.set(200, 100, 0)
  camera.lookAt(scene.position)


  var ui = new Ui();

  $(document).keydown(function(e) {

    if (e.which == 65) {
      console.log("LEFT");
      if (!move)
        chip.getChip().position.z += 7

    }
    if (e.which == 68) {
      console.log("RIGHT");
      if (!move)
        chip.getChip().position.z -= 7

    }
    if (e.which == 32) {

      move = true

    }

  })


  //65 68

  function render() {

    if (move) {

      tempY = (6 - Math.floor((chip.getChip().position.y - 16) / 7)) - 1
      tempX = Math.floor(chip.getChip().position.z / 7) + 3


      console.log(tempY, tempX);
      chip.getChip().translateZ(1)

      if (tempY > 0) {

        if (tempY < tab_wall.length) {
          if (tab_wall[tempY][tempX] != 0) {
            // Jeśli coś jest

            tab_wall[tempY - 1][tempX] = chip.getChip().name
            console.log(tab_wall)
            move = false
            tab_wall[tempY - 1][tempX] = chip.getChip().name
            console.log(tab_wall)
            console.log("STOP KOLIZJA")
            chip = new Chip();
            scene.add(chip.getChip())


          } else {


          }

        } else {
          move = false
          tab_wall[tempY - 1][tempX] = chip.getChip().name
          console.log(tab_wall)
          console.log("STOP DOL")
          chip = new Chip();
          scene.add(chip.getChip())

        }

      } else {
        console.log("NIE MA");
      }
    }

    requestAnimationFrame(render);




    renderer.render(scene, camera);

  }



  render();



}

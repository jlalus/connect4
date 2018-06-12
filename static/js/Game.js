function Game() {

  var scene = new THREE.Scene();
  var client = io.connect("http://localhost:3000");
  var camera = new THREE.PerspectiveCamera(
    45, // kąt patrzenia kamery (FOV - field of view)
    $(window).width() / $(window).height(), // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
    0.1, // minimalna renderowana odległość
    10000 // maxymalna renderowana odległość
  );
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  var _id;
  var _color;
  var _name = null;
  var _update;
  //==========SOCKETS
  client.on("start", function (data) {
    _id = data.id;
    //client.emit("start",data)
    console.log(data);
  })

  client.on("color", function (data) {
    _color = data.color
    _name = data.name
    console.log(_color, _name)
    if (_color == "red") {
      _update = false;
    } else {
      _update = true;
    }
    console.log(_update)
  })

  $("#bNick").on("click", function () {
    var val = $("#nick").val();
    console.log("VAL", val)
    client.emit("addUser", { id: _id, nick: val })
    $("#welcome").remove()
  })


  //  renderer.shadowMap.enabled = true
  //  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setClearColor(0xFFFFFF);
  renderer.setSize($(window).width(), $(window).height());
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  $("#root").append(renderer.domElement);

  //========ZMIENNE


  //  =============OrbitControls
  var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
  orbitControl.addEventListener('change', function () {
    renderer.render(scene, camera)
  });

  //var axes = new THREE.AxesHelper(1000)
  //scene.add(axes)

  //============LIGHT
  var light1 = new Light(0.8, 0xFFFFFF, 2, 10);
  scene.add(light1.getLightCon())
  // var spotLightHelper = new THREE.SpotLightHelper(light1.getLight());
  // scene.add(spotLightHelper);

  var light2 = new Light(2, 0xa3742d, 20, 20);
  scene.add(light2.getLightCon())
  light2.getLightCon().position.set(-400, 400, -400)
  light2.getLightCon().rotateZ(-Math.PI / 2)
  light2.getLightCon().rotateX(-Math.PI / 4)

  // var spotLightHelper = new THREE.SpotLightHelper(light2.getLight());
  // scene.add(spotLightHelper);

  var light3 = new Light(1, 0xFFFFFF, 5, 20);
  scene.add(light3.getLightCon())
  light3.getLightCon().position.set(400, 800, 0)
  light3.getLightCon().rotateZ(Math.PI / 4)

  // var spotLightHelper = new THREE.SpotLightHelper(light3.getLight());
  //scene.add(spotLightHelper);

  var chip = new Chip();
  scene.add(chip.getChip())

  var skyBox = new SkyBox();
  scene.add(skyBox.getSkyBox())

  var wall = new Wall();
  wall.loadModel(function (data) {
    scene.add(data)

  })

  var lamp = new Lamp();
  lamp.loadModel(function (data) {
    scene.add(data)
  })

  var plansza = new Plansza();
  plansza.loadModel(function (data) {
    scene.add(data)

  })
  var stars = new Stars();
  scene.add(stars.getStar())


  camera.position.set(-200, 100, 100) //lub 100
  camera.lookAt(scene.position)


  var ui = new Ui();

  var movingChipColor;
  $(document).keydown(function (e) {
    if (_name != null) {
      if (!_update) {
        console.log(e.which)
        if (e.which == 68) {
          // console.log("LEFT");
          if (!settings.move)

            if (Math.floor(chip.getChip().position.z) < 21) {
              chip.getChip().position.z += 7
              client.emit("update", "right")
            }
        }
        if (e.which == 65) {
          // console.log("RIGHT");
          if (!settings.move)
            if (Math.floor(chip.getChip().position.z) > -21) {
              chip.getChip().position.z -= 7
              client.emit("update", "left")
            }

        }
        if (e.which == 32) {
          client.emit("update", "space")
          movingChipColor = _color
          settings.move = true
        }
      }
    }
  })


  console.log("TUTAJ SIE UPDATUJE")
  client.on("updated", function (data) {
    if (_update) {
      console.log("DATA", data)
      var color;
      if (_color == "red") color = "blue";
      else color = "red"

      if (data.action == "right") {
        if (!settings.move)
          if (Math.floor(chip.getChip().position.z) < 21) {
            chip.getChip().position.z += 7
          }
      } else if (data.action == "left") {
        if (!settings.move)
          if (Math.floor(chip.getChip().position.z) > -21) {
            chip.getChip().position.z -= 7
          }
      } else if (data.action == "space") {
        movingChipColor = color
        settings.move = true
      }
    }

  })





  //65 68

  var alfa = 0

  function render() {
      if (settings.move) {

        tempY = (6 - Math.floor((chip.getChip().position.y - 16) / 7)) - 1
        tempX = Math.floor(chip.getChip().position.z / 7) + 3


        //  console.log(tempY, tempX);
        chip.getChip().translateZ(settings.gravity)

        if (tempY > 0) {

          if (tempY < settings.tab_wall.length) {
            if (settings.tab_wall[tempY][tempX] != 0) {

              if (settings.tab_wall[0][tempX] != 0) {
                settings.move = false
                chip.getChip().position.y = 63
                //    console.log("STOP PIERWSZY")
              } else {
                  _update = !_update
                  console.log(_update)
                //  console.log(settings.tab_wall)
                settings.move = false
                settings.tab_wall[tempY - 1][tempX] = chip.getChip().name
                //   console.log(settings.tab_wall)
                //   console.log("STOP KOLIZJA")
                
                chip = new Chip();
                if (movingChipColor == "blue") {
                  chip.getChip().name = "R"
                  chip.getChip().material.color.setHex(0xff0000)
                } else {
                  chip.getChip().name = "B"
                  chip.getChip().material.color.setHex(0x0000ff)
                }
                scene.add(chip.getChip())
              }




            } else {


            }

          } else {
              _update = !_update
              console.log(_update)
            settings.move = false
            settings.tab_wall[tempY - 1][tempX] = chip.getChip().name
            console.log(settings.tab_wall)
            //  console.log("STOP DOL")
            chip = new Chip();
            console.log(chip.getChip())
            if (movingChipColor == "blue") {
              chip.getChip().name = "R"
              chip.getChip().material.color.setHex(0xff0000)
            } else {
              chip.getChip().name = "B"
              chip.getChip().material.color.setHex(0x0000ff)
            }
            scene.add(chip.getChip())

          }

        } else {
          //  console.log("NIE MA");
        }
      }
    


    requestAnimationFrame(render);

    renderer.render(scene, camera);

  }



  render();



}

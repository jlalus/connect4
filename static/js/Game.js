function Game() {

  var scene = new THREE.Scene();
  var client = io();
  var camera = new THREE.PerspectiveCamera(
    45, // kąt patrzenia kamery (FOV - field of view)
    $(window).width() / $(window).height(), // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
    0.1, // minimalna renderowana odległość
    1300 // maxymalna renderowana odległość
  );
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  var _id;
  var _color;
  var _name = null;
  var _update;
  //==========SOCKETS
  client.on("start", function(data) {
    _id = data.id;
    //client.emit("start",data)
    console.log(data);
  })

  client.on("color", function(data) {
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

  $("#bNick").on("click", function() {
    var val = $("#nick").val();
    console.log("VAL", val)
    client.emit("addUser", {
      id: _id,
      nick: val
    })
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
  orbitControl.addEventListener('change', function() {
    renderer.render(scene, camera)
  });

  //var axes = new THREE.AxesHelper(1000)
  //scene.add(axes)

  //============LIGHT
  var light1 = new Light(0.8, 0xFFFFFF, 2, 10);
  scene.add(light1.getLightCon())
  // var spotLightHelper = new THREE.SpotLightHelper(light1.getLight());
  // scene.add(spotLightHelper);

  var light2 = new Light(3, 0xa3742d, 20, 20);
  scene.add(light2.getLightCon())
  light2.getLightCon().position.set(-400, 400, -400)
  light2.getLightCon().rotateZ(-Math.PI / 2)
  light2.getLightCon().rotateX(-Math.PI / 4)

  // var spotLightHelper = new THREE.SpotLightHelper(light2.getLight());
  // scene.add(spotLightHelper);

  var light3 = new Light(3, 0xFFFFFF, 5, 20);
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
  wall.loadModel(function(data) {
    scene.add(data)

  })

  var lamp = new Lamp();
  lamp.loadModel(function(data) {
    scene.add(data)
  })

  var plansza = new Plansza();
  plansza.loadModel(function(data) {
    scene.add(data)

   })
  var stars = new Stars();
  scene.add(stars.getStar())

  var win = null;
  var iloscRuchow = 0;

  function CheckArray(y, x) {
    if (settings.tab_wall.length == 42) return "Remis"
    var color = settings.tab_wall[y][x]
    //===================prawo lewo============
    var win = 1
    //prawo
    for (var i = 1; i < 4; i++) {
      if (x + i < 7) {
        if (settings.tab_wall[y][x + i] == color) {
          win++
        } else {
          break
        }
      } else {
        break
      }
    }

    //lewo
    for (var i = 1; i < 4; i++) {
      if (x - i >= 0) {
        if (settings.tab_wall[y][x - i] == color) {
          win++
        } else {
          break
        }
      } else {
        break
      }
    }
    if (win == 4) {
      return true;
    }

    //===================dol============
    win = 1

    //dol
    for (var i = 1; i < 4; i++) {
      console.log(y)
      if (y + i < 6) {
        if (settings.tab_wall[y + i][x] == color) {
          win++
        } else {
          break
        }
      } else {
        break
      }
    }
    if (win == 4) {
      return true;
    }
    win = 1


    //===================skos prawo lewo============

    //skos prawo gora
    for (var i = 1; i < 4; i++) {
      if (x + i < 7 && y - i >= 0) {
        if (settings.tab_wall[y - i][x + i] == color) {
          win++
        } else {
          break
        }
      } else {
        break
      }
    }

    //sko lewo dol
    for (var i = 1; i < 4; i++) {
      if (x - i >= 0 && y + i < 6) {
        if (settings.tab_wall[y + i][x - i] == color) {
          win++
        } else {
          break
        }
      } else {
        break
      }
    }
    if (win == 4) {
      return true;
    }

    //===================skos lewo prawo============
    win = 1
    //skos lewo gora
    for (var i = 1; i < 4; i++) {
      if (x - i >= 0 && y - i >= 0) {
        if (settings.tab_wall[y - i][x - i] == color) {
          win++
        } else {
          break
        }
      } else {
        break
      }
    }


    //skos prawo dol
    for (var i = 1; i < 4; i++) {
      if (x + i < 7 && y + i < 6) {
        if (settings.tab_wall[y + i][x + i] == color) {
          win++
        } else {
          break
        }
      } else {
        break
      }
    }
    if (win == 4) {
      return true;
    }
    win = 1
  }
  camera.position.set(-200, 100, 100) //lub 100
  camera.lookAt(scene.position)


  var ui = new Ui();

  var movingChipColor;
  $(document).keydown(function(e) {
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

  client.on("Wynik", function(data) {
    console.log("COS", data)
  })


  client.on("reload", function(data) {
    document.location.reload()
  })
  console.log("TUTAJ SIE UPDATUJE")
  client.on("updated", function(data) {
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
  var clock = new THREE.Clock();

  function render() {
    var delta = clock.getDelta();
    //console.log(delta);
    if (settings.move) {

      tempY = (6 - Math.floor((chip.getChip().position.y - 16) / 7)) - 1
      tempX = Math.floor(chip.getChip().position.z / 7) + 3


      //  console.log(tempY, tempX);
      chip.getChip().translateZ(settings.gravity*delta*100)

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
              if (movingChipColor == _color) iloscRuchow++
                if (movingChipColor == "blue") {
                  chip.getChip().name = "R"
                  chip.getChip().material.color.setHex(0xff0000)
                } else {
                  chip.getChip().name = "B"
                  chip.getChip().material.color.setHex(0xffff00)
                }
              scene.add(chip.getChip())
              if (CheckArray(tempY - 1, tempX)) {
                var myColor = _color.slice(0, 1).toUpperCase()
                var d = new Date()
                var month, minutes, seconds, hours;
                if (d.getMonth() > 9) month = d.getMonth() + 1
                else month = "0" + (d.getMonth() + 1)
                if (d.getMinutes() < 10) minutes = "0" + d.getMinutes()
                else minutes = d.getMinutes();
                if (d.getSeconds() < 10) seconds = "0" + d.getSeconds()
                else seconds = d.getSeconds();
                if (d.getHours() < 10) hours = "0" + d.getHours()
                else hours = d.getHours();
                var data = d.getDate() + "." + month + "." + d.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
                console.log(data)
                console.log("Mycolor", myColor)
                console.log("Glowny", _color)
                if (settings.tab_wall[tempY][tempX] == myColor) {
                  client.emit("Wynik", {
                    status: true,
                    kolor: _color,
                    id: _id,
                    name: _name,
                    data: data,
                    ilosc: iloscRuchow
                  })
                } else {
                  client.emit("Wynik", {
                    status: false,
                    kolor: _color,
                    id: _id,
                    name: _name,
                    data: data,
                    ilosc: iloscRuchow
                  })
                }
              }
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
          if (movingChipColor == _color) iloscRuchow++
            if (movingChipColor == "blue") {
              chip.getChip().name = "R"
              chip.getChip().material.color.setHex(0xff0000)

            } else {
              chip.getChip().name = "B"
              chip.getChip().material.color.setHex(0xffff00)

            }
          scene.add(chip.getChip())
          if (CheckArray(tempY - 1, tempX)) {
            var myColor = _color.slice(0, 1).toUpperCase()
            var d = new Date()
            var month, minutes, seconds, hours;
            if (d.getMonth() > 9) month = d.getMonth() + 1
            else month = "0" + (d.getMonth() + 1)
            if (d.getMinutes() < 10) minutes = "0" + d.getMinutes()
            else minutes = d.getMinutes();
            if (d.getSeconds() < 10) seconds = "0" + d.getSeconds()
            else seconds = d.getSeconds();
            if (d.getHours() < 10) hours = "0" + d.getHours()
            else hours = d.getHours();
            var data = d.getDate() + "." + month + "." + d.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
            console.log(data)
            console.log("Mycolor", myColor)
            console.log("Glowny", _color)
            if (settings.tab_wall[tempY][tempX] == myColor) {
              client.emit("Wynik", {
                status: false,
                kolor: _color,
                id: _id,
                name: _name,
                data: data,
                ilosc: iloscRuchow
              })
            } else {
              client.emit("Wynik", {
                status: false,
                kolor: _color,
                id: _id,
                name: _name,
                data: data,
                ilosc: iloscRuchow
              })
            }
          }
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

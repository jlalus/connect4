
function Game() {
    var kula1 = new Kula(); //kula przeciwnika
    var armata1 = new Armata(); //armata przeciwnika
    //tablica ściany
    var sciana = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
    ]
    //tablica cegieł 
    var tabCegiel = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ]
    //która kolumna
    var kolumna;
    //czas dla cegieł 
    var time = 10;
    var tCegla = 0;
    //grawitacja
    var g = 9.81;
    //odrzut armaty w X i Z
    var cofanieX;
    var cofanieZ;
    // powrót koloru lufy po kliku
    var colorLufy = { "r": 0, "g": 1, "b": 0 }
    // czy kula została wystrzelona
    wystrzal = false
    // drgania podłoża wroga
    enemyDrag = false
    //nasze drgania podłoża
    drag = 0;
    //kąt alpha do obrotu armaty
    alfa = 0
    // przesunięcie dziala i kuli w zależności od gracza(w sensie zalogowanego czy 1 czy 2)
    var kulax = 200
    // czy kula uderzyła w podłoże
    bum = false
    //czas przy locie kuli
    var t = 0;
    //prędkośc początkowa kuli
    var v = 80;
    //zmienne do odzrutu działa podczas strzalu 
    var odrzut = false;
    var tyl = false;
    var przod = false;
    //kąty do lotu kuli pobierane z mousemove
    var cordsX = 180
    var cordsY = 45
    //---------------
    kulaPosition = { "x": 0, "y": 200, "z": 0 }
    armataPosition = { "x": 0, "y": 0, "z": 0 }
    x = $(window).width()
    y = $(window).height()
    var camera = new THREE.PerspectiveCamera(
        90,
        x / y,
        0.1,
        20000,
    );
    var raycaster = new THREE.Raycaster();
    var mouseVector = new THREE.Vector2()
    camera.position.x = 1050;
    camera.position.y = 750;
    camera.position.z = 0;
    var scene = new THREE.Scene();
    for (var i = 0; i < sciana.length; i++) {
        for (var j = 0; j < sciana[i].length; j++) {
            var cegla = new Cegla();
            scene.add(cegla.getCegla())
            cegla.getCegla().position.set(-750 + (j * 300), (i * 300) + 150, -5000)
            cegla.getCegla().userData = { "x": i, "y": j }
            //console.log(cegla.getCegla())
            tabCegiel[i][j] = cegla.getCegla();
        }
    }
    //console.log(sciana[0][0])
    var init = function () {
        x = $(window).width()
        y = $(window).height()
        var raycaster = new THREE.Raycaster();
        var mouseVector = new THREE.Vector2();
        var renderer = new THREE.WebGLRenderer();
        var start = false;
        renderer.setClearColor(0xffffff);
        renderer.setSize(x, y);
        $("#root").append(renderer.domElement);
        camera.lookAt(scene.position);
        //dodanie planszy
        scene.add(plansza.getPlane())
        ok = 0
        scene.add(cegla.getCegla())
        //var lufaVect;
        var test = 0;
        var ddrag = 0
        var trafienie = 0
        var hitCegla = new THREE.Object3D()
        var uderzenie = false;
        function render() {
            lufaVect = armata.getArmata().getWorldDirection()
            armata.getArmata().rotation.y = cordsX * (Math.PI / 180)
            armata.getDzialo().rotation.z = cordsY * (Math.PI / 180)
            if (odrzut == true) {
                if (tyl == true) {
                    armata.getKola().children[0].rotation.y += 10 //rotacja koła lewego
                    armata.getKola().children[1].rotation.y += 10//rotacja koła prawego w przód
                    armata.getArmata().position.z -= cofanieZ
                    armata.getArmata().position.x -= cofanieX
                }
                if (przod == true) {
                    armata.getKola().children[0].rotation.y -= 10//rotacja koła lewego
                    armata.getKola().children[1].rotation.y -= 10 //rotacja koła prawego w przód
                    armata.getArmata().position.z += cofanieZ
                    armata.getArmata().position.x += cofanieX
                }
            }
            if (kula.getKula().position.y <= 10 && bum == true) {
                drag++
                plansza.getPlane().rotation.z = Math.sin(drag) / 500
                plansza.getPlane().rotation.x = Math.sin(drag) / 500

                kula.getKula().position.y = 0
                if (drag > 50) {
                    bum = false
                }
                wystrzal = false
                net.scenaDrag(bum)
            }
            else {
                plansza.getPlane().rotation.z = 0
                plansza.getPlane().rotation.x = 0
            }
            if (wystrzal == true) {
                //if(uderzenie == false){
                    camera.lookAt(kula.getKula().position)
                    camera.position.x = kula.getKula().position.x - (lufaVect.x * 300)
                    camera.position.z = kula.getKula().position.z - (lufaVect.z * 300)
                    camera.position.y = kula.getKula().position.y + 100
                //}
               
                t += (4 / 1000) * 50
                kula.getKula().position.set(armata.getArmata().getWorldDirection().x * v * t / 2 * Math.cos(alfa) + kula.getKula().position.x, v * t / 2 * Math.sin(alfa) - ((g * t * t) / 2) + kula.getKula().position.y, armata.getArmata().getWorldDirection().z * v * t / 2 * Math.cos(alfa) + kula.getKula().position.z)
                //nie wiem czy to tak działa ale warto spróbować XD ~działa dobry pomysł miałem :D <3
                var kulaVect = armataPosition = { "x": 0, "y": 0 }
                raycaster.setFromCamera(kulaVect, camera);
                intersects = raycaster.intersectObjects(scene.children);
                if (intersects.length > 0 && intersects[0].object.name == "cegla" && trafienie < 1) {
                    trafienie++
                    intersects[0].object.material.color = { "r": 1, "g": 0, "b": 0 };
                    hitCegla = intersects[0].object
                    uderzenie = true
                    tabCegiel[hitCegla.userData.x][hitCegla.userData.y] = 0;
                    intersects[0].object.name = "trafiony"
                }
            }
            if (uderzenie == true) {
                
                tCegla += 0.5
                if (hitCegla.position.y > 150) {
                    hitCegla.position.y = hitCegla.position.y - ((g * tCegla * tCegla) / 2)
                }
                if (hitCegla.position.y <= 150) {
                    hitCegla.position.y = 150
                }
                if (tCegla <= time) {
                    hitCegla.position.z = hitCegla.position.z - (Math.random() * hitCegla.position.y + 50)
                    for (var i = 0; i < 5; i++) {
                        if (i > hitCegla.userData.x && tabCegiel[i][hitCegla.userData.y] != 0) {
                            tabCegiel[i][hitCegla.userData.y].position.y -= 15
                        }
                    }
                }
                else {
                    uderzenie = false
                    trafienie = 0
                    hitCegla = new THREE.Object3D()
                }
                for (var i = 0; i < tabCegiel.length; i++) {
                    for (var j = 0; j < tabCegiel.length; j++) {
                        if (tabCegiel[i][j] != 0) {
                            var x = tabCegiel[i][j].position.x
                            var y = tabCegiel[i][j].position.y
                            var z = tabCegiel[i][j].position.z
                            net.ceglaPosition(x, y, z, i, j)
                        }
                        else {
                            net.ceglaZero(i, j)
                        }
                    }
                }
            }

            if (wystrzal == false && bum == false && uderzenie == false) {
                drag = 0
                kula.getKula().position.x = 200 * Math.sin((/*($("#lufa").val())*/cordsY / 360) * 2 * Math.PI) * Math.sin((/*($("#dzialo").val())*/cordsX / 360) * 2 * Math.PI) - kulax
                kula.getKula().position.z = 200 * Math.sin((/*($("#lufa").val())*/cordsY / 360) * 2 * Math.PI) * Math.cos((/*($("#dzialo").val())*/cordsX / 360) * 2 * Math.PI)
                kula.getKula().position.y = 50 + 200 * Math.cos((/*($("#lufa").val())*/cordsY / 360) * 2 * Math.PI)
                camera.position.x = kula.getKula().position.x - (lufaVect.x * 300)
                camera.position.z = kula.getKula().position.z - (lufaVect.z * 300)
                camera.position.y = kula.getKula().position.y + 100
                camera.lookAt(kula.getKula().position)
                kulaPosition.x = kula.getKula().position.x
                kulaPosition.z = kula.getKula().position.z
                kulaPosition.y = kula.getKula().position.y
            }
            if (enemyDrag == true) {
                ddrag++
                plansza.getPlane().rotation.z = Math.sin(ddrag) / 500
                plansza.getPlane().rotation.x = Math.sin(ddrag) / 500
                if (ddrag > 50) {
                    enemyDrag = false
                }

            }
            net.lufaCords(armata.getDzialo().rotation.z)
            net.dzialoCords(armata.getArmata().rotation.y)
            net.kulaCords(kula.getKula().position.x, kula.getKula().position.y, kula.getKula().position.z)
            net.kolaRotation(armata.getKola().children[0].rotation.y)
            net.armataPosition(armata.getArmata().position.x, armata.getArmata().position.y, armata.getArmata().position.z)

            requestAnimationFrame(render);
            renderer.render(scene, camera);

        }

        render();
        $(document).on("keydown", function (event) {
            if (event.keyCode == 32) {
                cofanieX = armata.getArmata().getWorldDirection().x
                cofanieZ = armata.getArmata().getWorldDirection().z
                odrzut = true
                tyl = true
                setTimeout(function () {
                    tyl = false
                    przod = true
                }, 500)
                setTimeout(function () {
                    odrzut = false
                    przod = false
                }, 1000)
                alfa = (90 - (armata.getDzialo().rotation.z * (180 / Math.PI))) * (Math.PI / 180)
                beta = armata.getArmata().rotation.y
                drag = 30
                t = 0
                tCegla = 0
                kulaPosition.x = kula.getKula().position.x
                kulaPosition.z = kula.getKula().position.z
                kulaPosition.y = kula.getKula().position.y
                wystrzal = true;
                bum = true;
            }
        })
    }

    init();

    this.addPlayer = function (e) {
        //dodanie armaty
        if (e == 1) {
            //player 1
            scene.add(armata.getArmata())
            armata.getArmata().position.y += 50
            armata.getArmata().position.x -= 200
            armata.getArmata().name = "ARMATA"
            armata.getMaterial().color = { "r": 1, "g": 1, "b": 0 }
            scene.add(kula.getKula())
            kula.getKula().position.x -= 200
        }
        if (e == 2) {
            //player 2 
            scene.add(armata1.getArmata())
            armata1.getArmata().position.y += 50
            armata1.getArmata().position.x = 200
            armata1.getMaterial().color = { "r": 0, "g": 1, "b": 1 }
            scene.add(kula1.getKula())
            kula1.getKula().position.x = 200

        }
        if (e == 3) {
            scene.add(armata.getArmata())
            armata.getArmata().position.y += 50
            armata.getArmata().position.x = 200
            armata.getMaterial().color = { "r": 1, "g": 1, "b": 0 }
            kulax = -200

            scene.add(kula.getKula())
            kula.getKula().position.x = 200
            scene.add(armata1.getArmata())
            armata1.getArmata().position.y += 50
            armata1.getArmata().position.x -= 200
            scene.add(kula1.getKula())
            kula1.getKula().position.x -= 200
        }

    }
    var last = new THREE.Object3D()
    var tempX
    var tempY
    $(document).on("mousedown", function (event) {
        var arrayObject = armata.getDzialo().children
        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
        tempX = event.clientX
        tempY = event.clientY
        raycaster.setFromCamera(mouseVector, camera);
        intersects = raycaster.intersectObjects(arrayObject);
        if (intersects.length > 0 && intersects[0].object.name == "LUFA") {
            colorLufy = intersects[0].object.material.color
            intersects[0].object.material.color = { "r": 1, "g": 1, "b": 1 };
            last = intersects[0].object
        }
        $(document).on("mouseup", function () {
            last.material.color = colorLufy;
            $(document).off("mousemove")
        })
        $(document).on("mousemove", function (event) {
            cordsX = -(tempX - event.clientX-180)
            cordsY = tempY - event.clientY+45
            if (cordsY < 0) {
                cordsY = 0
            }
            if (cordsY > 90) {
                cordsY = 90
            }
        })
    })


    this.rotateLufa = function (e) {
        armata1.getDzialo().rotation.z = e
    }
    this.rotateArmata = function (e) {
        armata1.getArmata().rotation.y = e
    }
    this.kulaPosition = function (x, y, z) {
        kula1.getKula().position.x = x
        kula1.getKula().position.y = y
        kula1.getKula().position.z = z
    }
    this.scenaBum = function (e) {
        enemyDrag = e
    }
    this.delEnemy = function () {
        armata1.getArmata().position.y -= 50
        scene.remove(armata1.getArmata())
        scene.remove(kula1.getKula())
    }
    this.enemyRot = function (e) {
        armata1.getKola().children[0].rotation.y = e
        armata1.getKola().children[1].rotation.y = e
    }
    this.enemyPosition = function (x, y, z) {
        armata1.getArmata().position.x = x
        armata1.getArmata().position.y = y
        armata1.getArmata().position.z = z
    }
    this.zerowanieCegly = function (i, j) {
        tabCegiel[i][j].name = "trafiony"
        tabCegiel[i][j] = 0
    }
    this.ceglaHitPos = function (x, y, z, ix, iy) {
        tabCegiel[ix][iy].position.x = x
        tabCegiel[ix][iy].position.y = y
        tabCegiel[ix][iy].position.z = z

    }

}
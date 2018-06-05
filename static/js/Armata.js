function Armata() {

    var container = new THREE.Object3D()
    var kola = new THREE.Object3D()
    var lufa = new THREE.Object3D()
   
    var geometry = new THREE.CylinderGeometry(50, 50, 200, 10);
    geometry.translate(0,100,0)
    var material1 = new THREE.MeshBasicMaterial({
        wireframe: true,
        color: "blue",
    });
    var cylinder = new THREE.Mesh(geometry, material1);
    lufa.add(cylinder)
    lufa.rotateY(Math.PI/2)
    cylinder.name = "LUFA"
    // lufa.add(kula.getKula())
    // kula.getKula().position.y =200
    container.add(lufa)

    var geometry = new THREE.CylinderGeometry(100, 100, 10, 6);
    var material = new THREE.MeshBasicMaterial({
        wireframe: false,
        color: "black",
    });
    var kolo = new THREE.Mesh(geometry, material);
    kolo.rotateX(Math.PI / 2);
    kolo.position.z +=55
    kola.add(kolo)
  

    var geometry = new THREE.CylinderGeometry(100, 100, 10, 6);
    var material = new THREE.MeshBasicMaterial({
        wireframe: false,
        color: "black",
    });
    var kolo = new THREE.Mesh(geometry, material);
    kolo.rotateX(Math.PI / 2);
    kolo.position.z -=55
    kola.add(kolo)
    container.add(kola)
    kola.rotateY(Math.PI/2)
    
   // container.add(kula.getKula())


    var axes = new THREE.AxesHelper(100)
    container.add(axes)
    this.getArmata = function(){
        return container;
    }
    this.getDzialo = function(){
        return lufa;
    }
    this.getMaterial = function(){
        return material1
    }
    this.getKola = function(){
        return kola
    }
}
function Plansza()
{

    var geometry = new THREE.PlaneGeometry(100, 100, 10, 10)
    geometry.rotateX(Math.PI / 2);

    var material = new THREE.MeshBasicMaterial({
      color: "brown",
      side: THREE.DoubleSide,
      map: new THREE.TextureLoader().load('img/wood.jpg'),
      side: THREE.DoubleSide,
    //  wireframe: true,
      transparent: true,
      opacity: 0.5
    });

    var plansza = new THREE.Mesh(geometry, material);
    //  plansza.receiveShadow = true;



    this.getPlane = function(){
        return plansza
    }
}

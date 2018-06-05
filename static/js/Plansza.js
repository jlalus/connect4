function Plansza()
{
    var plansza = new THREE.BoxGeometry(20000, 1, 20000,10,10,10)
    var material = new THREE.MeshBasicMaterial({
        wireframe: false,
        color: "grey",
    });
    var plane = new THREE.Mesh(plansza, material);


    this.getPlane = function(){
        return plane
    }
}
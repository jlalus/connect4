function Cegla(){

    var box = new THREE.BoxGeometry(300, 300, 300 )
    var material = new THREE.MeshBasicMaterial({
        wireframe: false,
        color: "black",
    });
    var block  = new THREE.Mesh(box, material);
    block.name = "cegla"
this.getCegla = function(){
    return block
}
}
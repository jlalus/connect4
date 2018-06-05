function Chip() {
    var geometry = new THREE.CylinderGeometry( 3.4, 3.4, 1, 32 );
    var material = new THREE.MeshBasicMaterial({
        // wireframe: true,
        color: "red",
    });
    var chip = new THREE.Mesh(geometry, material);
    chip.name = "CHIP"
    chip.rotateX(Math.PI/2)
    chip.rotateZ(Math.PI/2)
    this.getChip = function () {
        return chip;
    }
}

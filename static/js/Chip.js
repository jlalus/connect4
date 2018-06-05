function Chip() {
    var geometry = new THREE.SphereGeometry(40, 32, 32);
    var material = new THREE.MeshBasicMaterial({
        // wireframe: true,
        color: "red",
    });
    var bullet = new THREE.Mesh(geometry, material);
    bullet.name = "KULA"
    this.getKula = function () {
        return bullet;
    }
}

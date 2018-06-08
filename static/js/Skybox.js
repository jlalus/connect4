//skybox
  
function SkyBox() {

  var imagePrefix = "img/sky/"; 
  var directions  = ["wall", "wall", "posy", "negy", "wall", "wall"]; 
  var imageSuffix = ".jpg";    
  var materialArray = []; 
  for (var i = 0; i < 6; i++)   materialArray.push(new THREE.MeshPhongMaterial({   
    map: THREE.ImageUtils.loadTexture(imagePrefix + directions[i] + imageSuffix),
       side: THREE.BackSide  
  }));   
  var skyGeometry = new THREE.CubeGeometry(1200, 800, 1200); 
  var skyMaterial = new THREE.MeshFaceMaterial(materialArray); 
  var skyBox = new THREE.Mesh(skyGeometry, skyMaterial); 
  skyBox.position.y += 242

  this.getSkyBox = function() {
    return skyBox;
  }
}

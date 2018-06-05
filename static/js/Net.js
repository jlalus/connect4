function Net() {
      client = io();
      var currentUser;
      client.on("onconnect", function (data) {
            // alert(data.stan)
            if (data.stan == "wait") {
                  // $("#wait").css("display","block")
                  console.log(data.stan)
                  currentUser = 1
                  game.addPlayer(1)
            }
            if (data.stan == "play") {

                  client.emit("start", { "stan": "play" });
                  console.log(data.stan)
                  currentUser = 2
                  // game.addPlayer(1)
                  game.addPlayer(3)
            }
      })
      client.on("start", function (data) {
            game.addPlayer(2)
      })

      this.getGraczN = function () {
            return currentUser
      }
      //nachylenie lufy
      this.lufaCords = function (e) {
            client.emit("lufa", { "rotationz": e });
      }
      client.on("lufa", function (data) {
            game.rotateLufa(data.rotationz)
      })
      //obrót działa
      this.dzialoCords = function (e) {
            client.emit("armata", { "y": e });
      }
      client.on("armata", function (data) {
            game.rotateArmata(data.y)
      })
      //pozycja kuli
      this.kulaCords = function (x,y,z) {
            client.emit("kula", { "x": x,"y":y,"z":z });
      }
      client.on("kula", function (data) {
            game.kulaPosition(data.x,data.y,data.z)
      })

      //drgania podłoża
      this.scenaDrag = function(e){
            client.emit("drag", { "drag": e });
      }
      client.on("drag", function (data) {
            game.scenaBum(data.drag)
      })
      //usunięcie gracza po rozłączeniu
      client.on("usun", function (data) {
            game.delEnemy()
      })

      //rotacja kół
      this.kolaRotation = function(data){
            client.emit("kolaRotacja", { "rot": data });
      }
      client.on("kolaRotacja", function (data) {
            game.enemyRot(data.rot)
      })
      //przesunięcie araty
      this.armataPosition = function(x,y,z){
            client.emit("armataPos", { "x": x,"y":y,"z":z });
      }
      client.on("armataPos", function (data) {
            game.enemyPosition(data.x,data.y,data.z)
      })
      //przesyłanie pozycji 
      this.ceglaPosition = function(x,y,z,ix,iy){
            client.emit("ceglaPos", { "x": x,"y":y,"z":z ,"ix":ix,"iy":iy});
      }
      client.on("ceglaPos", function (data) {
            game.ceglaHitPos(data.x,data.y,data.z,data.ix,data.iy)
      })
      //zerowanie w pozycji cegieł
      this.ceglaZero = function(i,j){
            client.emit("ceglaZero", {"i":i,"j":j});
      }
      client.on("ceglaZero", function (data) {
            game.zerowanieCegly(data.i,data.j)
      })
}
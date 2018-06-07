var http = require("http");
var fs = require("fs");
var express = require("express")
var app = express()
var qs = require("querystring")
var port=3000;
var server = http.createServer(app)
var socketio = require("socket.io")

app.use(express.static('static'))

var path = require("path")

app.get("/", function (req, res) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname + "/static/index.html"))

})

app.listen(port, function() {
  console.log("serwer startuje na porcie 3000")

});
 var io = socketio.listen(server)
// io.sockets.on("connection", function (client) {
//     ilu++;
//     if (ilu == 1) {
//         client.emit("onconnect", {
//             stan: "wait",
//         })
//     }
//     client.on("disconnect", function () {
//         ilu--;
//         if(ilu <2)
//         io.sockets.emit("usun", { "usun":true });
//     })
//     if (ilu == 2) {
//         client.emit("onconnect", {
//             stan: "play",
//         })
//     }
//
// })

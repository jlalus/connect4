var http = require("http");
var fs = require("fs");
var express = require("express")
var app = express()
var qs = require("querystring")
const port=3000;
var server = http.createServer(app)
var socketio = require("socket.io")

app.use(express.static('static'))

var path = require("path")

server.listen(port, function() {
  console.log("serwer startuje na porcie 3000")
});

app.get("/", function (req, res) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname + "/static/index.html"))
})

var io = socketio.listen(server) 

io.sockets.on("connection", function (client) {    
    console.log("klient się podłączył"+ client.id) 
    // client.id - unikalna nazwa klienta generowana przez socket.io
})

function user(id, name, color) {
  this.id = id;
  this.name = name;
  this.color = color;
}

var tabUsers = [];
var color;
 io.sockets.on("connection", function (client) {
    console.log("klient się podłączył " + client.id)
     io.sockets.to(client.id).emit("start", {
        id: client.id,
    }) 

    client.on("addUser", function(data){
        if(tabUsers.length == 0){
            tabUsers.push(new user(data.id, data.nick, "red"))
            io.sockets.to(data.id).emit("color", {
                name:data.nick,
                color: "red"
            })
        } else{
            tabUsers.push(new user(data.id, data.nick, "blue"))
            io.sockets.to(data.id).emit("color", {
                name:data.nick,
                color: "blue"
            })
        }
    })
    
    client.on("update", function(data){
        
        io.sockets.emit("updated", {
            action: data
        })
        console.log(data)
    })
   /*  if(tabUsers.length == 0) color = "red"
    else color = "blue"

    tabUsers.push(new user(client.id, "test", ))
    ilu++;
    if (ilu == 1) {
        client.emit("onconnect", {
            stan: "wait",
        })
    }
    client.on("disconnect", function () {
        ilu--;
        if(ilu <2)
        io.sockets.emit("usun", { "usun":true });
    })
    if (ilu == 2) {
        client.emit("onconnect", {
            stan: "play",
        })
    }  */
})

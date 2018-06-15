var http = require("http");
var fs = require("fs");
var express = require("express")
var app = express()
var qs = require("querystring")
const port = 3000;
var server = http.createServer(app)
var socketio = require("socket.io")
var mongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var Operations = require("./static/js/Operations.js")

app.use(express.static('static'))

var path = require("path")

server.listen(port, function () {
    console.log("serwer startuje na porcie 3000")
});

app.get("/", function (req, res) {
    console.log(__dirname)
    res.sendFile(path.join(__dirname + "/static/index.html"))
})

var io = socketio.listen(server)

var opers = new Operations();
var localDB;
var coll;
mongoClient.connect("mongodb://localhost/projektBaza", function (err, db) {
    if (err) console.log(err)
    else {
        console.log("mongo podłączone na localhoscie do bazy danych projekt")
        localDB = db
        db.createCollection("projekt", function (err, coll) {
            if(err) console.log(err)
            else {
                coll = db.collection("projekt")
            }
        })
        coll = db.collection("projekt")
    }
    //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt
    // pod zmienną widoczną na zewnątrz
    //coll = db.collection("test") */
    //opers.Insert(coll, data)
    // opers.SelectAndLimit(coll, )
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

    client.on("Wynik", function(data){
        var id = data.id
       // var jData = JSON.parse(data)
        opers.Insert(coll, data, function(data){
            opers.SelectAll(coll, function(data){
                var localData = JSON.stringify(data, null, 2)
                io.sockets.to(id).emit("Wynik", localData)
            })
        })
        console.log(data)
    })

    client.on("addUser", function (data) {
        if (tabUsers.length == 0) {
            tabUsers.push(new user(data.id, data.nick, "red"))
            io.sockets.to(data.id).emit("color", {
                name: data.nick,
                color: "red"
            })
        } else {
            tabUsers.push(new user(data.id, data.nick, "blue"))
            io.sockets.to(data.id).emit("color", {
                name: data.nick,
                color: "blue"
            })
        }
        if(tabUsers.length==2){
          io.sockets.emit("ready");
        }
    })

    client.on("update", function (data) {

        io.sockets.emit("updated", {
            action: data
        })
        console.log(data)
    })

    client.on("disconnect", function () {
        console.log("rozłączył się", client.id)
        tabUsers = []
        io.sockets.emit("reload")
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

     if (ilu == 2) {
         client.emit("onconnect", {
             stan: "play",
         })
     }  */
})

var http = require("http");
var fs = require("fs");
var qs = require("querystring")
//var socketio = require("socket.io")
var ilu = 0;
var server = http.createServer(function (req, res) {

    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/io.js") {
                fs.readFile("static/libs/io.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Game.js") {
                fs.readFile("static/js/Game.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Armata.js") {
                fs.readFile("static/js/Armata.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Cegla.js") {
                fs.readFile("static/js/Cegla.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Kula.js") {
                fs.readFile("static/js/Kula.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/OrbitControls.js") {
                fs.readFile("static/libs/OrbitControls.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Plansza.js") {
                fs.readFile("static/js/Plansza.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Net.js") {
                fs.readFile("static/js/Net.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Main.js") {
                fs.readFile("static/js/Main.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }

            else if (req.url === "/jquery.js") {
                fs.readFile("static/libs/jquery.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/three.js") {
                fs.readFile("static/libs/three.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            break;
        case "POST":
            servres(req, res)
            break;
    }




})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")

});
// var io = socketio.listen(server)
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

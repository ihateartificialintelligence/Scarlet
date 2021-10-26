"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express = require("express");
var fs = require("fs");
var https = require("https");
var http = require("http");
var ws_1 = require("ws");
var auth_check_1 = require("./extra/auth-check");
var App = /** @class */ (function () {
    function App() {
    }
    App.startServer = function () {
        var app = express();
        var options = {
            key: fs.readFileSync(__dirname + "/SSL/agent2-key.pem"),
            cert: fs.readFileSync(__dirname + "/SSL/agent2-cert.pem"),
        };
        app.get('/api/v1/', function (req, res) {
            res.send({ status: 200, message: 'Test confirmed' });
        });
        var server = http.createServer(/**options, */ app);
        server.listen(8080, function () {
            console.log("listening on: " + server.address().address + ":" + server.address().port);
        });
        var wss = new ws_1.WebSocket.Server({ server: server });
        wss.on("connection", function (ws) {
            console.log("Client has connected to the server");
            ws.send({ status: 200, body: {
                    message: "Connection established",
                } });
            ws.on("chain_info", function (ws) {
                var check = auth_check_1.default.user(ws.data.token);
                switch (check) {
                    case true:
                        return ws.send({ status: 200, body: {
                                message: "Authentication successful",
                                /**
                                 * Query the database to get the user information
                                 * containing the account information and balance
                                 */
                                data: null,
                            } });
                    case false:
                        return ws.send({ status: 401, body: {
                                message: "Authentication failed",
                                data: null,
                            } });
                }
            });
        });
    };
    return App;
}());
exports.App = App;

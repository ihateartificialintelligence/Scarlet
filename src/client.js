"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express = require("express");
var fs = require("fs");
var https = require("https");
var http = require("http");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var App = /** @class */ (function () {
    function App() {
    }
    App.connectDatabase = function (url, options) {
        mongoose.connect(url, (options || {
            useFindandModify: false,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        }));
    };
    App.runServer = function (port, host) {
        var app = express();
        var server = http.createServer(app);
        app.use(bodyParser.urlencoded({ extended: true }));
        app.get('/', function (req, res) {
            res.send({ status: 200, message: 'OK' });
        });
        app.get('/api/v1/', function (req, res) {
            res.send({ status: 200, message: "OK" });
        });
        server.listen(port, function () {
            console.log("Server listening on " + server.address().address + ":" + server.address().port);
        });
    };
    App.fullStart = function (port, url, host, options) {
        console.time("Server Start Up");
        try {
            //this.connectDatabase(url);
            this.runServer(port);
            console.timeEnd("Server Start Up");
        }
        catch (e) {
            console.log("Unexpected Error: \n" + e.message + "\n\n");
        }
    };
    return App;
}());
exports.App = App;

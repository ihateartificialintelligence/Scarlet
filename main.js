"use strict";
const express = require("express"),
    bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
    secret: `${Math.floor(Math.random()*5000)}`,
    resave: false,
    saveUninitialized: false
}));

const http = require('http');
const server = http.createServer(app);

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
    res.send({status: 200, message: "OK"})
});

var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log("Server Has Started!");
});

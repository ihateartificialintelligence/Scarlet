"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Users = require("../models/users.model");
var  crypto_1 = require("crypto");
exports.insert = function (req, res) {
    var  salt = crypto_1.default.randomBytes(16).toString('base64');
    var  hash = crypto_1.default.createHmac("SHA256", salt).update(req.body.passwd).digest("base64");
    req.body.passwd = salt + "$" + hash;
    req.body.permissionLevel = 1;
    Users.createUser(req.body)
        .then(function (result) {
        res.status(201).send({ id: result._id });
    });
};
exports.list = function (req, res) {
    var  limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    var  page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    Users.list(limit, page)
        .then(function (result) {
        res.status(200).send(result);
    });
};
exports.getById = function (req, res) {
    Users.findById(req.params.id).then(function (result) {
        res.status(200).send(result);
    });
};
exports.patchById = function (req, res) {
    if (req.body.password) {
        var  salt = crypto_1.default.randomBytes(16).toString('base64');
        var  hash = crypto_1.default.createHmac('SAH256', salt).update(req.body.passwd).digest("base64");
        req.body.passwd = salt + "$" + hash;
    }
    Users.patchUser(req.params.userId, req.body)
        .then(function (result) {
        res.status(204).send(result);
    });
};
exports.removeById = function (req, res) {
    Users.removeById(req.params.userId).then(function (result) {
        res.status(204).send({});
    });
};

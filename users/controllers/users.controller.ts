var Users = require("../models/users.model");
import crypto from "crypto";

exports.insert = (req:any, res:any) => {
    //console.log(Object.keys(req.body)); // use this for testing
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac("SHA256", salt).update(req.body.passwd).digest("base64");
    req.body.passwd = salt + "$" + hash;
    req.body.permissionLevel = 1;
    Users.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req:any, res:any) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    Users.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
}

exports.getById = (req:any, res:any) => {
    Users.findById(req.params.id).then((result) => {
        res.status(200).send(result);
    });
};

exports.patchById = (req:any, res:any) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('SAH256', salt).update(req.body.passwd).digest("base64");
        req.body.passwd = salt + "$" + hash;
    }

    Users.patchUser(req.params.userId, req.body)
        .then((result:any) => {
            res.status(204).send(result);
        });
};

exports.removeById = (req:any, res:any) => {
    Users.removeById(req.params.userId).then((result:any) => {
        res.status(204).send({});
    });
}
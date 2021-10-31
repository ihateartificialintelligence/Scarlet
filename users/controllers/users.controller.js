const UserModel = require('../models/users.model');
const crypto = require('crypto'),
    { Transaction, Block, Wallet, Chain } = require("../../block_chain/models/transaction.model");

exports.insert = (req, res) => {
    const Genesis = new Wallet();
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    /**
     * /users
     * Create or Delete user accounts from the database
     * 
     * (req.body)
     *  - UUID  - cross ref the user
     *  - Token -  to verify the request
     *  - Reason - Optional
     * 
     * (req.method)
     *  - DELETE - Delete user account from DB
     *  - POST/PUT - Create user account and update DB
     */
    if (req.method === ("POST")) {
        const username = req.body.username,
            password = req.body.password;
        
        UserModel.createUser({
            uuid: Math.floor(Math.random()*999999999999),
            username: username, 
            email: req.body.email,
            password: password, 
            permissionLevel: 1,
            token: `u.${makeid(12)}_${makeid(8)}`, 
            uWallet: new Wallet().send(5, Genesis.publicKey), 
            privateKey: new Wallet().privateKey, 
            publicKey: new Wallet().publicKey, 
        })

    } else if (req.method === "DELETE") {
        const user = UserModel.find({ 
            id: req.body.id,
            token: req.body.token,
            reason: req.body.reason,
        });
        UserModel.removeById(user.id);
    } else {
        return res.status(401).send({ message: "Invalid method. Please use POST/PUT or DELETE methods." });
    }
};

exports.list = (req, res) => {
    if (UserModel.find({uuid: req.body.id, token: req.body.token})){
        let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
        let page = 0;
        if (req.query) {
            if (req.query.page) {
                req.query.page = parseInt(req.query.page);
                page = Number.isInteger(req.query.page) ? req.query.page : 0;
            }
        }
        UserModel.list(limit, page)
            .then((result) => {
                res.status(200).send(result);
            })
    } else res.status(401).send({ message: "Authorization Failed" });
};

exports.getById = (req, res) => {
    if (UserModel.find({uuid: req.body.id, token: req.body.token, password: req.body.password} == true)) { 
        UserModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
    } else {
        return res.status(401).send({ message: "Authentication Failed"})
    }
};
exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        //req.body.password = salt + "$" + hash;
    }
    if (UserModel.find({uuid: req.body.id, token: req.body.token})){
        UserModel.patchUser(req.params.userId, req.body)
            .then((result) => {
                res.status(204).send({});
            });
    } else res.status(401).send({ message: "Authorization Failed" });

};

exports.removeById = (req, res) => {
    if (UserModel.find({uuid: req.body.id, token: req.body.token})){
        UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
    } else res.status(401).send({ message: "Authorization Failed" });
};
const UserModel = require('../models/users.model'),
    crypto = require('crypto'),
    bcrypt = require('bcrypt'),
    path=require('path'),
    { Transaction, Block, Wallet, Chain } = require("../../block_chain/models/transaction.model");

exports.docs = (req,res) => {
    res.sendFile(path.resolve("docs/Docs/index.html"));
}
exports.insert = async(req, res) => {
    //const Genesis = new Wallet();
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
        //return res.send({ status: 200, message:result});
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
        let username = req.body.username,
            password = req.body.password;
            const bcrypt = require("bcrypt"),
            saltRounds = 15;

        bcrypt.genSalt(saltRounds, async (e, salt) => {
            bcrypt.hash(password, salt, async (e, hash) => {
                if (e) return res.send({status: 501, message:"Create Failure"}), console.log(e);

                let user = await UserModel.createUser({
                    uuid: Math.floor(Math.random()*999999999999),
                    username: username, 
                    email: req.body.email,
                    password: hash, 
                    permissionLevel: 1,
                    token: `u.${makeid(43)}_${makeid(28)}`, 
                    uWallet: new Wallet(),
                    privateKey: new Wallet().privateKey, 
                    publicKey: new Wallet().publicKey, 
                }); //user.save().catch(e, () => res.send({status: 501, message: "internal error"}), console.error(e));
                return res.status(200).send(`Successfully created the user\n ${await user.uuid}\n${await user.username}\n ${await user.token}\nPlease don't forget your password! ${password}`)
            })
        })
    } else if (req.method === "DELETE") {
        const user = UserModel.find({ 
            id: req.body.id,
            token: req.body.token,
            reason: req.body.reason,
        });
        UserModel.removeById(user.id);
        return res.status(200).send("Successfully deleted user account");
    } else {
        return res.status(401).send({ message: "Invalid method. Please use POST/PUT or DELETE methods." });
    }
};

exports.list = (req, res) => {
    async function checkUser(password) {
        //... fetch user from a db etc.
        let user = await UserModel.find({uuid: req.body.id, token: req.body.token});

        const match = await bcrypt.compare(password, await user.password);
    
        if(match) {
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
    }
    checkUser(req.body.password);
};

exports.getById = async (req, res) => {
    //async function checkUser(req) {
        //... fetch user from a db etc.
        if (!req.body) return res.status(401).send("No request body detected");
        else
            await UserModel.find({uuid: req.body.id, token: req.body.token}).then(async(result => {
                res.send({status: 'ok', message: result});
            }));

        //const match = await bcrypt.compare(password, await user.password);
    
        //if (match) { 
       // } else {
          //  return res.status(401).send({ message: "Authentication Failed"})
        //}
    //}
   // checkUser(req);
};
exports.patchById = (req, res) => {
    async function checkUser(password) {
        //... fetch user from a db etc.
        let user = await UserModel.find({uuid: req.body.id, token: req.body.token});

        const match = await bcrypt.compare(password, await user.password);
    
        if (match){
            UserModel.patchUser(req.body.id, req.body)
                .then((result) => {
                    res.status(204).send(`Successfully patched user\n ${result}`);
                });
        } else res.status(401).send({ message: "Authorization Failed" });
    }
    checkUser(req.body.password);
};

exports.removeById = (req, res) => {
    async function checkUser(password) {
        //... fetch user from a db etc.
        let user = await UserModel.find({uuid: req.body.id, token: req.body.token});

        const match = await bcrypt.compare(password, await user.password);
    
        if (match){
            UserModel.removeById(req.body.id)
            .then((result)=>{
                res.status(204).send(`Account removed successfully\n ${result}`);
            });
        } else res.status(401).send({ message: "Authorization Failed" });
    }
    checkUser(req.body.password);
};
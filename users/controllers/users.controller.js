const UserModel = require('../models/users.model'),
    bcrypt = require('bcrypt'),
    { Wallet } = require("../../block_chain/models/transaction.model"),
    { syslog } = require("../../logs/logger");

exports.docs = (req,res) => {
    res.redirect("https://docs.scarletai.xyz");
}
exports.insert = async(req, res) => {
    console.log(Object.keys(req.client))
    function makeid(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        } return result;
    }
    const bcrypt = require("bcrypt"),
    saltRounds = 15;
    if (!req.body) {
        res.send({status: 401, message: 'Invalid request. No Body'});
        syslog.info("Invalid request, No Body found for: " + req.client)
    } else {
    try {
        bcrypt.genSalt(saltRounds, async (e, salt) => {
            bcrypt.hash(req.body.password, salt, async (e, hash) => {
                if (e) return res.send({status: 501, message:"Create Failure"}), console.log(e);

                let user = await UserModel.createUser({
                    uuid: Math.floor(Math.random()*999999999999),
                    username: req.body.username, 
                    email: req.body.email,
                    password: await hash, 
                    permissionLevel: 1,
                    token: `u.${makeid(43)}_${makeid(28)}`, 
                    uWallet: new Wallet(),
                    privateKey: new Wallet().privateKey, 
                    publicKey: new Wallet().publicKey, 
                }); //user.save().catch(e, () => res.send({status: 501, message: "internal error"}), console.error(e));
                syslog.info(`Successfully Created a User`)
                return await res.status(200).send(`Successfully created the user\n ${await user.uuid}\n${await user.username}\n ${await user.token}\nPlease don't forget your password! ${req.body.password}`)
            })
        });
    } catch (err) {
        syslog.info(err);
        return await res.status(500).send({ message: err.message });
    }}
};

exports.list = (req, res) => {
    if (!req.body) return res.status(401).send({message: "No body request detected"})
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
        } else {
            syslog.error(`Client tried to gain unauthorized access to the API`)
            return res.status(401).send({ message: "Authorization Failed" });
        }
    }
    checkUser(req.body.password);
};

exports.getById = async (req, res) => {
    //async function checkUser(req) {
        //... fetch user from a db etc.
        if (!req.body) return syslog.error(`Client tried to gain access to the API, without a body request`), res.status(401).send("No request body detected");
        else
            await UserModel.find({uuid: req.body.id, token: req.body.token}).then(async(result => {
                syslog.log(`Client retrieved UserID from API`)
                return res.send({status: 'ok', message: result});
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
        } else {
            syslog.error(`Client tried to gain unauthorized access to the API`)
            return res.status(401).send({ message: "Authorization Failed" });
        }
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
        } else {
            syslog.error(`Client tried to gain unauthorized access to the API`)
            return res.status(401).send({ message: "Authorization Failed" });
        }
    }
    checkUser(req.body.password);
};
const UserModel = require("../../users/models/users.model"),
    //{ Chain } = require("../models/chain.model.js"),
    Miner = require("../models/transaction.model"),
    { Transaction, Block, Wallet, Chain } = require("../models/transaction.model");


exports.list = (req, res) => {
    if (!req.body) return res.send({status: 401, message: "No Body request found!"});
    else if (!req.body.id || !req.body.token || !req.body.password) return res.send({status:401, message: "Body request doesn't meet auth requirements, please check your body request again."});
    else {
        let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 100;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isSafeInteger(req.query.page) ? req.query.page : 0;
        }
    }
    UserModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        });
    }
};

exports.findLastBlock = (req, res) => {
    switch (req) {
        case req.body.chainreq === "time": return res.send({status: 200, body: {
            message: "Last Block Transaction Time",
            data: Chain.instance.lastBlock.ts,
        }});

        case req.body.chainreq === "hash": return res.send({status: 200, body: {
            message: "Last Block Transaction Hash",
            data: Chain.instance.lastBlock.hash,
        }});

        case req.body.chainreq === "trans": return res.send({status: 200, body: {
            message: "Last Block Transaction",
            data: Chain.instance.lastBlock.transaction,
        }});

        case req.body.chainreq === "nonce": return res.send({status: 200, body: {
            message: "Last Block Transaction Nonce",
            data: Chain.instance.lastBlock.nonce,
        }});
        case !req.body.chainreq: return res.send({ startus: 401, body: {
            message: "Invalid Body Type, please use: chainreq in you body request"
        }})
    }
};

exports.pay = (req,res) => {
    /**
     * /chain_info/pay/:user/:amount
     * :user - contacts DB for user ID
     * :amount - verifies that it's isSafeValidInteger() before sending 
     * and updating the Database valus
     * 
     * (req.body)
     *  - TOKEN - Verify the user
     *  - UUID - To cross-ref the request and user
     */
    return res.send({status: 503, message: "Path currently under construction, please try again later."});
}

exports.bank = (req, res) => {
    let UserToken = req.body.token;
    let UserID = UserModel.findById(req.body.id);
    let TokenCheck = UserModel.findByToken(UserToken);
    /**
     * /chain_info/bank/
     * Views the account balance of the user
     * 
     * (req.body)
     *  - UUID  - cross ref the user
     *  - Token -  to verify the request
     *  - Password - Optional
     */
    switch (req.body) {
        case UserID == true:
            break;
        case UserID == true && UserToken:
            // Check the token against the account
            if (UserID == true && TokenCheck == true) {
                res.send({ status: 200, body: {
                    message: "Authentication Successful",
                    data: (UserID.uWallet).toString(),
                }}); break;
            } else return res.status({ status: 401, message: "Authentication Failure"});
        default: 
            // !UserToken && UserID == false: 
            return res.send({ status: 401, message: "Authorization Failure. \
            Please Rety with the correct credentials! \
            "})
    }
};

exports.mine = (req, res) => {
    if (req.method == 'GET' && UserModel.find({uuid: req.body.id, token: req.body.token}) == true) {
        let usrWallet  = UserModel.find(req.body.id)
        if (usrWallet) {
            let amount = new Chain().mine() / 5;
            if (amount <= 0) amount += Math.floor(Math.max(500), Math.random());
            usrWallet.uWallet += amount;
            usrWallet.save().catch(e => console.log(e));
        } else return res.send({status: 404, message: "Unknown User to add data to."});
    }
}

exports.userController = (req, res) => {
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
     * /chain_info/account/
     * Create or Delete user accounts from the database
     * 
     * (req.body)
     *  - Email
     *  - Password
     *  - Username
     * 
     * 
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
        return res.status(404).send({ message: "Invalid method. Please use POST/PUT or DELETE methods." });
    }
}
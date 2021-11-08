const UserModel = require("../../users/models/users.model"),
    bcrypt = require('bcrypt'),
    { Chain } = require("../models/transaction.model");

exports.list = async (req, res) => {
    if (!req.body) return syslog.info(`Client tried to gain access to the API, without a body request`), res.status(401).send("No request body detected");
    async function checkUser(password) {
       //... fetch user from a db etc.
        let user = await UserModel.find({uuid: req.body.id, token: req.body.token});

        const match = await bcrypt.compare(password, await user[0].password);
        if (match) { 
            let list = Chain.instance.chain;
            res.status(200).send(list);
        } else {
            return res.status(401).send({ message: "Authentication Failed"})
        }
    }
    checkUser(req.body.password);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
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

exports.mine = async (req, res) => {
    if (!req.body) return syslog.info(`Client tried to gain access to the API, without a body request`), res.status(401).send("No request body detected");
    async function checkUser(password) {
        //... fetch user from a db etc.
        let user = await UserModel.find({uuid: req.body.id, token: req.body.token});

        const match = await bcrypt.compare(password, await user[0].password);
        if (match) { 
            let usrWallet  = UserModel.find(req.body.id)
            if (usrWallet) {
                let amount = new Chain().mine() / 5;
                if (amount <= 0) amount += Math.floor(Math.max(500), Math.random());
                usrWallet.uWallet += amount;
                usrWallet.save().catch(e => console.log(e));
            } else return res.send({status: 404, message: "Unknown User to add data to."});
        } else {
            return res.status(401).send({ message: "Authentication Failed"})
        }
    }
    checkUser(req.body.password);
};
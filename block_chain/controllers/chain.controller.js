const UserModel = require("../../users/models/users.model"),
    //{ Chain } = require("../models/chain.model.js"),
    { Transaction, Block, Wallet, Chain } = require("../models/transaction.model");

exports.list = (req, res) => {
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
};

// TODO: Get last block and data from it
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
}

exports.bank = (req, res) => {
    /**
     * /chain_info/bank/
     * Views the account balance of the user
     * 
     * (req.body)
     *  - UUID  - cross ref the user
     *  - Token -  to verify the request
     *  - Password - Optional
     */
}

exports.userController = (req, res) => {
    /**
     * /chain_info/account/
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
        UserModel.createUser({ username: username, password: password })

    } else if (req.method === "DELETE") {
        const user = UserModel.find({ id: req.body.uuid,
            token: req.body.token,
            reason?: req.body.option,
        });
        UserModel.removeById(user.id);
    } else {
        return res.status(404).send({ message: "Invalid method. Please use POST/PUT or DELETE methods." });
    }
}
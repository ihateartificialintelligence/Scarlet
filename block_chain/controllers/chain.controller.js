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
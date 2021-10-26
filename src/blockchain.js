"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banking = exports.Wallet = exports.Chain = exports.Block = exports.Transaction = void 0;
var crypto = require("crypto");
var Transaction = /** @class */ (function () {
    function Transaction(amount, payee, payer) {
        this.amount = amount;
        this.payee = payee;
        this.payer = payer;
    }
    Transaction.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Transaction;
}());
exports.Transaction = Transaction;
var Block = /** @class */ (function () {
    function Block(prevHash, transaction, time) {
        if (time === void 0) { time = Date.now(); }
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.time = time;
        this.nonce = Math.round(Math.random() * 9999999999);
    }
    Object.defineProperty(Block.prototype, "hash", {
        get: function () {
            var string = JSON.stringify(this);
            var hash = crypto.createHash('sha256');
            hash.update(string).end();
            return hash.digest('hex');
        },
        enumerable: false,
        configurable: true
    });
    return Block;
}());
exports.Block = Block;
var Chain = /** @class */ (function () {
    function Chain() {
        // Genesis (Starting) block
        new Block('', new Transaction(100, 'genesis', 'period'));
    }
    Object.defineProperty(Chain.prototype, "lastBlock", {
        get: function () {
            return this.chain[this.chain.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    Chain.prototype.mine = function (nonce) {
        var solution = 1;
        console.log("Identifying Solution");
        while (true) {
            var hash = crypto.createHash("md5");
            hash.update((nonce + solution).toString()).end();
            var attempt = hash.digest("hex");
            if (attempt.substr(0, 4) == "0000") {
                console.log("Solution Solved: " + solution);
                return solution;
            }
            solution += 1;
        }
    };
    Chain.prototype.addBlock = function (transaction, sendPubKey, signature) {
        var verify = crypto.createVerify("SHA256");
        verify.update(transaction.toString());
        var valid = verify.verify(sendPubKey, signature);
        if (valid) {
            var newBlock = new Block(this.lastBlock.hash, transaction);
            this.mine(newBlock.nonce);
            this.chain.push(newBlock);
        }
    };
    Chain.instance = new Chain();
    return Chain;
}());
exports.Chain = Chain;
var Wallet = /** @class */ (function () {
    function Wallet() {
        var keypair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });
        this.privateKey = keypair.privateKey;
        this.publickKey = keypair.publicKey;
    }
    Wallet.prototype.send = function (amount, payKey) {
        var transaction = new Transaction(amount, this.publickKey, payKey);
        var sign = crypto.createSign("SHA256");
        sign.update(transaction.toString()).end();
        var sig = sign.sign(this.privateKey);
        Chain.instance.addBlock(transaction, this.publickKey, sig);
    };
    return Wallet;
}());
exports.Wallet = Wallet;
var Banking = /** @class */ (function () {
    function Banking() {
    }
    return Banking;
}());
exports.Banking = Banking;

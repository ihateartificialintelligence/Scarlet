"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = exports.Chain = exports.Block = exports.Transaction = void 0;
var  crypto = require("crypto");
var  Transaction = (function () {
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
var  Block = (function () {
    function Block(prevHash, transaction, ts) {
        if (ts === void 0) { ts = Date.now(); }
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.ts = ts;
        this.nonce = Math.round(Math.random() * 9999999999);
    }
    Object.defineProperty(Block.prototype, "hash", {
        get: function () {
            var str = JSON.stringify(this);
            var hash = crypto.createHash('SHA256');
            hash.update(str).end();
            return hash.digest('hex');
        },
        enumerable: false,
        configurable: true
    });
    return Block;
}());
exports.Block = Block;
var  Chain = (function () {
    function Chain() {
        this.chain = [
            new Block('', new Transaction(100, 'genesis', 'exodus')),
        ];
    }
    Object.defineProperty(Chain.prototype, "lastBlock", {
        get: function () {
            return this.chain[this.chain.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    Chain.prototype.mine = function (nonce) {
        var  solution = 1;
        console.log("Solving for solution");
        const { Worker } = require("worker_threads");
        /**function mine() {
            const worker = new Worker('./miner.js');
            worker.on("online", () => console.log("Mining Worker Activated..."));
            worker.on("message", (message) => console.log(message));
            worker.on("error", (err) => console.log(err), worker.terminate());
            worker.on("exit", () => console.log("Worker exited..."), worker.terminate());
        }
        mine();**/
        while (true) {
            var hash = crypto.createHash("md5");
            hash.update((nonce + solution).toString()).end();
            var attempt = hash.digest('hex');
            if (attempt.substr(0, 4) === '0000') {
                console.log("Sovled Solution: " + solution);
                return solution;
            }
            solution += 1;
        }
    };
    Chain.prototype.addBlock = function (transaction, pubKey, sig) {
        var verify = crypto.createVerify('sha256');
        verify.update(transaction.toString());
        var valid = verify.verify(pubKey, sig);
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
var  Wallet = (function () {
    function Wallet() {
        var keypair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });
        this.privateKey = keypair.privateKey;
        this.publicKey = keypair.publicKey;
    }
    Wallet.prototype.send = function (amount, payeeKey) {
        var transaction = new Transaction(amount, this.publicKey, payeeKey);
        var sign = crypto.createSign('sha256');
        sign.update(transaction.toString()).end();
        var sig = sign.sign(this.privateKey);
        Chain.instance.addBlock(transaction, this.publicKey, sig);
    };
    return Wallet;
}());
exports.Wallet = Wallet;

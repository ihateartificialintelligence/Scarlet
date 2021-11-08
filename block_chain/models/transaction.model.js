"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = exports.Chain = exports.Block = exports.Transaction = void 0;
let  crypto = require("crypto");
let  Transaction = (function () {
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
let  Block = (function () {
    function Block(prevHash, transaction, ts) {
        if (ts === void 0) { ts = Date.now(); }
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.ts = ts;
        this.nonce = Math.round(Math.random() * 9999999999);
    }
    Object.defineProperty(Block.prototype, "hash", {
        get: function () {
            let str = JSON.stringify(this);
            let hash = crypto.createHash('SHA256');
            hash.update(str).end();
            return hash.digest('hex');
        },
        enumerable: false,
        configurable: true
    });
    return Block;
}());
exports.Block = Block;
let  Chain = (function () {
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
        let  solution = 1;
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
            let hash = crypto.createHash("md5");
            hash.update((nonce + solution).toString()).end();
            let attempt = hash.digest('hex');
            if (attempt.substr(0, 4) === '0000') {
                console.log("Sovled Solution: " + solution);
                return solution;
            }
            solution += 1;
        }
    };
    Chain.prototype.addBlock = function (transaction, pubKey, sig) {
        let verify = crypto.createVerify('sha256');
        verify.update(transaction.toString());
        let valid = verify.verify(pubKey, sig);
        if (valid) {
            let newBlock = new Block(this.lastBlock.hash, transaction);
            this.mine(newBlock.nonce);
            this.chain.push(newBlock);
        }
    };
    Chain.instance = new Chain();
    return Chain;
}());
exports.Chain = Chain;
let  Wallet = (function () {
    function Wallet() {
        let keypair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });
        this.privateKey = keypair.privateKey;
        this.publicKey = keypair.publicKey;
    }
    Wallet.prototype.send = function (amount, payeeKey) {
        let transaction = new Transaction(amount, this.publicKey, payeeKey);
        let sign = crypto.createSign('sha256');
        sign.update(transaction.toString()).end();
        let sig = sign.sign(this.privateKey);
        Chain.instance.addBlock(transaction, this.publicKey, sig);
    };
    return Wallet;
}());
exports.Wallet = Wallet;

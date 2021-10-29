import * as crypto from "crypto";

/**
 * @class
 * @exports 
 * @description  Transfer ethereal funds between registered accounts
 */
export class Transaction {
    constructor(
        public amount: number, // Amount to transfer
        public payee: string, // public key
        public payer: string // public key
    ){}

    toString() {
        return JSON.stringify(this);
    }
}

export class Block {
    public nonce: number = Math.round(Math.random() * 9999999999);

    constructor(
        public prevHash: string,
        public transaction: Transaction,
        public ts = Date.now()
    ){}

    get hash() {
        const str = JSON.stringify(this);
        const hash = crypto.createHash('SHA256');
        hash.update(str).end();
        return hash.digest('hex');
    }
}

export class Chain {
    public static instance = new Chain();

    chain: Block[];

    constructor() {
        this.chain = [
            new Block('', new Transaction(100, 'genesis', 'exodus')),
        ];
    }

    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }

    mine(nonce: number) {
        let solution = 1;
        console.log("Solving for solution");

        while(true) {
            const hash = crypto.createHash("md5");
            hash.update((nonce + solution).toString()).end();

            const attempt = hash.digest('hex');

            if (attempt.substr(0, 4) === '0000') {
                console.log(`Sovled Solution: ${solution}`);
                return solution;
            }

            solution += 1;
        }
    }

    addBlock(transaction: Transaction, pubKey: string, sig: Buffer) {
        const verify = crypto.createVerify('sha256');
        verify.update(transaction.toString());

        const valid = verify.verify(pubKey, sig);

        if (valid) {
            const newBlock = new Block(this.lastBlock.hash, transaction);
            this.mine(newBlock.nonce);
            this.chain.push(newBlock);
        }
    }
}

export class Wallet {
    public publicKey: string;
    public privateKey: string;

    constructor() {
		const keypair = crypto.generateKeyPairSync('rsa', {
			modulusLength: 2048,
			publicKeyEncoding: { type: 'spki', format: 'pem' },
			privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
		});

		this.privateKey = keypair.privateKey;
		this.publicKey = keypair.publicKey;
	}

    send(amount: number, payeeKey: string) {
        const transaction = new Transaction(amount, this.publicKey, payeeKey);
        const sign = crypto.createSign('sha256');
        sign.update(transaction.toString()).end();
        const sig = sign.sign(this.privateKey);
        Chain.instance.addBlock(transaction, this.publicKey, sig);
    }
}
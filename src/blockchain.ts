import * as crypto from 'crypto';

export class Transaction {
    constructor(
        public amount: number,
        public payee: string,
        public payer: string
    ){}
    toString() {
        return JSON.stringify(this);
    }
}

export class Block {
    public nonce:number = Math.round(Math.random()*9999999999);

    constructor(
        public prevHash:string,
        public transaction:Transaction,
        public time = Date.now()
    ){}
    get hash() {
        const string = JSON.stringify(this);const hash = crypto.createHash('sha256');
        hash.update(string).end(); return hash.digest('hex');
    }
}

export class Chain {
    public static instance = new Chain();

    chain: Block[];

    constructor() {
        // Genesis (Starting) block
        new Block('', new Transaction(100, 'genesis', 'period'));
    }

    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }

    mine(nonce: number) {
        let solution = 1;
        console.log("Identifying Solution");

        while (true) {
            const hash = crypto.createHash("md5"); hash.update((nonce + solution).toString()).end();
            const attempt = hash.digest("hex");

            if (attempt.substr(0, 4) == "0000") {
                console.log(`Solution Solved: ${solution}`);
                return solution;
            }

            solution += 1;
        }
    }

    addBlock(transaction: Transaction, sendPubKey: string, signature: Buffer) {
        const verify = crypto.createVerify("SHA256"); verify.update(transaction.toString());
        const valid = verify.verify(sendPubKey, signature);

        if (valid) {
            const newBlock = new Block(this.lastBlock.hash, transaction);
            this.mine(newBlock.nonce); this.chain.push(newBlock);
        }
    }
}

export class Wallet {
    public publickKey: string;
    public privateKey: string;

    constructor() {
        const keypair = crypto.generateKeyPairSync('rsa', {
			modulusLength: 4096,
			publicKeyEncoding: { type: 'spki', format: 'pem' },
			privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
		});

        this.privateKey = keypair.privateKey;
        this.publickKey = keypair.publicKey;
    }

    send(amount: number, payKey: string) {
        const transaction = new Transaction(amount, this.publickKey, payKey);
        const sign = crypto.createSign("SHA256"); sign.update(transaction.toString()).end();
        const sig = sign.sign(this.privateKey);
        Chain.instance.addBlock(transaction, this.publickKey, sig);
    }
}

export class Banking {}
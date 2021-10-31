const config = require('./common/config/env.config.js');

const express = require('express');
const app = express();

const AuthorizationRouter = require('./auth/routes.config');
const UsersRouter = require('./users/routes.config');
const SemanticsRouter = require('./semantics/routes.config');
const ChainRouter = require('./block_chain/routes.config');
const StartChain = require('./block_chain/models/transaction.model');
StartChain;

const genesis = new StartChain.Wallet();
const exodus = new StartChain.Wallet();
genesis.send(50, exodus.publicKey)
exodus.send(25, genesis.publicKey);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(express.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
//SemanticsRouter.routesConfig(app);
ChainRouter.routesConfig(app);

app.listen((process.env.PORT || config.port), "0.0.0.0", function () {
    console.log('app listening at port %s', (process.env.PORT || config.port));
});

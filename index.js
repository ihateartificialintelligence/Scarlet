const config = require('./common/config/env.config.js');
const express = require('express');
const app = express();
const bp = require("body-parser")
const  { syslog } = require("./logs/logger");
const AuthorizationRouter = require('./auth/routes.config');
const UsersRouter = require('./users/routes.config');
const SemanticsRouter = require('./semantics/routes.config');
const ChainRouter = require('./block_chain/routes.config');
const StartChain = require('./block_chain/models/transaction.model');
StartChain;

const genesis = new StartChain.Wallet();
const exodus = new StartChain.Wallet();
genesis.send(50, exodus.publicKey)

// parse application/x-www-form-urlencoded
app.use(bp.urlencoded({ extended: false }))

// parse application/json
app.use(bp.json())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    res.header("Content-Type", 'application/json');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});
app.get('/docs', (req, res) => res.redirect("https://docs.scarletai.xyz"));

AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
SemanticsRouter.routesConfig(app);
ChainRouter.routesConfig(app);

app.listen((process.env.PORT || config.port), "0.0.0.0", function () {
    syslog.info(`app listening at port ${process.env.PORT || config.port}`);
    //console.log('app listening at port %s', (process.env.PORT || config.port));
});

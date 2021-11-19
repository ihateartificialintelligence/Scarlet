const config = require('./common/config/env.config.js');
const express = require('express');
const app = express();
const request = require("request");
const bp = require("body-parser");
const  { syslog } = require("./logs/logger");
const AuthorizationRouter = require('./auth/routes.config');
const UsersRouter = require('./users/routes.config');
const SemanticsRouter = require('./semantics/routes.config');
const ChainRouter = require('./block_chain/routes.config');
const StartChain = require('./block_chain/models/transaction.model');

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

// Send IP logs to IP Investigator to watch
// for IPs in event of a (Re[D])DoS
request('https://ipinvestigator.expeditedaddons.com/?api_key=NZF0IYA5QSCERM37B2D560418XWV36H2OK9T41ULJ9PG78&ip=68.10.149.45', function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
});

// API Webhook handler to log Heroku Updates
// to Discord channel: 909948054961016864 (scarlets-logs)


AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
SemanticsRouter.routesConfig(app);
//ChainRouter.routesConfig(app);

app.listen((process.env.PORT || config.port), "0.0.0.0", function () {
    syslog.info(`app listening at port ${process.env.PORT || config.port}`);
    //console.log('app listening at port %s', (process.env.PORT || config.port));
});

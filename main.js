var config = require('./common/config/env.config');
var express = require("express"), app = express(), bp = require("body-parser"), AuthorizationRouter = require("./auth/routes.config"), ChainRouter = require('./block_chain/routes.config'), AIRouter = require("./semantics/routes.config"), UsersRouter = require("./users/routes.config");
app.use(function (req, res, next) {
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Methods", "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS");
    res.header("Access-Control-Expose-Headers", "Content-Length");
    res.header("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, X-Requested-With, Range");
    if (res.method === "OPTIONS")
        return res.sendStatus(200);
    else
        return next;
});
app.use(bp.json());
AuthorizationRouter.routesConfig(app);
AIRouter.routeConfig(app);
ChainRouter.routesConfig(app);
UsersRouter.routesConfig(app);
app.listen(config.port, function () {
    console.log("Listening on " + app.address().address + ":" + config.port + "\n");
});

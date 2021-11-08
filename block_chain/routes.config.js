let  PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
let  ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
let  config = require("../common/config/env.config");
let  ChainInfo = require("./controllers/chain.controller");

let  DEV = config.permissionLevels.ADMIN, USER = config.permissionLevels.NORMAL_USER;

// COMPLETED: Add User List to Mock DB - COMPLETED in /users
exports.routesConfig = function (app) {
    app.get('/chain_info', [
        //ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        ChainInfo.list
    ]);
    app.get('/chain_info/lastBlock', [
        //ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        ChainInfo.findLastBlock
    ]);
    app.post('/chain_info/pay/:user/:amount', [
        //ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        ChainInfo.pay
    ]);
    app.get('/chain_info/bank', [
        //ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        ChainInfo.bank
    ]);
    app.post('/chain_info/user_create', [
        //ValidationMiddleware.validJWTNeeded,
        ChainInfo.userController
    ])
};

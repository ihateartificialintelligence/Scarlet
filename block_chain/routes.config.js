var  PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
var  ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
var  config = require("../common/config/env.config");
var  ChainInfo = require("./controllers/chain.controller");

var  DEV = config.permissionLevels.ADMIN, USER = config.permissionLevels.NORMAL_USER;

// TODO: Add User List to Mock DB
exports.routesConfig = function (app) {
    app.get('/api/v1/chain_info', [
        //PermissionMiddleware.minimumPermissionLevelRequired(USER),
        ChainInfo.list
    ]);
    app.get('/api/v1/chain_info/lastBlock', [
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        ChainInfo.findLastBlock
    ]);
};

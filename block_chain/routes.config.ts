var PermissionMiddleware = require( '../common/middlewares/auth.permissions.middleware');
var ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
var config = require("../common/config/env.config");
var ChainInfo: any = {};

var DEV = config.permissionsLevels.DEV,
    USER = config.permissionsLevels.USER;

exports.routesConfig = (app:any) => {
    app.post('/api/v1/chain_info', [
        PermissionMiddleware.minimumPermissionLevelRequired(DEV),
        ChainInfo.insert
    ]);
    app.get('/api/v1/chain_info', [
        //ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        ChainInfo.list
    ]);
    app.get('/api/v1/chain_info/uptime', [
        //ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    ]);
    app.get('api/v1/chain_info/info', [
        PermissionMiddleware.minimumPermissionLevelRequired(DEV),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    ])
}

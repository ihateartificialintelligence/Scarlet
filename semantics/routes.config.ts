var  PermissionMiddleware = require( '../common/middlewares/auth.permissions.middleware');
var  ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
var  config = require("../common/config/env.config");

var  DEV = config.permissionsLevels.DEV,
    USER = config.permissionsLevels.USER;

exports.routesConfig = (app:any) => {
    app.post('/api/v1/ai_semantics', [
        PermissionMiddleware.minimumPermissionLevelRequired(DEV),
        UsersController.insert
    ]);
    app.get('/api/v1/ai_semantics', [
        //ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        UsersController.list
    ]);
    app.get('/api/v1/ai_semantics/:string', [
        //ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ]);
}

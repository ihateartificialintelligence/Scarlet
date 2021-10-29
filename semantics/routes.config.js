var  PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
var  ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
var  config = require("../common/config/env.config");
var  DEV = config.permissionLevels.ADMIN, USER = config.permissionLevels.NORMAL_USER;

// TODO: Add return from mock DB
exports.routesConfig = function (app) {
    app.post('/api/v1/ai_semantics', [
        PermissionMiddleware.minimumPermissionLevelRequired(DEV),
        ///UsersController.insert
    ]);
    app.get('/api/v1/ai_semantics', [
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        //UsersController.list
    ]);
    app.get('/api/v1/ai_semantics/:string', [
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        //UsersController.getById
    ]);
};

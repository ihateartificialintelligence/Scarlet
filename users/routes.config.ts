var UsersController = require('./controllers/users.controller');
var PermissionMiddleware = require( '../common/middlewares/auth.permissions.middleware');
var ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
var config = require("../common/config/env.config");

var DEV = config.permissionsLevels.DEV,
    USER = config.permissionsLevels.USER;

exports.routesConfig = (app:any) => {
    app.post('/api/v1/users', [
        UsersController.insert
    ]);
    app.get('/api/v1/users', [
        //ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(USER),
        UsersController.list
    ]);
    app.get('/api/v1/users/:userId', [
        //ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ]);
    app.get('/api/v1/users/balance/:id' [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermission(USER),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ])
    app.patch('/api/v1/users/:userId', [
        //ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(USER),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patchById
    ]);
    app.delete('/api/v1/users/:userId', [
        //ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(DEV),
        UsersController.removeById        
    ]);
}

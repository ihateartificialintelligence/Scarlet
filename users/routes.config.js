const UsersController = require('./controllers/users.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
//const PAID = config.permissionLevels.PAID_USER;
const USER = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/api/v1/users', [
        UsersController.insert
    ]);
    app.get('/api/v1/users', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(USER),
        UsersController.list
    ]);
    app.get('/api/v1/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(USER),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ]);
    app.patch('/api/v1/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(USER),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patchById
    ]);
    app.delete('/api/v1/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        //PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.removeById
    ]);
    app.get('/docs', [
        UsersController.docs
    ]);
};

var  PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
var  ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
var  AI = require('./controllers/ai.controller');
var  config = require("../common/config/env.config");
var  DEV = config.permissionLevels.ADMIN, USER = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.post('/scarlet/', [
        AI.analyze
    ]);
};

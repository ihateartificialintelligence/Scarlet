const VerifyUserMiddleware = require("./middlewares/verifiy.user.middleware"),
    AuthorizationController = require("./controllers/auth.controllers"),
    AuthValidationMiddleware = require("../common/middlewares/auth.validation.middleware");

exports.routesConfig = (app:any) => {
    app.post('/api/v1/auth', [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthorizationController.login
    ]);

    app.post('/api/v1/auth/refresh', [
        AuthValidationMiddleware.validJWTneeded,
        AuthValidationMiddleware.verifyRefreshBodyField,
        AuthValidationMiddleware.validRefreshMethod,
        AuthorizationController.login
    ]);
};
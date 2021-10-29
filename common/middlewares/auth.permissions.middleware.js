var ADMIN_PERMISSION = 4096;
var secret = require("../config/env.config")['jwtSecret'];
var  _a = require('paseto'), _b = _a.V4, sign = _b.sign, verify = _b.verify, errors = _a.errors, decode = _a.decode;
exports.minimumPermissionLevelRequired = function (required_permission_level) {
    return function (req, res, next) {
        console.log(Object.keys(req));
        var  user_permission_level = parseInt((10).toString());
        var  userId = req.body.userId;
        if (user_permission_level & required_permission_level) {
            return next();
        }
        else {
            return res.status(403).send();
        }
    };
};
exports.onlySameUserOrAdminCanDoThisAction = function (req, res, next) {
    var  user_permission_level = parseInt((10).toString());
    var  userId = req.body.userId;
    if (req.params && req.params.userId && userId === req.params.userId) {
        return next();
    }
    else {
        if (user_permission_level & ADMIN_PERMISSION) {
            return next();
        }
        else {
            return res.status(403).send();
        }
    }
};
exports.sameUserCantDoThisAction = function (req, res, next) {
    var  userId = '';
    if (req.params.userId !== userId) {
        return next();
    }
    else {
        return res.status(400).send();
    }
};

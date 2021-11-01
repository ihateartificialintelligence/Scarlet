const jwt = require('jsonwebtoken'),
secret = require('../config/env.config')['jwt_secret'],
UserModel = require("../../users/models/users.model");
const ADMIN_PERMISSION = require('../config/env.config')['permissionLevels']['ADMIN'],
    USER_PERMISSION = require('../config/env.config')['permissionLevels']['USER']

exports.minimumPermissionLevelRequired = (required_permission_level) => {
    return async (req, res, next) => {
        let user = await UserModel.findById(req.body.id);
        let user_permission_level = parseInt(user.permissionLevel);
        let userId = req.body.id;
        if (user_permission_level & required_permission_level) {
            return next();
        } else {
            return res.status(403).send();
        }
    };
};

exports.onlySameUserOrAdminCanDoThisAction = async (req, res, next) => {
    let user = await UserModel.findById(req.body.id);
    let user_permission_level = parseInt(user.permissionLevel);
    let userId = req.body.id;
    if (req.params && req.params.id && userId === req.params.id) {
        return next();
    } else {
        if (user_permission_level & ADMIN_PERMISSION) {
            return next();
        } else {
            return res.status(403).send();
        }
    }

};

exports.sameUserCantDoThisAction = (req, res, next) => {
    let userId = req.body.id;
    if (req.params.userId !== userId) {
        return next();
    } else {
        return res.status(400).send();
    }
};

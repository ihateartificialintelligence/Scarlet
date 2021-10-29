const ADMIN_PERMISSION = 4096;
const secret = require("../config/env.config")['jwtSecret'];
var {V4: {sign, verify}, errors, decode} = require('paseto');

exports.minimumPermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {
        // TODO: Query the DB to  cross ref UUID and PermLvl
        console.log(Object.keys(req))
        let user_permission_level = parseInt((10).toString()/** some DB query*/);
        let userId = req.body.userId;
        if (user_permission_level & required_permission_level) {
            return next();
        } else {
            return res.status(403).send();
        }
    };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
    // TODO: Query a database check cross ref perm levels & UUID
    let user_permission_level = parseInt((10).toString()/** some DB query*/);
    let userId = req.body.userId;
    if (req.params && req.params.userId && userId === req.params.userId) {
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
    // TODO:Query the database to check the user ID with the requested UUID
    let userId = ''/** some DB query*/;
    if (req.params.userId !== userId) {
        return next();
    } else {
        return res.status(400).send();
    }
};
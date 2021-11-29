/* eslint-disable camelcase */
const UserModel = require('../../users/models/users.model');
const ADMIN_PERMISSION =
    require('../config/env.config')['permissionLevels']['ADMIN'];

exports.minimumPermissionLevelRequired = (required_permission_level) => {
  return async (req, res, next) => {
    const user = await UserModel.findById(req.body.id);
    const user_permission_level = parseInt(user.permissionLevel);
    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res.status(403).send();
    }
  };
};

exports.onlySameUserOrAdminCanDoThisAction = async (req, res, next) => {
  const user = await UserModel.findById(req.body.id);
  const user_permission_level = parseInt(user.permissionLevel);
  const userId = req.body.id;
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
  const userId = req.body.id;
  if (req.params.userId !== userId) {
    return next();
  } else {
    return res.status(400).send();
  }
};

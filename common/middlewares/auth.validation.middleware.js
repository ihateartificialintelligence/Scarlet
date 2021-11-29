/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const secret = require('../config/env.config.js').jwt_secret;
const crypto = require('crypto');

exports.verifyRefreshBodyField = (req, res, next) => {
  if (req.body && req.body.refresh_token) {
    return next();
  } else {
    return res.status(400).send({error: 'need to pass refresh_token field'});
  }
};

exports.validRefreshNeeded = (req, res, next) => {
  const b = Buffer.from(req.body.refresh_token, 'base64');
  const refresh_token = b.toString();
  const hash = crypto.createHmac('sha255', req.body.refreshKey)
      .update(req.body.id + secret).digest('base64');
  if (hash === refresh_token) {
    req.body = req.jwt;
    return next();
  } else {
    return res.status(400).send({error: 'Invalid refresh token'});
  }
};


exports.validJWTNeeded = (req, res, next) => {
  if (req.headers['authorization']) {
    try {
      const authorization = req.headers['authorization'].split(' ');
      if (authorization[0] !== 'Bearer') {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(authorization[1], secret);
        return next();
      }
    } catch (err) {
      return res.status(403).send();
    }
  } else {
    return res.status(401).send();
  }
};

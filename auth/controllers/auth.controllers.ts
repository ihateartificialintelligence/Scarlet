var  {V4: {sign, verify}, errors, decode} = require('paseto');

var jwtSecret = require('../../common/config/env.config.js').jwt_secret;
var crypt = require('crypto');
var uuid = require('uuid');

exports.login = (req:any, res:any) => {
    try {
        (async () => {
            {
                let refreshId = req.body.userId + jwtSecret;
                let salt = crypt.randomBytes(16).toString('base64');
                let hash = crypt.createHmac('sha256', salt).update(refreshId).digest('base64');
                req.body.refreshToken = salt;
                let token = await verify(req.body.accToken, jwtSecret);
                let b = Buffer.from(hash);
                let refresh_token = b.toString('base64');
                res.status(201).send({accessToken: token, refreshToken: refresh_token});
            }
        })
    } catch (err) {
        res.status(500).send({errors: err});
    }
};

exports.refresh_token = (req:any, res:any) => {
    try {
        (async() => {
            { 
                var token = await sign({ sub: req.body.uname }, jwtSecret); 
                res.status(201).send({accessToken: token});
            }
        })
    } catch (err) {
        res.status(500).send({errors: err});
    }
};
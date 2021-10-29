var  u = require('../../users/models/users.model');
var  c = require('crypto');

exports.hasAuthValidFields = (req:any, res:any, next:any) => {
    let errors = [];

    if (req.body) {
        if (!req.body.token){
            errors.push("Missing Token Field");
            if (!req.body.password) return errors.push("Missing Passwords Field");
            if (errors.length) return res.status(400).send({errors: errors.join(', ')});
            else return next();}
        else return res.status(400).send({errors: "Missing Password and Email Fields"});
    }
};


exports.isPasswordAndUserMatch = (req: any, res: any, next: any) => {
    u.findByName(req.body.uname)
        .then((user:any) => {
            if (!user[0]) return res.status(404).send({message: "Cannot find a user"});
            else {
                let passwordField = user[0].password.split('$');
                let salt = passwordField[0];
                let hash = c.createHmac('sha256', salt).update(req.body.password).digest('base64');
                if (hash === passwordField[1]) {
                    req.body = {
                        userId: user[0].id,
                        token:user[0].token,
                        name: user[0].uname,
                    };
                    return next();
                } else return res.status(400).send({ errors: ['Invalid token or password']});
            }
        });
}
const ai = require("./analyze");
const checktoken = require("./checktoken");
exports.analyze = (req, res, next) => {
    if (!req.body) return res.send({status: 401, message:"no body request found"});
    else if (!req.body.aitk) return res.send({status: 401, message:"No AI Token found"});
    if (checktoken(req.body.aitk) == false) return res.send({status: 401, message:"AI Token is not valid, please request a new token"});
    else {
        let content = req.body.content;
        if (!content) return res.send({status: 401, message:"No Message Content found"});
        else {
            let eval = ai(content);
            if (eval >= -5 && eval < -1) 
                return res.send({status: 200, flagged: true, message: "Received message has been flagged as threatening!"});
            if (eval >= 0 && eval < 6) 
                return res.send({status: 200, flagged: false, message: "Received message has been flagged as neutral|Positive!"});
        }
    }
}


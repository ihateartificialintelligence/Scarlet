const ai = require("./analyze");
const checktoken = require("./checktoken");

/**
 * 
 * @param {*} req API request
 * @param {*} res API response
 * @param {*} next 
 * @returns true | false
 * @example req.body: { aitk: "ai.example-tok_en"}
 */
exports.analyze = (req, res, next) => {
    if (!req.body) return res.send({status: 401, message:"no body request found"});
    else if (!req.body.aitk) return res.send({status: 401, message:"No AI Token found"});
    if (checktoken(req.body.aitk) == false) return res.send({status: 401, message:"AI Token is not valid, please request a new token"});
    else {
        let content = req.body.content;
        if (!content) return res.send({status: 401, message:"No Message Content found"});
        else {
            let eval = ai(content);
            if (eval.score <= -1) 
                return res.send({status: 200, flagged: true,score: eval.score, message: "Received message has been flagged as threatening, abusive, and/or insulting!", topic: eval.topic, words: eval.words});
            if (eval.score >= 0) 
                return res.send({status: 200, flagged: false, score: eval.score, message: "Received message has been flagged as neutral|Positive!", topic: eval.topic, words: eval.words});
        }
    }
}


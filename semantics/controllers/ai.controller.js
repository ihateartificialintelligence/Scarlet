const ai = require('./analyze');
const checktoken = require('./checktoken');
const { Scarlet } = require('../backend/scarlet.ai');

/**
 * 
 * @param {*} req API request
 * @param {*} res API response
 * @param {*} next 
 * @returns true | false
 * @example req.body: { token: 'ai.example-tok_en'}
 */
exports.analyze = (req, res, next) => {
    if (!req.body) return res.send({status: 401, message:'no body request found'});
    else if (!req.body.token) return res.send({status: 401, message:'No AI Token found'});
    if (checktoken(req.body.token) == false) return res.send({status: 401, message:'AI Token is not valid, please request a new token'});
    else {
        let content = req.body.content;
        if (!content) return res.send({status: 401, message:'No Message Content found'});
        else {
            let eval = ai(content);
            if (eval.score <= -1) 
                return res.send({status: 200, flagged: true,score: eval.score, message: 'Received message has been flagged as threatening, abusive, and/or insulting!', topic: eval.topic, words: eval.words});
            if (eval.score >= 0) 
                return res.send({status: 200, flagged: false, score: eval.score, message: 'Received message has been flagged as neutral|Positive!', topic: eval.topic, words: eval.words});
        }
    }
}

exports.createScarlet = async (req, res, next) => {
    if (!req.body) return res.send({status: 401, message:'no body request found'});
    else if (!req.body.token) return res.send({status: 401, message:'No AI Token found'});
    if (checktoken(req.body.token) == false) return res.send({status: 401, message:'AI Token is not valid, please request a new token'});
    else {
        let content = req.body.content;
        if (!content) return res.send({status: 401, message:'No Message Content found'});
        else {
            await Scarlet.prototype.createPersonality(req.body.uid, req.body.personality);
            await Scarlet.prototype.getResponse(content, req.body.uid);
        }
    }
};

exports.talkToScarlet = async (req, res) => {
    if (!req.body) return res.send({status: 401, message:'no body request found'});
    else if (!req.body.token) return res.send({status: 401, message:'No AI Token found'});
    if (checktoken(req.body.token) == false) return res.send({status: 401, message:'AI Token is not valid, please request a new token'});
    else {
        let content = req.body.content;
        if (!content) return res.send({status: 401, message:'No Message Content found'});
        else {
            await Scarlet.prototype.getResponse(content, req.body.uid);
        }
    }
}

exports.deleteScarletAI = async (req, res) => {
    let data = req.body;
    if (!req.body) return res.send({status: 401, message:'no body request found'});
    else if (!req.body.token) return res.send({status: 401, message:'No AI Token found'});
    if (checktoken(req.body.token) == false) return res.send({status: 401, message:'AI Token is not valid, please request a new token'});
    else {
        let content = req.body.content;
        if (!content) return res.send({status: 401, message:'No Message Content found'});
        else {
            await Scarlet.prototype.PurgeAI(data.token, data.uid);
        }
    }
}

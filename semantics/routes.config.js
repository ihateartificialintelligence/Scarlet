let  AI = require('./controllers/ai.controller');

exports.routesConfig = function (app) {
    app.post('/scarlet/analyze', [ AI.analyze]);
    app.post('/scarlet/create', [ AI.createScarlet ]);
    app.post('/scarlet/talk', [ AI.talkToScarlet ]);
};

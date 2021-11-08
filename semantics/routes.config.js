let  AI = require('./controllers/ai.controller');

exports.routesConfig = function (app) {
    app.post('/scarlet/', [
        AI.analyze
    ]);
};

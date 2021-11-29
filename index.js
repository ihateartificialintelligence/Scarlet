// const config = require('./common/config/env.config.js');
const express = require('express');
const app = express();
// const request = require('request');
const bp = require('body-parser');
const {syslog} = require('./logs/logger');
const UsersRouter = require('./users/routes.config');
const SemanticsRouter = require('./semantics/routes.config');

// parse application/x-www-form-urlencoded
app.use(bp.urlencoded({extended: false}));

// parse application/json
app.use(bp.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers',
      'Accept, Authorization, Content-Type, X-Requested-With, Range');
  res.header('Content-Type', 'application/json');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

// Send IP logs to IP Investigator to watch
// for IPs in event of a (Re[D])DoS
/** request('https://ipinvestigator.expeditedaddons.com/?api_key=NZF0IYA5QSCERM37B2D560418XWV36H2OK9T41ULJ9PG78', function(error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
}); **/

UsersRouter.routesConfig(app), SemanticsRouter.routesConfig(app);

app.listen((3600), '0.0.0.0', function() {
  return syslog.info(`app listening at port ${3600}`),
  console.log(`App listening at port ${3600}`);
});


const validTokens = require('../../users/models/users.model');

module.exports = function checktoken(string) {
  if (typeof string !== 'string') {
    return Error('Invalid token type: ' + string), false;
  }
  if (!string) {
    return Error('No token string found'), false;
  }
  if (validTokens.findByToken(string) == false) {
    return Error('No token found in User Database');
  }
  if (validTokens.findByToken(string) == true || string in validTokens) {
    return true;
  }
};

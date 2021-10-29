var  __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var  __generator = (this && this.__generator) || function (thisArg, body) {
    var  _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var  _this = this;
var  _a = require('paseto'), _b = _a.V4, sign = _b.sign, verify = _b.verify, errors = _a.errors, decode = _a.decode;
var jwtSecret = require('../../common/config/env.config.js').jwt_secret;
var crypt = require('crypto');
var uuid = require('uuid');
exports.login = function (req, res) {
    try {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var  refreshId, salt, hash, token, b, refresh_token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshId = req.body.userId + jwtSecret;
                        salt = crypt.randomBytes(16).toString('base64');
                        hash = crypt.createHmac('sha256', salt).update(refreshId).digest('base64');
                        req.body.refreshToken = salt;
                        return [4, verify(req.body.accToken, jwtSecret)];
                    case 1:
                        token = _a.sent();
                        b = Buffer.from(hash);
                        refresh_token = b.toString('base64');
                        res.status(201).send({ accessToken: token, refreshToken: refresh_token });
                        return [2];
                }
            });
        }); });
    }
    catch (err) {
        res.status(500).send({ errors: err });
    }
};
exports.refresh_token = function (req, res) {
    try {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, sign({ sub: req.body.uname }, jwtSecret)];
                    case 1:
                        var token = _a.sent();
                        res.status(201).send({ accessToken: token });
                        return [2];
                }
            });
        }); });
    }
    catch (err) {
        res.status(500).send({ errors: err });
    }
};

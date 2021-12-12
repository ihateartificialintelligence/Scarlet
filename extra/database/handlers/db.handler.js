"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_Handler = void 0;
require("dotenv").config();
var Users = require("./models/user.model");
var mongo = require("mongoose");
/** @type {*} */
var options = {
    autoIndex: false,
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
/**
 *
 *
 * @export
 * @class DB_Handler
 */
var DB_Handler = /** @class */ (function () {
    /**
     * Creates an instance of DB_Handler.
     * @param {string} connectionURL
     * @memberof DB_Handler
     */
    function DB_Handler(connectionURL) {
        connectionURL = require("../../../config.json").DB;
    }
    /**
     *
     *
     * @static
     * @param {Boolean} [run]
     * @return {*}
     * @memberof DB_Handler
     */
    DB_Handler.prototype.createConnection = function (run) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!run) return [3 /*break*/, 1];
                        return [2 /*return*/];
                    case 1: return [4 /*yield*/, mongo.connect(require("../../../config.json").DB, options)];
                    case 2:
                        _a.sent(), console.log("Connected to MongoDB");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     *
     * @static
     * @param {String} user
     * @param {Boolean} [warn]
     * @return {*}
     * @memberof DB_Handler
     */
    DB_Handler.prototype.warn = function (user, warn) {
        return __awaiter(this, void 0, void 0, function () {
            var member, currentWarns;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!user)
                            throw new Error("User ID not specified");
                        return [4 /*yield*/, Users.find({
                                id: user
                            })];
                    case 1:
                        member = _a.sent();
                        if (!member)
                            throw new Error("No member exists with that id");
                        if (member) {
                            currentWarns = member.warns;
                            if (currentWarns < 3) {
                                if (warn == true)
                                    member.warns += 1;
                                if (currentWarns == 3)
                                    return [2 /*return*/, { toKick: true }];
                                else
                                    return [2 /*return*/, { toKick: false }];
                            }
                            else
                                return [2 /*return*/, { toKick: true }];
                        }
                        member.save().catch(function (_err) { return console.error; });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     *
     * @static
     * @param {String} id
     * @param {String} guild
     * @param {String} [reason]
     * @memberof DB_Handler
     */
    DB_Handler.prototype.logBan = function (_a) {
        var id = _a.id, guild = _a.guild, reason = _a.reason;
        return __awaiter(this, void 0, void 0, function () {
            var member;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(id || guild))
                            throw new Error("No guild or user ID provided");
                        return [4 /*yield*/, Users.find({ id: id })];
                    case 1:
                        member = _b.sent();
                        if (!member)
                            throw new Error("Could not find user with ID: " + id);
                        if (member) {
                            member.isBanned = true;
                            member.amountBannedFrom[0] += 1;
                            member.guildsBanned[0] = guild;
                            if (!!reason)
                                member.reason = reason;
                        }
                        member.save().catch(function (_e) { return console.error; });
                        return [2 /*return*/];
                }
            });
        });
    };
    return DB_Handler;
}());
exports.DB_Handler = DB_Handler;

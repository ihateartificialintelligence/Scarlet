"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixHandler = void 0;
var Discord = __importStar(require("discord.js"));
var discord_js_1 = require("discord.js");
var _a = require("../../config.json"), TOKEN = _a.TOKEN, ID = _a.ID, PREFIX = _a.PREFIX, DB = _a.DB;
var ts_1 = __importDefault(require("cat-loggr/ts"));
var log = new ts_1.default();
var automod = require("./Scarlet.sys").automod;
var db_handler_1 = require("../database/handlers/db.handler");
var DBH = new db_handler_1.DB_Handler(DB);
var _b = require("discord.js"), MessageActionRow = _b.MessageActionRow, MessageButton = _b.MessageButton;
var data = require("../database/handlers/models/guild.model");
var PrefixHandler = /** @class */ (function () {
    function PrefixHandler(client, token) {
        this.client = client;
        this.token = token;
        client = this.client || new Discord.Client({ intents: [
                discord_js_1.Intents.FLAGS.DIRECT_MESSAGES,
                discord_js_1.Intents.FLAGS.GUILD_MESSAGES, discord_js_1.Intents.FLAGS.GUILDS
            ] });
        token = this.token || TOKEN;
    }
    PrefixHandler.prototype.messageCreate = function (client, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                client.on("messageCreate", function (msg) { return __awaiter(_this, void 0, void 0, function () {
                    var member_1, guild_1, error_1;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                if (msg.author.bot)
                                    return [2 /*return*/];
                                member_1 = msg.member;
                                return [4 /*yield*/, data.find({
                                        id: msg.guild.id,
                                        enabled: true,
                                    })[0]];
                            case 1:
                                guild_1 = _a.sent();
                                if (!guild_1) {
                                    return [2 /*return*/];
                                }
                                automod(msg.content).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                                    var row, row2_1, filter, collector_1, error_2;
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, response.score];
                                            case 1:
                                                if (!((_a.sent()) <= (-5 || guild_1.toleranceLvl))) return [3 /*break*/, 8];
                                                console.log("Member " + msg.author.id + " sent " + msg.content + " score " + response.score);
                                                _a.label = 2;
                                            case 2:
                                                _a.trys.push([2, 4, , 5]);
                                                row = new MessageActionRow()
                                                    .addComponents(new MessageButton()
                                                    .setCustomId("Dispute")
                                                    .setLabel("Dispute")
                                                    .setStyle("DANGER"), new MessageButton()
                                                    .setCustomId("Server-Rules")
                                                    .setLabel("Server Rules")
                                                    .setStyle("PRIMARY"), new MessageButton()
                                                    //.setCustomId("Dev-contact")
                                                    .setLabel("Dev Contact")
                                                    .setURL("https://discord.gg/kazs-burrow")
                                                    .setStyle("LINK"));
                                                row2_1 = new MessageActionRow()
                                                    .addComponents(new MessageButton()
                                                    .setCustomId("dispute")
                                                    .setLabel("Dispute")
                                                    .setStyle("DANGER")
                                                    .setDisabled(true), new MessageButton()
                                                    .setCustomId("server-rules")
                                                    .setLabel("Server Rules")
                                                    .setStyle("PRIMARY")
                                                    .setDisabled(true), new MessageButton()
                                                    //.setCustomId("Dev-contact")
                                                    .setLabel("Dev Contact")
                                                    .setStyle("LINK")
                                                    .setURL("https://discord.gg/kazs-burrow")
                                                    .setDisabled(true));
                                                filter = function (i) { return i.customId === ("server-rules" || "dispute") && i.user.id === msg.author.id; };
                                                collector_1 = msg.channel.createMessageComponentCollector({ filter: filter, time: 30000 });
                                                return [4 /*yield*/, msg.author.send({ content: "Please refrain from using those words!\nYou're message (`" + msg.content + "`) has been evaluated and returned a score of `" + response.score + "`.", components: [row] })
                                                        .then(function () {
                                                        collector_1.on('collect', function (i) { return __awaiter(_this, void 0, void 0, function () {
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0:
                                                                        if (!(i.customId === "Server-Rules")) return [3 /*break*/, 2];
                                                                        return [4 /*yield*/, i.update({
                                                                                content: "Here is the server rules: " + null /** We need to return the rules */,
                                                                                components: [row2_1]
                                                                            })];
                                                                    case 1:
                                                                        _a.sent();
                                                                        _a.label = 2;
                                                                    case 2: return [2 /*return*/];
                                                                }
                                                            });
                                                        }); });
                                                        collector_1.on('end', function (collected) { });
                                                    })];
                                            case 3:
                                                _a.sent();
                                                return [3 /*break*/, 5];
                                            case 4:
                                                error_2 = _a.sent();
                                                console.log(error_2);
                                                return [3 /*break*/, 5];
                                            case 5: return [4 /*yield*/, msg.delete()];
                                            case 6:
                                                _a.sent();
                                                return [4 /*yield*/, DBH.warn(msg.author.id, true).then(function (method) { return __awaiter(_this, void 0, void 0, function () {
                                                        var _a, channel_1, logembed, error_3;
                                                        return __generator(this, function (_b) {
                                                            switch (_b.label) {
                                                                case 0:
                                                                    if (!(method.toKick == true && member_1.kickable == true)) return [3 /*break*/, 5];
                                                                    _b.label = 1;
                                                                case 1:
                                                                    _b.trys.push([1, 4, , 5]);
                                                                    msg.author.send("ALERT: You have been removed from `" + msg.guild.name + "` due to auto-mod scoring.");
                                                                    _a = setTimeout;
                                                                    return [4 /*yield*/, member_1.kick({ reason: "Scarlet Score: " + response.score })];
                                                                case 2:
                                                                    _a.apply(void 0, [_b.sent(), 5000]);
                                                                    return [4 /*yield*/, data.find({
                                                                            id: msg.guild.id
                                                                        })[0]];
                                                                case 3:
                                                                    channel_1 = _b.sent();
                                                                    logembed = new Discord.MessageEmbed()
                                                                        .setColor("RED")
                                                                        .setTitle("Member Kicked!")
                                                                        .addField("**Member: " + msg.author.tag + "**", "**Reason**: removed from `" + msg.guild.name + "` due to auto-mod scoring.", false)
                                                                        .setTimestamp();
                                                                    if (!channel_1.logs)
                                                                        return [2 /*return*/];
                                                                    channel_1 = channel_1.logs;
                                                                    msg.guild.channels.cache(function (f) {
                                                                        f.id = channel_1;
                                                                    }).send({ embeds: [logembed] });
                                                                    return [3 /*break*/, 5];
                                                                case 4:
                                                                    error_3 = _b.sent();
                                                                    console.error(error_3);
                                                                    return [3 /*break*/, 5];
                                                                case 5: return [2 /*return*/];
                                                            }
                                                        });
                                                    }); })];
                                            case 7:
                                                _a.sent();
                                                _a.label = 8;
                                            case 8: return [2 /*return*/];
                                        }
                                    });
                                }); });
                                if (msg.author.bot)
                                    return [2 /*return*/];
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                console.log(error_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    PrefixHandler.prototype.messageDelete = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                client.on("messageDelete", function (msg) { return __awaiter(_this, void 0, void 0, function () {
                    var fetchLogs, deleted, exe, tar, logembed, channel_2, e_1;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                if (!msg.guild)
                                    return [2 /*return*/];
                                return [4 /*yield*/, msg.guild.fetchAuditLogs({
                                        limit: 1,
                                        type: "MESSAGE_DELETE",
                                    })];
                            case 1:
                                fetchLogs = _a.sent();
                                deleted = fetchLogs.entries.first();
                                exe = deleted.exe, tar = deleted.tar;
                                if (!deleted)
                                    return [2 /*return*/, log.warn("[!] A message by {msg.author.tag} was deleted by no log was available")];
                                logembed = new Discord.MessageEmbed()
                                    .setColor("RED")
                                    .setTitle("Message Deleted")
                                    .addField("**Author: " + msg.author.tag + "**", "**Message**: " + msg.content, false)
                                    .setTimestamp();
                                return [4 /*yield*/, data.find({
                                        id: msg.guild.id
                                    })];
                            case 2:
                                channel_2 = _a.sent();
                                if (!channel_2.logs)
                                    return [2 /*return*/];
                                channel_2 = channel_2.logs;
                                if (tar.id == msg.author.id) {
                                    log.log("[] A message by {" + msg.author.tag + "} was deleted by {" + exe.tag + "}");
                                    msg.guild.channels.cache(function (find) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, find.id == channel_2];
                                        });
                                    }); }).send({ embeds: [logembed] });
                                }
                                else {
                                    msg.guild.channels.cache(function (find) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            return [2 /*return*/, find.id == channel_2];
                                        });
                                    }); }).send({ embeds: [logembed] });
                                }
                                return [3 /*break*/, 4];
                            case 3:
                                e_1 = _a.sent();
                                return [2 /*return*/];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    PrefixHandler.prototype.messageUpdate = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                client.on("messageUpdate", function (msg) { return __awaiter(_this, void 0, void 0, function () {
                    var fetchedLogs, changeLogs, old, newm, logEmbed, channel_3, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                if (!msg.guild)
                                    return [2 /*return*/];
                                return [4 /*yield*/, msg.guild.fetchAuditLogs({
                                        limit: 1,
                                        type: "MESSAGE_UPDATE",
                                    })];
                            case 1:
                                fetchedLogs = _a.sent();
                                changeLogs = fetchedLogs.entries.first();
                                if (!changeLogs)
                                    return [2 /*return*/, console.log("A message by " + msg.author.tag + " was updated, no audit found...")];
                                old = changeLogs.old, newm = changeLogs.newm;
                                logEmbed = new Discord.MessageEmbed()
                                    .setColor("RED")
                                    .setTitle("Message deleted")
                                    .addField("**Author**: " + msg.author.tag, "**Message**: \n`" + old.content + "` => `" + newm.content + "`")
                                    .setTimestamp();
                                return [4 /*yield*/, data.find({
                                        id: msg.guild.id
                                    })];
                            case 2:
                                channel_3 = _a.sent();
                                if (!channel_3.logs)
                                    return [2 /*return*/];
                                channel_3 = channel_3.logs;
                                console.log("A message by " + msg.author.tag + " was updated to " + newm.content + ":\n" + old.content);
                                msg.guild.channels.cache.find(function (ch) { return ch.name === channel_3; }).send({ embeds: [logEmbed] });
                                return [3 /*break*/, 4];
                            case 3:
                                err_1 = _a.sent();
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    PrefixHandler.prototype.runall = function (client) {
        //this.messageCreate(client);
        this.messageDelete(client);
        this.messageUpdate(client);
    };
    return PrefixHandler;
}());
exports.PrefixHandler = PrefixHandler;

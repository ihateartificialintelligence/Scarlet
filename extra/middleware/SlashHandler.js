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
exports.SlashHandler = void 0;
require('dotenv').config();
var Discord = __importStar(require("discord.js"));
var discord_js_1 = require("discord.js");
var v9_1 = require("discord-api-types/v9");
var rest_1 = require("@discordjs/rest");
var _a = require("../../config.json"), TOKEN = _a.TOKEN, ID = _a.ID;
var ts_1 = __importDefault(require("cat-loggr/ts"));
var log = new ts_1.default();
var fs = require("fs");
/**
 * @description Slash Command Handler for Kir'Gith using TypeScript and Discord.JS
 */
var SlashHandler = /** @class */ (function () {
    //protected logs: function(){} = console.log;
    /**
     *
     * @param client DAPI Client instance
     * @param token DAPI Bot Token
     */
    function SlashHandler(client, token) {
        this.client = client;
        this.token = token;
        client = this.client || new Discord.Client({
            intents: [
                discord_js_1.Intents.FLAGS.DIRECT_MESSAGES,
                discord_js_1.Intents.FLAGS.GUILD_MESSAGES, discord_js_1.Intents.FLAGS.GUILDS
            ]
        });
        token = this.token || TOKEN;
    }
    /**
     *
     * @param client DAPI Client instance
     * @param options Optional array for exclusion of client applicationCommands
     */
    SlashHandler.prototype.slashCreate = function (client, options) {
        return __awaiter(this, void 0, void 0, function () {
            var toExclude, scmdArray, slashfolder, _i, slashfolder_1, folder, slash, _a, slash_1, file, scmd, rest;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        toExclude = options || {};
                        scmdArray = [];
                        slashfolder = fs.readdirSync('commands/slash');
                        for (_i = 0, slashfolder_1 = slashfolder; _i < slashfolder_1.length; _i++) {
                            folder = slashfolder_1[_i];
                            slash = fs.readdirSync("D:/GitHub Projects/Kir'Gith/commands/slash/" + folder).filter(function (file) { return file.endsWith('.slash'); });
                            for (_a = 0, slash_1 = slash; _a < slash_1.length; _a++) {
                                file = slash_1[_a];
                                scmd = require("../../commands/slash/" + folder + "/" + file);
                                client.slash.set(scmd.data.name, scmd);
                                scmdArray.push(scmd.data.toJSON());
                            }
                        }
                        rest = new rest_1.REST({ version: '9' }).setToken(TOKEN);
                        console.time("[!] Slash Create");
                        return [4 /*yield*/, rest.put(v9_1.Routes.applicationCommands(ID), { body: scmdArray })
                                .then(function () {
                                log.info('Successfully registered application commands.');
                                console.timeEnd("[!] Slash Create");
                            })
                                .catch(console.error)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
        //* Uncomment this when I need to remove redundant commands
        await rest.get(Routes.applicationGuildCommands(ID, "795151474686427146"))
            .then((extra: any) => {
                const promises = [];
                for (const command of extra) {
                    const deleteUrl:any = `${Routes.applicationGuildCommands(ID, "795151474686427146").toString()}/${(command.id)}`;
                    promises.push(rest.delete(deleteUrl));
                }
            })   */
    /**
     *
     * @param client DAPI Client instance
     * @param options Optional array for exclusion of client applicationCommands
     */
    SlashHandler.prototype.runSlash = function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                client.on("interactionCreate", function (i) { return __awaiter(_this, void 0, void 0, function () {
                    var command, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!i.isCommand())
                                    return [2 /*return*/];
                                command = client.slash.get(i.commandName);
                                if (!command)
                                    return [2 /*return*/];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 5]);
                                return [4 /*yield*/, command.execute(i)];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 3:
                                e_1 = _a.sent();
                                log.error("[!] Error running slash command - \n " + e_1 + "\n");
                                return [4 /*yield*/, i.reply({ content: "There was an error while running the slash command" })];
                            case 4:
                                _a.sent();
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return SlashHandler;
}());
exports.SlashHandler = SlashHandler;

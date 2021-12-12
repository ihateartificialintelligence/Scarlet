"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("./config.json"), TOKEN = _a.TOKEN, DB = _a.DB;
var discord_js_1 = require("discord.js");
var SlashHandler_1 = require("./extra/middleware/SlashHandler");
var ts_1 = __importDefault(require("cat-loggr/ts"));
var PrefixHandler_1 = require("./extra/middleware/PrefixHandler");
var log = new ts_1.default();
var db_handler_1 = require("./extra/database/handlers/db.handler");
var intents = new discord_js_1.Intents().add(discord_js_1.Intents.FLAGS.DIRECT_MESSAGES, discord_js_1.Intents.FLAGS.GUILD_MESSAGES, discord_js_1.Intents.FLAGS.GUILDS);
var Discord = require("discord.js");
var client = new Discord.Client({ intents: intents });
var slash = new SlashHandler_1.SlashHandler(client);
log.info(" [?] Initializing client, please wait.... ");
console.time("[!] Start Up");
var DBH = new db_handler_1.DB_Handler(DB);
DBH.createConnection(true);
client.commands = new Discord.Collection();
client.slash = new Discord.Collection();
/**
 * Uncomment this during dev stages
 */
slash.slashCreate(client);
client.login(TOKEN);
client.on("ready", function () { return log.info("[*] Connection Successful", (console.timeEnd("[!] Start Up"))); });
slash.runSlash(client);
new PrefixHandler_1.PrefixHandler(client).messageCreate(client);

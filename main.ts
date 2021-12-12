const { TOKEN, DB } = require("./config.json");
import { Intents } from "discord.js";
import { SlashHandler } from "./extra/middleware/SlashHandler"
import logger from "cat-loggr/ts";
import { PrefixHandler } from "./extra/middleware/PrefixHandler";
const log = new logger();
import {DB_Handler} from "./extra/database/handlers/db.handler"

const intents =  new Intents().add(
    Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILDS
);

const Discord = require("discord.js"); const client = new Discord.Client({ intents: intents });
const slash = new SlashHandler(client);


log.info(` [?] Initializing client, please wait.... `);
console.time("[!] Start Up");
const DBH = new DB_Handler(DB);
DBH.createConnection(true);
client.commands = new Discord.Collection();
client.slash = new Discord.Collection();

/**
 * Uncomment this during dev stages
 */
slash.slashCreate(client);
client.login(TOKEN);

client.on("ready", () => log.info(`[*] Connection Successful`, (console.timeEnd("[!] Start Up"))));
slash.runSlash(client);
new PrefixHandler(client).messageCreate(client);
require('dotenv').config();
import * as Discord from "discord.js"; import { Intents } from "discord.js";
import { Routes } from "discord-api-types/v9"; import {REST} from "@discordjs/rest";
const { TOKEN, ID } = require( "../../config.json");
import Logger from "cat-loggr/ts"; const log = new Logger();
const fs = require("fs");

/**
 * @description Slash Command Handler for Kir'Gith using TypeScript and Discord.JS
 */
export class SlashHandler {
    //protected logs: function(){} = console.log;
    /**
     * 
     * @param client DAPI Client instance
     * @param token DAPI Bot Token
     */
    constructor(private client:any, private token?:string) {
        client = this.client || new Discord.Client({ 
            intents: [
                Intents.FLAGS.DIRECT_MESSAGES, 
                Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS
            ] 
        });
        token = this.token || TOKEN;
    }

    /**
     * 
     * @param client DAPI Client instance
     * @param options Optional array for exclusion of client applicationCommands
     */
    async slashCreate(client:any, options?: string[]) {
        var toExclude = options || {};
        var scmdArray:string[] = [];
        const slashfolder = fs.readdirSync('commands/slash')
        for (let folder of slashfolder) {
            const slash = fs.readdirSync(`D:/GitHub Projects/Kir'Gith/commands/slash/${folder}`).filter((file:any) => file.endsWith('.slash'));
            for (let file of slash) {
                const scmd = require(`../../commands/slash/${folder}/${file}`);
                client.slash.set(scmd.data.name, scmd);
                scmdArray.push(scmd.data.toJSON());
            }
        }
        
        const rest = new REST({ version: '9' }).setToken(TOKEN);
        console.time("[!] Slash Create")
        await rest.put(Routes.applicationCommands(ID), { body: scmdArray })
            .then(() => {
                log.info('Successfully registered application commands.');
                console.timeEnd("[!] Slash Create");
            })
            .catch(console.error);

        }
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
    async runSlash(client:any) {
        client.on("interactionCreate", async (i: any) => {
            if (!i.isCommand()) return;
            const command = client.slash.get(i.commandName);
            if (!command) return;
            try {
                await command.execute(i);
            } catch(e) {
                log.error(`[!] Error running slash command - \n ${e}\n`);
                await i.reply({ content: "There was an error while running the slash command"})
            }
        });
    }
}
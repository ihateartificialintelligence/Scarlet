import * as Discord from "discord.js"; import { Intents } from "discord.js";
 const { TOKEN, ID, PREFIX, DB } = require("../../config.json");
import Logger from "cat-loggr/ts"; const log = new Logger();
const { automod } = require("./Scarlet.sys");
import { DB_Handler } from "../database/handlers/db.handler";
const DBH = new DB_Handler(DB);
const { MessageActionRow, MessageButton } = require("discord.js");

const data = require("../database/handlers/models/guild.model");
export class PrefixHandler {
    constructor(private client: any, private token?: string) {
        client = this.client || new Discord.Client({ intents:[
            Intents.FLAGS.DIRECT_MESSAGES, 
            Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS
        ]});
        token = this.token || TOKEN;
    }

    async messageCreate(client: any, options?: string[]) {
        client.on("messageCreate", async(msg: any) => {
            try {
                if (msg.author.bot) return;
                const member = msg.member;
                const guild = await data.find({
                    id: msg.guild.id,
                })[0];
                if (!guild) {
                    return;
                }
                if (guild.enabled == true) {
                    automod(msg.content).then(async (response: any) => {
                        if (await response.score <= (-5 || guild.toleranceLvl)) {
                            console.log(`Member ${msg.author.id} sent ${msg.content} score ${response.score}`);
                            try{ 
                                const row = new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                            .setCustomId("Dispute")
                                            .setLabel("Dispute")
                                            .setStyle("DANGER"),
                                        new MessageButton()
                                            .setCustomId("Server-Rules")
                                            .setLabel("Server Rules")
                                            .setStyle("PRIMARY"),
                                        new MessageButton()
                                            //.setCustomId("Dev-contact")
                                            .setLabel("Dev Contact")
                                            .setURL("https://discord.gg/kazs-burrow")
                                            .setStyle("LINK"),
                                    );
                                    const row2 = new MessageActionRow()
                                    .addComponents(
                                        new MessageButton()
                                            .setCustomId("dispute")
                                            .setLabel("Dispute")
                                            .setStyle("DANGER")
                                            .setDisabled(true),
                                        new MessageButton()
                                            .setCustomId("server-rules")
                                            .setLabel("Server Rules")
                                            .setStyle("PRIMARY")
                                            .setDisabled(true),
                                        new MessageButton()
                                            //.setCustomId("Dev-contact")
                                            .setLabel("Dev Contact")
                                            .setStyle("LINK")
                                            .setURL("https://discord.gg/kazs-burrow")
                                            .setDisabled(true),
                                    );
                                const filter = (i: any) => i.customId === ("server-rules"||"dispute") && i.user.id === msg.author.id;
                                const collector = msg.channel.createMessageComponentCollector({ filter, time: 30000 });
                                await msg.author.send({ content:`Please refrain from using those words!\nYou're message (\`${msg.content}\`) has been evaluated and returned a score of \`${response.score}\`.`, components: [row] })
                                    .then(() => {
                                        collector.on('collect', async (i: any) => {
                                            if (i.customId === "Server-Rules") {
                                                await i.update({
                                                    content: `Here is the server rules: ${null /** We need to return the rules */}`,
                                                    components: [row2]
                                                });
                                            }
                                        });
                                        collector.on('end', (collected: any) => {})
                                    });
                            } catch (error) { console.log(error)}
                            await msg.delete();
                            await DBH.warn(msg.author.id, true).then(async (method: any) => {
                                if (method.toKick == true && member.kickable == true) {
                                    try {
                                        msg.author.send(`ALERT: You have been removed from \`${msg.guild.name}\` due to auto-mod scoring.`);
                                        setTimeout(await member.kick({ reason: `Scarlet Score: ${response.score}` }), 5000);
                                        let channel = await data.find({
                                            id: msg.guild.id
                                        })[0];
                                        let logembed = new Discord.MessageEmbed()
                                            .setColor("RED")
                                            .setTitle("Member Kicked!")
                                            .addField(`**Member: ${msg.author.tag}**`, `**Reason**: removed from \`${msg.guild.name}\` due to auto-mod scoring.`, false)
                                            .setTimestamp();
                                        if (!channel.logs) return;
                                        channel = channel.logs;
                                        msg.guild.channels.cache((f: any) => {
                                            f.id = channel
                                        }).send({ embeds: [logembed] });
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }
                            });
                        }
                    });
                }
                if (msg.author.bot) return;
            }
            catch (error) {
                console.log(error);
            }
        })
    }

    async messageDelete(client: any) {
        client.on("messageDelete", async (msg: any) => {
            try {
                if (!msg.guild) return;
                const fetchLogs = await msg.guild.fetchAuditLogs({
                    limit: 1,
                    type: "MESSAGE_DELETE",
                });
                const deleted = fetchLogs.entries.first();
                const { exe, tar } = deleted;
                if (!deleted) return log.warn(`[!] A message by {msg.author.tag} was deleted by no log was available`);
                let logembed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("Message Deleted")
                    .addField(`**Author: ${msg.author.tag}**`, `**Message**: ${msg.content}`, false)
                    .setTimestamp();
                    let channel = await data.find({
                        id: msg.guild.id
                    });
                    if (!channel.logs) return;
                    channel = channel.logs;
                    if (tar.id == msg.author.id){
                        log.log(`[] A message by {${msg.author.tag}} was deleted by {${exe.tag}}`);
                        msg.guild.channels.cache(async (find:any) => {
                            return find.id == channel
                        }).send({ embeds: [logembed] });
                    } else {
                        msg.guild.channels.cache(async (find:any) => {
                            return find.id == channel
                        }).send({ embeds: [logembed] });
                    }
            } catch (e) {
                return;
            }
        })
    }

    async messageUpdate(client: any) {
        client.on("messageUpdate", async (msg:any) => {
            // ignore DMs
            try {
                if (!msg.guild) return;
                const fetchedLogs = await msg.guild.fetchAuditLogs({
                    limit: 1,
                    type: "MESSAGE_UPDATE",
                });
        
                const changeLogs = fetchedLogs.entries.first();
        
                if (!changeLogs) return console.log(`A message by ${msg.author.tag} was updated, no audit found...`);
                
                const { old, newm } = changeLogs;
        
                let logEmbed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("Message deleted")
                    .addField(`**Author**: ${msg.author.tag}`, `**Message**: \n\`${old.content}\` => \`${newm.content}\``)
                    .setTimestamp();
                    let channel = await data.find({
                        id: msg.guild.id
                    });
                    if (!channel.logs) return;
                    channel = channel.logs;
                console.log(`A message by ${msg.author.tag} was updated to ${newm.content}:\n${old.content}`);
                msg.guild.channels.cache.find((ch:any) => ch.name === channel).send({ embeds: [logEmbed] });
        
            } catch (err) {
                //console.log(err.stack);
            }
        });
    }

    runall(client:any) {
        //this.messageCreate(client);
        this.messageDelete(client);
        this.messageUpdate(client);
    }
}
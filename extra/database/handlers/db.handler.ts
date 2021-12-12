require("dotenv").config();
const Users = require("./models/user.model");
const mongo = require("mongoose")
/** @type {*} */
const options = {
    autoIndex: false, // Don't build indexes
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
export class DB_Handler 
{
    /**
     *
     *
     * @static
     * @type {string}
     * @memberof DB_Handler
     */
    static connnectionURL: string;
    /**
     * Creates an instance of DB_Handler.
     * @param {string} connectionURL
     * @memberof DB_Handler
     */
    constructor(connectionURL: string)
    {
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
    async createConnection(run?: Boolean): Promise<any>
    {
        if (!run) return;
        else await mongo.connect(require("../../../config.json").DB, options), console.log("Connected to MongoDB");
    }
    /**
     *
     *
     * @static
     * @param {String} user
     * @param {Boolean} [warn]
     * @return {*} 
     * @memberof DB_Handler
     */
    async warn(user: String, warn?: Boolean): Promise<any>
    {
        if (!user) throw new Error("User ID not specified");
        let member = await Users.find({
            id: user
        });
        if (!member) throw new Error("No member exists with that id");
        if (member) {
            let currentWarns = member.warns;
            if (currentWarns < 3) {
                if (warn == true) member.warns += 1;
                if (currentWarns == 3) return { toKick: true };
                else return { toKick: false };
            } else return { toKick: true };
        }
        member.save().catch((_err: any) => console.error);
    }
    /**
     *
     *
     * @static
     * @param {String} id
     * @param {String} guild
     * @param {String} [reason]
     * @memberof DB_Handler
     */
    async logBan({ id, guild, reason }: { id: String; guild: String; reason?: String; })
    {
        if (!(id || guild)) throw new Error("No guild or user ID provided");
        let member = await Users.find({ id: id });
        if (!member) throw new Error("Could not find user with ID: " + id);
        if (member) {
            member.isBanned = true;
            member.amountBannedFrom[0] += 1;
            member.guildsBanned[0] = guild;
            if (!!reason) member.reason = reason;
        }
        member.save().catch((_e: any) => console.error);
    }
}
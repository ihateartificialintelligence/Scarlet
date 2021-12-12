import * as mongo from "mongoose";

const User = new mongo.Schema({
    id: { type: String, unique: true, default: null },
    isBanned: { type: Boolean, default: false },
    reason: { type: String, default: null },
    warns: { type: Number, default: 0 },
    amountBannedFrom: [{ type: Number, default: 0 }],
    guildsBanned: [{ type: String, default: null }],
});

module.exports = mongo.model("users", User);

import * as mongo from "mongoose";

const Guild = new mongo.Schema({
    id: {
        type: String,
        default: null
    },
    prefix: {
        type: String,
        default: "sc."
    },
    logs: {
        type: String,
        default: null
    },
    toleranceLvl: {
        type: Number,
        default: -5
    },
    enabled: { type: Boolean, default: true },
});

module.exports = mongo.model("Guild", Guild);
import * as mongoose from "mongoose";

const UserData:any = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    accountNumber: {
        type: Number,
        required: true
    },
    BankBalance: {
        type: Number,
        required: true
    },
    AccountType: { 
        type: String,
        required: false,
        default: "Open"
    },
    publicKey: {
        type: String,
        required: true,
    },
    privateKey: {
        type: String,
        required: true,
    },
    password: { type: String, required: true }
});

module.exports = mongoose.model("UserData", UserData);
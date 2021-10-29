"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("../../common/services/mongo.service").mongoose;
var Schema = Mongoose.Schema;
var user = new Mongoose.Schema({
    uname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    permissionLevel: {
        type: Number,
        required: true
    },
    AccountID: {
        type: String,
        required: true,
        default: "" + Math.floor(Math.random() * 999999),
        unique: true
    }
});
var User = Mongoose.model('Users', user);
exports.findByEmail = function (email) {
    return User.findOne({ email: email });
};
user.virtual('id').get(function () {
    return User._id.toHexString();
});
user.set('toJson', {
    virtuals: true
});
user.findById = function (id) {
    return User.find({ id: id }, id);
};
exports.findById = function (id) {
    return User.findById(id)
        .then(function (result) {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};
exports.findByName = function (name) {
    return User.find({ uname: name });
};
exports.createUser = function (userData) {
    var newUser = new User(userData);
    return newUser.save();
};
exports.list = function (perPage, page) {
    return new Promise(function (resolve, reject) {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
            if (err)
                return reject(err);
            else
                resolve(users);
        });
    });
};
exports.patchUser = function (id, userData) {
    return User.findOneAndUpdate({
        _id: id
    }, userData);
};
exports.removeById = function (userId) {
    return new Promise(function (resolve, reject) {
        User.deleteMany({ _id: userId }, function (err) {
            if (err)
                return reject(err);
            else
                return resolve(err);
        });
    });
};

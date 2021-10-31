const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    uuid: {type: Number, unique: true},
    username: String,
    email: String,
    password: String,
    permissionLevel: Number,
    token: String,
    uWallet: String,
    privateKey: String,
    publicKey: String,
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('Users').find({uuid: this.id}, cb);
};

const User = mongoose.model('Users', userSchema);


exports.findByEmail = (email) => {
    let find = User.find({email: email});
    if (!!find) return true, find;
    if (!!find) return false;
};

exports.findById = (id) => {
    return User.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.patchUser = (id, userData) => {
    return User.findOneAndUpdate({
        uuid: id
    }, userData);
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({uuid: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

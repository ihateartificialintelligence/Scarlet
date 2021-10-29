import { userInfo } from "os";

const Mongoose = require("../../common/services/mongo.service").mongoose;
const Schema = Mongoose.Schema;

const user = new Schema({
    uname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    permissionLevel: {
        type: Number,
        required: true
    },
    AccountID: {
        type: String,
        required: true,
        default: `${Math.floor(Math.random()*999999)}`,
        unique: true
    }
});

const User:any = Mongoose.model('Users', user);

exports.findByEmail = (email: string) => {
    return User.findOne({ email: email });
};

user.virtual('id').get(() => {
    return User._id.toHexString();
});

// ensure vFields are serialized;
user.set('toJson', {
    virtuals: true
});

user.findById = (id:number) => {
    return User.find({ id: id }, id);//  this.model('Users').find({ id: this.id }, id);
};

exports.findById = (id:number) => {
    return User.findById(id)
        .then((result: any) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.findByName = (name: string) => {
    return User.find({ uname: name })
};

exports.createUser = (userData: any) => {
    const newUser = new User(userData);
    return newUser.save();
};

exports.list = (perPage: any, page: any) => {
    return new Promise((resolve: any, reject: any) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec((err: Error, users:any) => {
                if (err) return reject(err);
                else resolve(users);
            });
    });
};

exports.patchUser = (id: number, userData:any) => {
    return User.findOneAndUpdate({
        _id: id
    }, userData);
};

exports.removeById = (userId: number) => {
    return new Promise((resolve:any, reject:any) => {
        User.deleteMany({_id: userId}, (err:Error) => {
            if (err) return reject(err);
            else return resolve(err);
        });
    });
};
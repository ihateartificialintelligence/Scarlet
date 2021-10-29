const mongoose = require('mongoose');
let count = 0;

const connectWithRetry = () => {
    console.log("MongoDB Connection With Retry");
    
    mongoose.connect("mongodb+srv://evolt_admins:65dCCvPAETHhmq0z@userdata.qlscj.mongodb.net/UserDatabase?retryWrites=true&w=majority?authMechanism=SCRAM-SHA-1", {
        useFindAndModify: false,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch(e => {
        console.log("Error connecting to MongoDB, retry after 5 seconds... ", ++count);
        setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

exports.mongoose = mongoose;
var DB = {};

var mongoose = require('mongoose');

//DB Connecting/Setting.
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost/ggp_test');

var Schema = mongoose.Schema;

//USER
var userSchema = new Schema({
    email: String,
    password: String,//need to be hashed
    nickname: String,
    category: String,
    university: String,
    major: String,
    valid: { type: Boolean, default: false },
    reg_date: { type: Date, default: Date.now }
}, {strict: false, autoindex: true});
userSchema.methods.pwCheck = function(pw){
    return this.password == pw;
}
DB.User = mongoose.model('user', userSchema);

module.exports = DB;

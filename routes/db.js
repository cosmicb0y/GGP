var DB = {};

var mongoose = require('mongoose');

//*
//DB Connecting/Setting. Move to other module later.
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost/ggp_test');

var Schema = mongoose.Schema;

//USER
var userSchema = new Schema({
    //id: Schema.Types.ObjectId,
    email: String,
    password: String,//need to be hashed
    nickname: String,
    category: String,
    university: String,
    major: String,
    reg_date: { type: Date, default: Date.now }
}, {strict: false, autoindex: true});
DB.User = mongoose.model('user', userSchema);
//User.find({email: req.body.id}, {_id: 0, password: 1}, (err, users) => {
//var user = new User();, user.asd = asdf ~~~~
//user.save((err)=>{

module.exports = DB;

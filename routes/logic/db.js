var mongoose = require('mongoose');
var Hash = require('./hash');

var DB = {};

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
    salt: String,
    valid: { type: Boolean, default: false },
    viewed: Number,
    reg_date: { type: Date, default: Date.now }
}, {strict: false, autoindex: true});
userSchema.methods.pwCheck = function(input, cb){
    Hash.compareHashed(this.password, input, this.salt, cb);
}
DB.User = mongoose.model('user', userSchema);

//PROJECT
var projectSchema = new Schema({
    id: String,
    name: String,
    //thumbnail: String, // Add later.
    category: String,//to Number,
    summary: String,
    content: String,
    photos: [String],
    writer: String,//to Schema.Types.ObjectId,

    commentCount: Number,
    likeCount: Number,
    likedUser: [Schema.Types.ObjectId],
    viewed: Number,
    date: { type: Date, default: Date.now },
    valid: { type: Boolean, default: true },
}, {strict: false, autoindex: true});
DB.Project = mongoose.model('project', projectSchema);

//COMMENT
var commentSchema = new Schema({
    writer: String,
    project: String,
    content: String,
    date: { type: Date, default: Date.now },
}, {strict: false, autoindex: true});
DB.Comment = mongoose.model('comment', commentSchema);

DB.Schema = mongoose.Schema;

module.exports = DB;

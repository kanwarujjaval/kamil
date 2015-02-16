/**
 * Created by KanwarUjjaval on 15-02-2015.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

userSchema = new schema({
    email : { type: String , unique : true },
    username : { type : String },
    password : { type : String },
    salt : { type : String },
    name : { type : String },
    joinedOn : { type : Date , default : Date.now },
    roles: {
        type: [{ type: String, enum: ['user', 'artist', 'admin9871']}],
        default: ['user']
    }
});

userSchema.methods.createSalt = function () {
    return bcrypt.genSaltSync(10);
};

userSchema.methods.createHash = function (password, salt) {
    return bcrypt.hashSync(password, salt);
};

userSchema.methods.authenticate = function (password) {
    return bcrypt.compareSync(password, this.password);
};


//______________________________FIRST RUN___________________________________________
var User = mongoose.model('user',userSchema);

User.find({ 'username': 'admin' }).exec(function (err, collection) {
    if (collection.length === 0) {
        var salt, hash;
        salt = bcrypt.genSaltSync(10);
        hash = bcrypt.hashSync('password', salt);
        User.create({
            email:'admin@admin.com',
            username:'admin',
            salt: salt,
            password: hash,
            roles: ['admin9871']
        });
    }
});
//___________________________________________________________________________________

exports.userModel = mongoose.model('user', userSchema);
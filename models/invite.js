/**
 * Created by KanwarUjjaval on 16-02-2015.
 */
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var schema = mongoose.Schema;
inviteSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name:String,
    genre: [String],
    music: [String],
    social: [String],
    location: String,
    website: String,
    token: {
        type: String,
        required: true,
        unique: true
    },
    roles: {
        type: [{ type: String, enum: ['user', 'artist', 'admin9871']}],
        default: ['user']
    },
    invited: {
        type: Boolean
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    invitationSent: { type: Boolean },
    invitationSentOn: { type: Date },
    signedUpOn: { type: Date }
});
inviteSchema.methods.genToken = function () {
    return uuid.v1();
};
exports.inviteModel = mongoose.model('invite', inviteSchema);
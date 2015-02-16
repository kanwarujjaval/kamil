/**
 * Created by KanwarUjjaval on 16-02-2015.
 */
var inviteModel = require('../models/invite').inviteModel;
var userModel = require('../models/user').userModel;

exports.getSubscribes = function(req,res){
    userModel.find({}, function (err, users) {
        if (err) {
            res.send(err);
        }
        if (!users) {
            res.send({
                "message": "Requested Resource Not Found",
                "name": "notFound"
            });
        }
        else {
            res.send(users);
        }
    });
};

exports.getInvites = function(req,res){
    inviteModel.find({}, function (err, users) {
        if (err) {
            res.send(err);
        }
        if (!users) {
            res.send({
                "message": "Requested Resource Not Found",
                "name": "notFound"
            });
        }
        else {
            res.send(users);
        }
    });
};
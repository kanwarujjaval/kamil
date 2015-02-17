/**
 * Created by KanwarUjjaval on 16-02-2015.
 */
var inviteModel = require('../models/invite.js').inviteModel;
var userModel = require('../models/user.js').userModel;
var validator = require("validator");
var mailer = require("../service/mailer.js");

var spliter = function(data){
    data = data.split(",");
    for (var i = 0; i < data.length ; i++) {
        data[i] = data[i].trim();
    }
    return data
};

exports.createInvite = function (req, res, next) {
    if (validator.isEmail(req.body.email)) {
        inviteModel.findOne({ 'email': req.body.email }, function (err, invitation) {
            if (err) {
                res.send(err);
            }
            else
            if (invitation) {
                res.render('msg',{
                    msg:"Invitation already Exists"
                });
            }
            else {
                var newInvite = new inviteModel();
                newInvite.email = req.body.email;
                newInvite.name = req.body.name;
                newInvite.genre = spliter(req.body.genre);
                newInvite.music = spliter(req.body.music);
                newInvite.social = spliter(req.body.social);
                newInvite.location = req.body.location;
                newInvite.website = req.body.website;
                newInvite.token = newInvite.genToken();
                newInvite.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        mailer.sendInviteMail(res, req.body.email, '<p>Hello Mr. '+ req.body.name +'<br/>Your invite has been created and it is currently under review<br/>You will be informed when it is accepted or denied! </p>', 'Welcome');
                        res.render('msg',{
                            msg:"Your invite has been created"
                        });
                    }
                });
            }
        })
    }
    else {
        res.render('msg',{
            msg:"Invalid email"
        });
    }
};


exports.sendToken = function (req, res, next) {
    inviteModel.findOneAndUpdate({ '_id': req.params.id },
        {'invited': true,'invitationSent':true,'invitationSentOn': Date.now()},function (err, invitedUser) {
        if (err) {
            res.send(err);
        }
        else {
            mailer.sendInviteMail(res, invitedUser.email, '<p>Your invitation request has been accepted </p>', 'Welcome');
            res.send(invitedUser);
        }
    });
};


exports.denyToken = function (req, res, next) {
    inviteModel.findOneAndUpdate({ '_id': req.params.id },
        {'invited': false},function (err, invitedUser) {
            if (err) {
                res.send(err);
            }
            else {
                mailer.sendInviteMail(res, invitedUser.email, '<p>Your invitation request has been denied </p>', 'Response');
                res.send(invitedUser);
            }
        });
};

exports.createSubscribe = function (req, res, next) {
    if (validator.isEmail(req.body.email)) {
        userModel.findOne({ 'email': req.body.email }, function (err, user) {
            if (err) {
                res.send(err);
            }
            else
            if (user) {
                res.render('msg',{
                    msg:"Subscription request exists"
                });
            }
            else {
                var newUser = new userModel();
                newUser.interests = spliter(req.body.interests);
                newUser.email = req.body.email;
                newUser.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        mailer.sendInviteMail(res, req.body.email, '<p>Hello<br/>Your request for subscription has been confirmed!</p>', 'Welcome');
                        res.render('msg',{
                            msg:"You are now subscribed!"
                        });
                    }
                });
            }
        })
    }
    else {
        res.render('msg',{
            msg:"Invalid email"
        });
    }
};
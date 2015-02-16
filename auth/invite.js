/**
 * Created by KanwarUjjaval on 16-02-2015.
 */
var inviteModel = require('../models/invite.js').inviteModel;
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
                newInvite.genre = req.body.genre;
                newInvite.music = spliter(req.body.music);
                newInvite.social = spliter(req.body.social);
                newInvite.location = req.body.location;
                newInvite.token = newInvite.genToken();
                newInvite.invited = false;
                newInvite.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        mailer.sendWelcomeMail(req.body.email);
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
    inviteModel.findOneAndUpdate(
        { 'email': req.body.email },
        { 'invited': true,
            'invitationSent':true,
            'invitationSentOn': Date.now()
        },
        function (err, invitedUser) {
        if (err) {
            res.send(err);
        }
        else {
            mailer.sendInviteMail(res, req.body.email, '<p>Welcome, Sign up at <a href="http://opencloudschool.org/register/' + invitedUser.token + '/">click here</a></p>', 'Get Started with OpencloudSchool');
        }
    });
};
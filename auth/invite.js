/**
 * Created by KanwarUjjaval on 16-02-2015.
 */
var inviteModel = require('../models/invite.js').inviteModel;
var userModel = require('../models/user.js').userModel;
var validator = require("validator");
var mailer = require("../service/mailer.js");
var api = require('../core/api');

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
                        mailer.sendInviteMail(res, req.body.email, '<p>Hey '+ req.body.name +'<br/><br/>Congratulations! You have successfully completed the application process. Our TraqHound staff is currently reviewing your submission. An update email will be sent to you within 48 hours. Please stay tuned...<br/><br/>Cheers,<br/>Team TraqHound</p>', 'Your application is under review');
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
            mailer.sendInviteMail(res,
                invitedUser.email,
                '<p>Hi '+ invitedUser.name +',<br/><br/>Welcome aboard! You have received two thumbs-up from the TraqHound staff. TraqHound is more than just another music platform. It\'s about being part of a movement that financially empowers artists to gain control, freedom, and flexibility. Artists finally have the chance to get back in the driver\'s seat, both creatively and professionally.<br/><br/>One of the many perks of being on TraqHound is that you will have direct access to one of our A&R executives for any questions you have about the service and music business. We are all here to help you maximize your TraqHound experience.<br/><br/>More features will be added as we grow, but in the meantime if you have any comments or feedback, feel free to email me directly <a href="mailto:kamil@traqhound.com" target="_blank">kamil@traqhound.com</a><br/><br/><br/>Sincerely, <br/><br/>Kamil Grzych<br/>Founder, TraqHound </p>',
                ' Congratulations, you have been accepted');
            api.saveInvites(true);
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
                mailer.sendInviteMail(res,
                    invitedUser.email,
                    '<p>Dear'+invitedUser.name+'<br/><br/>, We regret to inform you that your application has been rejected.<br/><br/>Typical reasons for denial ~<br/><br/><br/>1. Poor fan base<br/><br/>2. Negative social presence<br/><br/>3. Just bad music<br/><br/><br/>If you were denied and feel you don\'t fall under any of these categories, email us. Let\'s chat.<br/><br/> All others, keep trying. There\'s always a shot...<br/><br/><br/>Thanks,<br/> TraqHound A&R Department</p>',
                    'Your TraqHound Application');
                api.saveInvites(false);
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
                        mailer.sendInviteMail(res, req.body.email, '<p>Hello<br/>Your request for TraqHound subscription has been confirmed!</p>', 'Your TraqHound Subscription');
                        api.saveSubscribes();
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
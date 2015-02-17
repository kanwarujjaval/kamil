/**
 * Created by KanwarUjjaval on 16-02-2015.
 */
var inviteModel = require('../models/invite').inviteModel;
var userModel = require('../models/user').userModel;
var mailer = require("../service/mailer.js");

exports.getSubscribes = function(req,res){
    userModel.find({roles:['user']}, function (err, users) {
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

exports.contact = function(req,res){
    var text = '<p>'+ req.body.text +'</p>';
    mailer.sendContactMail(res,req.body.email,req.body.name,text,"TraqHound Contact Message");
    res.render('msg',{
        msg:"Your Message has been sent!"
    });
};

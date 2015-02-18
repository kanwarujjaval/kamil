/**
 * Created by KanwarUjjaval on 16-02-2015.
 */
var inviteModel = require('../models/invite').inviteModel;
var userModel = require('../models/user').userModel;
var mailer = require("../service/mailer.js");
var csv = require('json2csv');
var fs = require('fs-extra');

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

exports.saveSubscribes = function(){
    var filename = 'subscribers.csv';

    var file = './backups/'+filename;
    fs.ensureFile(file, function(err) {
        console.log(err)
    });
    userModel.find({roles:['user']}, function (err, users) {
        if (err) {
            console.log(err);
        }
        if (!users) {
            console.log('unable to find anything');
        }
        else {
            for(var i = 0; i < users.length; i++) {
                users[i].interests = users[i].interests.join('|');
            }
            csv({data: users, fields: ['email','interests','joinedOn']}, function(err, csv) {
                if (err) console.log(err);
                fs.writeFile(file, csv, function(err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log('file saved');
                });
            });
        }
    });
};

exports.saveInvites = function(invited){
    var filename = 'file.csv';
    if(invited){
        filename = 'accepted.csv';
    } else{
        filename = 'denied.csv';
    }

    var file = './backups/'+filename;
    fs.ensureFile(file, function(err) {
        console.log(err)
    });

    inviteModel.find({invited:invited}, function (err, users) {
        if (err) {
            console.log(err);
        }
        if (!users) {
            console.log('unable to find anything');
        }
        else {
            for(var i = 0; i < users.length; i++) {
                users[i].genre= users[i].genre.join('|');
                users[i].music= users[i].music.join('|');
                users[i].social= users[i].social.join('|');
            }

            csv({data: users, fields: ['email','name', 'genre', 'music','social','location','website','invited','createdOn']}, function(err, csv) {
                if (err) console.log(err);
                fs.writeFile(file, csv, function(err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log('file saved');
                });
            });
        }
    });
};
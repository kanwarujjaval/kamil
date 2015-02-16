/**
 * Created by KanwarUjjaval on 16-02-2015.
 */
var passport = require('passport');
var inviteAuth = require('./invite');
require('./local')();
var inviteModel = require('../models/invite').inviteModel;
var userModel = require('../models/user').userModel;
/*
 For the Private Beta
 */
exports.createInvite = function (req, res, next) {
    inviteAuth.createInvite(req, res, next);
};

exports.createSubscribe = function (req, res, next) {
    inviteAuth.createSubscribe(req, res, next);
};

exports.sendToken = function (req, res, next) {
    inviteAuth.sendToken(req, res, next);
};

exports.denyToken = function (req, res, next) {
    inviteAuth.denyToken(req, res, next);
};

exports.loginAuthenticate = function (req, res, next) {
    var auth = passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            res.send(err);
        }
        if (!user) {
            res.render('msg',{
                msg:"Login failed, invalid username/password"
            });
        }
        else {
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }else {
                    res.redirect('/dashboard');
                }
            });
        }
    })
    auth(req, res, next);
};

exports.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.render('msg',{
            msg:"You need to login to view this resource"
        });
    }
};

exports.isAdmin = function (req, res, next) {
    userModel.findOne({ '_id': req.user._id }, function (err, user) {
        if (err) {
            res.send(err);
        }
        if (user) {
            if (user.roles.indexOf('admin9871') > -1) {
                return next();
            }
            else {
                res.render('msg',{
                    msg:"You need to be an admin to view this"
                });
            }
        }
        else {
            res.render('msg',{
                msg:"Unknown error, please login again"
            });
        }
    });
};
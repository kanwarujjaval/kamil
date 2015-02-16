/**
 * Created by KanwarUjjaval on 16-02-2015.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js').userModel;

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id).select({ password: 0, salt: 0 }).exec(function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOne({ 'email': email }).exec(function (err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false);
            if (!user.authenticate(password))
                return done(null, false);
            return done(null, user);
        });
    }));
};
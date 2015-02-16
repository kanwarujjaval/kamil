/**
 * Created by KanwarUjjaval on 15-02-2015.
 */
/**
 * Created by KanwarUjjaval on 06-02-2015.
 */
var express = require('express');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var methodover = require('method-override');
var session = require('express-session');
var bodyparser = require('body-parser');
var errorhandler = require('errorhandler');

var path = require("../config").paths;

module.exports = function (app,env) {

    if ('development' == env) {
        app.use(errorhandler({ dumpExceptions: true, showStack: true }));
        app.use(morgan('method=":method"  ":url" status=:status  time=":response-time ms"', immediate = true));
        app.disable('x-powered-by');
        app.enable('trust proxy');
        app.use(compression());
        app.use(cookieParser('PasswordKamil'));
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({
            extended: true
        }));
        app.use(session({
            proxy: true,
            key: 'session_cookie',
            secret: 'PasswordKamil',
            saveUninitialized: true,
            resave: true,
            cookie: {
                httpOnly: true,
                maxAge: 604800000 //7 days
            }
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.engine('html', require('ejs').renderFile);
        app.set('views', path.views);
        app.set('view engine', 'html');
        app.use(express.static(path.public, { maxAge: 0 }));

    }

    if ('production' == env) {
        app.use(morgan());
        app.enable('trust proxy');
        app.disable('x-powered-by');
        app.use(compression());
        app.use(cookieParser('PasswordKamil'));
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({
            extended: true
        }));
        app.use(session({
            proxy: true,
            key: 'session_cookie',
            secret: 'PasswordKamil',
            saveUninitialized: true,
            resave: true,
            cookie: {
                httpOnly: true,
                secure: true,
                maxAge: 604800000
            }
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        app.engine('html', require('ejs').renderFile);
        app.set('views', path.views);
        app.set('view engine', 'html');
        app.use(express.static(path.public, { maxAge: 604800000 }));
    }
};
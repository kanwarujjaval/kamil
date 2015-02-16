/**
 * Created by KanwarUjjaval on 15-02-2015.
 */
module.exports = function(){
    var app = require('express')();
    var server = require('http').createServer(app);
    var passport = require('passport');

    var env = process.env.NODE_ENV || 'development';
    var sv = require('../config').sv[env];

    require('./mongo')(sv.db);
    require('./express')(app,env);
    require('./routes')(app,passport,env);

    server.listen(sv.port,sv.ip,function(){
        console.log("Server Started on localhost %s:%s", sv.ip,sv.port);
    });
};
/**
 * Created by KanwarUjjaval on 05-02-2015.
 */
var path = require('path');
var argv = require('optimist').argv;

var ip = argv.ip;
var db = argv.db;

exports.sv = {
    development:{
        ip : "127.0.0.1",
        port : 80,
        db : "mongodb://localhost:27017/" + "kamil"
    },
    production:{
        ip: ip ,
        port : 8080,
        db : 'mongodb://' + db + ':80/kamil'
    }
};

exports.paths={
    root : path.normalize(__dirname),
    views : path.join(__dirname , "views"),
    public: path.join(__dirname , "public")
};
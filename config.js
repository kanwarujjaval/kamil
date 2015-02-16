/**
 * Created by KanwarUjjaval on 05-02-2015.
 */
var path = require('path');

exports.sv = {
    development:{
        ip : "127.0.0.1",
        port : 80,
        db : "mongodb://localhost:27017/" + "kamil"
    },
    production:{
        ip : process.env.OPENSHIFT_NODEJS_IP,
        port : process.env.OPENSHIFT_NODEJS_PORT,
        db : process.env.OPENSHIFT_MONGODB_DB_URL
    }
};

exports.paths={
    root : path.normalize(__dirname),
    views : path.join(__dirname , "views"),
    public: path.join(__dirname , "public")
};
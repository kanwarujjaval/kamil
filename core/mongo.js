/**
 * Created by KanwarUjjaval on 15-02-2015.
 */
var mongoose = require('mongoose');

var createDbConnection = function (uri) {
    mongoose.connect(uri);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Mongo DB connection error...'));
    db.once('open', function callback() {
        console.log("Connection to MongoDB database established at " + uri);
    });
};

module.exports = function (uri) {
    createDbConnection(uri);
};
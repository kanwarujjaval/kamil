/**
 * Created by KanwarUjjaval on 15-02-2015.
 */
var config = require("../config");
module.exports = function(app,passport,env){

    app.get('/', function(req,res){
        res.render('features-and-form');
    });

    app.get('/views/*', function (req, res) {
        res.render(config.paths.views + "/" + req.params[0]);
    });
};
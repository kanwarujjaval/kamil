/**
 * Created by KanwarUjjaval on 15-02-2015.
 */
var config = require("../config");
var auth = require("../auth/auth");

module.exports = function(app,passport,env){

    app.get('/', function(req,res){
        res.render('features-and-form');
    });

    app.get('/login', function(req,res){
        res.render('login');
    });

    app.post('/login',auth.loginAuthenticate);

    app.post('/invite',auth.createInvite);

    app.post('/subscribe',auth.createSubscribe);

    app.get('/dashboard', auth.isLoggedIn, function(req,res){
        res.render("dash");
    });

    app.get('/views/*', function (req, res) {
        res.render(config.paths.views + "/" + req.params[0]);
    });
};
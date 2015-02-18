/**
 * Created by KanwarUjjaval on 15-02-2015.
 */
var config = require("../config");
var auth = require("../auth/auth");
var api = require("./api");

module.exports = function(app){

    app.get('/', function(req,res){
        res.render('layout-fullscreen-subscription-form');
    });

    app.get('/login', function(req,res){
        res.render('login');
    });

    app.post('/login',auth.loginAuthenticate);

    app.post('/invite',auth.createInvite);

    app.post('/contact',api.contact);

    app.post('/subscribe',auth.createSubscribe);

    app.get('/invites',auth.isLoggedIn,api.getInvites);

    app.get('/subscribes',auth.isLoggedIn,api.getSubscribes);

    app.get('/token/create/:id',auth.isLoggedIn,auth.sendToken);

    app.get('/token/deny/:id',auth.isLoggedIn,auth.denyToken);

    app.get('/dashboard', auth.isLoggedIn, function(req,res){
        res.render("dash");
    });

    app.get('/logout', auth.isLoggedIn, function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/file/:name', function (req, res, next) {

        var options = {
            root:'./backups/',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };

        var fileName = req.params.name;
        res.sendFile(fileName, options, function (err) {
            if (err) {
                console.log(err);
                res.status(err.status).end();
            }
            else {
                console.log('Sent:', fileName);
            }
        });

    });


    app.get('/views/*', function (req, res) {
        res.render(config.paths.views + "/" + req.params[0]);
    });
};
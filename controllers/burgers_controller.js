/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

//Passport Authentication Setup
var passport = require('passport');
var util = require('util');
var session = require('express-session');
var GitHubStrategy = require('passport-github2').Strategy;
var partials = require('express-partials');
var app = express();


var GITHUB_CLIENT_ID = "2e871d66505d26de2723";
var GITHUB_CLIENT_SECRET = "0507cd2eba9b6c22c9b75341e47410c326d3b931";

//serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//
passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback'
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    return done(null, profile);
  });
}));

app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){});
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  });


//
router.get('/', function (req, res) {
  res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = { burgers: data };
    //console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/burgers/create', function (req, res) {
  burger.insertOne(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], function () {
    res.redirect('/burgers');
  });
});

router.put('/burgers/update/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;

  //console.log('devoured', condition);

  burger.updateOne({ devoured: req.body.devoured }, condition, function () {
    res.redirect('/burgers');
  });
});

module.exports = router;

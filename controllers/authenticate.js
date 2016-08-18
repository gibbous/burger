//RATVM authentication snippets

//DEPENDENCIES
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var express = require('express');

//Passport Authentication Setup
var passport = require('passport');
var util = require('util');
var session = require('express-session');
var GitHubStrategy = require('passport-github2').Strategy;
var partials = require('express-partials');
var app = express();
app.use(passport.initialize());
app.use(passport.session());


//these should use environment variables, not be visible in the final code (like the twitter keys for liri assignment)
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
  callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
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
    console.log("ta da!");
    res.redirect('/');
  });




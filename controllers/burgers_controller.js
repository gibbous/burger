/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var methodoverride = require('method-override');
var bodyparser = require('body-parser');
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

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

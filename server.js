//Require dependencies
var method-override = require('method-override');
var body-parser = require('body-parser');

//Require and set up express
var express = require('express');
var app = express();

//require mysql and set up connection
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'b00mst1ck',
    database: 'seinfeld'
});

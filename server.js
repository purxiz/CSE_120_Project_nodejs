// server.js

// BASE SETUP
// =============================================================================
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:28888/ybtc', {useMongoClient: true}); //connect to database





// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');    // allows us to process html requests
var cors       = require('cors');						// for managing which servers can access API


var corsOptions = {

	origin: 'http://107.170.255.130'

};

app.use(cors(corsOptions));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/users', require('../routes/users'));
app.use('/api/events', require('../routes/events'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

var express     = require('express');
var router      = express.Router();

var Event = require('../models/event');

router.use(function(req, res, next) {

	console.log('API request has been received');
	next();

});

router.route('/')

	.post(function(req, res){

		var event = new Event();

		event.creatorID = req.body.creatorID;
		event.title     = req.body.title;
		event.date      = req.body.date;
		event.location  = req.body.location;
		event.bodyText  = req.body.bodyText;

		event.save(function(err) {
			if(err){
				res.send(err);
				console.log(err);
				return;
			}

		});

	});






module.exports = router;

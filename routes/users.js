var express     = require('express');
var router      = express.Router();

var User        = require('../models/user');
var bcrypt      = require('bcrypt');					// for encrypting user passwords

var jwt       	= require('jsonwebtoken');


router.use(function(req, res, next) {

	console.log('API request has been received');
	next();

});

router.route('/authenticate')

	.post(function(req, res) {

		User.findOne( {username: req.body.username }, function(err, user){

			if(user) {
        //TODO implement tokens
				user.comparePassword(req.body.password, function(err, isMatch){

          if(err){
            res.send(err);
						return;
					}
					if(isMatch){
						jwt.sign({userID : user.id}, 'test-secret', function(err, token){
							if(err){
								res.send(err);
								return;
							}
							res.json({ token : token, username: '<a href="#settings" ><i class=\"fa fa-user\"></i> '+ user.username +'</a>'});
						});
					}
					else{
						res.json({ token : 'noMatch' });
					}
				});
			}

		});

	});



router.route('/')

	.post(function(req, res) { //create a new user

		var user = new User();

		user.firstname = req.body.firstname;
		user.lastname = req.body.lastname;
    user.username = req.body.username;
    user.password = req.body.password;
	  user.email = req.body.email;

		user.save(function(err) { //add user object to database

			if(err){
				res.send(err);
        return;
      }

			res.json( { message: 'user created' } );

		});

	})

	.get(function(req, res) { //get all users

		User.find(function(err, users) {

			if(err)
				res.send(err);

			res.status(200).json(users);

		});


	});

router.route('/:user_id')

	.get(function(req, res) {

		User.findById(req.params.user_id, function(err, user) {

			if (err){
				res.send(err);
        return;
      }

			res.json(user);

		});

	})

	.put(function(req, res) {


		User.findById(req.params.user_id, function(err, user) {

			if(err)
				res.send(err);

			if(req.body.firstname)
				user.firstname = req.body.firstname;
			if(req.body.lastname)
				user.firstname = req.body.lastname;
			if(req.body.password)
				user.password = req.body.password;
			if(req.body.email)
				user.email = req.body.email;

			user.save(function(err) {

				if(err)
					res.send(err);

				res.json({ message: 'user updated' });

			});

		});

	})

	.delete(function(req, res) {

		User.remove({
			_id: req.params.user_id
		}, function(err, user) {

			if(err)
				res.send(err);

			res.json({ message: 'user deleted' });


		});

	});

  module.exports = router;

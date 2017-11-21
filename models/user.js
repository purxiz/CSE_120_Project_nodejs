var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const beautifyUnique = require('mongoose-beautiful-unique-validation');

var bcrypt      = require('bcrypt');					// for encrypting user passwords

const saltRounds = 10; 											// for bcrypt

var userSchema = new Schema({
	firstname: { type: String, required: [true, 'Please supply a first name'] },
	lastname: { type: String },
	username: { type: String, required: [true, 'Please supply a username'], index: {unique: true} },
	email: { type: String, required: [true, 'Please supply an email'], index: {unique: true } },
	password: { type: String, required: [true, 'Please supply a password'], minlength: [12, 'Your password must be at least twelve characters'] }
});

userSchema.plugin(beautifyUnique);

userSchema.pre('save', function(next){

	var user = this;

	//only if the password is new or being modified
	if(!user.isModified('password')){

		return next();

	}

	//generate the hash
	bcrypt.hash(user.password, saltRounds, function(err, hash){

		if (err)
			return next(err);

		user.password = hash;
		next();

	});

});

userSchema.methods.comparePassword = function(candidatePassword, callback) {

    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {

        if (err)
					return callback(err);

        callback(null, isMatch);

    });

};

module.exports = mongoose.model('user', userSchema);

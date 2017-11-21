var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({

	creatorID : { type: String, required: true },
	title : { type: String, required: true },
	date : { type: Date, required: true },
	location : { type: String, required: true },
	bodyText : { type: String, required: true }

},

{ timestamps: true }

);

module.exports = mongoose.model('event', eventSchema);

var mongoose = require("mongoose");

var order = mongoose.Schema({

	ingredients: [String],
	name: String,
	complete: Boolean,
	cost: Number
	
}, {collection: "order"});

module.exports = mongoose.model("order", order);

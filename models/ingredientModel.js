var mongoose = require("mongoose");

var ingredient = mongoose.Schema({
	name: String,
	price: Number,
	stock: Boolean
}, {collection: "ingredient"});

module.exports = mongoose.model("ingredient", ingredient);

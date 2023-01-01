const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = new Schema({
	name: String,
	file: String,
	thumb: String,
	pic: String,
	category: String,
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("Movie", MovieSchema);

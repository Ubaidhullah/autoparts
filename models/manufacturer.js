const Joi = require("joi");
const mongoose = require("mongoose");

const manufacturerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
});

const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);

function validateManufacturer(manufacturer) {
	const schema = {
		manufacturerName: Joi.string().min(3).required(),
	};

	return Joi.validate(manufacturer, schema);
}

exports.manufacturerSchema = manufacturerSchema;
exports.Manufacturer = Manufacturer;
exports.validate = validateManufacturer;

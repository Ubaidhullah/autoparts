const Joi = require("joi");
const mongoose = require("mongoose");
const { manufacturerSchema } = require("./manufacturer");

const Category = mongoose.model(
	"Category",
	new mongoose.Schema({
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 5,
			maxlength: 255,
		},
		manufacturer: {
			type: manufacturerSchema,
			required: true,
		},
		numberInStock: {
			type: Number,
			required: true,
			min: 0,
			max: 255,
		},
		priceRate: {
			type: Number,
			required: true,
			min: 0,
			max: 255,
		},
	})
);

function validateManufacturer(manufacturer) {
	const schema = {
		title: Joi.string().min(5).max(50).required(),
		manufacturerId: Joi.string().required(),
		numberInStock: Joi.number().min(0).required(),
		priceRate: Joi.number().min(0).required(),
	};

	return Joi.validate(manufacturer, schema);
}

exports.Category = Category;
exports.validate = validateManufacturer;

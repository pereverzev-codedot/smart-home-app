const {Schema, model} = require('mongoose')
const sensorsSchema = new Schema(
	{
		datatype: String,
		hth: {
			temperature: {
				title: String,
				value: Number
			},
			humidity: {
				title: String,
				value: Number
			},
		},
		gth: {
			temperature: {
				title: String,
				value: Number
			},
			humidity: {
				title: String,
				value: Number
			},
		},
		oth: {
			temperature: {
				title: String,
				value: Number
			},
			humidity: {
				title: String,
				value: Number
			},
		},
		gas: {
			title: String,
			value: Number
		},
		water: {
			title: String,
			value: Number
		},
		lightr1: {
			title: String,
			value: Number
		},
		lightr2: {
			title: String,
			value: Number
		},
		humidity: {
			title: String,
			value: Number
		},
	},
	{versionKey: false}
)
const sensorsValues = model('sensors-values', sensorsSchema)

module.exports = sensorsValues

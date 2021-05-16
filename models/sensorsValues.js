const {Schema, model, Types} = require('mongoose')
const sensorsSchema = new Schema(
	{
		datatype: String,
		hth: {
			temperature: Number,
			humidity: Number
		},
		gth: {
			temperature: Number,
			humidity: Number
		},
		oth: {
			temperature: Number,
			humidity: Number
		},
		gas: Number,
		water: Number,
		lightr1: Number,
		lightr2: Number,
		humidity: Number
	},
	{versionKey: false}
)
const sensorsValues = model('sensors-values', sensorsSchema)

module.exports = sensorsValues

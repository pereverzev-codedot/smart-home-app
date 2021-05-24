const {Schema, model} = require('mongoose')
const graphSchema = new Schema(
	{
		date: Date,
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
		}
	},
	{versionKey: false}
)
const graphData = model('graph-data', graphSchema)

module.exports = graphData

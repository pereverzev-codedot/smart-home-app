const {Schema, model, Types} = require('mongoose')
const alertsSchema = new Schema(
	{
		dataType: String,
		type: String,
		message: String,
		date: Date
	},
	{versionKey: false}
)
const alerts = model('alerts', alertsSchema)

module.exports = alerts

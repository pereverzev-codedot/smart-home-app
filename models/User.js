const {Schema, model, Types} = require('mongoose')
const userSchema = new Schema(
	{
		nickname: {
			type: String,
			required: true,
			unique: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {type: String, required: true},
		settings: []
	},
	{versionKey: false}
)

module.exports = model('User', userSchema)

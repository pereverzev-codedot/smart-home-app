const {Schema, model, Types} = require('mongoose')
const userSchema = new Schema(
	{
		nickname: {
			type: String,
			required: true,
			unique: false
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {type: String, required: true},
		theme: {type: String, required: true}
	},
	{versionKey: false}
)

module.exports = model('user', userSchema)

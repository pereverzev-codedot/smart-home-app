const {Schema, model, Types} = require('mongoose')
const accessSchema = new Schema(
    {
        accessKey: String,
        active: Boolean
    },
    {versionKey: false}
)
const accessKeys = model('access-keys', accessSchema)

module.exports = accessKeys

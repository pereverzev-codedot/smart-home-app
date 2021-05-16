const {Schema, model, Types} = require('mongoose')
const changableSchema = new Schema(
	{
		dataType: String,
		firstFloorLight1: Number,
		firstFloorLight2: Number,
		firstFloorLight3: Number,
		firstFloorLight4: Number,
		secondFloorLight1: Number,
		secondFloorLight2: Number,
		secondFloorLight3: Number,
		secondFloorLight4: Number,
		garageLight1: Number,
		garageLight2: Number,
		outsideLight1: Number,
		outsideLight2: Number,
		waterPump: Number,
		waterFlap: Number,
		allLight: Number,
		isAutoLight1: Number,
		isAutoLight2: Number,
		autoLightOn1: Number,
		autoLightOn2: Number,
		autoLightOff1: Number,
		autoLightOff2: Number,
		isAutoPumping: Number,
		pumpingStartVal: Number,
		pumpingStopVal: Number,
		isAutoWatering: Number,
		wateringStartVal: Number,
		wateringStopVal: Number,
		gasAlertStartVal: Number,
		gasAlertStopVal: Number,
		isAlert: Number,
		isAutoAlert: Number
	},
	{versionKey: false}
)
const changableOptions = model('changable-options', changableSchema)

module.exports = changableOptions

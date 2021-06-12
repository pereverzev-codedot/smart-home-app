const {Schema, model} = require('mongoose')
const changableSchema = new Schema(
	{
		dataType: String,
		sections: [
			{
				firstFloorLight1: {value: Number, key: String, title: String},
				firstFloorLight2: {value: Number, key: String, title: String},
				firstFloorLight3: {value: Number, key: String, title: String},
				firstFloorLight4: {value: Number, key: String, title: String}
			},
			{
				secondFloorLight1: {value: Number, key: String, title: String},
				secondFloorLight2: {value: Number, key: String, title: String},
				secondFloorLight3: {value: Number, key: String, title: String},
				secondFloorLight4: {value: Number, key: String, title: String}
			},
			{
				garageLight1: {value: Number, key: String, title: String},
				garageLight2: {value: Number, key: String, title: String}
			},
			{
				outsideLight1: {value: Number, key: String, title: String},
				outsideLight2: {value: Number, key: String, title: String}
			},
			{
				waterPump: {value: Number, key: String, title: String},
				isAutoPumping: {value: Number, key: String, title: String},
				pumpingStartVal: {value: Number, key: String, title: String},
				pumpingStopVal: {value: Number, key: String, title: String}
			},
			{
				waterFlap: {value: Number, key: String, title: String},
				isAutoWatering: {value: Number, key: String, title: String},
				wateringStartVal: {value: Number, key: String, title: String},
				wateringStopVal: {value: Number, key: String, title: String}
			},
			{
				isAutoLight1: {value: Number, key: String, title: String},
				isAutoLight2: {value: Number, key: String, title: String},
				autoLightOn1: {value: Number, key: String, title: String},
				autoLightOn2: {value: Number, key: String, title: String},
				autoLightOff1: {value: Number, key: String, title: String},
				autoLightOff2: {value: Number, key: String, title: String}
			},
			{
				allLight: {value: Number, key: String, title: String}
			},
			{
				gasAlertStartVal: {value: Number, key: String, title: String},
				gasAlertStopVal: {value: Number, key: String, title: String},
				gasAlert: {value: Number, key: String, title: String},
				gasAlertDelay: {value: Number, key: String, title: String}
			},
			{
				waterAlertStartVal: {value: Number, key: String, title: String},
				waterAlertStopVal: {value: Number, key: String, title: String},
				waterAlert: {value: Number, key: String, title: String},
				waterAlertDelay: {value: Number, key: String, title: String}
			},
			{
				humidityAlertStartVal: {
					value: Number,
					key: String,
					title: String
				},
				humidityAlertStopVal: {
					value: Number,
					key: String,
					title: String
				},
				humidityAlert: {value: Number, key: String, title: String},
				humidityAlertDelay: {value: Number, key: String, title: String}
			},
			{
				setLightPort1: {value: String, key: String, title: String},
				setLightPort2: {value: String, key: String, title: String},
				setWateringPort: {value: String, key: String, title: String},
				setPumpingPort: {value: String, key: String, title: String}
			}
		]
	},
	{versionKey: false}
)
const changableOptions = model('changable-options', changableSchema)

module.exports = changableOptions

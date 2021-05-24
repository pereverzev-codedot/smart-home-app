const {Schema, model} = require('mongoose')
const hourWeatherSchema = new Schema(
	{
		twelveHourForecast: [
			{
				DateTime: Date,
				WeatherIcon: Number,
				IconPhrase: String,
				HasPrecipitation: Boolean,
				IsDaylight: Boolean,
				Temperature: {
					Value: Number,
					Unit: String
				},
				PrecipitationProbability: Number
			},
			{
				DateTime: Date,
				WeatherIcon: Number,
				IconPhrase: String,
				HasPrecipitation: Boolean,
				IsDaylight: Boolean,
				Temperature: {
					Value: Number,
					Unit: String
				},
				PrecipitationProbability: Number
			},
			{
				DateTime: Date,
				WeatherIcon: Number,
				IconPhrase: String,
				HasPrecipitation: Boolean,
				IsDaylight: Boolean,
				Temperature: {
					Value: Number,
					Unit: String
				},
				PrecipitationProbability: Number
			},
			{
				DateTime: Date,
				WeatherIcon: Number,
				IconPhrase: String,
				HasPrecipitation: Boolean,
				IsDaylight: Boolean,
				Temperature: {
					Value: Number,
					Unit: String
				},
				PrecipitationProbability: Number
			},
			{
				DateTime: Date,
				WeatherIcon: Number,
				IconPhrase: String,
				HasPrecipitation: Boolean,
				IsDaylight: Boolean,
				Temperature: {
					Value: Number,
					Unit: String
				},
				PrecipitationProbability: Number
			},
			{
				DateTime: Date,
				WeatherIcon: Number,
				IconPhrase: String,
				HasPrecipitation: Boolean,
				IsDaylight: Boolean,
				Temperature: {
					Value: Number,
					Unit: String
				},
				PrecipitationProbability: Number
			},
			{
				DateTime: Date,
				WeatherIcon: Number,
				IconPhrase: String,
				HasPrecipitation: Boolean,
				IsDaylight: Boolean,
				Temperature: {
					Value: Number,
					Unit: String
				},
				PrecipitationProbability: Number
			},
			{
				DateTime: Date,
				WeatherIcon: Number,
				IconPhrase: String,
				HasPrecipitation: Boolean,
				IsDaylight: Boolean,
				Temperature: {
					Value: Number,
					Unit: String
				},
				PrecipitationProbability: Number
			},
			{
				DateTime: Date,
				WeatherIcon: Number,
				IconPhrase: String,
				HasPrecipitation: Boolean,
				IsDaylight: Boolean,
				Temperature: {
					Value: Number,
					Unit: String
				},
				PrecipitationProbability: Number
			},
			{
				DateTime: Date,
				WeatherIcon: Number,
				IconPhrase: String,
				HasPrecipitation: Boolean,
				IsDaylight: Boolean,
				Temperature: {
					Value: Number,
					Unit: String
				},
				PrecipitationProbability: Number
			},
			{
				DateTime: Date,
				WeatherIcon: Number,
				IconPhrase: String,
				HasPrecipitation: Boolean,
				IsDaylight: Boolean,
				Temperature: {
					Value: Number,
					Unit: String
				},
				PrecipitationProbability: Number
			},
			{
				DateTime: Date,
				WeatherIcon: Number,
				IconPhrase: String,
				HasPrecipitation: Boolean,
				IsDaylight: Boolean,
				Temperature: {
					Value: Number,
					Unit: String
				},
				PrecipitationProbability: Number
			}
		]
	},
	{versionKey: false}
)
const hourWeatherData = model('weather-hour-data', hourWeatherSchema)

module.exports = hourWeatherData

const {Schema, model} = require('mongoose')
const weatherSchema = new Schema(
	{
		Headline: {
			EffectiveDate: Date,
			Text: String,
			Category: String,
			EndDate: Date
		},
		DailyForecasts: [
			{
				Date: Date,
				Temperature: {
					Minimum: {
						Value: Number,
						Unit: String
					},
					Maximum: {
						Value: Number,
						Unit: String
					}
				},
				Day: {
					Icon: Number,
					IconPhrase: String,
					HasPrecipitation: Boolean,
					PrecipitationType: String
				},
				Night: {
					Icon: Number,
					IconPhrase: String,
					HasPrecipitation: Boolean,
					PrecipitationType: String
				}
			},
			{
				Date: Date,
				Temperature: {
					Minimum: {
						Value: Number,
						Unit: String
					},
					Maximum: {
						Value: Number,
						Unit: String
					}
				},
				Day: {
					Icon: Number,
					IconPhrase: String,
					HasPrecipitation: Boolean,
					PrecipitationType: String
				},
				Night: {
					Icon: Number,
					IconPhrase: String,
					HasPrecipitation: Boolean,
					PrecipitationType: String
				}
			},
			{
				Date: Date,
				Temperature: {
					Minimum: {
						Value: Number,
						Unit: String
					},
					Maximum: {
						Value: Number,
						Unit: String
					}
				},
				Day: {
					Icon: Number,
					IconPhrase: String,
					HasPrecipitation: Boolean,
					PrecipitationType: String
				},
				Night: {
					Icon: Number,
					IconPhrase: String,
					HasPrecipitation: Boolean,
					PrecipitationType: String
				}
			},
			{
				Date: Date,
				Temperature: {
					Minimum: {
						Value: Number,
						Unit: String
					},
					Maximum: {
						Value: Number,
						Unit: String
					}
				},
				Day: {
					Icon: Number,
					IconPhrase: String,
					HasPrecipitation: Boolean,
					PrecipitationType: String
				},
				Night: {
					Icon: Number,
					IconPhrase: String,
					HasPrecipitation: Boolean,
					PrecipitationType: String
				}
			},
			{
				Date: Date,
				Temperature: {
					Minimum: {
						Value: Number,
						Unit: String
					},
					Maximum: {
						Value: Number,
						Unit: String
					}
				},
				Day: {
					Icon: Number,
					IconPhrase: String,
					HasPrecipitation: Boolean,
					PrecipitationType: String
				},
				Night: {
					Icon: Number,
					IconPhrase: String,
					HasPrecipitation: Boolean,
					PrecipitationType: String
				}
			}
		]
	},
	{versionKey: false}
)
const weatherData = model('weather-data', weatherSchema, 'weather-datas')

module.exports = weatherData

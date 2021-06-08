const weatherData = require('../models/weatherData')
const hourWeatherData = require('../models/hourWeatherData')
const mongoose = require('mongoose')
const axios = require('axios').default

const weatherApiKey = 'nSs4Lw6M1iFo2gXpLk1aYumsVqhCBJF2%20'
const weatherApiKeyNew = '0cFozJD0uq7BPMlQOexQxRm2uIKJhbKG'
const getWeatherTwelveHours = () => {
	let timerId = setTimeout(function tick() {
		const options = {
			method: 'GET',
			url: `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/31474?apikey=${weatherApiKey}&language=ru-ru&metric=true`
		}
		axios
			.request(options)
			.then((response) => {
				const transformedData = _transformHoursForecasts(response.data)
				const hourWeatherInform = new hourWeatherData(transformedData)
				const db = mongoose.connection.db
				db.collection('weather-hour-datas').deleteMany()
				hourWeatherInform.save(function (err) {
					console.log(err)
				})
			})
			.catch((error) => {
				console.error(error)
			})
		timerId = setTimeout(tick, 21600000)
	}, 10000)
}

const getWeatherFiveDays = async () => {
	let timerId = setTimeout(function tick() {
		const options = {
			method: 'GET',
			url: `http://dataservice.accuweather.com/forecasts/v1/daily/5day/31474?apikey=${weatherApiKey}&language=ru-ru&metric=true`
		}
		axios
			.request(options)
			.then((response) => {
				const transformedData = _transformWeatherData(response.data)
				const weatherInform = new weatherData(transformedData)
				const db = mongoose.connection.db
				db.collection('weather-datas').deleteMany()
				weatherInform.save(function (err) {
					console.log(err)
				})
			})
			.catch((error) => {
				console.error(error)
			})
		timerId = setTimeout(tick, 28800000)
	}, 10000)
}

const _transformHoursForecasts = (forecasts) => {
	return {
		twelveHourForecast: forecasts.map((el) => {
			return {
				DateTime: el.DateTime,
				WeatherIcon: el.WeatherIcon,
				IconPhrase: el.IconPhrase,
				HasPrecipitation: el.HasPrecipitation,
				IsDaylight: el.IsDaylight,
				Temperature: {
					Value: el.Temperature.Value,
					Unit: el.Temperature.Unit
				},
				PrecipitationProbability: el.PrecipitationProbability
			}
		})
	}
}

const _transformWeatherData = (data) => {
	return {
		Headline: {
			EffectiveDate: data.Headline.EffectiveDate,
			Text: data.Headline.Text,
			Category: data.Headline.Category,
			EndDate: data.Headline.EndDate
		},
		DailyForecasts: _transformDailyForecasts(data.DailyForecasts)
	}
}

const _transformDailyForecasts = (forecasts) => {
	return forecasts.map((el) => {
		return {
			Date: el.Date,
			Temperature: {
				Minimum: {
					Value: el.Temperature.Minimum.Value,
					Unit: el.Temperature.Minimum.Unit
				},
				Maximum: {
					Value: el.Temperature.Maximum.Value,
					Unit: el.Temperature.Maximum.Unit
				}
			},
			Day: {
				Icon: el.Day.Icon,
				IconPhrase: el.Day.IconPhrase,
				HasPrecipitation: el.Day.HasPrecipitation,
				PrecipitationType: el.Day.HasPrecipitation
			},
			Night: {
				Icon: el.Night.Icon,
				IconPhrase: el.Night.IconPhrase,
				HasPrecipitation: el.Night.HasPrecipitation,
				PrecipitationType: el.Night.PrecipitationType
			}
		}
	})
}

module.exports.getWeatherTwelveHours = getWeatherTwelveHours
module.exports.getWeatherFiveDays = getWeatherFiveDays

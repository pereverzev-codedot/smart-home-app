const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const changableOptions = require('./models/changableOptions')
const sensorsValues = require('./models/sensorsValues')
const alerts = require('./models/alerts')
const graphData = require('./models/graphData')
const weatherData = require('./models/weatherData')
const hourWeatherData = require('./models/hourWeatherData')

const axios = require('axios').default

const Shostname = '127.0.0.1'
const serverPort = config.get('port') || 8000
const app = express()
const weatherApiKey = 'nSs4Lw6M1iFo2gXpLk1aYumsVqhCBJF2%20'

const tempGraphData = {
	date: '',
	hth: [],
	gth: [],
	oth: []
}

let tempLine = null

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))

const start = async () => {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		})
		app.listen(serverPort, () =>
			console.log(`App started on port ${serverPort}`)
		)
	} catch (e) {
		console.log('Server error', e.message)
		process.exit(1)
	}
}

const port = new SerialPort('COM3', {
	baudRate: 9600,
	autoOpen: true
})

const parser = new Readline()
port.pipe(parser)

const dataToMongo = (line) => {
	if (line[0] === '{') {
		let data = JSON.parse(line)
		if (data.datatype === 'data') {
			tempLine = {hth: data.hth, gth: data.gth, oth: data.oth}
			sensorsValues.findOne({datatype: 'data'}, function (err, doc) {
				if (!doc) {
					let sensorsValue = new sensorsValues(data)
					sensorsValue.save(function (err) {})
				} else {
					sensorsValues.updateOne(
						{datatype: 'data'},
						data,
						function (err, result) {}
					)
				}
			})
		} else if (data.datatype === 'alert') {
			const date = new Date()
			data = {date, ...data}
			let alert = new alerts(data)
			alert.save(function (err) {})
		} else if (data.datatype === 'change') {
			changableOptions.findOne({datatype: 'change'}, function (err, doc) {
				changableOptions.updateOne(
					{datatype: 'change'},
					data,
					function (err, result) {}
				)
			})
		}
	}
}

const sendDataToSerial = (data) => {
	port.write(data + ';')
}

const dataForTestDays = {
	Headline: {
		EffectiveDate: '2021-05-25T22:00:00.000Z',
		Text: 'Четверг, поздняя ночь - Пятница, вечер: ливни и грозы',
		Category: 'thunderstorm',
		EndDate: '2021-05-26T10:00:00.000Z'
	},
	DailyForecasts: [
		{
			Date: '2021-05-24T04:00:00.000Z',
			Temperature: {
				Minimum: {
					Value: 5.4,
					Unit: 'C'
				},
				Maximum: {
					Value: 16.1,
					Unit: 'C'
				}
			},
			Day: {
				Icon: 4,
				IconPhrase: 'Переменная облачность',
				HasPrecipitation: false
			},
			Night: {
				Icon: 36,
				IconPhrase: 'Переменная облачность',
				HasPrecipitation: false
			}
		},
		{
			Date: '2021-05-25T04:00:00.000Z',
			Temperature: {
				Minimum: {
					Value: 13.1,
					Unit: 'C'
				},
				Maximum: {
					Value: 18.6,
					Unit: 'C'
				}
			},
			Day: {
				Icon: 4,
				IconPhrase: 'Переменная облачность',
				HasPrecipitation: false
			},
			Night: {
				Icon: 12,
				IconPhrase: 'Ливни',
				HasPrecipitation: true,
				PrecipitationType: 'Rain',
				PrecipitationIntensity: 'Light'
			}
		},
		{
			Date: '2021-05-26T04:00:00.000Z',
			Temperature: {
				Minimum: {
					Value: 7,
					Unit: 'C'
				},
				Maximum: {
					Value: 17.4,
					Unit: 'C'
				}
			},
			Day: {
				Icon: 15,
				IconPhrase: 'Грозы',
				HasPrecipitation: true,
				PrecipitationType: 'Rain',
				PrecipitationIntensity: 'Moderate'
			},
			Night: {
				Icon: 35,
				IconPhrase: 'Облачно с прояснениями',
				HasPrecipitation: false
			}
		},
		{
			Date: '2021-05-27T04:00:00.000Z',
			Temperature: {
				Minimum: {
					Value: 10.4,
					Unit: 'C'
				},
				Maximum: {
					Value: 20.7,
					Unit: 'C'
				}
			},
			Day: {
				Icon: 4,
				IconPhrase: 'Переменная облачность',
				HasPrecipitation: false,
				PrecipitationType: null
			},
			Night: {
				Icon: 38,
				IconPhrase: 'Преимущественно облачно',
				HasPrecipitation: true,
				PrecipitationType: 'Rain'
			}
		},
		{
			Date: '2021-05-28T04:00:00.000Z',
			Temperature: {
				Minimum: {
					Value: 10.7,
					Unit: 'C'
				},
				Maximum: {
					Value: 19.2,
					Unit: 'C'
				}
			},
			Day: {
				Icon: 16,
				IconPhrase: 'Преимущественно облачно, гроза',
				HasPrecipitation: true,
				PrecipitationType: 'Rain'
			},
			Night: {
				Icon: 12,
				IconPhrase: 'Ливни',
				HasPrecipitation: true,
				PrecipitationType: 'Rain'
			}
		}
	]
}

const dataForTestHours = [
	{
		DateTime: '2021-05-25T01:00:00+03:00',
		EpochDateTime: 1621893600,
		WeatherIcon: 35,
		IconPhrase: 'Облачно с прояснениями',
		HasPrecipitation: false,
		IsDaylight: false,
		Temperature: {
			Value: 7.6,
			Unit: 'C'
		},
		PrecipitationProbability: 0
	},
	{
		DateTime: '2021-05-25T02:00:00+03:00',
		EpochDateTime: 1621897200,
		WeatherIcon: 35,
		IconPhrase: 'Облачно с прояснениями',
		HasPrecipitation: false,
		IsDaylight: false,
		Temperature: {
			Value: 6.9,
			Unit: 'C'
		},
		PrecipitationProbability: 0
	},
	{
		DateTime: '2021-05-25T03:00:00+03:00',
		EpochDateTime: 1621900800,
		WeatherIcon: 35,
		IconPhrase: 'Облачно с прояснениями',
		HasPrecipitation: false,
		IsDaylight: false,
		Temperature: {
			Value: 6.7,
			Unit: 'C'
		},
		PrecipitationProbability: 0
	},
	{
		DateTime: '2021-05-25T04:00:00+03:00',
		EpochDateTime: 1621904400,
		WeatherIcon: 35,
		IconPhrase: 'Облачно с прояснениями',
		HasPrecipitation: false,
		IsDaylight: false,
		Temperature: {
			Value: 6.7,
			Unit: 'C'
		},
		PrecipitationProbability: 0
	},
	{
		DateTime: '2021-05-25T05:00:00+03:00',
		EpochDateTime: 1621908000,
		WeatherIcon: 3,
		IconPhrase: 'Небольшая облачность',
		HasPrecipitation: false,
		IsDaylight: true,
		Temperature: {
			Value: 6.7,
			Unit: 'C'
		},
		PrecipitationProbability: 0
	},
	{
		DateTime: '2021-05-25T06:00:00+03:00',
		EpochDateTime: 1621911600,
		WeatherIcon: 3,
		IconPhrase: 'Небольшая облачность',
		HasPrecipitation: false,
		IsDaylight: true,
		Temperature: {
			Value: 7.3,
			Unit: 'C'
		},
		PrecipitationProbability: 0
	},
	{
		DateTime: '2021-05-25T07:00:00+03:00',
		EpochDateTime: 1621915200,
		WeatherIcon: 3,
		IconPhrase: 'Небольшая облачность',
		HasPrecipitation: false,
		IsDaylight: true,
		Temperature: {
			Value: 9.2,
			Unit: 'C'
		},
		PrecipitationProbability: 0
	},
	{
		DateTime: '2021-05-25T08:00:00+03:00',
		EpochDateTime: 1621918800,
		WeatherIcon: 4,
		IconPhrase: 'Переменная облачность',
		HasPrecipitation: false,
		IsDaylight: true,
		Temperature: {
			Value: 11.5,
			Unit: 'C'
		},
		PrecipitationProbability: 0
	},
	{
		DateTime: '2021-05-25T09:00:00+03:00',
		EpochDateTime: 1621922400,
		WeatherIcon: 4,
		IconPhrase: 'Переменная облачность',
		HasPrecipitation: false,
		IsDaylight: true,
		Temperature: {
			Value: 13.7,
			Unit: 'C'
		},
		PrecipitationProbability: 0
	},
	{
		DateTime: '2021-05-25T10:00:00+03:00',
		EpochDateTime: 1621926000,
		WeatherIcon: 4,
		IconPhrase: 'Переменная облачность',
		HasPrecipitation: false,
		IsDaylight: true,
		Temperature: {
			Value: 15.1,
			Unit: 'C'
		},
		PrecipitationProbability: 0
	},
	{
		DateTime: '2021-05-25T11:00:00+03:00',
		EpochDateTime: 1621929600,
		WeatherIcon: 4,
		IconPhrase: 'Переменная облачность',
		HasPrecipitation: false,
		IsDaylight: true,
		Temperature: {
			Value: 16.2,
			Unit: 'C'
		},
		PrecipitationProbability: 0
	},
	{
		DateTime: '2021-05-25T12:00:00+03:00',
		EpochDateTime: 1621933200,
		WeatherIcon: 4,
		IconPhrase: 'Переменная облачность',
		HasPrecipitation: false,
		IsDaylight: true,
		Temperature: {
			Value: 17.2,
			Unit: 'C'
		},
		PrecipitationProbability: 0
	}
]

// parser.on('data', (line) => {
// 	dataToMongo(line)
// 	console.log(line)
// })

//const data1 =
//	'isAutoLight 1  :0 ; isAutoLight2  :  0; isAutoWatering:0;isAutoPumping:0;allLight :0 ;firstFloorLight1:1;firstFloorLight2:1;firstFloorLight3:1;firstFloorLight4:1;secondFloorLight1:1;secondFloorLight2:1;secondFloorLight3:1;secondFloorLight4:1;garageLight1:1;garageLight2:1;outsideLight1:1;outsideLight2:1;firstFloorLight1:0;firstFloorLight2:0;firstFloorLight3:0;firstFloorLight4:0;secondFloorLight1:0;secondFloorLight2 :0;seco ndFloorLi gh t3: 0;sec on dFlo orLi g ht4  :)))))))))))))0;g a rag e Lig h t 1:0 ;garageLight2:0;outsideLight1:0;outsideLight2:0;firstFloorLight1:1;firstFloorLight2:1;firstFloorLight3:1;firstFloorLight4:1;secondFloorLight1:1;secondFloorLight2:1;secondFloorLight3:1;secondFloorLight4:1;garageLight1:1;garageLight2:1;outsideLight1:1;outsideLight2:1;firstFloorLight1:0;firstFloorLight2:0;firstFloorLight3:0;firstFloorLight4:0;secondFloorLight1:0;secondFloorLight2:0;secondFloorLight3:0;secondFloorLight4:0;garageLight1:0;garageLight2:0;outsideLight1:0;outsideLight2:0;'

const sendData = (data) => {
	data = data.split(';')
	console.log(data)
	let idx = 0
	let timerId = setTimeout(function tick() {
		if (idx < data.length - 1) {
			sendDataToSerial(data[idx])
			idx++
			timerId = setTimeout(tick, 2000)
		}
	}, 2000)
}

const createGraphData = () => {
	let idx = 0
	meansureData = JSON.parse(JSON.stringify(tempGraphData))
	let timerId = setTimeout(function tick() {
		if (idx < 6) {
			meansureData.hth.push(tempLine.hth)
			meansureData.gth.push(tempLine.gth)
			meansureData.oth.push(tempLine.oth)
			idx++
		} else {
			const date = new Date()
			meansureData.date = date
			meansureData.hth = meansureData.hth.reduce(
				(prevVal = {temperature: 0, humidity: 0}, item, index) => {
					prevVal.temperature += item.temperature
					prevVal.humidity += item.humidity
					if (index === 5) {
						prevVal.temperature = prevVal.temperature / 6
						prevVal.humidity = prevVal.humidity / 6
					}
					return prevVal
				}
			)
			meansureData.gth = meansureData.gth.reduce(
				(prevVal = {temperature: 0, humidity: 0}, item, index) => {
					prevVal.temperature += item.temperature
					prevVal.humidity += item.humidity
					if (index === 5) {
						prevVal.temperature = prevVal.temperature / 6
						prevVal.humidity = prevVal.humidity / 6
					}
					return prevVal
				}
			)
			meansureData.oth = meansureData.oth.reduce(
				(prevVal = {temperature: 0, humidity: 0}, item, index) => {
					prevVal.temperature += item.temperature
					prevVal.humidity += item.humidity
					if (index === 5) {
						prevVal.temperature = prevVal.temperature / 6
						prevVal.humidity = prevVal.humidity / 6
					}
					return prevVal
				}
			)
			idx = 0
			let graphDataElement = new graphData(meansureData)
			graphDataElement.save(function (err) {})

			meansureData = JSON.parse(JSON.stringify(tempGraphData))
		}
		timerId = setTimeout(tick, 2000)
	}, 5000)
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
				console.log(transformedData)
				console.log(weatherInform)
				weatherInform.save(function (err) {
					console.log(err)
				})
			})
			.catch((error) => {
				console.error(error)
			})
		// timerId = setTimeout(tick, 72000)
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
				console.log(transformedData)
				const hourWeatherInform = new hourWeatherData(transformedData)
				console.log(hourWeatherInform)
				hourWeatherInform.save(function (err) {
					console.log(err)
				})
			})
			.catch((error) => {
				console.error(error)
			})
		// timerId = setTimeout(tick, 43200)
	}, 10000)
}

start()

// sendData(
// 	'isAutoPumping: false; isAutoWatering: false; waterFlap: true; waterPump: false;'
// )

// createGraphData()

// getWeatherFiveDays()
// getWeatherTwelveHours()

const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const changableOptions = require('./models/changableOptions')
const sensorsValues = require('./models/sensorsValues')
const alerts = require('./models/alerts')
const graphData = require('./models/graphData')
const sendData = require('./modules/sendData')
const dataToMongo = require('./modules/dataToMongo')
const weatherService = require('./modules/weatherService')
const serialPort = require('./modules/serialPort')

const Shostname = '127.0.0.1'
const serverPort = config.get('port') || 8000
const app = express()

const tempGraphData = {
	date: '',
	hth: [],
	gth: [],
	oth: []
}

let tempLine = null

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))

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

		 // weatherService.getWeatherTwelveHours()
		 // weatherService.getWeatherFiveDays()
	} catch (e) {
		console.log('Server error', e.message)
		process.exit(1)
	}
}

serialPort.parser.on('data', (line) => {
	dataToMongo(line)
	console.log(line)
})

//const data1 =
//	'isAutoLight 1  :0 ; isAutoLight2  :  0; isAutoWatering:0;isAutoPumping:0;allLight :0 ;firstFloorLight1:1;firstFloorLight2:1;firstFloorLight3:1;firstFloorLight4:1;secondFloorLight1:1;secondFloorLight2:1;secondFloorLight3:1;secondFloorLight4:1;garageLight1:1;garageLight2:1;outsideLight1:1;outsideLight2:1;firstFloorLight1:0;firstFloorLight2:0;firstFloorLight3:0;firstFloorLight4:0;secondFloorLight1:0;secondFloorLight2 :0;seco ndFloorLi gh t3: 0;sec on dFlo orLi g ht4  :)))))))))))))0;g a rag e Lig h t 1:0 ;garageLight2:0;outsideLight1:0;outsideLight2:0;firstFloorLight1:1;firstFloorLight2:1;firstFloorLight3:1;firstFloorLight4:1;secondFloorLight1:1;secondFloorLight2:1;secondFloorLight3:1;secondFloorLight4:1;garageLight1:1;garageLight2:1;outsideLight1:1;outsideLight2:1;firstFloorLight1:0;firstFloorLight2:0;firstFloorLight3:0;firstFloorLight4:0;secondFloorLight1:0;secondFloorLight2:0;secondFloorLight3:0;secondFloorLight4:0;garageLight1:0;garageLight2:0;outsideLight1:0;outsideLight2:0;'

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

start()

// sendData(
// 	'isAutoLight1:0; isAutoLight2:0; isAutoWatering:0;isAutoPumping:0;allLight :0 ;firstFloorLight1:1;firstFloorLight2:1;firstFloorLight3:1;firstFloorLight4:1;secondFloorLight1:1;secondFloorLight2:1;secondFloorLight3:1;secondFloorLight4:1;garageLight1:1;garageLight2:1;outsideLight1:1;outsideLight2:1;firstFloorLight1:0;firstFloorLight2:0;firstFloorLight3:0;firstFloorLight4:0;secondFloorLight1:0;secondFloorLight2 :0;seco ndFloorLi gh t3: 0;sec on dFlo orLi g ht4  :)))))))))))))0;g a rag e Lig h t 1:0 ;garageLight2:0;outsideLight1:0;outsideLight2:0;firstFloorLight1:1;firstFloorLight2:1;firstFloorLight3:1;firstFloorLight4:1;secondFloorLight1:1;secondFloorLight2:1;secondFloorLight3:1;secondFloorLight4:1;garageLight1:1;garageLight2:1;outsideLight1:1;outsideLight2:1;firstFloorLight1:0;firstFloorLight2:0;firstFloorLight3:0;firstFloorLight4:0;secondFloorLight1:0;secondFloorLight2:0;secondFloorLight3:0;secondFloorLight4:0;garageLight1:0;garageLight2:0;outsideLight1:0;outsideLight2:0;'
// )

// createGraphData()

// getWeatherFiveDays()
// getWeatherTwelveHours()

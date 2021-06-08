const Readline = require('@serialport/parser-readline')
const serialPort = require('../modules/serialPort')

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

const sendDataToSerial = (data) => {
	serialPort.port.write(data + ';')
	console.log(`sended ${data}`)
}

module.exports = sendData

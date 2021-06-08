const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('COM3', {
	baudRate: 9600,
	autoOpen: true
})

const parser = new Readline()
port.pipe(parser)

module.exports.port = port
module.exports.parser = parser

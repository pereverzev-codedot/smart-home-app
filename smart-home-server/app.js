const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const Shostname = '127.0.0.1';
const serverPort = config.get('port') || 8000;
const app = express();

let data = `{"hth":{"temperature": 23.90, "humidity": 24.00}, "gth":{"temperature": 23.90, "humidity": 24.00}, "oth":{"temperature": 23.50, "humidity": 24.00}, "gas": 0.00, "lightr1": 46.67, "water": 0, "humidity": 0}`;

app.use(
	'/api/auth',
	require('./routes/auth.routes')
);

const start = async () => {
	try {
		await mongoose.connect(
			config.get('mongoUri'),
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
			}
		);
		app.listen(serverPort, () =>
			console.log(
				`App started on port ${serverPort}`
			)
		);
	} catch (e) {
		console.log('Server error', e.message);
		process.exit(1);
	}
};

const port = new SerialPort('COM3', {
	baudRate: 9600,
	autoOpen: true,
});

const parser = new Readline();
port.pipe(parser);

const dataToMongo = (line) => {
	data = line;
	console.log(data);
};

const sendDataToSerial = (data) => {
	return port.write(data);
};
parser.on('data', (line) => {
	dataToMongo(line);
});

setInterval(() => sendDataToSerial('null'), 2500);

// const server = http.createServer((req, res) => {
// 	res.statusCode = 200;
// 	res.setHeader(
// 		'Content-Type',
// 		'application/json'
// 	);
// 	res.end(data);
// });

// server.listen(Sport, Shostname, () => {
// 	console.log(
// 		`Server running at http://${Shostname}:${Sport}/`
// 	);
// });

start();

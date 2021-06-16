const changableOptions = require('../models/changableOptions')
const sensorsValues = require('../models/sensorsValues')
const alerts = require('../models/alerts')
const co = require('../modules/syncData')
const mongoose = require('mongoose')

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
			co.coToMongo(data)
		}
	}
}

module.exports = dataToMongo

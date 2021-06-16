const changableOptions = require('../models/changableOptions')
const mongoose = require('mongoose')
const sendData = require('../modules/sendData')

let coData

const updateCOData = async () => {
	_transformCOData = (data) => {
		data = data.map((el) => {
			const values = Object.values(el)
			return `${values[1]} : ${values[0]};`
		})
		return data.join('')
	}

	coData = await changableOptions.find()
	let coDataTemp = await coData[0]._doc
	await delete coDataTemp._id
	await delete coDataTemp.datatype
	coDataTemp = await Object.values(coDataTemp)
	coDataTemp = await _transformCOData(coDataTemp)
	sendData(coDataTemp)
}

const coToMongo = (data) => {
	// console.log(coData[0]._doc[Object.keys(data)[1]])
	// console.log(data)

	if (coData[0]._doc[Object.keys(data)[1]] !== undefined) {
		coData[0]._doc[Object.keys(data)[1]].value =
			Object.values(data)[1].value
	}
	//console.log(coData)

	changableOptions.updateOne(
		{datatype: 'change'},
		coData[0]._doc,
		function (err, result) {}
	)
}

module.exports.coData = coData
module.exports.updateCOData = updateCOData
module.exports.coToMongo = coToMongo

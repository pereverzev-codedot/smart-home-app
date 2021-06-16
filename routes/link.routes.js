const {Router} = require('express')
const config = require('config')

const alerts = require('../models/alerts')
const changableOptions = require('../models/changableOptions')
const graphData = require('../models/graphData')
const weatherData = require('../models/weatherData')
const hourWeatherData = require('../models/hourWeatherData')
const sensorsValues = require('../models/sensorsValues')
const userModel = require('../models/User')
const sendData = require('../modules/sendData')
const accessKeys = require('../models/accessKeys')
const router = Router()

router.post('/change', async (req, res) => {
	try {
		const json = req.body
		sendData(`${json.value}:${json.key};`)
		setTimeout(() => {
			res.json({active: true})
		}, 3500)
	} catch (e) {
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова'
		})
	}
})

router.get('/access-keys/get', async (req, res) =>{
	try {
		const accessK = await accessKeys.find({})
		res.json(accessK)
	}
	catch (e) {
		res.status(500).json({message: e.message})
	}
})

router.get('/access-keys/add', async (req, res) =>{
	const rndKey = () => {
		const letters = 'abcdefghijklmnopqrstuvwxyz0123456789'
		let word = ''

		for (let i = 0; i < 15; i++) {
			const letter = letters.charAt(Math.floor(Math.random() * letters.length))
			switch(Math.floor(Math.random() * 3)){
				case 0: {word += letter; break}
				case 1: {word += letter.toUpperCase(); break}
				case 2: {word += letter; break}
			}
		}

		return word
	}
	try{
		const accessKey = new accessKeys({accessKey: rndKey(), active: true})
		await accessKey.save()
		res.json({
			message: 'Новый ключ создан'
		})
	}
	catch (e) {
		res.status(500).json({
			message: e.message
		})
	}
})

router.get('/weather/hour', async (req, res) => {
	try {
		const weatherHours = await hourWeatherData.find()
		res.json(weatherHours)
	} catch (e) {
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова'
		})
	}
})

router.get('/weather/daily', async (req, res) => {
	try {
		const weatherDaily = await weatherData.find()
		res.json(weatherDaily)
	} catch (e) {
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова'
		})
	}
})

router.get('/warnings', async (req, res) => {
	try {
		const warnings = await alerts.find()
		res.json(warnings)
	} catch (e) {
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова'
		})
	}
})

router.get('/sensor/values', async (req, res) => {
	try {
		const values = await sensorsValues.find()
		res.json(values)
	} catch (e) {
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова'
		})
	}
})

router.get('/sensor/changable', async (req, res) => {
	try {
		const changable = await changableOptions.find()
		res.json(changable)
	} catch (e) {
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова'
		})
	}
})

router.get('/graphs', async (req, res) => {
	try {
		const graphsData = await graphData.find()
		res.json(graphsData)
	} catch (e) {
		res.status(500).json({
			message: 'Что-то пошло не так, попробуйте снова'
		})
	}
})

router.post('/user', async (req, res) => {
	try {
		const {email, theme} = req.body
		const userData = await userModel.updateOne({email}, {theme})
		if (userData) {
			return res.json(userData)
		}
	} catch (e) {
		return res.status(500).json({
			message: e.message
		})
	}
})

module.exports = router

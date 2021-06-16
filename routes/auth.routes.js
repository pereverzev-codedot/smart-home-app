const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const accessKeys = require('../models/accessKeys')
const router = Router()

// /api/auth/register
router.post(
	'/register',
	[
		check('email', 'Некоректный email').isEmail(),
		check('password', 'Минимальная длинна пароля 6 символов').isLength({
			min: 6
		})
	],
	async (req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Невалидные данные при регистрации'
			})
		}
		try {
			const {nickname, email, password, accessKey} = req.body
			const available = await accessKeys.findOne({accessKey})
			const candidate = await User.findOne({
				email
			})
			if(!available){
				res.status(400).json({
					message: 'Ключ доступа не существует'
				})
			}
			if(!available.active){
				res.status(400).json({
					message: 'Ключ доступа был задействован'
				})
			} else {
				if (candidate) {
					res.status(400).json({
						message: 'Такой пользователь существует'
					})
				} else {
					const hashedPassword = await bcrypt.hash(password, 12)

					await accessKeys.updateOne({accessKey}, {"active": false})

					const user = new User({
						nickname,
						email,
						password: hashedPassword,
						theme: "light"
					}
					)
					await user.save()
					res.status(201).json({
						message: 'Пользователь создан'
					})
				}
			}


		} catch (e) {
			res.status(500).json({
				message: e.message
			})
		}
	}
)
router.post(
	'/change-pass',
	[
		check('password', 'Минимальная длинна пароля 6 символов').isLength({
			min: 6
		})
	],
	async (req, res) => {
		try {
			const {email, password, passwordNew} = req.body
			const user = await User.findOne({
				email
			})
			let isMatch = await bcrypt.compare(password, user.password)
			if (!isMatch) {
				return res.status(400).json({
					message: 'Пароль указан неверно, попробуйте снова'
				})
			} else {
				isMatch = password === passwordNew ? true : false
				if (isMatch) {
					return res.status(400).json({
						message: 'Новый пароль не должен совпадать со старым'
					})
				} else {
					const hashedPassword = await bcrypt.hash(passwordNew, 12)
					await User.updateOne({email}, {password: hashedPassword})
					return res
						.status(400)
						.json({message: 'Пароль успешно изменён'})
				}
			}
		} catch (e) {
			return res.status(500).json({
				message: e.message
			})
		}
	}
)
// /api/auth/login
router.post(
	'/login',
	[
		check('email', 'Введите корректный email').isEmail(),
		check('password', 'Введите пароль').exists()
	],
	async (req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Невалидные данные при входе в систему'
			})
		}
		try {
			const {email, password} = req.body
			const user = await User.findOne({
				email
			})
			if (!user) {
				return res.status(404).json({
					message: 'Пользователь не найден'
				})
			}
			const isMatch = await bcrypt.compare(password, user.password)
			if (!isMatch) {
				return res.status(400).json({
					message: 'Неверный пароль, попробуйте снова'
				})
			}
			const token = jwt.sign(
				{
					userID: user.id
				},
				config.get('jwtSecret'),
				{expiresIn: '1h'}
			)
			res.json({
				token,
				userId: user.id,
				nickname: user.nickname,
				email: user.email,
				theme: user.theme
			})
		} catch (e) {
			res.status(500).json({
				message: 'Что-то пошло не так, попробуйте снова'
			})
		}
	}
)

module.exports = router

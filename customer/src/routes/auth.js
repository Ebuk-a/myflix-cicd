const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const { register, login, getUserHistory } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/history', auth, getUserHistory)

module.exports = router

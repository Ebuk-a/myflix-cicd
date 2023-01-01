const express = require('express')
const router = express.Router()

const { getAllMovies, createMovie, getMovie } = require('../controllers/movies')

router.route('/').get(getAllMovies).post(createMovie)
router.route('/get-movie').get(getMovie)

module.exports = router

const mongoose = require('mongoose')
const Movie = require('../models/Movie')
const amqp = require('amqplib')

let connection, channel

const connect = async () => {
  const amqpServer = 'amqp://rabbitmq:5672'
  connection = await amqp.connect(amqpServer)
  channel = await connection.createChannel()
  await channel.assertQueue('MOVIES')
}

connect()

const getAllMovies = async (req, res) => {
  // const movies = await Movie.find({}).sort('-name -price')
  const movies = await Movie.find({})
  const nbHits = movies.length
  res.status(200).json({ movies, nbHits })
}

const getMovie = async (req, res) => {
  const { id } = req.query
  const { userId } = req.user

  const movie = await Movie.findById(id)
  const data = { userId, movie }

  channel.sendToQueue('CUSTOMER', Buffer.from(JSON.stringify(data)))
  res.status(200).json({ movie })
}

const createMovie = async (req, res) => {
  const movie = await Movie.create(req.body);
	res.status(201).json({ movie });
}

module.exports = {
  getAllMovies,
  createMovie,
  getMovie
}

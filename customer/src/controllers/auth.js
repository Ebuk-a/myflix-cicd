const Customer = require('../models/Customer')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const amqp = require('amqplib')
let connection, channel

const connect = async () => {
  const amqpServer = 'amqp://rabbitmq:5672'
  connection = await amqp.connect(amqpServer)
  channel = await connection.createChannel()
  await channel.assertQueue('CUSTOMER')
}

connect().then(async () => {
  channel.consume("CUSTOMER", async (data) => {
    const { userId, movie } = JSON.parse(data.content)

    // const { history } = await Customer.findById(userId)
    let user = await Customer.findById(userId)
    const isPresent = user.history.find(m => m._id === movie._id)

    if (!isPresent) {
      const history = [...user.history, movie]
      await Customer.findOneAndUpdate({ _id: userId }, { history: history })
    }
    channel.ack(data)
  })
})

const register = async (req, res) => {
  const user = await Customer.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await Customer.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

const getUserHistory = async (req, res) => {
  const { userId } = req.user
  const user = await Customer.findById(userId)
  const history = user.history

  const nbHits = history.length
  res.status(StatusCodes.OK).json({ history, nbHits })
}

module.exports = {
  register,
  login,
  getUserHistory
}

require('dotenv').config()
require('express-async-errors');

const express = require('express')
const cors  = require('cors');
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/auth')

const app = express()

const moviesRouter = require('./routes/movies')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json())
app.use(cors());

app.use('/', authenticateUser, moviesRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

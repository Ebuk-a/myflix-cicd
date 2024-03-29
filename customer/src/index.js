require('dotenv').config()
require('express-async-errors');

const express = require('express')
const cors  = require('cors');
const connectDB = require('./db/connect')

const app = express()

const authRouter = require('./routes/auth')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
app.use(cors());

app.use('/', authRouter)

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

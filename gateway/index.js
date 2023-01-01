const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy')
const { CUSTOMER_API_URL, MOVIES_API_URL } = require('./URLs')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/customer', proxy(CUSTOMER_API_URL))
app.use('/api/v1/movies', proxy(MOVIES_API_URL))

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log('Gateway listening on port 4000')
})
const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy')

const { getPublicIP, getCustomerServices, getMovieServices } = require('./middleware/ip')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/customer', getPublicIP, proxy(getCustomerServices))
app.use('/api/v1/movies', getPublicIP, proxy(getMovieServices))

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log('Gateway listening on port 4000')
})

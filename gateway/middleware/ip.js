let CUSTOMER_API_URL, MOVIES_API_URL

const getPublicIP = async (req, res, next) => {
  const host = req.headers.host.split(':')[0]
  CUSTOMER_API_URL= `http://${host}:4001`
  MOVIES_API_URL= `http://${host}:4002`

  next()
}

const getCustomerServices = () => CUSTOMER_API_URL
const getMovieServices = () => MOVIES_API_URL

module.exports = { getPublicIP, getCustomerServices, getMovieServices }
const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
		useUnifiedTopology: true,
		// useFindAndModify: false,
		// useCreateIndex: true,
		dbName: process.env.DB_NAME
  })
}

module.exports = connectDB

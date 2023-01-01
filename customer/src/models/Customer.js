const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide name']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide password']
  },
  history: [],
  createdAt: {
		type: Date,
		default: Date.now()
	}
})

CustomerSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

CustomerSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}

CustomerSchema.methods.comparePassword = async function (textPassword) {
  const isMatch = await bcrypt.compare(textPassword, this.password)
  return isMatch
}

module.exports = model('Customer', CustomerSchema)
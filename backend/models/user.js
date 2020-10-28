const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
})

module.exports = mongoose.model('User', userSchema);

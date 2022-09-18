const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: {
    type: String
  },
  userName: {
    type: String
  },
  date: {
    type: String
  }
});

module.exports = Message = mongoose.model('messages', MessageSchema)
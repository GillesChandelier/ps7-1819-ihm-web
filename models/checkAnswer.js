const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const AnswerCheckSchema = new Schema({
  check: {type: String, required: true},
  answer: {type: String, required:true}
});

module.exports = mongoose.model('AnswerCheck', AnswerCheckSchema);

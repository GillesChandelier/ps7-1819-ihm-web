const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const AnswerSchema = new Schema({
  question: {type: ObjectId, required: true},
  text: {type: String, required:true}
});

module.exports = mongoose.model('Answer', AnswerSchema);

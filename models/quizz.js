const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const QuizzSchema = new Schema({
  _id: {type: ObjectId, require: true},
  name: {type: String, require: true},
  thematic: {type: String, require:true},
  room : {type: String, require:true},
  questions: [{type: ObjectId, ref: 'Question'}],
  album : [{type: ObjectId, ref: 'Picture'}]
});

module.exports = mongoose.model('Quizz', QuizzSchema);

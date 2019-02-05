const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
      ObjectId = Schema.Types.ObjectId;

const QuestionSchema = new Schema({
  quizz: {type: ObjectId, ref: 'Quizz'},
  thematic: {type: String, required:true},
  text: {type: String, required:true},
  answers: [{type: ObjectId, ref: 'Answer'}],
  goodAnswer: {type: ObjectId, ref: 'Answer'}

});

module.exports = mongoose.model('Question', QuestionSchema);

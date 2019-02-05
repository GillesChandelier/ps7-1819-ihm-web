const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const StatSchema = new Schema({
  _id: {type: ObjectId, require: true},
  group: {type: ObjectId, ref: 'Group'},
  quizz: {type: ObjectId, ref: 'Quizz'},
  participationPercent : {type: Number, require: true},
  rightAnswerPercent : {type: Number, require: true}
});

module.exports = mongoose.model('Stat', StatSchema);

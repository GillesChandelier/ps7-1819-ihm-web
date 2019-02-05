const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const PictureSchema = new Schema({
  _id: {type: ObjectId, require: true},
  path: {type: String, require: true},
  tags: [{type: String}],
  like: {type: Number, required: true},
  interesting: {type: Number, required: true},
  fun: {type: Number, required: true},
  quizz: {type: ObjectId, ref: 'Quizz'},
  group : {type: ObjectId, ref: 'Group', require: true}
});

module.exports = mongoose.model('Picture', PictureSchema);

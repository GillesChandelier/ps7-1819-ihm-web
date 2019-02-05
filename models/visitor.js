const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const VisitorSchema = new Schema({
  group: {type: ObjectId, ref: 'Group'},
  name: {type: String, require: true},
  age: {type: Number, require: true},
  gender: {type: String, require: true}
});

module.exports = mongoose.model('Visitor', VisitorSchema);

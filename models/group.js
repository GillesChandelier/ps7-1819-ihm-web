const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

const GroupSchema = new Schema({
  _id: {type: ObjectId, require: true},
  type: {type: String, require: true},
  visitors: [{type: ObjectId, ref: 'Visitor'}],
  album : [{type: ObjectId, ref: 'Picture'}]
});

module.exports = mongoose.model('Group', GroupSchema);

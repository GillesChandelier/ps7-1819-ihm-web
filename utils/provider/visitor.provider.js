const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Visitor = require('../../models/visitor');

/**
 * Utility class between the controller and model. Manage the Visitor data.
 */
class VisitorProvider {

  insertVisitor(data, group, callback) {
    let visitor = new Visitor();
    visitor.name = data.name;
    visitor.age = data.age;
    visitor.gender = data.gender;
    visitor.group = group._id;
    visitor.save((err, visitor) => {
      if (err) {
        return callback(err, null);
      } else {
        callback(null, visitor);
      }
    })
  }

  insertMultipleVisitor(data, group, callback) {
    let visitors = [];
    data.forEach(function (element) {
      let visitor = new Visitor();
      visitor.name = data.name;
      visitor.age = data.age;
      visitor.gender = data.gender;
      visitor.group = group._id;
      visitor.save((err, visitor) => {
        if (err) {
          console.log("*****insertMultipleVisitors error" + err);
          return callback(err, null);
        } else {
          visitors.push(visitor);
          if (visitors.length === data.length) {
            callback(null, visitors);
          }
        }
      })
    })
  }
}


module.exports = new VisitorProvider();

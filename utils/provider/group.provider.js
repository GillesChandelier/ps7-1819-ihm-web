const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Group = require('../../models/group'),
  visitorProvider = require('./visitor.provider');

/**
 * Utility class between the controller and model managing the Group data
 */
class GroupProvider {

  getGroups(callback) {
    console.log("*** GroupProvider.getGroups");

    Group.find({}).exec((err, groups) => {
      if (err) {
        console.log(`*** GroupProvider.getGroups error: ${err}`);
        return callback(err);
      }
      callback(null, groups);
    });
  }

  getGroupById(id, callback) {
    console.log("*** GroupProvider.getGroupById");

    Group.findById(id).exec((err, group) => {
      if (err) {
        console.log(`*** GroupProvider.getGroupById error: ${err}`);
        return callback(err);
      }
      callback(null, group);
    });
  }

  insertGroup(data, callback) {
    let group = new Group();
    group._id = new mongoose.Types.ObjectId();
    group.type = data.type;
    group.save((err, group) => {
      if (err) {
        return callback(err, null);
      } else {
        visitorProvider.insertMultipleVisitor(data.visitor, group, (err, visitors) => {
          if (err) {
            return callback(err, null);
          } else {
            group.visitors = visitors;
            group.save((err, group) => {
              if (err) {
                return callback(err, null);
              } else {
                return callback(null, group);
              }
            });
          }
        })
      }
    })
  }

  insertMultiGroup(data, callback) {
    let groups = [];
    var self = this;
    data.forEach(function (element) {
      let group = new Group();
      group._id = new mongoose.Types.ObjectId();
      group.type = element.type;
      group.save((err, group) => {
        if (err) {
          return callback(err, null);
        } else {
          visitorProvider.insertMultipleVisitor(element.visitors, group, (err, visitors) => {
            if (err) {
              console.log("*****insertGroupProvider" + err);
              return callback(err, null);
            } else {
              group.visitors = visitors;
              group.save((err, group) => {
                if (err) {
                  return callback(err, null);
                } else {
                  groups.push(group);
                  if (groups.length === data.length) {
                    return callback(null, groups);
                  }
                }
              });
            }
          })
        }
      })
    })
  }

}


module.exports = new GroupProvider();

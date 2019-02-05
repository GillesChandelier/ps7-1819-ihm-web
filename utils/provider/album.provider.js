const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Picture = require('../../models/picture'),
      groupProvider = require('./group.provider'),
      quizzProvider = require('./quizz.provider');

/**
 * Utility class between the controller and model. Manage the Album/Picture data.
 */
class AlbumProvider {
  getPictures(callback) {
    console.log("*** AlbumProvider.getPictures");

    Picture.find({}).exec((err, pictures) => {
      if (err) {
        console.log(`*** AlbumProvider.getPictures error: ${err}`);
        return callback(err);
      }
      callback(null, pictures);
    });
  }

  getPictureById(id, callback) {
    console.log("*** AlbumProvider.getPictureById");

    Picture.findById(id).exec((err, picture) => {
      if (err) {
        console.log(`*** AlbumProvider.getPicturesById error: ${err}`);
        return callback(err);
      }
      callback(null, picture);
    });
  }

  getPicturesByGroupId(id, callback) {
    console.log("*** AlbumProvider.getPicturesByGroupId");

    Picture.find({ "group" : id }).exec((err, pictures) => {
      if (err) {
        console.log(`*** AlbumProvider.getPicturesByGroupId error: ${err}`);
        return callback(err);
      }
      callback(null, pictures);
    });
  }

  addLike(id, callback) {
    console.log("*** AlbumProvider.addLike");

    Picture.findById(id).exec((err, picture) => {
      if (err) {
        console.log(`*** AlbumProvider.addLike error: ${err}`);
        return callback(err);
      }
      picture.like += 1;
      picture.save((err, picture) => {
        callback(null, picture);
      })
    });
  }

  addFun(id, callback) {
    console.log("*** AlbumProvider.addFun");

    Picture.findById(id).exec((err, picture) => {
      if (err) {
        console.log(`*** AlbumProvider.addFun error: ${err}`);
        return callback(err);
      }
      picture.fun += 1;
      picture.save((err, picture) => {
        callback(null, picture);
      })
    });
  }

  addInterest(id, callback) {
    console.log("*** AlbumProvider.addInterest");

    Picture.findById(id).exec((err, picture) => {
      if (err) {
        console.log(`*** AlbumProvider.addInterest error: ${err}`);
        return callback(err);
      }
      picture.interesting += 1;
      picture.save((err, picture) => {
        callback(null, picture);
      })
    });
  }

  insertPicture(pictureData, groupId, callback) {
    let quizzId = pictureData.quizzId;
    let picture = new Picture();
    picture._id = new mongoose.Types.ObjectId();
    picture.path = pictureData.path;
    picture.group = groupId;
    picture.quizz = quizzId;
    picture.tags = [];
    picture.fun = 0;
    picture.like = 0;
    picture.interesting = 0;

    picture.save((err, picture) => {
      if(err) {
        return callback(err, null);
      } else {
        let computed = false
        if(quizzId) {
          quizzProvider.getQuizzById(quizzId, (err, quizz) => {
            quizz.album.push(picture);
            quizz.save((err, quizz) => {
              if(err) {
                return callback(err, null);
              } else {
                if(computed) {
                  callback(null, picture);
                }
                computed = true;
              }
            });
          });
        } else {
          computed = true;
        }

        groupProvider.getGroupById(groupId, (err, group) => {
          group.album.push(picture);
          group.save((err, group) => {
            if(err) {
              return callback(err, null);
            } else {
              if(computed) {
                callback(null, picture);
              }
              computed = true;
            }
          });
        });
      }
    });
  }
}

module.exports = new AlbumProvider();

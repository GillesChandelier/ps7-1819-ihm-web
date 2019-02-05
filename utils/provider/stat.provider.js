const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Stat = require('../../models/stat'),
  Picture = require('../../models/picture');
/**
 * Utility class between the controller and model. Manage the stat.
 */
class StatProvider {

  insertStat(body, callback) {
    console.log('*** StatProvider.insertStat');
    let stat = new Stat();

    stat._id = new mongoose.Types.ObjectId();
    stat.quizz = body.idQuizz;
    stat.group = body.idGroup;
    stat.participationPercent = body.participationPercent;
    stat.rightAnswerPercent = body.rightAnswerPercent;

    stat.save((err, stat) => {
      if (err) {
        console.log(`*** StatProvider.insertStat error: ${err}`);
        return callback(err, null);
      } else {
        return callback(null, stat);
      }
    });
  }

  getStatPicture(callback) {
    console.log("*** StatProvider.getStatPicture");
    Picture.find({}).populate("quizz").exec((err, pictures) => {
      if (err) {
        console.log(`*** StatProvider.getPictures error: ${err}`);
        return callback(err);
      }

      var  count = {};
      pictures.forEach(function(element) {
        if(element.quizz)
          count[element.quizz.thematic] = (count[element.quizz.thematic]||0) + 1;
      });

      callback(null, count);
    });
  }

  getStatRightAnswerByGuide(callback) {
    console.log("*** StatProvider.getStatRightAnswerByGuide");

    Stat.find({}).exec((err, stat) => {
      if (err) {
        console.log(`*** StatProvider.getStatRightAnswerByGuide error: ${err}`);
        return callback(err);
      }

      var total = 0;
      stat.forEach(element => {
        if(element.group) {
          total += element.rightAnswerPercent;
        }
      });

      let data = {name:"guide1", moy:total/stat.length};

      callback(null, data)
    });
  }

  getStatParticipationProfil(callback) {
    console.log("*** StatProvider.getStatParticipationProfil");

    Stat.find({}).populate("group").exec((err, stat) => {
      if (err) {
        console.log(`*** StatProvider.getStatParticipationProfil error: ${err}`);
        return callback(err);
      }

      var count = {};
      var moy = {};
      stat.forEach((element) => {
        console.log(element);
        if(element.group) {
          count[element.group.type] = (count[element.group.type]||0) + 1;
          moy[element.group.type] = (moy[element.group.type]||0) + element.participationPercent;
        }
      });
      console.log(moy);
      for(let value in moy){
       moy[value]=moy[value]/count[value];
      }

      callback(null, moy);
    });
  }
}

module.exports = new StatProvider();

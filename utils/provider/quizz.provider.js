const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Quizz = require('../../models/quizz'),
  questionProvider = require('./question.provider');
/**
 * Utility class between the controller and model. Manage the Quizz data.
 */
class QuizzProvider {

  getQuizzes(callback) {
    console.log('*** QuizzProvider.getQuizzes');
    Quizz.count((err, quizzCount) => {
      let count = quizzCount;
      Quizz.find({}).exec((err, quizz) => {
        if (err) {
          console.log(`*** QuizzProvider.getQuizzes error: ${err}`);
          return callback(err);
        }
        callback(null, {
          count: count,
          quizz: quizz
        });
      });
    });
  }

  getQuizzById(id, callback) {
    console.log("*** Get quizz by id provider");

    Quizz.findById(id).exec((err, quizz) => {
      if (err) {
        console.log(`*** QuizzProvider.getQuizzById error: ${err}`);
        return callback(err);
      }
      // {"idQuizz":0,"questionIds":[0,1,2]}
      callback(null, quizz);
    });
  }

  insertQuizz(body, callback) {
    console.log('*** QuizzProvider.insertQuizz');
    let quizz = new Quizz();

    quizz._id = new mongoose.Types.ObjectId();
    quizz.name = body.name;
    quizz.thematic = body.thematic;

    quizz.save((err, quizz) => {
      if (err) {
        console.log(`*** QuizzProvider insertQuizz error: ${err}`);
        return callback(err, null);
      }
      if (body.questions == null || body.questions === undefined) {
        return callback(null, quizz);
      }

      questionProvider.insertMultipleQuestion(body.questions, quizz, (err, questions) => {
        if (err) {
          console.log(`*** QuizzProvider insertQuestion error: ${err}`);
          return callback(err);
        } else {
          quizz.questions = questions;
          quizz.save((err, quizz) => {
            if (err) {
              console.log(`*** QuizzProvider saveQuestion error: ${err}`);
              return callback(err, null);
            } else {
              callback(null, quizz);
            }
          });
        }
      });
    });
  }

  insertMultipleQuizzes(body, callback) {
    let quizzes = [];
    body.forEach(function (element) {
      let quizz = new Quizz();

      quizz._id = new mongoose.Types.ObjectId();
      quizz.name = element.name;
      quizz.thematic = element.thematic;

      quizz.save((err, quizz) => {
        if (err) {
          console.log(`*** QuizzProvider insertQuizz error: ${err}`);
          return callback(err, null);
        }
        if (element.questions == null || element.questions === undefined) {
          return callback(null, quizz);
        }

        questionProvider.insertMultipleQuestion(element.questions, quizz, (err, questions) => {
          if (err) {
            console.log(`*** QuizzProvider insertQuestion error: ${err}`);
            return callback(err);
          } else {
            quizz.questions = questions;
            quizz.save((err, quizz) => {
              if (err) {
                console.log(`*** QuizzProvider saveQuestion error: ${err}`);
                return callback(err, null);
              } else {
                quizzes.push(quizz);
                if (quizzes.length === body.length) {
                  callback(null, quizzes);
                }
              }
            });
          }
        });


      });
    })

  }

}

module.exports = new QuizzProvider();

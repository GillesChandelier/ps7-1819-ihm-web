const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Answer = require('../../models/answer');

/**
 * Utility class between the controller and model. Manage the Answer data.
 */
class AnswerProvider {

  insertMultipleAnswer(body, question, callback) {
    console.log('*** AnswerProvider.insertMultipleAnswer');

    let answers = [];
    body.forEach(function(element) {
      let answer = new Answer();
      answer.question = question._id;
      answer.text = element.text;

      answer.save((err, answer) => {
        if (err) {
            console.log(`*** AnswerProvider insertMultipleAnswer error: ${err}`);
            return callback(err, null);
        }
        answers.push(answer);
        if(answers.length === body.length) {
          callback(null, answers);
        }
      });
    });
  }

  insertGoodAnswer(goodAnswer, question, callback) {
    console.log('*** AnswerProvider.insertGoodAnswer');

    let answer = new Answer();
    answer.question = question._id;
    answer.text = goodAnswer.text;

    answer.save((err, answer) => {
      if (err) {
          console.log(`*** AnswerProvider insertGoodAnswer error: ${err}`);
          return callback(err, null);
      }
      callback(null, answer);
    });
  }
}

module.exports = new AnswerProvider();

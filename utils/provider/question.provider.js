const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Question = require('../../models/question'),
      answerProvider = require('./answer.provider');

/**
 * Utility class between the controller and model. Manage the Question data.
 */
class QuestionProvider {

  getGoodAnswer(id,callback){
    console.log('*** QuizzProvider.getGoodAnswer');
    Question.findById(id).populate("goodAnswer").exec((err, question) => {
      if (err) {
        console.log(`*** QuizzProvider.getGoodAnswer error: ${err}`);
        return callback(err);
      }
      callback(null, question.goodAnswer);
    });
  }

  getQuestions(callback) {
    console.log('*** QuizzProvider.getQuizzes');
    Question.count((err, questionCount) => {
      let count = questionCount;
      Question.find({}, (err, question) => {
        if (err) {
            console.log(`*** QuestionProvider.getQuestions error: ${err}`);
            return callback(err);
        }
        callback(null, {
            count: count,
            question: question
        });
      });
    });
  }

  getQuestionById(id, callback) {
    console.log("*** QuizzProvider.getQuestionById");

    Question.findById(id).populate("answers").exec((err, question) => {
      if (err) {
          console.log(`*** QuizzProvider.getQuestionById error: ${err}`);
          return callback(err);
      }
      callback(null, question);
    });
  }

  insertMultipleQuestion(body, quizz, callback) {
    console.log('*** QuestionProvider.insertMultipleQuestion');

    let questions = [];
    body.forEach(function(element) {
      let question = new Question();
      question.quizz = quizz._id;
      question.thematic = element.thematic;
      question.text = element.text;

      question.save((err, question) => {
        if (err) {
            console.log(`*** QuestionProvider insertMultipleQuestion error: ${err}`);
            return callback(err, null);
        }

        if(element.answers == null || element.answers == undefined) {
          return callback(null, question);
        }

        answerProvider.insertGoodAnswer(element.goodAnswer, question, (err, goodAnswer) => {
          if (err) {
            console.log(`*** QuestionProvider insertMultipleQuestion error: ${err}`);
            return callback(err);
          } else {
            question.goodAnswer = goodAnswer;
          }
          answerProvider.insertMultipleAnswer(element.answers, question, (err, answers) => {
            if (err) {
              console.log(`*** QuestionProvider insertMultipleQuestion error: ${err}`);
              return callback(err);
            } else {
              question.answers = answers;
              question.save((err, question) => {
                if(err) {
                  console.log(`*** QuestionProvider insertMultipleQuestion error: ${err}`);
                  return callback(err, null);
                } else {
                  questions.push(question);
                  if(questions.length == body.length) {
                      callback(null, questions);
                  }
                }
              });
            }
          });
        });
      });
    });
  }
}


module.exports = new QuestionProvider();

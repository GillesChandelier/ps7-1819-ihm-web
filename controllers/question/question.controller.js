const questionProvider = require('../../utils/provider/question.provider')

/**
 * Controller used by the server allowing access to the question management.
 *
 * Accessible via the routes '/question'
 **/
class QuestionController {
    /**
   * Question controller add routes to manage question data
   *
   * Routes accessible from /question :
   * - {get} / : Get all the stocked questions
   * - {get} /:id : Get a specific question by it's ID
   * - {post} /:id : Update quizz stat and return if the specific question is right (see exemple structure in doc folder)
   * @param {Router} router Express router
   */
  constructor (router) {
    router.get('/', this.getQuestions.bind(this));
    router.get('/:id', this.getQuestionById.bind(this));
    router.post('/:id', this.answerQuestion.bind(this));
  }

  getQuestions (req, res) {
    questionProvider.getQuestions((err, question) => {
      if (err) {
        console.log('*** getQuestions error: ' + err);
        res.json(null);
      } else {
        res.json(question);
      }
    })
  }

  answerQuestion (req, res) {
    const id = req.params.id
    const answer = req.body.answer
    questionProvider.getGoodAnswer(id, (err, goodAnswer) => {
      if (err) {
        console.log('*** answerQuestion error: ' + err);
        res.json(null)
      } else {
        res.json({
          'error': null,
          'check': goodAnswer.text === answer,
          'answer':goodAnswer.text
        });
      }
    })

  }

  getQuestionById (req, res) {
    const id = req.params.id // TODO : Check correct

    questionProvider.getQuestionById(id, (err, question) => {
      if (err) {
        console.log('*** getQuestionById error: ' + err)
        res.json(null)
      } else {
        res.json(question)
      }
    })
    /*
    res.json({
      "idQuestion": 0,
      "theme": "football",
      "description": "Quel équipe a obtenu la coupe du monde de foot en 2018 ?",
      "answers": [
        {
          "id": "A",
          "answer": "France"
        },
        {
          "id": "B",
          "answer": "Korea"
        },
        {
          "id": "C",
          "answer": "Italy"
        },
        {
          "id": "D",
          "answer": "Croatie"
        }
      ],
      "goodAnswer": [
        {
          "id": "A",
          "answer": "France"
        }
      ]
    });
    */
  }
}

module.exports = QuestionController

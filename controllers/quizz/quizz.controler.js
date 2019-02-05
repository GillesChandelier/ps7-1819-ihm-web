const quizzProvider = require('../../utils/provider/quizz.provider');
/**
 * Controller used by the server allowing access to the quizz management.
 *
 * Accessible via the routes '/quizz'
 **/
class QuizzControler {
  /**
   * Quizz controller add routes to manage quizz data
   *
   * Routes accessible from /quizz :
   * - {get} / : Get all the stocked quizz
   * - {get} /:id : Get a specific question by it's ID
   * - {post} / :  Insert one or multiple quizz in the database (see exemple structure in doc folder)
   * @param {Router} router Express router
   */
  constructor(router) {
    if(router) {
      router.get('/', this.getQuizzes.bind(this));
      router.get('/:id', this.getQuizzById.bind(this));
      router.post('/', this.insertQuizz.bind(this));
    }
  }

  getQuizzes(req, res) {
    console.log('*** QuizzControler.getQuizzes');
    quizzProvider.getQuizzes((err, quizz) => {
      if (err) {
        console.log('*** getQuizzes error: ' + err);
        res.json(null);
      } else {
        console.log('*** getQuizzes ok');
        res.json(quizz);
      }
    });
  }

  getQuizzById(req, res) {
    const id = req.params.id;

    quizzProvider.getQuizzById(id, (err, quizz) => {
      if (err) {
        console.log('*** getQuizzById error: ' + err);
        res.json(null);
      } else {
        console.log('*** getQuizzById ok');
        res.json(quizz);
      }
    });
  }

  insertQuizz(req, res) {
    let body = req.body;
    if (body.constructor !== Array) {
      quizzProvider.insertQuizz(req.body, (err, quizz) => {
        if (err) {
          console.log('*** quizz.provider.insertQuizz error: ' + err);
          res.json({error: 'Insert failed', quizz: null});
        } else {
          console.log('*** insertQuizz ok');
          res.json({error: null, quizz: quizz});
        }
      });
    } else {
      quizzProvider.insertMultipleQuizzes(req.body, (err, quizzes) => {
        if (err) {
          console.log("*****insertMultiQuizzes error :" + err);
          res.json(null);
        } else {
          console.log('*** insertQuizzes ok');
          res.json(quizzes);
        }
      })
    }


  }

}

module.exports = QuizzControler;

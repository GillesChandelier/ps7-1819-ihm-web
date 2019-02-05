const statProvider = require('../../utils/provider/stat.provider');
/**
 * Controller used by the server allowing access to the stat management.
 *
 * Accessible via the routes '/stat'
 **/
class StatControler {
  /**
   * Quizz controller add routes to manage stat
   *
   * Routes accessible from /stat :
   * - {post} / : Insert a new stat
   * @param {Router} router Express router
   */
  constructor(router) {
    if(router) {
      router.post('/', this.insertStat.bind(this));
      router.get('/', this.getParticipationRate.bind(this));
      router.get('/picture', this.getStatPicture.bind(this));
      router.get('/participation/thematic', this.getStatParticipationProfil.bind(this));
      router.get('/guide/right', this.getStatRightAnswerByGuide.bind(this));
    }
  }

  getParticipationRate(req,res){
    res.json({age: [{theme:"foot",dix:"92",quinze:"78",vingtcinq: "87",trentecinq:"76",quarantecinq:"68",cinquantecinq:"69",soixantecinq:"72",soixantequinze:"55"},

    {theme:"natation",dix:"29",quinze:"87",vingtcinq: "78",trentecinq:"67",quarantecinq:"86",cinquantecinq:"96",soixantecinq:"27",soixantequinze:"55"}],

    genre: [{theme:"foot",femmes:"92",hommes:"78"},{theme:"natation",femmes:"29",hommes:"87"}],

    profil: [{theme:"foot",etudiants:"92",retraites:"78",touristes:"65"},
    {theme:"natation",etudiants:"29",retraites:"87",touristes:"56"}]
    })
  }

  insertStat(req, res) {
    let body = req.body;
    statProvider.insertStat(body, (err, stat) => {
      if (err) {
        console.log('*** StatControler.insertStat error: ' + err);
        res.json({error: 'Insert failed', stat: null});
      } else {
        console.log('*** insertQuizz ok');
        res.json({error: null, stat: stat});
      }
    });
  }

  getStatPicture(req, res) {
    statProvider.getStatPicture((err, data) => {
      if (err) {
        console.log('*** StatControler.getStatPicture error: ' + err);
        res.json(null);
      } else {
        res.json(data);
      }
    });
  }

  getStatParticipationProfil(req, res) {
    statProvider.getStatParticipationProfil((err, data) => {
      if (err) {
        console.log('*** StatControler.getStatParticipationProfil error: ' + err);
        res.json(null);
      } else {
        res.json(data);
      }
    });
  }

  getStatRightAnswerByGuide(req, res) {
    statProvider.getStatRightAnswerByGuide((err, data) => {
      if (err) {
        console.log('*** StatControler.getStatRightAnswerByGuide error: ' + err);
        res.json(null);
      } else {
        res.json(data);
      }
    });
  }
}

module.exports = StatControler;

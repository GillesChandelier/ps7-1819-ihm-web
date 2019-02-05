const sinon = require('sinon'),
      chai = require('chai'),
      expect = chai.expect,
      Controller = require("../controllers/quizz/quizz.controler"),
      quizzProvider = require('../utils/provider/quizz.provider');

describe('Quizz controller', () => {
  let status,
      json,
      res;
  beforeEach(() => {
    status = sinon.stub();
    json = sinon.spy();
    res = { json, status };
    status.returns(res);
  });
  afterEach(() => {
    sinon.restore();
  });
  describe('GET /quizz', () => {
    it('should respond with the right data', (done) => {
      let stub = new Controller();
      let data = {"count": 1, "quizz": [{name : "MonQuizz"}]};
      sinon.stub(quizzProvider, "getQuizzes").yields(null, data);
      let req = {};
      stub.getQuizzes(req, res);
      expect(json.calledOnce).to.equal(true);
      expect(json.calledWith(data)).to.equal(true);
      done();
    });
    it('an error occured should respond with null data', (done) => {
      let stub = new Controller();
      let data = null;
      sinon.stub(quizzProvider, "getQuizzes").yields({}, data);
      let req = {};
      stub.getQuizzes(req, res);
      expect(json.calledOnce).to.equal(true);
      expect(json.calledWith(null)).to.equal(true);
      done();
    });
  });
  describe('GET /quizz/:id', () => {
    it('should respond with the right data', (done) => {
      let stub = new Controller();
      let data = {_id: "mon-id", name : "MonQuizz"};
      sinon.stub(quizzProvider, "getQuizzById").yields(null, data);
      let req = { params : {id : "mon-id" }};
      stub.getQuizzById(req, res);
      expect(json.calledOnce).to.equal(true);
      expect(json.calledWith(data)).to.equal(true);
      done();
    });
    it('an error occured should respond with null data', (done) => {
      let stub = new Controller();
      let req = { params : {id : "mon-id" }};
      sinon.stub(quizzProvider, "getQuizzById").yields({}, null);
      stub.getQuizzById(req, res);
      expect(json.calledOnce).to.equal(true);
      expect(json.calledWith(null)).to.equal(true);
      done();
    });
  });
});

let guideID = 0;
let usersID = []
let numUsers = 0;

/**
 * Quizz event allow to manage the emitted event linked to a quizz
 */
class QuizzEvent {
  /**
   * Add listener to the socket relate to the quizz
   *
   * Event :
   * - disconnect : Visitor disconnect
   * - answer : Visitor answer question
   * - passQuestion : Visitor pass question
   * - userLoad : Visitor has loaded the webpage
   * - quizzFinished : Visitor finish the quizz
   * - guideLaunch : Guide launch a quizz
   * - refuseQuiz : Visitor pass activity
   * - userLaunched : User start activity
   * @param {Socket} socket Socket openned by the server
   */
  constructor (socket) {
    socket.on('disconnect', this.eventDisconnected.bind(socket));
    socket.on('answer', this.eventAnswer.bind(this));
    socket.on('passQuestion', this.eventPassQuestion.bind(socket));
    socket.on('userLoad', this.eventUserConnected.bind(this));
    socket.on('quizzFinished', this.eventQuizzFinished.bind(this));
    socket.on("guideLaunch", this.eventLaunchQuizz.bind(socket));
    socket.on("refuseQuiz", this.eventRefuseQuiz.bind(socket));
    socket.on("userLaunched", this.eventUserLaunchedQuizz.bind(socket));

    // Look out to put this in the utils/event.js file
    socket.join('room');
    if (guideID === 0) {
      guideID = socket.id
    }else{
      numUsers++;
      usersID.push(socket.id);
    }
  }

  eventUserConnected(){
    console.log("***** new User Joined");
    console.log(numUsers);
    io.emit('newUser', {nbUser: numUsers});
  }

  eventAnswer (data) {
    console.log('***** Answer Question Event');
    io.emit('newQuestionAnswered', data);
  }

  eventPassQuestion (socket) {
    console.log('***** Pass Question Event');
    io.emit('newQuestionPass');
  }

  eventQuizzFinished (data) {
    console.log(data);
    console.log("***** Quizz Finished by current user");
    io.emit("quizzFinished",{idGroupe:data.idGroupe, idQuizz:data.idQuizz});
  }

  eventDisconnected (socket) {
    usersID.splice(usersID.indexOf(socket.id), 1);
    console.log('*** user disconnected');
    numUsers--;
    io.emit('userDisconnected');
  }

  eventLaunchQuizz(socket){
    console.log("launching Quizz");
    io.emit("launchQuiz");
  }

  eventUserLaunchedQuizz(socket){
    io.emit('newUserJoined', {id: numUsers});
  }

  eventRefuseQuiz(socket){
    console.log("someone refused the quiz !");
  }
}

module.exports = QuizzEvent

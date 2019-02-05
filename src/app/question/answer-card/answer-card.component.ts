import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AnswerCheck} from "../../shared/models/AnswerCheck";
import {QuestionService} from "../../shared/services/question/question.service";
import {socket} from "../../app.component"
import { QuizzComponent } from 'src/app/quizz/quizz.component';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.css'],
  inputs: ['Answer','Id']
})
export class AnswerCardComponent implements OnInit {
  @Output() nextQuestion = new EventEmitter<string>();

  private Answer;
  private answerCheck: AnswerCheck;
  private response: string;
  private rightAnswer : string;
  private Id;
  show: boolean = false;

  constructor(private QuestionService: QuestionService) {
  }

  ngOnInit() {
    console.log(this.Answer);
    console.log("Idd"+this.Id);
  }

  displayAnswer(event: any) {
    this.show = true;
    this.QuestionService.answerQuestion(this.Id,event.target.value).subscribe((res)=>{
      console.log("Send answer" + event.target.value);
      console.log(res);
      this.answerCheck = res;
      socket.emit("answer", {check:this.answerCheck.check});
      if(this.answerCheck.check){
        this.response= "Bonne réponse, bien joué !";
        this.rightAnswer = "";
      }
      else{
        this.response = "Oups, Mauvaise réponse !";
        this.rightAnswer = "La réponse était : " + this.answerCheck.answer;
      }
    })
  }

  passToNextQuestion(event: any) {
    socket.emit('passQuestion');
    this.nextQuestion.emit("rrek");
  }

  displayNextQuestion() {
    this.show = false;
    this.nextQuestion.emit("rrek");
  }
}

import { QuestionService } from '../shared/services/question/question.service';
import { Question } from '../shared/models/Question';
import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren, OnChanges, SimpleChanges, ChangeDetectionStrategy} from '@angular/core';
import { ChildActivationEnd } from '@angular/router';
import { AnswerCardComponent } from './answer-card/answer-card.component';
import { QuestionTextComponent } from './question-text/question-text.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  inputs: ['idQuestion']

})
export class QuestionComponent implements OnChanges,OnInit {
  @Output() nextQuestion = new EventEmitter<string>();
  private isGuide:boolean;
  private question:Question;
  private idQuestion;
  private number:number=0;

  constructor(private questionService:QuestionService) {
  }

  ngOnChanges(changes:SimpleChanges){
    this.ngOnInit();
  }

  ngOnInit() {
    console.log("ID" + this.idQuestion);
    this.questionService.getQuestion(this.idQuestion).subscribe((res)=>{
      this.question=res;
    });
  }

  onNextQuestion(event:any){
    this.nextQuestion.emit("next");
  }
}

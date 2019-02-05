import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../shared/services/quizz/quizz.service';
import { Quizz } from '../shared/models/Quizz';
import { socket} from '../app.component'
import { GroupService } from '../shared/services/group/group.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  private number:number=0;
  private idQuestion:string;
  private idQuestions:string[];
  private quizz:Quizz;
  private idGroupe:string;

  private isFinished:boolean = false;

  constructor(private quizzService : QuizzService, private groupService: GroupService) {
  }

  ngOnInit() {
      socket.emit("userLaunched");

      this.quizzService.getQuizzes().subscribe((res)=>{
        console.log(res);
        this.quizz=res.quizz[res.count-1];
        console.log(this.quizz);
        this.idQuestions=this.quizz.questions;
        this.idQuestion=this.idQuestions[0];
        console.log(this.idQuestions);
      });

      this.groupService.getGroups().subscribe(res=>{
        this.idGroupe = res[res.length-1]._id;
        console.log(this.idGroupe);
      });
  }

  displayNextQuestion(event:any){
    this.number++;
    this.idQuestion=this.idQuestions[this.number];
    if (!this.idQuestion) {
      socket.emit('quizzFinished', {idGroupe: this.idGroupe, idQuizz:this.quizz._id });
      console.log(this.quizz._id);
      this.isFinished = true;
    }
  }
}

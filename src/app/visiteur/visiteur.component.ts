import { Component, OnInit, NgZone } from '@angular/core';
import {socket} from "../app.component"

@Component({
  selector: 'app-visiteur',
  templateUrl: './visiteur.component.html',
  styleUrls: ['./visiteur.component.css']
})
export class VisiteurComponent implements OnInit {
  private launchQuiz:boolean;
  private visiteurs: String[];
  constructor(private ngZone:NgZone) { }

  ngOnInit() {
    this.visiteurs = [];
    socket.on("launchQuiz",()=>{
      this.ngZone.run(()=>{this.launchQuiz=true});
    });

    socket.on("newUser", (data)=> {
      this.ngZone.run(()=>{
        for(let i = this.visiteurs.length; i < data.nbUser; i++) {
          this.visiteurs.push("Anonyme " + this.visiteurs.length);
        }
      });
    });

    socket.on("userDisconnected", ()=> {
      this.ngZone.run(()=>{this.visiteurs.pop();});
    });
  }

  refuseQuizz(){
    socket.emit("refuseQuiz");
    this.ngZone.run(()=>{this.launchQuiz=false});
  }

  acceptQuizz(){
    socket.emit("acceptQuiz");
  }

}

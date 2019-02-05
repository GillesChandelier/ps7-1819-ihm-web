import {Component, NgZone, OnInit} from '@angular/core';
import {socket} from '../app.component'
import { Photo } from '../shared/models/Photo';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../shared/services/data/data.service';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css'],
  inputs: ['isGuide']
})
export class GuideComponent implements OnInit {
  nbParticipant: number = 5;
  participants : number =10;
  nbQuestionAnswered: number =0;
  nbQuestionGood: number =0;
  nbQuestionPassed: number =0;
  nbQuizFinished: number =0;
  nbQuizRefused:number =0;
  lance: boolean = false;
  stat:boolean = false;
  displayBestPhoto = false;
  bestPhoto:Photo;
  description:string;
  idGroupe:string;
  idQuizz:string;
  constructor(private ngZone: NgZone, private modalService : NgbModal, private dataService : DataService) {
  }

  ngOnInit() {
    socket.on("newUserJoined", (data) => {
      console.log("new user joined");
      console.log(data.id);
      if(this.stat){
        this.ngZone.run(()=>{
          this.nbParticipant++;
          this.updateGraph("tp",this.nbParticipant/10*100);
          this.updateGraph("tp",this.nbParticipant/10*100);
          this.updateGraph("qt",this.nbQuizFinished/this.nbParticipant*100);
        })
      }
    });

    socket.on("newQuestionAnswered", data => {
      console.log("newQuestionAnswered");
      console.log(data);
      if(this.stat){
        this.ngZone.run(()=>{
          this.nbQuestionAnswered++;
          if (data.check) {
            this.nbQuestionGood++;
          }
          this.updateGraph("tqbp",this.nbQuestionGood/this.nbQuestionAnswered*100);
          this.updateGraph("tqp",this.nbQuestionPassed/this.nbQuestionAnswered*100);
        });
      }
    });

    socket.on('newQuestionPass', data => {
      if(this.stat){
        this.ngZone.run(()=>{
          this.nbQuestionAnswered++;
          this.nbQuestionPassed++;
          this.updateGraph("tqbp",this.nbQuestionGood/this.nbQuestionAnswered*100);
          this.updateGraph("tqp",this.nbQuestionPassed/this.nbQuestionAnswered*100);
        });
      }
    })

    socket.on('quizzFinished', data => {
      console.log(data);
      if(this.stat){
        this.ngZone.run(()=>{
          this.idQuizz=data.idQuizz;
          this.idGroupe=data.idGroupe;
          this.nbQuizFinished++;
          this.updateGraph("qt",this.nbQuizFinished/this.nbParticipant*100);
          if(this.nbQuizFinished==this.nbParticipant){
            document.getElementById("moyenne").style.display="block";
          }
        });
      }
    })

    socket.on('quizzRefused', data => {
      if(this.stat){
        this.ngZone.run(()=>{
          this.nbQuizRefused++;
        });
      }
    })
    socket.on("sendMostTagged", (data) => this.ngZone.run(()=>this.bestPhoto=data.photo));

  }

  updateGraph(id:string, value:number){
    document.getElementById(id).style.width=value.toFixed(2)+"%";
    document.getElementById(id).setAttribute("data-perc",value.toFixed(2)+"%");
  }

  launchQuizz(){
    this.nbParticipant=0;
    this.nbQuestionAnswered=0;
    this.nbQuestionGood=0;
    this.nbQuestionPassed=0;
    this.nbQuizFinished=0;
    this.stat = true;
    socket.emit("guideLaunch");
  }

  afficher(){
    this.lance = true;
    console.log("okkkkkk");
  }

  getBestPhoto(){
    if(this.bestPhoto){
    this.displayBestPhoto=true;
    }
    else {
      alert("Pas encore de photo !")
    }
  }

  goBack(){
    console.log(this.idGroupe);
    if(this.stat && this.idGroupe && this.idQuizz){
      this.dataService.sendStats(this.nbQuestionGood/this.nbQuestionAnswered*100,
        this.nbParticipant/this.participants*100,this.idQuizz,this.idGroupe).subscribe(res=>console.log(res));
    }
    this.stat=false;
    this.displayBestPhoto=false;
  }

  dialogue(warn) {
    this.modalService.open(warn, {ariaLabelledBy: 'modal-basic'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDescriptionValue(event:any){
    this.description = event.target.value;
  }

  share(){
    console.log("Photo avec id : "+this.bestPhoto._id+" et la description : "+this.description+"\n a été posté sur le Facebook du Musée du Sport avec succès");
  }
}

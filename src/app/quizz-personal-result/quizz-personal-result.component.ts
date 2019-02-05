import {Component,OnInit} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import { AlbumService } from '../shared/services/album/album.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { socket} from '../app.component'


const url = "http//:localhost:8081/quiz/upload";

@Component({
  selector: 'app-quizz-personal-result',
  templateUrl: './quizz-personal-result.component.html',
  styleUrls: ['./quizz-personal-result.component.css'],
  inputs: ["idQuizz", "idGroupe", "theme"]
})
export class QuizzPersonalResultComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url: url});
  private url:any;
  private tags: Array<any> = [];
  private show: boolean = false;

  private file: File = null;
  private form = null;

  private idQuizz;
  private idGroupe;
  private theme;
  constructor(private modalService : NgbModal, private albumService : AlbumService) { }

  ngOnInit() {
  }

  selectedFileOnChanged(event: any) {
    console.log(event.target.value);
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.show = true;

      this.form = new FormData();
      this.form.append('quizzId', this.idQuizz);
      this.form.append('path', this.file.name);
      this.form.append('file', this.file, this.file.name);
      console.log(this.url);
    }
  }

  partage() {
    if(this.form){
      this.albumService.sendPhoto(this.form, this.idGroupe).subscribe(data=>{
        console.log(data);
        console.log(data._id);
        socket.emit("sendPhoto", {id: socket.id, path:this.file.name, idPhoto: data._id, theme:this.theme})
      }
      );
    }
  }

  addTags(event:any){
    if(event.length==this.tags.length+1){
      this.tags.push(event[event.length-1].value);
      console.log(this.tags);
    }else{
      if (this.tags.length !== -1) {
        let tagInEvent = [];
        event.forEach((item, index)=>{
          {
            tagInEvent.push(item.value);
          }
        });
        console.log("TagInEvent"+tagInEvent);
        console.log("Avant remove Tags + " + this.tags);
        console.log(this.getRemovedItem(tagInEvent, this.tags)[0]);
        this.tags.splice(this.tags.indexOf(this.getRemovedItem(tagInEvent, this.tags)[0]),1);
        console.log("Tags + " + this.tags);
      }
    }
  }

  getRemovedItem(arr1:Array<any>, arr2:Array<any>){
      return arr1.concat(arr2).filter(function(v, i, arr) {
      return arr.indexOf(v) === arr.lastIndexOf(v);

    });

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  dialogue(warn) {
    this.modalService.open(warn, {ariaLabelledBy: 'modal-basic'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}

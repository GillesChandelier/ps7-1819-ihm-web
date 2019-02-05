import {Component, NgZone, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {socket} from "../app.component"
import { Photo } from '../shared/models/Photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
  inputs: ['photo']
})
export class PhotoComponent implements OnInit, OnChanges {
  private photo:Photo;
  form: FormGroup;
  private tagAjoute: Array<any> = [{id: 1, tag: 'LaPlusBelle'},
    {id: 2, tag: 'LaPlusInteressante'}, {id: 3, tag: 'LaPlusFun'}];
  private tags: Array<any> = [];
  private added: Array<boolean>=[false, false, false];

  constructor(private ngZone: NgZone, private formBuilder: FormBuilder) {
    const controls = this.tagAjoute.map(c => new FormControl(false));
    controls[0].setValue(true);
    this.form = this.formBuilder.group({
      tagAjoute: new FormArray(controls)
    });
  }
  
  ngOnChanges(changes:SimpleChanges){
    this.ngOnInit();
  }

  ngDoCheck(){
    if(this.tags[0] != this.photo.like || this.tags[1] != this.photo.interesting || this.tags[2] != this.photo.fun){
      this.ngOnInit();
    }
  }

  ngOnInit() {
    this.tags[0]=this.photo.like;
    this.tags[1]=this.photo.interesting;
    this.tags[2]=this.photo.fun;

    //this.tags=[this.photo.like,this.photo.interesting,this.photo.fun];
  }

  submit() {
    //les tags rajoutes par les autres clients
    const selectedTag = this.form.value.tagAjoute.map((v, i) => v ? this.tagAjoute[i].tag : null).filter(v => v !== null);
    console.log(selectedTag);
  }
 
  addATag(event: any) {
    console.log(event.path[0].id);
    this.ngZone.run(() => {
      switch (event.path[0].id) {
        case "belle":
          if (!this.added[0]) {
            socket.emit("likePhoto", {id: this.photo._id});
            this.added[0]= true;
          }
          break;
        case "interest":
          if (!this.added[1]) {
            socket.emit("interestPhoto", {id: this.photo._id});
            this.added[1]= true;
          }
          break;
        case "fun":
          if (!this.added[2]) {
            socket.emit("funPhoto", {id: this.photo._id});
            this.tags[2]++;
            this.added[2]= true;
          }
          break;
      }
    })
  }


}

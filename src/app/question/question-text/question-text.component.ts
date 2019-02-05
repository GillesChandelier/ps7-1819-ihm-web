import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {QuestionComponent} from "../question.component";
import {Input} from "@angular/compiler/src/core";

@Component({
  selector: 'app-question-text',
  templateUrl: './question-text.component.html',
  styleUrls: ['./question-text.component.css'],
  inputs: ['description']
})

export class QuestionTextComponent implements OnInit {
  private description;
  constructor() { }

  ngOnInit() {
    console.log(this.description);
  }

}

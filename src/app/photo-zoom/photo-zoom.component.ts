import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-photo-zoom',
  templateUrl: './photo-zoom.component.html',
  styleUrls: ['./photo-zoom.component.css']
})
export class PhotoZoomComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ajouter(){
    console.log("ajouter");
  }

}

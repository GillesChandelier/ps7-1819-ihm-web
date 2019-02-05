import { Component } from '@angular/core';
import * as io from 'socket.io-client';
import { TestBed } from '@angular/core/testing';
import { GuideComponent } from './guide/guide.component';
export const socket = io.connect();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  socket: SocketIOClient.Socket;
  gc:GuideComponent;

  constructor() {


  }

  ngOnInit(){
    socket.on("numberUser",(data)=>{console.log(data.id);});
    socket.emit("userLoad");
  }



}

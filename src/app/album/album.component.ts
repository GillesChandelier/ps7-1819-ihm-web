import { Component, OnInit, NgZone } from '@angular/core';
import { AlbumService } from '../shared/services/album/album.service';
import {socket} from "../app.component";
import { stringify } from '@angular/core/src/render3/util';
import { Photo } from '../shared/models/Photo';
const URL = "http://localhost:8081/assets/pictures/";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  private photos:Photo[] = [];
  private livePhotoId=0;
  private mostTaggedPhoto:Photo;
  constructor(private albumService : AlbumService, private ngZone : NgZone) {

  }

  ngOnInit() {
    this.albumService.getAlbum().subscribe((res)=>{
      for(let photo of res.album){
        this.photos.push(new Photo(photo._id,URL+photo.path,photo.like,photo.interesting,photo.fun));
      }
      this.mostTaggedPhoto = this.photos[0];
      for(let photo of this.photos){
        if(this.mostTaggedPhoto.like+this.mostTaggedPhoto.interesting+this.mostTaggedPhoto.fun
          < photo.like+photo.interesting + photo.fun){
            this.mostTaggedPhoto = photo;
        }
      }
      console.log(this.mostTaggedPhoto);
      socket.emit("newMostTagged", {photo: this.mostTaggedPhoto});
    });

    socket.on("photoReceived", (data) => { this.ngZone.run(()=>{
      let photo = this.photos.find(photo => photo._id == data.id);
      if (!photo){
         this.photos.push(new Photo(data.id,URL+data.path,0,0,0));
      }
    }
      )});

    socket.on("photoLiked",data => {
      this.ngZone.run(()=>{
        let photo = this.photos.find(photo => photo._id == data.id);
        photo.like++;
        if(this.mostTaggedPhoto.like+this.mostTaggedPhoto.interesting+this.mostTaggedPhoto.fun
           < photo.like+photo.interesting + photo.fun){
            this.mostTaggedPhoto = photo;
            socket.emit("newMostTagged", {photo: this.mostTaggedPhoto});
        }

      });

    });

    socket.on("photoInterest",data => {
      this.ngZone.run(()=>{
        let photo = this.photos.find(photo => photo._id == data.id);
        photo.interesting++;
        if(this.mostTaggedPhoto.like+this.mostTaggedPhoto.interesting+this.mostTaggedPhoto.fun
          < photo.like+photo.interesting + photo.fun){
           this.mostTaggedPhoto = photo;
           socket.emit("newMostTagged", {photo: this.mostTaggedPhoto});
       }
      });

    });

    socket.on("photoFun",data => {
      this.ngZone.run(()=>{
        let photo = this.photos.find(photo => photo._id == data.id);
        photo.fun++;
        if(this.mostTaggedPhoto.like+this.mostTaggedPhoto.interesting+this.mostTaggedPhoto.fun
          < photo.like+photo.interesting + photo.fun){
           this.mostTaggedPhoto = photo;
           socket.emit("newMostTagged", {photo: this.mostTaggedPhoto});
       }
      });

    });


  }

  zoomPhoto(){
    console.log("yes");
  }

}

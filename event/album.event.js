const albumProvider = require('../utils/provider/album.provider');

/**
 * Quizz event allow to manage the emitted event linked to a album
 */
class QuizzEvent {
  /**
   * Add listener to the socket relate to the album
   *
   * Event :
   * - likePhoto : Visitor disconnect
   * @param {Socket} socket Socket openned by the server
   */
  constructor (socket) {
    socket.on('likePhoto', this.likePhoto.bind(this));
    socket.on('funPhoto', this.funPhoto.bind(this));
    socket.on('interestPhoto', this.interestPhoto.bind(this));
    socket.on("sendPhoto", this.sendPhoto.bind(this));
    socket.on("newMostTagged", this.sendNewMostTagged.bind(this));
  }

  likePhoto(data) {
    console.log("*** AlbumEvent.likePhoto");
    albumProvider.addLike(data.id, (err, photo) => {
      if(err) {
        console.log("*** AlbumEvent.likePhoto error : " + err);
      } else {
        io.emit("photoLiked", {id: photo._id});
      }
    });
  }

  funPhoto(data) {
    console.log("*** AlbumEvent.funPhoto");
    albumProvider.addFun(data.id, (err, photo) => {
      if(err) {
        console.log("*** QuizzEvent.funPhoto error : " + err);
      } else {
        io.emit("photoFun", {id: photo._id});
      }
    });
  }

  interestPhoto(data) {
    console.log("*** QuizzEvent.interestPhoto");
    albumProvider.addInterest(data.id, (err, photo) => {
      if(err) {
        console.log("*** AlbumEvent.interestPhoto error : " + err);
      } else {
        io.emit("photoInterest", {id: photo._id});
      }
    });
  }

  sendPhoto(data){
    console.log("*** AlbumEvent.sendPhoto ");
    console.log("theme: "+data.theme);
    io.emit("photoReceived", {id:data.idPhoto, idUser:data.id, path:data.path } );

    //Faire requet post stat avec data.theme
  }

  sendNewMostTagged(data){
    console.log("*** AlbumEvent.sendNewMostTagged ");
    io.emit("sendMostTagged", {photo:data.photo});

  }
}

module.exports = QuizzEvent

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Album } from '../../models/Album';
import { Photo } from '../../models/Photo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http : HttpClient) { }

  getAlbum(){
    return this.http.get<Album>("http://localhost:8081/album");
  }

  sendPhoto(form:FormData, idGroupe: string){
    return this.http.post<Photo>("http://localhost:8081/album/group/" + idGroupe, form).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }

}

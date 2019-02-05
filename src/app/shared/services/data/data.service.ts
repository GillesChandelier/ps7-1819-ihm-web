import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ParticipationRate } from '../../models/PartcipationRate';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) {}

  getParticipationRate(){
    return this.http.get<ParticipationRate>("http://localhost:8081/stat"); 
  }

  getParticipationProfil(){
    return this.http.get("http://localhost:8081/stat/participation/thematic");
  }

  getPicturesStats(){
    return this.http.get("http://localhost:8081/stat/picture"); 
  }
  sendStats(tauxBonnesRep:number, tauxParticpation:number,idQuizz:string,idGroupe:string){
    const data = {"participationPercent" : tauxParticpation, "rightAnswerPercent": tauxBonnesRep, "idQuizz":idQuizz, "idGroup":idGroupe}
    console.log(data);
    return this.http.post("http://localhost:8081/stat",JSON.stringify(data),httpOptions).pipe(catchError(this.errorHandler));
  }

  getGoodAnswersRateByGuides(){
    return this.http.get("http://localhost:8081/stat/guide/right");
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }
}

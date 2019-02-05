import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders }    from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable} from "rxjs";
import {Question} from "../../models/Question"
import {AnswerCheck} from "../../models/AnswerCheck";


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  getQuestion(id:String) {
    const url = 'http://localhost:8081/question/'+id;
    return this.http.get<Question>(url);
  }

  answerQuestion(id: string, answer:string){
    var res = "\"{answer\":" + "\""+answer+"" + "\"}";
    var response = '{"answer":"'+answer+ '"}';
    response = JSON.parse(response, null);
    const url = 'http://localhost:8081/question/'+id;
    console.log("Send my answer!!" + url);
    return this.http.post<AnswerCheck>(url, response);
  }

}

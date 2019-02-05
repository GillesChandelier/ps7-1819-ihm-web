import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders }    from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Observable} from "rxjs";
import {Question} from "../../models/Question"
import {AnswerCheck} from "../../models/AnswerCheck";
import { QuizzList } from '../../models/QuizzList';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  constructor(private http: HttpClient) { }

  getQuizzes() {
    const url = 'http://localhost:8081/quizz/';
    return this.http.get<QuizzList>(url);
  }
}

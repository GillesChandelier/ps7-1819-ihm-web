import { Injectable } from '@angular/core';
import {  HttpClient }    from '@angular/common/http';
import { Group } from '../../models/Group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http : HttpClient) { }

  getGroups(){
    return this.http.get<Group[]>("http://localhost:8081/group"); 
  }
}

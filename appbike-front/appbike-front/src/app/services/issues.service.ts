import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue, IssueResponse } from '../models/issues.interface';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { NewIssue } from '../models/new-issue.interface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})

export class IssuesService {
  constructor(private http: HttpClient) { }

  getAll():Observable<IssueResponse>{
    return this.http.get<IssueResponse>(`${environment.apiBaseUrl}admin/issues/`);
  }

  setAsDone(issue:Issue){
    return this.http.put(`${environment.apiBaseUrl}admin/issues/${issue.id}`,{
      issue
    }, httpOptions);
  }

  delete(id :number){
    return this.http.delete(`${environment.apiBaseUrl}admin/issues/${id}`);
  }

  createNewIssue(issue:NewIssue){
    return this.http.post(`${environment.apiBaseUrl}admin/issues/`,{
      issue
    }, httpOptions);
  }
}
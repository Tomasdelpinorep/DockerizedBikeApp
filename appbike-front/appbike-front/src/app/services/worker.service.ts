import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Workerr } from '../models/worker.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http :HttpClient) { }

  getAll() :Observable<Workerr[]>{
    return this.http.get<Workerr[]>(`${environment.apiBaseUrl}worker/`);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BikeUser } from '../models/user.interface';
import { environment } from '../environments/environments';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class BikeUserService {

  constructor(private http: HttpClient) { }

  getUserDetails(id: string): Observable<BikeUser>{
    return this.http.get<BikeUser>(`${environment.apiBaseUrl}user/${id}`);
  }

  setCard(id:string | null, userDetails: BikeUser):Observable<BikeUser>{
    return this.http.put<BikeUser>(`${environment.apiBaseUrl}user/setCard/${id}`,{
      userDetails
    },httpOptions)
  }
}

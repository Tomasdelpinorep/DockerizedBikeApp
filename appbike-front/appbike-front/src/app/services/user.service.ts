import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recharge, UserBikeResponse } from '../models/user-bike.interface';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserDetails(): Observable<UserBikeResponse> {
    return this.http.get<UserBikeResponse>(`${environment.apiBaseUrl}user/details`);
  }

  recharge(form: any): Observable<UserBikeResponse> {
    return this.http.put<UserBikeResponse>(`${environment.apiBaseUrl}user/recharge`,
      {
        "recharge": form.recharge,
        "pin": form.pin
      }
    )
  }

}


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environments';
import { TokenStorageService } from './token-storage.service';
import { Injectable, inject } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  userRole! :string;
  tokenStorageService! :TokenStorageService;

  registerUser(form: any): Observable<any> {
    return this.http.post(`${environment.authUrl}register`,
      {
        "username": form.username,
        "password": form.password,
        "verifyPassword": form.verifyPassword,
        "email": form.email,
        "nombre": form.nombre + ' ' + form.apellidos
      }, httpOptions);
  }

  login(username: string, password: string): Observable<any> {
    //return this.http.post(AUTH_API + 'signin', {
    return this.http.post(`${environment.authUrl}login`, {
      username,
      password
    });
  }

  isAdmin(): boolean{
    if (inject(TokenStorageService).getUser().role === 'ROLE_ADMIN') return true;

    return false;
  }
}

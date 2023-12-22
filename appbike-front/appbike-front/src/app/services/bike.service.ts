import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bike, BikeListResponse } from '../models/bike-list.interface';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { NewBikeResponse } from '../models/new-bike.interface';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http: HttpClient) { }

  getBikeListForAdmin(page: number): Observable<BikeListResponse> {
    return this.http.get<BikeListResponse>(`${environment.apiBaseUrl}admin/bikes/paged?page=${page}`);
  }

  getBikeListForAdminWithouPageable(): Observable<Bike[]> {
    return this.http.get<Bike[]>(`${environment.apiBaseUrl}admin/bikes`);
  }
  getBikeListForStation(idEstacion: String): Observable<Bike[]> {
    return this.http.get<Bike[]>(`${environment.apiBaseUrl}bikes/station/${idEstacion}/bikes`);
  }

  getBikeByUuid(uuid: String): Observable<Bike> {
    return this.http.get<Bike>(`${environment.apiBaseUrl}bikes/${uuid}`);
  }

  getBikeByName(name: String): Observable<Bike> {
    return this.http.get<Bike>(`${environment.apiBaseUrl}bikes/byname/${name}`);
  }

  rentBikeForStation(idBicicleta: string): Observable<Bike[]> {
    return this.http.get<Bike[]>(`${environment.apiBaseUrl}bikes/rent/${idBicicleta}`);
  }

  createNewBike(bikeData: NewBikeResponse): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}admin/bikes/add`, bikeData)
  }

  editBike(name: String, bikeData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}admin/bikes/edit/${name}`, bikeData);
  }
  deleteBikeByName(name: String) {
    return this.http.delete(`${environment.apiBaseUrl}admin/bikes/delete/${name}`)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station } from '../models/list-all-stations';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StationsService {


  constructor(private http: HttpClient) { }

  createStation(stationData: any) {
    return this.http.post('http://localhost:8080/admin/add', stationData);
  }

  getAllStations(): Observable<Station[]> {
    return this.http.get<Station[]>(`http://localhost:8080/stations/get`)
  }

  deleteStation(naturalId: number) {
    return this.http.delete(`http://localhost:8080/admin/delete/${naturalId}`)
  }

  editStation(naturalId: number, stationData: any) {
    return this.http.put(`http://localhost:8080/admin/edit/${naturalId}`, stationData);
  }

  isStationAvailable(stationId: number): Observable<boolean> {
    return this.getAllStations().pipe(
      map((stations) => {
        const station = stations.find((s) => s.number === stationId);
        return station ? station.bikes < station.capacity : false;
      })
    );
  }

  getStationById(id: string): Observable<Station> {
    return this.http.get<Station>(`${environment.apiBaseUrl}stations/get/${id}`);
  }
}

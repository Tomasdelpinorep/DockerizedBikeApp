import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { UsoBegin, UsoListResponse, UsoResponse } from '../models/uso.interface';
import { CostResponse } from '../models/cost.interface';
import { UseListResponse } from '../models/use-list.inteface';

@Injectable({
    providedIn: 'root'
})
export class UsoService {

    constructor(private http: HttpClient) { }

    beginUso(idBicicleta: string): Observable<UsoBegin> {
        return this.http.post<UsoBegin>(`${environment.apiBaseUrl}bikes/rent/${idBicicleta}`, null);
    }

    getLastUso(): Observable<UsoResponse> {
        return this.http.get<UsoResponse>(`${environment.apiBaseUrl}use/last-use`)
    }

    getActiveUse(): Observable<UsoResponse> {
        return this.http.get<UsoResponse>(`${environment.apiBaseUrl}use/active`)
    }

    finishUse(IdEstacion: string): Observable<UsoResponse> {
        return this.http.post<UsoResponse>(`${environment.apiBaseUrl}use/finish/${IdEstacion}`, null);
    }

    getCurrentCost(): Observable<CostResponse> {
        return this.http.get<CostResponse>(`${environment.apiBaseUrl}cost/current`);
    }

    getUseListAdmin(page: number): Observable<UseListResponse> {
        return this.http.get<UseListResponse>(`${environment.apiBaseUrl}admin/travels?page=${page}`);
    }

    editUse(id: string, use: any): Observable<UsoResponse> {
        return this.http.put<UsoResponse>(`${environment.apiBaseUrl}admin/edit-use/${id}`,
            {
                "coste": use.coste
            })
    }

    getUsosByUser(userId: string, currentPage: number): Observable<UsoListResponse>{
        return this.http.get<UsoListResponse>(`${environment.apiBaseUrl}use/${userId}?page=${currentPage}`);  
    }
}
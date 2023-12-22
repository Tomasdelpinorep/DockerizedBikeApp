import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TiempoTranscurridoService {
    private contadorIniciadoSource = new Subject<boolean>();
    private contadorDetenidoSource = new Subject<boolean>();
    private tiempoTranscurridoSource = new BehaviorSubject<string>('00:00:00');
    contadorIniciado$ = this.contadorIniciadoSource.asObservable();
    contadorDetenido$ = this.contadorDetenidoSource.asObservable();
    tiempoTranscurrido$ = this.tiempoTranscurridoSource.asObservable();

    actualizarTiempoTranscurrido(tiempo: string) {
        this.tiempoTranscurridoSource.next(tiempo);
    }

    iniciarContador() {
        this.contadorIniciadoSource.next(true);
    }

    detenerContador() {
        this.contadorDetenidoSource.next(true);
    }
}
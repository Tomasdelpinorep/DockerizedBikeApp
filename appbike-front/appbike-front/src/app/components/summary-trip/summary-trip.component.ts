import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { UsoResponse } from '../../models/uso.interface';

@Component({
  selector: 'app-summary-trip',
  templateUrl: './summary-trip.component.html',
  styleUrl: './summary-trip.component.css'
})
export class SummaryTripComponent {

  @Input() use!: UsoResponse;


  formatDate(fecha: string): string {
    const DateFormat = new Date(fecha)
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return DateFormat.toLocaleString('es-ES', options).replace('/ /g', ' - ');
  }

  getInterval(initDateStr: string, finalDateStr: string): string {
    const initDate = new Date(initDateStr);
    const finalDate = new Date(finalDateStr);
    const diffEnMilisegundos = finalDate.getTime() - initDate.getTime();
    const diffEnSegundos = diffEnMilisegundos / 1000;

    const horas = Math.floor(diffEnSegundos / 3600);
    const minutos = Math.floor((diffEnSegundos % 3600) / 60);
    const segundos = Math.floor(diffEnSegundos % 60);

    const horasStr = this.formatTwoDigits(horas);
    const minutosStr = this.formatTwoDigits(minutos);
    const segundosStr = this.formatTwoDigits(segundos);

    return `${horasStr}:${minutosStr}:${segundosStr}`;
  }

  formatTwoDigits(valor: number): string {
    return valor < 10 ? `0${valor}` : `${valor}`;
  }
}

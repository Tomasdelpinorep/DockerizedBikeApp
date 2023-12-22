import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bike } from '../../models/bike-list.interface';

@Component({
  selector: 'app-bike-item-by-station',
  templateUrl: './bike-item-by-station.component.html',
  styleUrl: './bike-item-by-station.component.css'
})
export class BikeItemByStationComponent {

  @Input() bike!: Bike;
  @Output() bikeClick = new EventEmitter<String>

  rent() {
    this.bikeClick.emit(this.bike.uuid);
  }

}

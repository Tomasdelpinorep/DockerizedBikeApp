import { Component, Input } from '@angular/core';
import { Bike } from '../../models/bike-list.interface';

@Component({
  selector: 'app-bike-card-resume-trip',
  templateUrl: './bike-card-resume-trip.component.html',
  styleUrl: './bike-card-resume-trip.component.css'
})
export class BikeCardResumeTripComponent {

  @Input() bike!: Bike;

}

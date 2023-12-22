import { Component, OnInit, inject, signal } from '@angular/core';
import { Bike } from '../../models/bike-list.interface';
import { BikeService } from '../../services/bike.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsoService } from '../../services/uso.service';
import { UsoBegin } from '../../models/uso.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { StationsService } from '../../services/stations.service';
import { StationResponse } from '../../models/list-stations.interface';


@Component({
  selector: 'app-bike-list-by-station',
  templateUrl: './bike-list-by-station.component.html',
  styleUrl: './bike-list-by-station.component.css'
})
export class BikeListByStationComponent implements OnInit {

  bikeList: Bike[] = [];
  bikeDetails!: Bike;
  countBikes: number = 0;
  uso!: UsoBegin;
  errorRent = false;
  errorBalance = false;
  isLoading = true;
  route: ActivatedRoute = inject(ActivatedRoute);
  stationId!: string;
  station!: StationResponse;

  constructor(private bikeService: BikeService, private modalService: NgbModal, private usoService: UsoService, private router: Router, private stationService: StationsService, private sanitazer: DomSanitizer) {
    this.stationId = String(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.bikeService.getBikeListForStation(this.stationId).subscribe({
      next: resp => {
        this.bikeList = resp
        this.countBikes = resp.length;
        this.isLoading = false
      }, error: err => {
        this.router.navigate(['/page-404'])
      }
    })
    this.stationService.getStationById(this.stationId).subscribe(resp => {
      this.station = resp;
    })

  }

  openModal(uuid: String, modal: any) {
    this.bikeService.getBikeByUuid(uuid).subscribe(resp => {
      this.bikeDetails = resp;
    })
    this.modalService.open(modal, {
      keyboard: false,
      centered: true
    })
  }

  rent() {
    this.usoService.beginUso(this.bikeDetails.uuid).pipe(
      catchError(error => {
        if (error.error.title === "Already in use") {
          this.errorRent = true;
        }
        if (error.error.title === "Not enough balance") {
          this.errorBalance = true;
        }
        return [];
      })
    ).subscribe(
      resp => {
        this.errorRent = false;
        this.errorBalance = false;
        this.router.navigate(['/use/trip']);
      }
    );
  }

  getBikeListLenght() {
    if (this.bikeList.length != null) {
      return this.bikeList.length
    }
    return 0
  }


}

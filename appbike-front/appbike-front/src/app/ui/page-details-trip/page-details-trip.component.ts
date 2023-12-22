import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UsoService } from '../../services/uso.service';
import { UsoResponse } from '../../models/uso.interface';
import { Bike } from '../../models/bike-list.interface';
import { BikeService } from '../../services/bike.service';
import { error } from 'console';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-page-details-trip',
  templateUrl: './page-details-trip.component.html',
  styleUrl: './page-details-trip.component.css'
})
export class PageDetailsTripComponent implements OnInit {


  useId!: number;
  use!: UsoResponse;
  bike!: Bike;
  bikeName!: string;
  isLoading = true;

  constructor(private useService: UsoService, private bikeService: BikeService, private router: Router, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    console.log(this.tokenStorage.getUser())
    this.useService.getLastUso().subscribe({
      next: data => {
        this.use = data;
        this.bikeName = data.bicicleta;

        this.bikeService.getBikeByName(this.bikeName).subscribe(resp => {
          this.bike = resp;
        })
        this.isLoading = false;
      }, error: err => {
        if (err.status == 404) {
          this.router.navigate(['/page-404'])
        }
      }
    })
  }



}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { Bike, Estado } from '../../models/bike-list.interface';
import { BikeService } from '../../services/bike.service';
import { Station } from '../../models/list-all-stations';
import { Observable, map, startWith } from 'rxjs';
import { StationsService } from '../../services/stations.service';
import { FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NewBikeResponse } from '../../models/new-bike.interface';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-bike-list',
  templateUrl: './bike-list.component.html',
  styleUrl: './bike-list.component.css',
})
export class BikeListComponent implements OnInit {

  listBikes: Bike[] = [];
  selectedBike!: Bike;
  countBikes: number = 0;
  currentPage: number = 1;
  stations: Station[] = [];
  myControl = new FormControl<string | Station>('');
  private modalRef: NgbModalRef | undefined;

  formBike: any = {
    nombre: null,
    marca: null,
    modelo: null,
    estado: null,
    estacion: null
  }

  formEditBike: any = {
    nombre: null,
    marca: null,
    modelo: null,
    estado: null,
    estacion: null
  }

  formBikea: any;
  messageOfError!: string;
  messageOfNameDuplicated: string = '';
  messageOfStationFull: string = '';
  closeResult = '';

  constructor(private bikeService: BikeService, private stationService: StationsService, private modalService: NgbModal, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.bikeService.getBikeListForAdmin(this.currentPage - 1).subscribe(resp => { //Se le resta uno a la página actual ya que el ngb-pagination empieza por uno cuando en la API empezamos por 0
      this.listBikes = resp.content;
      this.countBikes = resp.totalElements;
      this.currentPage = resp.number;
    });
  }

  loadNewPage(): void {
    this.bikeService.getBikeListForAdmin(this.currentPage - 1).subscribe(resp => {
      this.listBikes = resp.content;
      this.countBikes = resp.totalElements;
    });
  }


  openForm(content: TemplateRef<any>) {
    this.stationService.getAllStations().subscribe(resp => {
      this.stations = resp;
    });
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    });
  }

  openEditModal(content: any, bike: Bike) {
    this.stationService.getAllStations().subscribe(resp => {
      this.stations = resp;

      const estacionSeleccionada = this.stations.find(station => station.name === bike.estacion);

      this.selectedBike = bike;
      this.formEditBike = {
        nombre: bike.nombre,
        marca: bike.marca,
        modelo: bike.modelo,
        estado: bike.estado,
        estacion: estacionSeleccionada ? estacionSeleccionada.number : null
      };
      this.modalRef = this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title'
      });
    });
  }

  private _filter(name: string): Station[] {
    const filterValue = name.toLowerCase();
    return this.stations.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    this.messageOfStationFull = '';
    this.bikeService.getBikeListForAdminWithouPageable().subscribe({
      next: bikeList => {
        const bikeNames = bikeList.map(bike => bike.nombre);
        const newBikeName = this.formBike.nombre;
        if (bikeNames.includes(newBikeName)) {
          this.messageOfNameDuplicated = 'Error: Ya existe una bicicleta con este nombre.';
        } else {
          this.bikeService.createNewBike(this.formBike).subscribe({
            next: data => {
              this.modalService.dismissAll();
              this.messageOfNameDuplicated = '';
              this.formBike.nombre = ''
              this.formBike.marca = ''
              this.formBike.modelo = ''
              this.snackBar.open('Bicicleta añadida correctamente', 'Cerrar', {
                duration: 3000,
              });
              this.loadNewPage();
            },
            error: err => {
              if (err.status === 400) {
                this.messageOfStationFull = 'Error: Esa estación ya esta completa de bicicletas';
              } else {
                this.messageOfError = err.error.message;
              }
            }
          });
          this.messageOfNameDuplicated = '';
        }
      }
    });
  }

  edit() {
    this.messageOfStationFull = '';
    if (this.selectedBike) {
      if (this.selectedBike) {
        this.bikeService.editBike(this.selectedBike.nombre, this.formEditBike).subscribe({
          next: data => {
            this.modalService.dismissAll();
            this.snackBar.open('Bicicleta editada correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.loadNewPage();
          },
          error: err => {
            if (err.status === 400) {
              this.messageOfStationFull = 'Error: Esa estación ya esta completa de bicicletas';
            } else {
              this.messageOfError = err.error.message;
            }
          }
        });
      }
    }
  }

  displayFn(station: Station): string {
    return station.name && station ? station.name : '';
  }

  takeFormResults() {
    const newBike: NewBikeResponse = {
      nombre: this.formBike.name,
      marca: this.formBike.marca,
      modelo: this.formBike.modelo,
      estacion: this.formBike.station == null ? null : this.formBike.station,
      estado: this.formBike.condition
    };
    return newBike;
  }

  getConditionEnumValues(): string[] {
    return Object.values(Estado);
  }

  openPopDelete(content: any, bike: Bike) {

    this.selectedBike = bike;
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title'
    });
  }


  delete(name: String) {
    this.bikeService.deleteBikeByName(name).subscribe({
      next: data => {
        this.modalService.dismissAll();
        this.snackBar.open('Bicicleta eliminada correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.loadNewPage();
      }
    });
  }
}
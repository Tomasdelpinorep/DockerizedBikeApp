import { Component, ViewChild } from '@angular/core';
import { StationsService } from '../../services/stations.service';
import { Station } from '../../models/list-all-stations';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { response } from 'express';
@Component({
  selector: 'app-list-admin-stations',
  templateUrl: './list-admin-stations.component.html',
  styleUrls: ['./list-admin-stations.component.css']
})
export class ListAdminStationsComponent {


  stationData = {
    nombre: '',
    coordenadas: '',
    capacidad: 0
  };
  capacityNumbers = Array.from({ length: 31 }, (_, i) => i );
  private modalRef: NgbModalRef | undefined;
  selectedStation: Station | undefined;
  stations: Station[] = [];
  stationForm: any;

  constructor(private stationService: StationsService, private modalService: NgbModal, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.loadNewPage();
  }

  openModal(content: any) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-title'
    });
  }

  openEditModal(content: any, station: Station) {
    this.selectedStation = station;
    this.stationData = {
      nombre: station.name,
      coordenadas: station.coordinates,
      capacidad: station.capacity
    };
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-title' });
    this.stationForm.resetForm(this.stationData);
  }



  clearFormData() {
    this.selectedStation = undefined;
    this.stationData = {
      nombre: '',
      coordenadas: '',
      capacidad: 0
    };
  }

  closeModal() {
    this.modalService.dismissAll();
    this.clearFormData();
  }

  loadNewPage() {
    this.stationService.getAllStations().subscribe(resp => {
      this.stations = resp;
    });
  }

  submitForm() {
    this.stationData.capacidad = +this.stationData.capacidad;

    if (this.selectedStation) {
      this.stationService.editStation(this.selectedStation.number, this.stationData).subscribe(
        (response) => {
          console.log('La estación se ha editado con éxito:', response);
          this.loadNewPage();
          this.closeModal();
        },
        (error) => {
          console.error('Hubo un error al editar la estación:', error);
        }
      );
    } else {
      this.stationService.createStation(this.stationData).subscribe(
        (response) => {
          console.log('La estación se ha creado con éxito:', response);
          this.loadNewPage();
          this.closeModal();
        },
        (error) => {
          console.error('Hubo un error al crear la estación:', error);
        }
      );
    }
  }
  edit() {
    if (this.selectedStation) {
      this.stationService.editStation(this.selectedStation.number, this.stationData).subscribe(
        (response) => {
          console.log('La estación se ha editado con éxito:', response);
          this.clearFormData();
          this.loadNewPage();
          this.closeModal();
        },
        (error) => {
          console.error('Hubo un error al editar la estación:', error);
        }
      );
    }
  }
  delete(naturalId: number) {
    this.stationService.deleteStation(naturalId).subscribe(
      (response) => {
        console.log('La estación se ha borrado con éxito:', response);
        this.loadNewPage();
      },
      (error) => {
        alert("No se puede borrar una estación que tiene bicicletas asociadas. Por favor, cambie las bicis de estación primero.")
        console.error('Hubo un error al borrar la estación:', error);
      }
    );
  }

}
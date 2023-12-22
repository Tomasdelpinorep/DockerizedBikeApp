import { Component, OnInit } from '@angular/core';
import { UsoService } from '../../services/uso.service';
import { Use } from '../../models/use-list.inteface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'console';

@Component({
  selector: 'app-travels-table',
  templateUrl: './travels-table.component.html',
  styleUrl: './travels-table.component.css'
})
export class TravelsTableComponent implements OnInit {

  useList: Use[] = []
  currentPage: number = 0;
  countUses = 0;
  pageForPagination = 1;
  inTrip = false;
  useDetails = {
    id: '',
    fechaInicio: '',
    fechaFin: '',
    coste: 0,
    estacionFin: '',
    bicicleta: '',
    usuario: ''
  };
  f: any;
  selectedUse!: Use;

  constructor(private useService: UsoService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadNewPage()
  }

  loadNewPage(): void {
    this.useService.getUseListAdmin(this.currentPage).subscribe(resp => {
      this.useList = resp.content;
      this.countUses = resp.totalElements;
      this.currentPage = resp.pageNumber;
      this.pageForPagination = this.currentPage + 1;
    });
  }

  formatDate(fecha: string): string {
    const DateFormat = new Date(fecha)
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const result = DateFormat.toLocaleString('es-ES', options).replace('/ /g', ' - ');
    if (result === '01/01/1970, 01:00:00') {
      this.inTrip = true;
      return 'Unfinished';
    }
    this.inTrip = false;
    return result;
  }

  openModal(content: any, use: Use) {
    this.selectedUse = use;
    this.useDetails = {
      id: use.id,
      fechaInicio: use.fechaInicio,
      fechaFin: use.fechaFin,
      coste: use.coste,
      estacionFin: use.estacionFin,
      bicicleta: use.bicicleta,
      usuario: use.usuario
    };
    this.modalService.open(content, { ariaLabelledBy: 'modal-title' });
    this.f.resetForm(this.useDetails);
  }

  onSubmit() {
    this.useService.editUse(this.selectedUse.id, this.useDetails).subscribe({
      next: data => {
        this.loadNewPage();
        this.modalService.dismissAll()
      },
      error: err => {
        console.error('Hubo un error al editar la estación:', err);
      }
    }
    );
  }
}




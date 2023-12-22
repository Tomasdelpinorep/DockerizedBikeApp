
import { IssuesService } from '../../services/issues.service';
import { Issue } from '../../models/issues.interface';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Station } from '../../models/list-all-stations';
import { StationsService } from '../../services/stations.service';
import { Component, Input, NgModule, OnInit, TemplateRef, inject } from '@angular/core';
import { WorkerService } from '../../services/worker.service';
import { forkJoin } from 'rxjs';
import { Workerr } from '../../models/worker.interface';
import { NewIssue } from '../../models/new-issue.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-issues-page',
  templateUrl: './admin-issues-page.component.html',
  styleUrl: './admin-issues-page.component.css'
})
export class AdminIssuesPageComponent implements OnInit {
  constructor(private issueService: IssuesService, private stationService: StationsService,
    private workerService: WorkerService, private modalService: NgbModal, private datePipe: DatePipe, private fb: FormBuilder) { }

  issueList: Issue[] = [];
  closeResult = '';
  stationList: Station[] = [];
  workerList: Workerr[] = [];
  errorMessage!: string;

  form: any = {
    deadline: null,
    note: null,
    station: null,
    worker: null
  };

  ngOnInit(): void {
    this.issueService.getAll().subscribe(resp => {
      this.issueList = resp.content;
    })
  }

  setAsDone(issue: Issue) {
    issue.estado = "FINISHED"
    issue.fechaRealizacion = this.datePipe.transform(Date.now(), "yyyy-MM-dd");
    this.issueService.setAsDone(issue).subscribe(resp => {
      window.location.reload();
    })
  }

  deleteIssue(id: number) {
    this.issueService.delete(id).subscribe(resp => {
      window.location.reload();
    });
  }

  open(content: TemplateRef<any>) {
    const stationRequest = this.stationService.getAllStations();
    const workerRequest = this.workerService.getAll();

    forkJoin([workerRequest, stationRequest]).subscribe(resp => {
      this.workerList = resp[0];
      this.stationList = resp[1];
      console.log(resp[0])

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );

    })
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  onSubmit() {
    this.modalService.dismissAll();
    this.issueService.createNewIssue(this.formToIssue()).subscribe({
      next: data => {
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(err);
      }
    });
    window.location.reload();
  }

  formToIssue() {
    const newIssue: NewIssue = {
      fechaProgramada: this.JSDateToUsableDate(this.form.deadline),
      anotaciones: this.form.note,
      nombreEstacion: this.form.station,
      nombreTrabajador: this.form.worker,
      estado: "IN_PROGRESS"
    };

    return newIssue;
  }

  JSDateToUsableDate(crapDate: any) {
    const year = crapDate.year;
    const month = crapDate.month.toString().padStart(2, '0');;
    const day = crapDate.day.toString().padStart(2, '0');;
    return `${year}-${month}-${day}`;
  }

  crapDateToUsableDate(crapDate: any) {
    return this.datePipe.transform(crapDate, "yyyy-MM-dd");
  }

  isOnTime(issue: Issue) {
    if (issue.fechaProgramada && issue.fechaRealizacion) {
      return new Date(issue.fechaRealizacion) <= new Date(issue.fechaProgramada);
    }

    return true;
  }

  isFinished(issue: Issue) {
    if (issue.estado == "FINISHED") return true;

    return false;
  }

  isDeadlineEarlier(crapDeadline: any) {
    const usableDeadline = this.crapDateToUsableDate(crapDeadline);
    console.log(usableDeadline);
  }

  showNotes(notes: string) {
    if(notes == null) notes = "There are no notes for this issue."

    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.notes = notes;
  }
  
}


@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Notes</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p>{{notes}}</p>
		</div>
	`,
})
export class NgbdModalContent {
	activeModal = inject(NgbActiveModal);

	@Input() notes: string | undefined;
}


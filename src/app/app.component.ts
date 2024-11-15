import { Component, OnInit } from '@angular/core';
import { NomDuServiceService } from './nom-du-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { etudiant } from './Etudiant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tpfoyerFront';
  form: boolean = false;
  closeResult!: string;
  listetudiants: any;
  etudiant!: any;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private etudiantService: NomDuServiceService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAlletudiant();
    this.etudiant = {
      idEtudiant: null,
      nomEtudiant: null,
      prenomEtudiant: null,
      cinEtudiant: null,
      dateNaissance: null,
    };
  }

  getAlletudiant() {
    return this.etudiantService.getAlletudiant().subscribe(res => {
      this.listetudiants = res;
    });
  }

  addetudiant(c: any) {
    this.etudiantService.addetudiant(c).subscribe(() => {
      this.getAlletudiant();
      this.form = false;
      this.showMessage('Étudiant ajouté avec succès!', 'success');
    }, () => {
      this.showMessage("Erreur lors de l'ajout de l'étudiant.", 'error');
    });
  }

  deleteEtudiant(id: number) {
    this.etudiantService.deleteEtudiant(id).subscribe(() => {
      this.getAlletudiant();
      this.showMessage('Étudiant supprimé avec succès!', 'success');
    }, () => {
      this.showMessage("Erreur lors de la suppression de l'étudiant.", 'error');
    });
  }

  showMessage(message: string, type: string) {
    if (type === 'success') {
      this.successMessage = message;
    } else if (type === 'error') {
      this.errorMessage = message;
    }

    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
    }, 3000);
  }

  closeAlert() {
    this.successMessage = null;
    this.errorMessage = null;
  }

  open(content: any, action: any) {
    if (action != null) {
      this.etudiant = action;
    } else {
      this.etudiant = new etudiant();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  cancel() {
    this.form = false;
  }
}

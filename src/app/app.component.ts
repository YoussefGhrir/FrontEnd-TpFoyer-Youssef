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
  etudiant!:any;

  constructor(private etudiantService: NomDuServiceService, private modalService: NgbModal ) { }

  ngOnInit(): void {
    this.getAlletudiant();
    this.etudiant={
      
      idEtudiant: null,  
      nomEtudiant: null,
      prenomEtudiant: null,  
      cinEtudiant: null,
      dateNaissance: null,
    }
  }

  getAlletudiant(){
    return this.etudiantService.getAlletudiant().subscribe(res=>{
      this.listetudiants = res;
    });
  }
  addetudiant(c: any) {
    this.etudiantService.addetudiant(c).subscribe(() => {
      this.getAlletudiant();
      this.form = false;
    });
  }

  open(content: any, action: any) {
    if (action != null)
      this.etudiant = action
    else
      this.etudiant = new etudiant();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
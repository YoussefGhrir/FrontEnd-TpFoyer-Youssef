import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { etudiant } from './Etudiant';

@Injectable({
  providedIn: 'root'
})
export class NomDuServiceService {

 
  readonly API_URL = 'http://192.168.1.200:8082/tpFoyer17/api/etudiant';

  constructor(private httpClient: HttpClient) { }
  getAlletudiant() {
    return this.httpClient.get(`${this.API_URL}/retrieveAllEtudiants`)
  }
  addetudiant(etudiant : any) {
    return this.httpClient.post(`${this.API_URL}/addEtudiants`, etudiant)
  }
  
}
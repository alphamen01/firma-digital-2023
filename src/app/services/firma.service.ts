import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Firma } from '../models/firma.model';

@Injectable({
  providedIn: 'root'
})
export class FirmaService {
  private baseApiURL: string = "https://webapifirma.azurewebsites.net/api/"
  constructor(private http: HttpClient) { }

  getAllFirmas(): Observable<Firma[]>{
    return this.http.get<Firma[]>(`${this.baseApiURL}firmasDigitales`)
    //return this.http.get<Firma[]>(this.baseApiURL + 'firmasDigitales')
  }

  getFirma(id:number): Observable<Firma>{
    return this.http.get<Firma>(`${this.baseApiURL}firmaDigital/${id}`)
  }

  deleteFirma(id:number): Observable<void>{
    return this.http.delete<void>(`${this.baseApiURL}firmaDigital/${id}`);
  }

}

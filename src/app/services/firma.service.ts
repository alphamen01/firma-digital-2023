import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Firma } from '../models/firma.model';

@Injectable({
  providedIn: 'root'
})
export class FirmaService {
  // private baseApiURL: string = "https://webapifirma.azurewebsites.net/api/"
  private baseApiURL: string = "https://localhost:7048/api/"
  constructor(private http: HttpClient) { }

  getAllFirmas(): Observable<Firma[]>{
    return this.http.get<Firma[]>(`${this.baseApiURL}firmas`)
    //return this.http.get<Firma[]>(`${this.baseApiURL}firmasDigitales`)
    //return this.http.get<Firma[]>(this.baseApiURL + 'firmasDigitales')
  }

  getFirma(id:number): Observable<Firma>{
    return this.http.get<Firma>(`${this.baseApiURL}firma/${id}`)
    //return this.http.get<Firma>(`${this.baseApiURL}firmaDigital/${id}`)
  }

  deleteFirma(id:number): Observable<void>{
    return this.http.delete<void>(`${this.baseApiURL}firma/${id}`);
    //return this.http.delete<void>(`${this.baseApiURL}firmaDigital/${id}`);
  }

  postFirma(firma: FormData): Observable<Firma> {
    const headers = new HttpHeaders();
    headers.append('Accept', '*/*');
    return this.http.post<Firma>(`${this.baseApiURL}firmaDigitalA`, firma, {headers});
  }
 
}

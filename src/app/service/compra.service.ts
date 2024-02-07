import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compra } from '../model/compra';
import { Barra } from '../model/barra';
import { Traslado } from '../model/traslado';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  apiUrl: string = "http://localhost:8080/compra";

  constructor(private httpClient: HttpClient) {}
 
  obtenerCompraPorId(id: number): Observable<Compra> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Compra>(url);
  }

  comprasNoFundidas():Observable<Compra[]>{
    return this.httpClient.get<Compra[]>(`${this.apiUrl}/unmelted`);
  }

  barrasNoTrasladadas():Observable<Barra[]>{
    return this.httpClient.get<Barra[]>(`${this.apiUrl}/notransferred`);
  }

  insertarCompra(compra: Compra): Observable<Compra> {
    return this.httpClient.post<Compra>(`${this.apiUrl}/new`, compra);
  }

  fundirCompra(barra: Barra, ids: number[]): Observable<Barra> {
    const url = `${this.apiUrl}/fundir`;

    const fundirRequest = {
      barra: barra,
      ids: ids
    };

    return this.httpClient.post<Barra>(url, fundirRequest);

  }

  trasladarBarra(traslado: Traslado, ids: number[]): Observable<Traslado> {
    const trasladoRequest = {
      traslado: traslado,
      ids: ids
    };

    return this.httpClient.post<Traslado>(`${this.apiUrl}/trasladar`, trasladoRequest);
  }

}

import { Injectable, inject } from '@angular/core';
import { Minero, Persona } from '../model/minero';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MineroService {
  apiUrl: string = "http://localhost:8080/minero";

  constructor() { }

  private httpClient =  inject(HttpClient)

  obtenerMineros(): Observable<Minero[]> {
    return this.httpClient.get<Minero[]>(this.apiUrl);
  }

  obtenerCompraPorCedula(cedula: string): Observable<Persona> {
    const url = `${this.apiUrl}/${cedula}`;
    return this.httpClient.get<Persona>(url);
  }

  obtenerMineroPorId(id: number): Observable<Minero> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Minero>(url);
  }

  insertarMinero(minero: Minero): Observable<Minero> {
    console.log("metodo insertar")
    return this.httpClient.post<Minero>(this.apiUrl, minero)
    .pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return throwError(error); // Puedes manejar el error de otra manera si lo prefieres
      })
    );
    ;
  
  
  }

  actualizarMinero(minero: Minero): Observable<Minero> {
    const url = `${this.apiUrl}/${minero.id}`;
    return this.httpClient.put<Minero>(url, minero);
  }

  eliminarMinero(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(url);
  }

}

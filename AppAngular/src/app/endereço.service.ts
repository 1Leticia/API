import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereço } from './Model/Endereço';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',

    @Injectable({
      providedIn: 'root'
    })
export class EndereçoService {
  url = 'https://localhost:5001/api/endereço'

  constructor(private http: HttpClient) { }

  PegarTodos(): Observable<Endereço[]> {
    return this.http.get<Endereço[]>(this.url);
  }

  PegarPeloId(endereçoId: number): Observable<Endereço> {
    const apiUrl = `${this.url}/${endereçoId}`;
    return this.http.get<Endereço>(apiUrl);
  }

  SalvarEndereço(endereço: Endereço): Observable<any> {
    return this.http.post<Endereço>(this.url, endereço, httpOptions);
  }

  AtualizarEndereço(endereço: Endereço): Observable<any> {
    return this.http.put<Endereço>(this.url, endereço, httpOptions);
  }

  ExcluirEndereço(endereçoId: number): Observable<any> {
    const apiUrl = `${this.url}/${endereçoId}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
   
}

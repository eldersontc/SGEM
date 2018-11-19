import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListaRetorno } from '../generico/generico';
import { ICargo } from './cargo';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  private apiURL = this.baseUrl + 'api/cargos';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getCargos(params): Observable<IListaRetorno<ICargo>> {
    return this.http.post<IListaRetorno<ICargo>>(this.apiURL + '/GetCargos', params);
  }

  getAll(): Observable<ICargo[]> {
    return this.http.get<ICargo[]>(this.apiURL + '/GetAll');
  }

  getCargo(params): Observable<ICargo> {
    return this.http.get<ICargo>(this.apiURL + '/' + params);
  }

  createCargo(params: ICargo): Observable<boolean> {
    return this.http.post<boolean>(this.apiURL, params);
  }

  updateCargo(params: ICargo): Observable<boolean> {
    return this.http.put<boolean>(this.apiURL + '/' + params.id, params);
  }

  deleteCargo(params): Observable<boolean> {
    return this.http.delete<boolean>(this.apiURL + '/' + params);
  }
}

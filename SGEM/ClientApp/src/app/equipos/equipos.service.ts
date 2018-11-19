import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListaRetorno } from '../generico/generico';
import { IEquipo } from './equipo';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  private apiURL = this.baseUrl + 'api/equipos';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getEquipos(params): Observable<IListaRetorno<IEquipo>> {
    return this.http.post<IListaRetorno<IEquipo>>(this.apiURL + '/GetEquipos', params);
  }

  getEquipo(params): Observable<IEquipo> {
    return this.http.get<IEquipo>(this.apiURL + '/' + params);
  }

  createEquipo(params: IEquipo): Observable<boolean> {
    return this.http.post<boolean>(this.apiURL, params);
  }

  updateEquipo(params: IEquipo): Observable<boolean> {
    return this.http.put<boolean>(this.apiURL + '/' + params.id, params);
  }

  deleteEquipo(params): Observable<boolean> {
    return this.http.delete<boolean>(this.apiURL + '/' + params);
  }
}

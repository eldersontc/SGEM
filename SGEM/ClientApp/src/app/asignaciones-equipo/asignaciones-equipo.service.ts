import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListaRetorno } from '../generico/generico';
import { IAsignacionEquipo } from './asignacion-equipo';

@Injectable({
  providedIn: 'root'
})
export class AsignacionesEquipoService {

  private apiURL = this.baseUrl + 'api/asignacionesequipo';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getAsignacionesEquipo(params): Observable<IListaRetorno<IAsignacionEquipo>> {
    return this.http.post<IListaRetorno<IAsignacionEquipo>>(this.apiURL + '/GetAsignacionesEquipo', params);
  }

  getAsignacionEquipo(params): Observable<IAsignacionEquipo> {
    return this.http.get<IAsignacionEquipo>(this.apiURL + '/' + params);
  }

  createAsignacionEquipo(params: IAsignacionEquipo): Observable<boolean> {
    return this.http.post<boolean>(this.apiURL, params);
  }

  updateAsignacionEquipo(params: IAsignacionEquipo): Observable<boolean> {
    return this.http.put<boolean>(this.apiURL + '/' + params.id, params);
  }

  deleteAsignacionEquipo(params): Observable<boolean> {
    return this.http.delete<boolean>(this.apiURL + '/' + params);
  }

  approveAsignacionEquipo(params: IAsignacionEquipo): Observable<boolean> {
    return this.http.put<boolean>(this.apiURL + '/Aprobar/' + params.id, params);
  }
}

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListaRetorno } from '../generico/generico';
import { ICompraEquipo } from './compra-equipo';

@Injectable({
  providedIn: 'root'
})
export class ComprasEquipoService {

  private apiURL = this.baseUrl + 'api/comprasequipo';

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getComprasEquipo(params): Observable<IListaRetorno<ICompraEquipo>> {
    return this.http.post<IListaRetorno<ICompraEquipo>>(this.apiURL + '/GetComprasEquipo', params);
  }

  getCompraEquipo(params): Observable<ICompraEquipo> {
    return this.http.get<ICompraEquipo>(this.apiURL + '/' + params);
  }

  createCompraEquipo(params: ICompraEquipo): Observable<boolean> {
    return this.http.post<boolean>(this.apiURL, params);
  }

  updateCompraEquipo(params: ICompraEquipo): Observable<boolean> {
    return this.http.put<boolean>(this.apiURL + '/' + params.id, params);
  }

  deleteCompraEquipo(params): Observable<boolean> {
    return this.http.delete<boolean>(this.apiURL + '/' + params);
  }
}

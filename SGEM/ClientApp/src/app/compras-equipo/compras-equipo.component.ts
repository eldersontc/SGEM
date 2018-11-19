import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { ICompraEquipo } from './compra-equipo';
import { IFiltro, IListaRetorno, ILogin } from '../generico/generico';
import { ComprasEquipoService } from './compras-equipo.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-compras-equipo',
  templateUrl: './compras-equipo.component.html',
  styleUrls: ['./compras-equipo.component.css']
})
export class ComprasEquipoComponent implements OnInit {

  @Input() extern: IFiltro[];
  @Output() select = new EventEmitter();

  pagina: number = 1;
  totalRegistros: number = 0;
  data: ICompraEquipo[];
  filtros: IFiltro[] = [];
  criterio: number = 1;
  busqueda: Date;
  seleccion: ICompraEquipo;
  login: ILogin;

  columnas: string[][] = [
    ['L', 'N° Compra'],
    ['L', 'Fecha Creación'],
    ['L', 'Creado Por'],
    ['L', 'Costo']];
  atributos: string[][] = [
    ['I', 'L', 'id'],
    ['D', 'L', 'fechaCreacion'],
    ['S', 'L', 'usuarioCreacion', 'nombre'],
    ['I', 'L', 'costo']]

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private notifier: NotifierService,
    private compraEquipoService: ComprasEquipoService) {
    this.login = this.storage.get('login');
  }

  ngOnInit() {
    this.gets();
  }

  seleccionFecha() {
    this.filtros.push({ k: this.criterio, d: this.busqueda });
    this.gets();
  }

  gets() {
    this.seleccion = undefined;
    this.compraEquipoService.getComprasEquipo({
      "Registros": 10,
      "Pagina": this.pagina,
      "filtros": this.filtros.concat(this.extern || [])
    })
      .subscribe(data => this.onGetSuccess(data),
        error => console.error(error));
  }

  seleccionar(e) {
    this.seleccion = e;
  }

  onGetSuccess(data: IListaRetorno<ICompraEquipo>) {
    this.data = data.lista;
    this.totalRegistros = data.totalRegistros
  }

  pageChange() {
    this.seleccion = undefined;
    this.gets();
  }

  delete() {
    this.compraEquipoService
      .deleteCompraEquipo(this.seleccion.id)
      .subscribe(data => this.onDeleteSuccess(),
        error => this.showError(error));
  }

  showError(error) {
    this.notifier.notify('error', error.error);
  }

  onDeleteSuccess() {
    this.seleccion = undefined;
    this.gets();
  }

}

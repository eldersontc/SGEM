import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { IAsignacionEquipo } from './asignacion-equipo';
import { IFiltro, IListaRetorno, ILogin } from '../generico/generico';
import { AsignacionesEquipoService } from './asignaciones-equipo.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NotifierService } from 'angular-notifier';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-asignaciones-equipo',
  templateUrl: './asignaciones-equipo.component.html',
  styleUrls: ['./asignaciones-equipo.component.css']
})
export class AsignacionesEquipoComponent implements OnInit {

  @Input() extern: IFiltro[];
  @Output() select = new EventEmitter();

  pagina: number = 1;
  totalRegistros: number = 0;
  data: IAsignacionEquipo[];
  filtros: IFiltro[] = [];
  criterio: number = 2;
  busqueda: string;
  busquedaFecha: Date;
  seleccion: IAsignacionEquipo;
  login: ILogin;

  columnas: string[][] = [
    ['L', 'N° Asignación'],
    ['L', 'Fecha Creación'],
    ['L', 'E. Nombres'],
    ['L', 'E. Apellidos']];
  atributos: string[][] = [
    ['I', 'L', 'id'],
    ['D', 'L', 'fechaCreacion'],
    ['S', 'L', 'empleado', 'nombres'],
    ['S', 'L', 'empleado', 'apellidos']]

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private notifier: NotifierService,
    private asignacionEquipoService: AsignacionesEquipoService,
    config: NgbModalConfig,
    private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.login = this.storage.get('login');
  }

  ngOnInit() {
    if (this.login.ci != 1) {
      this.criterio = 3;
      this.extern = [{ k: 1, v: this.login.pn, n: this.login.pi }];
    }
    this.gets();
  }

  seleccionFecha() {
    this.filtros.push({ k: this.criterio, d: this.busquedaFecha });
    this.gets();
  }

  buscar() {
    if (this.busqueda.length > 0) {
      this.filtros.push({ k: this.criterio, v: this.busqueda });
      this.busqueda = '';
      this.gets();
    }
  }

  gets() {
    this.seleccion = undefined;
    this.asignacionEquipoService.getAsignacionesEquipo({
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

  onGetSuccess(data: IListaRetorno<IAsignacionEquipo>) {
    this.data = data.lista;
    this.totalRegistros = data.totalRegistros
  }

  pageChange() {
    this.seleccion = undefined;
    this.gets();
  }

  delete() {
    this.asignacionEquipoService
      .deleteAsignacionEquipo(this.seleccion.id)
      .subscribe(data => this.onProcessSuccess(),
        error => this.showError(error));
  }

  showError(error) {
    this.notifier.notify('error', error.error);
  }

  onProcessSuccess() {
    this.seleccion = undefined;
    this.gets();
  }

  openAprobacion(content) {
    this.modalService.open(content, { centered: true, size: 'sm' })
      .result.then((result) => { if (result == 'Aprobar') { this.aprobar(); } });
  }

  aprobar() {
    this.asignacionEquipoService.approveAsignacionEquipo({
      id: this.seleccion.id,
      usuarioAprobacion: { id: this.login.i },
    })
      .subscribe(data => this.onProcessSuccess(),
        error => this.showError(error));
  }
}

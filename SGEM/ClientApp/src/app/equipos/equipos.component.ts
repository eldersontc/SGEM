import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFiltro, IListaRetorno } from '../generico/generico';
import { IEquipo } from './equipo';
import { EquiposService } from './equipos.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  @Input() extern: IFiltro[];
  @Output() select = new EventEmitter();

  pagina: number = 1;
  totalRegistros: number = 0;
  equipos: IEquipo[];
  filtros: IFiltro[] = [];
  criterio: number = 1;
  busqueda: string = '';
  seleccion: IEquipo;

  columnas: string[][] = [
    ['L', 'Nombre']];
  atributos: string[][] = [
    ['S', 'L', 'nombre']]

  constructor(private equipoService: EquiposService) { }

  ngOnInit() {
    this.getEquipos();
  }

  getEquipos() {
    this.seleccion = undefined;
    this.equipoService.getEquipos({
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

  onGetSuccess(data: IListaRetorno<IEquipo>) {
    this.equipos = data.lista;
    this.totalRegistros = data.totalRegistros
  }

  pageChange() {
    this.seleccion = undefined;
    this.getEquipos();
  }

  buscar() {
    if (this.busqueda.length > 0) {
      this.filtros.push({ k: this.criterio, v: this.busqueda });
      this.busqueda = '';
      this.getEquipos();
    }
  }

  deleteEquipo() {
    this.equipoService.deleteEquipo(this.seleccion.id).subscribe(data => this.onDeleteSuccess(),
      error => console.log(error));
  }

  onDeleteSuccess() {
    this.seleccion = undefined;
    this.getEquipos();
  }

  elegir() {
    this.select.emit(this.seleccion);
  }

  cancelar() {
    this.select.emit();
  }

}

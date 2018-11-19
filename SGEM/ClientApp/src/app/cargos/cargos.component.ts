import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFiltro, IListaRetorno } from '../generico/generico';
import { ICargo } from './cargo';
import { CargosService } from './cargos.service';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {

  @Input() extern: IFiltro[];
  @Output() select = new EventEmitter();

  pagina: number = 1;
  totalRegistros: number = 0;
  cargos: ICargo[];
  filtros: IFiltro[] = [];
  criterio: number = 1;
  busqueda: string = '';
  seleccion: ICargo;

  columnas: string[][] = [
    ['L', 'Nombre']];
  atributos: string[][] = [
    ['S', 'L', 'nombre']]

  constructor(private cargoService: CargosService) { }

  ngOnInit() {
    this.getCargos();
  }

  getCargos() {
    this.seleccion = undefined;
    this.cargoService.getCargos({
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

  onGetSuccess(data: IListaRetorno<ICargo>) {
    this.cargos = data.lista;
    this.totalRegistros = data.totalRegistros
  }

  pageChange() {
    this.seleccion = undefined;
    this.getCargos();
  }

  buscar() {
    if (this.busqueda.length > 0) {
      this.filtros.push({ k: this.criterio, v: this.busqueda });
      this.busqueda = '';
      this.getCargos();
    }
  }

  deleteCargo() {
    this.cargoService.deleteCargo(this.seleccion.id).subscribe(data => this.onDeleteSuccess(),
      error => console.log(error));
  }

  onDeleteSuccess() {
    this.seleccion = undefined;
    this.getCargos();
  }

  elegir() {
    this.select.emit(this.seleccion);
  }

  cancelar() {
    this.select.emit();
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPersona } from './persona';
import { IFiltro, IListaRetorno } from '../generico/generico';
import { PersonasService } from './personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  @Input() extern: IFiltro[];
  @Output() select = new EventEmitter();

  pagina: number = 1;
  totalRegistros: number = 0;
  personas: IPersona[];
  filtros: IFiltro[] = [];
  criterio: number = 1;
  busqueda: string = '';
  seleccion: IPersona;

  columnas: string[][] = [
    ['L', 'Cargo'],
    ['L', 'Nombres'],
    ['L', 'Apellidos'],
    ['L', 'Nro. Documento']];
  atributos: string[][] = [
    ['S', 'L', 'cargo','nombre'],
    ['S', 'L', 'nombres'],
    ['S', 'L', 'apellidos'],
    ['S', 'L', 'numeroDocumento']]

  constructor(private personaService: PersonasService) { }

  ngOnInit() {
    this.getPersonas();
  }

  getPersonas() {
    this.seleccion = undefined;
    this.personaService.getPersonas({
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

  onGetSuccess(data: IListaRetorno<IPersona>) {
    this.personas = data.lista;
    this.totalRegistros = data.totalRegistros
  }

  pageChange() {
    this.getPersonas();
  }

  buscar() {
    if (this.busqueda.length > 0) {
      this.filtros.push({ k: this.criterio, v: this.busqueda });
      this.busqueda = '';
      this.getPersonas();
    }
  }

  deletePersona() {
    this.personaService.deletePersona(this.seleccion.id).subscribe(data => this.onDeleteSuccess(),
      error => console.log(error));
  }

  onDeleteSuccess() {
    this.seleccion = undefined;
    this.getPersonas();
  }

  elegir() {
    this.select.emit(this.seleccion);
  }

  cancelar() {
    this.select.emit();
  }

}

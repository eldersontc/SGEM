import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IReporteItem, IReporte } from '../reporte';
import { ReportesService } from '../reportes.service';

@Component({
  selector: 'app-reportes-form',
  templateUrl: './reportes-form.component.html',
  styleUrls: ['./reportes-form.component.css']
})
export class ReportesFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private reporteService: ReportesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      } else {
        this.modoEdicion = true;
        this.reporteService.getReporte(params["id"])
          .subscribe(reporte => this.cargarFormulario(reporte),
            error => console.error(error));
      }
    });
  }

  modoEdicion: boolean;
  form: FormGroup;

  items: IReporteItem[] = [];
  parametro: string = '';

  tipos = ['bar', 'pie', 'line', 'doughnut', 'table'];

  ngOnInit() {
    this.form = this.fb.group({
      id: 0,
      titulo: '',
      tipoReporte: 'bar',
      flag: ''
    });
  }

  cargarFormulario(reporte: IReporte) {
    this.form.patchValue({
      id: reporte.id,
      titulo: reporte.titulo,
      tipoReporte: reporte.tipoReporte,
      flag: reporte.flag
    });
    this.items = reporte.items;
  }

  save() {
    let reporte: IReporte = Object.assign({}, this.form.value);

    reporte.items = this.items;

    if (this.modoEdicion) {
      this.reporteService.updateReporte(reporte)
        .subscribe(data => this.onSaveSuccess(),
          error => console.error(error));
    } else {
      this.reporteService.createReporte(reporte)
        .subscribe(data => this.onSaveSuccess(),
          error => console.error(error));
    }
  }

  onSaveSuccess() {
    this.router.navigate(["/reportes"]);
  }

  addItem() {
    this.items.push({ nombre: this.parametro });
    this.parametro = undefined;
  }

  deleteItem(i: IReporteItem) {
    this.items.forEach((item, index) => {
      if (item.nombre === i.nombre)
        this.items.splice(index, 1);
    });
  }

}

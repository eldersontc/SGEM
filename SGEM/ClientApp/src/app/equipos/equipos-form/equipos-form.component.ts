import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EquiposService } from '../equipos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IEquipo } from '../equipo';

@Component({
  selector: 'app-equipos-form',
  templateUrl: './equipos-form.component.html',
  styleUrls: ['./equipos-form.component.css']
})
export class EquiposFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private equipoService: EquiposService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      } else {
        this.modoEdicion = true;
        this.equipoService.getEquipo(params["id"]).subscribe(equipo => this.cargarFormulario(equipo),
          error => console.error(error));
      }
    });
  }

  modoEdicion: boolean;
  form: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      id: 0,
      nombre: ''
    });
  }

  cargarFormulario(equipo: IEquipo) {
    this.form.patchValue({
      id: equipo.id,
      nombre: equipo.nombre
    });
  }

  save() {
    let equipo: IEquipo = Object.assign({}, this.form.value);

    if (this.modoEdicion) {
      this.equipoService.updateEquipo(equipo)
        .subscribe(data => this.onSaveSuccess(),
          error => console.error(error));
    } else {
      this.equipoService.createEquipo(equipo)
        .subscribe(data => this.onSaveSuccess(),
          error => console.error(error));
    }
  }

  onSaveSuccess() {
    this.router.navigate(["/equipos"]);
  }

}

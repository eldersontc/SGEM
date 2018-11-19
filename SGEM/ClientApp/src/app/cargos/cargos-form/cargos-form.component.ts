import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CargosService } from '../cargos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ICargo } from '../cargo';

@Component({
  selector: 'app-cargos-form',
  templateUrl: './cargos-form.component.html',
  styleUrls: ['./cargos-form.component.css']
})
export class CargosFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private cargoService: CargosService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      } else {
        this.modoEdicion = true;
        this.cargoService.getCargo(params["id"]).subscribe(cargo => this.cargarFormulario(cargo),
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

  cargarFormulario(cargo: ICargo) {
    this.form.patchValue({
      id: cargo.id,
      nombre: cargo.nombre
    });
  }

  save() {
    let cargo: ICargo = Object.assign({}, this.form.value);

    if (this.modoEdicion) {
      this.cargoService.updateCargo(cargo)
        .subscribe(data => this.onSaveSuccess(),
          error => console.error(error));
    } else {
      this.cargoService.createCargo(cargo)
        .subscribe(data => this.onSaveSuccess(),
          error => console.error(error));
    }
  }

  onSaveSuccess() {
    this.router.navigate(["/cargos"]);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IUsuario } from '../usuario';
import { IPersona } from '../../personas/persona';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {

  elegirPersona: boolean = false;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      } else {
        this.modoEdicion = true;
        this.usuarioService.getUsuario(params["id"])
          .subscribe(usuario => this.cargarFormulario(usuario),
          error => console.error(error));
      }
    });
  }

  modoEdicion: boolean;
  form: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      id: 0,
      nombre: '',
      clave: '',
      persona: this.fb.group({
        id: 0,
        nombres: '',
      })
    });
  }

  cargarFormulario(u: IUsuario) {
    this.form.patchValue({
      id: u.id,
      nombre: u.nombre,
      clave: u.clave,
      persona: {
        id: u.persona.id,
        nombres: u.persona.nombres + ' ' + u.persona.apellidos
      }
    });
  }

  save() {
    let u: IUsuario = Object.assign({}, this.form.value);

    if (this.modoEdicion) {
      this.usuarioService.updateUsuario(u)
        .subscribe(data => this.onSaveSuccess(),
          error => console.error(error));
    } else {
      this.usuarioService.createUsuario(u)
        .subscribe(data => this.onSaveSuccess(),
          error => console.error(error));
    }
  }

  onSaveSuccess() {
    this.router.navigate(["/usuarios"]);
  }

  buscarPersona() {
    this.elegirPersona = true;
  }

  asignarPersona(e: IPersona) {
    this.elegirPersona = false;
    if (e) {
      this.form.patchValue({
        persona: {
          id: e.id,
          nombres: e.nombres + ' ' + e.apellidos
        }
      });
    }
  }
}

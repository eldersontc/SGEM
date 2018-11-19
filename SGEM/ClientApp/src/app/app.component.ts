import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from './usuarios/usuarios.service';
import { IUsuario } from './usuarios/usuario';
import { ILogin } from './generico/generico';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logueado: boolean = false;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private fb: FormBuilder, private usuarioService: UsuariosService) { }

  form: FormGroup;

  verAlerta: boolean = false;
  opciones: object;

  ngOnInit() {
    this.form = this.fb.group({
      nombre: '',
      clave: ''
    });
    let login: ILogin = Object.assign({}, this.storage.get('login'));
    if (login) {
      this.logueado = true;
      this.usuarioLogueado = login.pn + ' | ' + login.cn;
      this.opciones = this.opcionesxCargo(login.ci);
    }
  }

  auth() {
    let usuario: IUsuario = Object.assign({}, this.form.value);

    this.usuarioService.authUsuario(usuario).subscribe(u => this.onAuthSuccess(u),
      error => this.verAlerta = true);
  }

  onAuthSuccess(u: IUsuario) {
    this.logueado = true;

    let login: ILogin = {
      i: u.id,
      u: u.nombre,
      pi: u.persona.id,
      pn: u.persona.nombres + ' ' + u.persona.apellidos,
      ci: u.persona.cargo.id,
      cn: u.persona.cargo.nombre
    };

    this.storage.set('login', login);

    this.usuarioLogueado = login.pn + ' | ' + login.cn;
    this.opciones = this.opcionesxCargo(login.ci);
  }

  cerrarSesion() {
    this.logueado = false;
    this.storage.remove('login');
  }

  usuarioLogueado: string;

  opcionesxCargo(ci) {
    var opciones;
    if (ci == 1) {
      opciones = [
        {
          nombre: 'Operaciones', icono: 'shopping-cart',
          subOpciones: [
            { nombre: 'Almacen', icono: 'clipboard', link: 'almacenes' },
            { nombre: 'Equipos', icono: 'clipboard', link: 'equipos' },
            { nombre: 'Compra de Equipos', icono: 'clipboard', link: 'compras-equipo' },
            { nombre: 'Asignación de Equipos', icono: 'clipboard', link: 'asignaciones-equipo' }
          ]
        },
        {
          nombre: 'Gerencia', icono: 'chart-bar',
          subOpciones: [
            { nombre: 'Cargos', icono: 'user-circle', link: 'cargos' },
            { nombre: 'Personas', icono: 'user-circle', link: 'personas' },
            { nombre: 'Usuarios', icono: 'user-circle', link: 'usuarios' },
            { nombre: 'Reportes', icono: 'chart-pie', link: 'reportes' }
          ]
        }
      ];
    }

    if (ci != 1) {
      opciones = [
        {
          nombre: 'Operaciones', icono: 'shopping-cart',
          subOpciones: [
            { nombre: 'Asignación de Equipos', icono: 'clipboard', link: 'asignaciones-equipo' }
          ]
        }
      ];
    }

    return opciones;
  }



}

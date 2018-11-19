import { Component, OnInit, Inject } from '@angular/core';
import { IFiltro, ILogin } from '../../generico/generico';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsignacionesEquipoService } from '../asignaciones-equipo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { AlmacenesService } from '../../almacenes/almacenes.service';
import { IAlmacen } from '../../almacenes/almacen';
import { NotifierService } from 'angular-notifier';
import { IAsignacionEquipoItem, IAsignacionEquipo } from '../asignacion-equipo';
import { IEquipo } from '../../equipos/equipo';
import { IPersona } from '../../personas/persona';

@Component({
  selector: 'app-asignaciones-equipo-form',
  templateUrl: './asignaciones-equipo-form.component.html',
  styleUrls: ['./asignaciones-equipo-form.component.css']
})
export class AsignacionesEquipoFormComponent implements OnInit {

  elegirEquipo: boolean = false;
  elegirEmpleado: boolean = false;
  modoEdicion: boolean = false;
  modoLectura: boolean = false;

  form: FormGroup;
  items: IAsignacionEquipoItem[] = [];
  almacenes: IAlmacen[] = [];
  login: ILogin;
  equipo: IEquipo = {};
  empleado: IPersona = {};

  private readonly notifier: NotifierService;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    notifierService: NotifierService,
    private fb: FormBuilder,
    private asignacionEquipoService: AsignacionesEquipoService,
    private almacenService: AlmacenesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.notifier = notifierService;
    this.login = this.storage.get('login');
    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        this.getAlmacenes();
        return;
      } else {
        this.modoEdicion = true;
        if (params["mode"]) {
          this.modoLectura = true;
        }
        this.asignacionEquipoService.getAsignacionEquipo(params["id"])
          .subscribe(asignacionEquipo => this.cargarFormulario(asignacionEquipo),
            error => console.error(error));
      }
    });
  }

  getAlmacenes() {
    this.almacenService.getAll()
      .subscribe(d => this.onGetAlmacenesSuccess(d), error => console.error(error));
  }

  onGetAlmacenesSuccess(d) {
    this.almacenes = d;
    if (this.almacenes.length > 0) {
      this.form.patchValue({ almacen: this.almacenes[0] });
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: 0,
      fechaCreacion: new Date(),
      almacen: '',
      empleado: this.fb.group({
        id: 0,
        nombres: ''
      }),
      comentario: ''
    });
  }

  buscarEmpleado() {
    this.elegirEmpleado = true;
  }

  asignarEmpleado(e: IPersona) {
    this.elegirEmpleado = false;
    if (e) {
      this.form.patchValue({
        empleado: {
          id: e.id,
          nombres: e.nombres + ' ' + e.apellidos
        }
      });
    }
  }

  buscarEquipo() {
    this.elegirEquipo = true;
  }

  asignarEquipo(e: IEquipo) {
    this.elegirEquipo = false;
    if (e) {
      this.equipo = e;
    }
  }

  cargarFormulario(asignacionEquipo: IAsignacionEquipo) {
    this.form.patchValue({
      id: asignacionEquipo.id,
      fechaCreacion: new Date(asignacionEquipo.fechaCreacion),
      comentario: asignacionEquipo.comentario,
      almacen: asignacionEquipo.almacen,
      empleado: asignacionEquipo.empleado
    });
    this.items = asignacionEquipo.items;
    this.almacenes.push(asignacionEquipo.almacen);
  }

  save() {
    let asignacionEquipo: IAsignacionEquipo = Object.assign({}, this.form.value);

    asignacionEquipo.usuarioCreacion = { id: this.login.i };
    asignacionEquipo.items = this.items;

    if (this.modoEdicion) {
      this.asignacionEquipoService.updateAsignacionEquipo(asignacionEquipo)
        .subscribe(data => this.onSaveSuccess(),
          error => this.showError(error));
    } else {
      this.asignacionEquipoService.createAsignacionEquipo(asignacionEquipo)
        .subscribe(data => this.onSaveSuccess(),
          error => this.showError(error));
    }
  }

  showError(error) {
    this.notifier.notify('error', error.error);
  }

  onSaveSuccess() {
    this.router.navigate(["/asignaciones-equipo"]);
  }

  addItem() {
    this.items.push({
      equipo: this.equipo,
      cantidad: 0,
      costo: 0
    });
    this.equipo = {};
  }

  deleteItem(i: IAsignacionEquipoItem) {
    this.items.forEach((item, index) => {
      if (item.equipo.id === i.equipo.id)
        this.items.splice(index, 1);
    });
  }

}

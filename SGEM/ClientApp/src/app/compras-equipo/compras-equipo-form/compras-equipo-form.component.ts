import { Component, OnInit, Inject } from '@angular/core';
import { IFiltro, ILogin } from '../../generico/generico';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComprasEquipoService } from '../compras-equipo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { AlmacenesService } from '../../almacenes/almacenes.service';
import { IAlmacen } from '../../almacenes/almacen';
import { NotifierService } from 'angular-notifier';
import { ICompraEquipoItem, ICompraEquipo } from '../compra-equipo';
import { IEquipo } from '../../equipos/equipo';

@Component({
  selector: 'app-compras-equipo-form',
  templateUrl: './compras-equipo-form.component.html',
  styleUrls: ['./compras-equipo-form.component.css']
})
export class ComprasEquipoFormComponent implements OnInit {

  elegirEquipo: boolean = false;
  modoEdicion: boolean = false;

  form: FormGroup;
  items: ICompraEquipoItem[] = [];
  almacenes: IAlmacen[] = [];
  login: ILogin;
  equipo: IEquipo = {};

  private readonly notifier: NotifierService;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,
    notifierService: NotifierService,
    private fb: FormBuilder,
    private compraEquipoService: ComprasEquipoService,
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
        this.compraEquipoService.getCompraEquipo(params["id"])
          .subscribe(compraEquipo => this.cargarFormulario(compraEquipo),
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
      comentario: '',
      costo: 0
    });
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

  cargarFormulario(compraEquipo: ICompraEquipo) {
    this.form.patchValue({
      id: compraEquipo.id,
      fechaCreacion: new Date(compraEquipo.fechaCreacion),
      comentario: compraEquipo.comentario,
      costo: compraEquipo.costo,
      almacen: compraEquipo.almacen
    });
    this.items = compraEquipo.items;
    this.almacenes.push(compraEquipo.almacen);
  }

  save() {
    let compraEquipo: ICompraEquipo = Object.assign({}, this.form.value);

    compraEquipo.usuarioCreacion = { id: this.login.i };
    compraEquipo.items = this.items;

    if (this.modoEdicion) {
      this.compraEquipoService.updateCompraEquipo(compraEquipo)
        .subscribe(data => this.onSaveSuccess(),
          error => this.showError(error));
    } else {
      this.compraEquipoService.createCompraEquipo(compraEquipo)
        .subscribe(data => this.onSaveSuccess(),
          error => this.showError(error));
    }
  }

  showError(error) {
    this.notifier.notify('error', error.error);
  }

  onSaveSuccess() {
    this.router.navigate(["/compras-equipo"]);
  }

  addItem() {
    this.items.push({
      equipo: this.equipo,
      cantidad: 0,
      costo: 0
    });
    this.equipo = {};
  }

  deleteItem(i: ICompraEquipoItem) {
    this.items.forEach((item, index) => {
      if (item.equipo.id === i.equipo.id)
        this.items.splice(index, 1);
    });
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule, NgbPaginationModule, NgbModalConfig, NgbModal, NgbDatepickerI18n, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { StorageServiceModule } from 'angular-webstorage-service';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DatepickerI18n, DateAdapter, DateParserFormatter } from './generico/generico.service';
import { AccionesComponent } from './generico/acciones/acciones.component';
import { FiltrosComponent } from './generico/filtros/filtros.component';
import { TablaComponent } from './generico/tabla/tabla.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosFormComponent } from './usuarios/usuarios-form/usuarios-form.component';
import { PersonasComponent } from './personas/personas.component';
import { CargosComponent } from './cargos/cargos.component';
import { AlmacenesComponent } from './almacenes/almacenes.component';
import { AlmacenesFormComponent } from './almacenes/almacenes-form/almacenes-form.component';
import { CargosFormComponent } from './cargos/cargos-form/cargos-form.component';
import { PersonasFormComponent } from './personas/personas-form/personas-form.component';
import { EquiposComponent } from './equipos/equipos.component';
import { EquiposFormComponent } from './equipos/equipos-form/equipos-form.component';
import { ComprasEquipoComponent } from './compras-equipo/compras-equipo.component';
import { ComprasEquipoFormComponent } from './compras-equipo/compras-equipo-form/compras-equipo-form.component';
import { AsignacionesEquipoComponent } from './asignaciones-equipo/asignaciones-equipo.component';
import { AsignacionesEquipoFormComponent } from './asignaciones-equipo/asignaciones-equipo-form/asignaciones-equipo-form.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ReportesFormComponent } from './reportes/reportes-form/reportes-form.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  }
};

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AccionesComponent,
    FiltrosComponent,
    TablaComponent,
    UsuariosComponent,
    UsuariosFormComponent,
    PersonasComponent,
    CargosComponent,
    AlmacenesComponent,
    AlmacenesFormComponent,
    CargosFormComponent,
    PersonasFormComponent,
    EquiposComponent,
    EquiposFormComponent,
    ComprasEquipoComponent,
    ComprasEquipoFormComponent,
    AsignacionesEquipoComponent,
    AsignacionesEquipoFormComponent,
    ReportesComponent,
    ReportesFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    StorageServiceModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgbModule,
    NgbPaginationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuarios-form', component: UsuariosFormComponent },
      { path: 'usuarios-form/:id', component: UsuariosFormComponent },
      { path: 'almacenes', component: AlmacenesComponent },
      { path: 'almacenes-form', component: AlmacenesFormComponent },
      { path: 'almacenes-form/:id', component: AlmacenesFormComponent },
      { path: 'equipos', component: EquiposComponent },
      { path: 'equipos-form', component: EquiposFormComponent },
      { path: 'equipos-form/:id', component: EquiposFormComponent },
      { path: 'cargos', component: CargosComponent },
      { path: 'cargos-form', component: CargosFormComponent },
      { path: 'cargos-form/:id', component: CargosFormComponent },
      { path: 'personas', component: PersonasComponent },
      { path: 'personas-form', component: PersonasFormComponent },
      { path: 'personas-form/:id', component: PersonasFormComponent },
      { path: 'compras-equipo', component: ComprasEquipoComponent },
      { path: 'compras-equipo-form', component: ComprasEquipoFormComponent },
      { path: 'compras-equipo-form/:id', component: ComprasEquipoFormComponent },
      { path: 'asignaciones-equipo', component: AsignacionesEquipoComponent },
      { path: 'asignaciones-equipo-form', component: AsignacionesEquipoFormComponent },
      { path: 'asignaciones-equipo-form/:id', component: AsignacionesEquipoFormComponent },
      { path: 'asignaciones-equipo-form/:mode/:id', component: AsignacionesEquipoFormComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'reportes-form', component: ReportesFormComponent },
      { path: 'reportes-form/:id', component: ReportesFormComponent },
      { path: '**', redirectTo: '/' }
    ])
  ],
  providers: [
    { provide: NgbDatepickerI18n, useClass: DatepickerI18n },
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbDateParserFormatter, useClass: DateParserFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DatepickerI18n, DateAdapter, DateParserFormatter } from './generico/generico.service';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AccionesComponent } from './generico/acciones/acciones.component';
import { FiltrosComponent } from './generico/filtros/filtros.component';
import { TablaComponent } from './generico/tabla/tabla.component';
import { UsuariosFormComponent } from './usuarios/usuarios-form/usuarios-form.component';

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
    CounterComponent,
    FetchDataComponent,
    UsuariosComponent,
    AccionesComponent,
    FiltrosComponent,
    TablaComponent,
    UsuariosFormComponent
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
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [
    NgbModalConfig,
    NgbModal,
    { provide: NgbDatepickerI18n, useClass: DatepickerI18n },
    { provide: NgbDateAdapter, useClass: DateAdapter },
    { provide: NgbDateParserFormatter, useClass: DateParserFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

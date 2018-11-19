import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonasService } from '../personas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IPersona } from '../persona';
import { ICargo } from '../../cargos/cargo';
import { CargosService } from '../../cargos/cargos.service';

@Component({
  selector: 'app-personas-form',
  templateUrl: './personas-form.component.html',
  styleUrls: ['./personas-form.component.css']
})
export class PersonasFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private personaService: PersonasService,
    private cargosService: CargosService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.getCargos();
  }

  getCargos() {
    this.cargosService.getAll()
      .subscribe(d => this.onGetCargosSuccess(d), error => console.error(error));
  }

  onGetCargosSuccess(d) {
    this.cargos = d;
    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        if (this.cargos.length > 0) {
          this.form.patchValue({ cargo: this.cargos[0] });
        }
        return;
      } else {
        this.modoEdicion = true;
        this.personaService.getPersona(params["id"]).subscribe(unidad => this.cargarFormulario(unidad),
          error => console.error(error));
      }
    });
  }

  modoEdicion: boolean;
  form: FormGroup;

  cargos: ICargo[];

  distritos =
    [
      'Ancon',
      'Ate',
      'Barranco',
      'Breña',
      'Carabayllo',
      'Cercado',
      'Chaclacayo',
      'Chorrillos',
      'Cieneguilla',
      'Comas',
      'El Agustino',
      'Independencia',
      'Jesus Maria',
      'La Molina',
      'La Victoria',
      'Lima',
      'Lince',
      'Los Olivos',
      'Lurigancho',
      'Lurin',
      'Magdalena',
      'Miraflores',
      'Pachacamac',
      'Pucusana',
      'Pueblo Libre',
      'Puente Piedra',
      'Punta Hermosa',
      'Punta Negra',
      'Rimac',
      'San Bartolo',
      'San Borja',
      'San Isidro',
      'San Juan De Lurigancho',
      'San Juan De Miraflores',
      'San Luis',
      'San Martin De Porres',
      'San Miguel',
      'Santa Anita',
      'Santa Maria Del Mar',
      'Santa Rosa',
      'Santiago De Surco',
      'Surquillo',
      'Villa El Salvador',
      'Villa Maria Del Triunfo'
    ];

  ngOnInit() {
    this.form = this.fb.group({
      id: 0,
      cargo: this.fb.group({
        id: ''
      }),
      nombres: '',
      apellidos: '',
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      distrito: 'Lima',
      direccion: ''
    });
  }

  cargarFormulario(persona: IPersona) {
    this.form.patchValue({
      id: persona.id,
      cargo: persona.cargo,
      nombres: persona.nombres,
      apellidos: persona.apellidos,
      tipoDocumento: persona.tipoDocumento,
      numeroDocumento: persona.numeroDocumento,
      direccion: persona.direccion,
      distrito: persona.distrito
    });
  }

  save() {
    let persona: IPersona = Object.assign({}, this.form.value);

    if (this.modoEdicion) {
      this.personaService.updatePersona(persona)
        .subscribe(data => this.onSaveSuccess(),
          error => console.error(error));
    } else {
      this.personaService.createPersona(persona)
        .subscribe(data => this.onSaveSuccess(),
          error => console.error(error));
    }
  }

  onSaveSuccess() {
    this.router.navigate(["/personas"]);
  }

}

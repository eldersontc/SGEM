import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  @Input() data: object[];
  @Input() columnas: string[];
  @Input() estilo: string[] = [];
  @Input() atributos: string[][];
  @Input() showSeleccion: boolean = true;

  @Output() select = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelect(m) {
    this.select.emit(m);
  }

  getValue(d, a) {
    return a.length == 3 ? d[a[2]] : d[a[2]][a[3]];
  }

  getClass(d) {
    if (this.estilo.length > 0) {
      return d[this.estilo[2]] == this.estilo[3] ? this.estilo[0] : this.estilo[1]
    }
  }
}

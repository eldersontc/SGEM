export interface IListaRetorno<T> {
  lista: T[];
  totalRegistros: number;
}

export interface IEstadistica {
  leyenda: string;
  etiqueta: string;
  valor: number;
}

export interface IFiltro {
  k: number;
  v?: string;
  n?: number;
  d?: Date;
  b?: boolean;
}

export interface ILogin {
  id: number;
  nombre: string;
  idPersona: number;
  nombrePersona: string;
  tipo: number;
}

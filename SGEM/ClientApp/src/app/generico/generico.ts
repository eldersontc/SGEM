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
  i?: number;
  u?: string;
  pi?: number;
  pn?: string;
  ci?: number;
  cn?: string;
}

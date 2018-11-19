export interface IReporte {
  id: number;
  titulo: string;
  tipoReporte: string;
  flag: number;
  items: IReporteItem[];
}

export interface IReporteItem {
  id?: number;
  idReporte?: number;
  nombre?: string;
  valor?: string;
}

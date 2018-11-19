import { IUsuario } from "../usuarios/usuario";
import { IAlmacen } from "../almacenes/almacen";
import { IEquipo } from "../equipos/equipo";

export interface ICompraEquipo {
  id: number;
  fechaCreacion: Date;
  usuarioCreacion: IUsuario;
  comentario: string;
  almacen: IAlmacen;
  costo: number;
  items: ICompraEquipoItem[];
}

export interface ICompraEquipoItem {
  id?: number;
  idCompraEquipo?: number;
  equipo?: IEquipo;
  cantidad?: number;
  costo?: number;
}

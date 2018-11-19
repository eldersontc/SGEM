import { IAlmacen } from "../almacenes/almacen";
import { IUsuario } from "../usuarios/usuario";
import { IPersona } from "../personas/persona";
import { IEquipo } from "../equipos/equipo";

export interface IAsignacionEquipo {
  id?: number;
  fechaCreacion?: Date;
  usuarioCreacion?: IUsuario;
  fechaAprobacion?: Date;
  usuarioAprobacion?: IUsuario;
  comentario?: string;
  almacen?: IAlmacen;
  empleado?: IPersona;
  items?: IAsignacionEquipoItem[];
}

export interface IAsignacionEquipoItem {
  id?: number;
  idAsignacionEquipo?: number;
  equipo?: IEquipo;
  cantidad?: number;
  costo?: number;
}

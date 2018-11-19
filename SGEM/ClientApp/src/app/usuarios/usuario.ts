import { IPersona } from "../personas/persona";

export interface IUsuario {
  id?: number;
  nombre?: string;
  clave?: string;
  persona?: IPersona;
}

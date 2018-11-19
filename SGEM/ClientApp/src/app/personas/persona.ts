import { ICargo } from "../cargos/cargo";

export interface IPersona {
  id?: number;
  nombres?: string;
  apellidos?: string;
  cargo?: ICargo;
  tipoDocumento?: string;
  numeroDocumento?: string;
  distrito?: string;
  direccion?: string;
}

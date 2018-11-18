using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class AsignacionEquipo : Base
    {
        public DateTime FechaCreacion { get; set; }
        public Usuario UsuarioCreacion { get; set; }
        public DateTime FechaAprobacion { get; set; }
        public Usuario UsuarioAprobacion { get; set; }
        public Almacen Almacen { get; set; }
        public Persona Empleado { get; set; }
        public IList<AsignacionEquipoItem> Items { get; set; }

        public AsignacionEquipo()
        {
            Items = new List<AsignacionEquipoItem>();
        }
    }
}

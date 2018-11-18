using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class CompraEquipo: Base
    {
        public DateTime FechaCreacion { get; set; }
        public Usuario UsuarioCreacion { get; set; }
        public Almacen Almacen { get; set; }
        public string Comentario { get; set; }
        public IList<CompraEquipoItem> Items { get; set; }

        public CompraEquipo()
        {
            Items = new List<CompraEquipoItem>();
        }
    }
}

using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class CompraEquipoMap : ClassMap<CompraEquipo>
    {
        public CompraEquipoMap()
        {
            Id(x => x.Id);
            Map(x => x.FechaCreacion);
            Map(x => x.Comentario);
            References(x => x.UsuarioCreacion).Column("IdUsuarioCreacion");
            References(x => x.Almacen).Column("IdAlmacen");
        }
    }
}

using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class AsignacionEquipoMap : ClassMap<AsignacionEquipo>
    {
        public AsignacionEquipoMap()
        {
            Id(x => x.Id);
            Map(x => x.FechaCreacion);
            Map(x => x.FechaAprobacion);
            References(x => x.UsuarioCreacion).Column("IdUsuarioCreacion");
            References(x => x.UsuarioAprobacion).Column("IdUsuarioAprobacion");
            References(x => x.Almacen).Column("IdAlmacen");
            References(x => x.Empleado).Column("IdEmpleado");
        }
    }
}

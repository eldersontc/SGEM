using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class CompraEquipoItemMap : ClassMap<CompraEquipoItem>
    {
        public CompraEquipoItemMap()
        {
            Id(x => x.Id);
            Map(x => x.IdCompraEquipo);
            Map(x => x.Cantidad);
            Map(x => x.Costo);
            References(x => x.Equipo).Column("IdEquipo");
        }
    }
}

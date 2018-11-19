using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class InventarioEquipoMap : ClassMap<InventarioEquipo>
    {
        public InventarioEquipoMap()
        {
            Id(x => x.Id);
            Map(x => x.IdAlmacen);
            Map(x => x.IdEquipo);
            Map(x => x.Stock);
        }
    }
}

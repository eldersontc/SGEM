using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class ReporteItemMap : ClassMap<ReporteItem>
    {
        public ReporteItemMap()
        {
            Id(x => x.Id);
            Map(x => x.IdReporte);
            Map(x => x.Nombre);
            Map(x => x.Valor);
        }
    }
}

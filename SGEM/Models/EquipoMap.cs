using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class EquipoMap : ClassMap<Equipo>
    {
        public EquipoMap()
        {
            Id(x => x.Id);
            Map(x => x.Nombre);
        }
    }
}

using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class PersonaMap : ClassMap<Persona>
    {
        public PersonaMap()
        {
            Id(x => x.Id);
            Map(x => x.Nombres);
            Map(x => x.Apellidos);
            Map(x => x.TipoDocumento);
            Map(x => x.NumeroDocumento);
            Map(x => x.Distrito);
            Map(x => x.Direccion);
            References(x => x.Cargo).Column("IdCargo");
        }
    }
}

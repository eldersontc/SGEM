using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class UsuarioMap : ClassMap<Usuario>
    {
        public UsuarioMap()
        {
            Id(x => x.Id);
            Map(x => x.Nombre);
            Map(x => x.Clave);
            References(x => x.Persona).Column("IdPersona");
        }
    }
}

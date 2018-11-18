using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class Usuario: Base
    {
        public string Nombre { get; set; }
        public string Clave { get; set; }
        public Persona Persona { get; set; }
    }
}

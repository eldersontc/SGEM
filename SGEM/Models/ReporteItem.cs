using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class ReporteItem: Base
    {
        public int IdReporte { get; set; }
        public string Nombre { get; set; }
        public string Valor { get; set; }
    }
}

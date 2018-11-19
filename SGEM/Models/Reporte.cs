using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class Reporte: Base
    {
        public string Titulo { get; set; }
        public string TipoReporte { get; set; }
        public int Flag { get; set; }
        public List<ReporteItem> Items { get; set; }

        public Reporte()
        {
            Items = new List<ReporteItem>();
        }
    }
}

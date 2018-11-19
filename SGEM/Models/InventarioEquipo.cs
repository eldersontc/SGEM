using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class InventarioEquipo: Base
    {
        public int IdAlmacen { get; set; }
        public int IdEquipo { get; set; }
        public int Stock { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class Paginacion
    {
        public int Registros { get; set; }
        public int Pagina { get; set; }
        public List<Filtro> Filtros { get; set; }
    }

    public class Filtro
    {
        public int K { get; set; }
        public string V { get; set; }
        public int N { get; set; }
        public DateTime D { get; set; }
        public bool B { get; set; }
    }

    public class Estadistica
    {
        public string Leyenda { get; set; }
        public string Etiqueta { get; set; }
        public int Valor { get; set; }
    }

    public class Constantes
    {
        public const int Uno = 1;
        public const int Dos = 2;
        public const int Tres = 3;
        public const int Cuatro = 4;
        public const int Cinco = 5;
        public const int Seis = 6;
    }
}

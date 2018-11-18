﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Models
{
    public class AsignacionEquipoItem: Base
    {
        public int IdAsignacionEquipo { get; set; }
        public Equipo Equipo { get; set; }
        public int Cantidad { get; set; }
        public decimal Costo { get; set; }
    }
}

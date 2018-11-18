using Microsoft.AspNetCore.Mvc;
using NHibernate;
using SGEM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SGEM.Controllers
{
    public class BaseController : ControllerBase
    {
        public ISessionFactory factory;

        public BaseController(ISessionFactory factory)
        {
            this.factory = factory;
        }

        public void AsignarPaginacion<T>(Paginacion paginacion, ref IQueryable<T> query)
        {
            query = query.Skip((paginacion.Pagina - 1) * paginacion.Registros)
                                .Take(paginacion.Registros);
        }
    }
}

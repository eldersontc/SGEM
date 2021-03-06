﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using NHibernate.Linq;
using SGEM.Models;

namespace SGEM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlmacenesController : BaseController
    {
        public AlmacenesController(ISessionFactory factory) : base(factory) { }

        [HttpPost("GetAlmacenes")]
        public async Task<IActionResult> GetAlmacenes([FromBody] Paginacion paginacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<Almacen> lista = null;
            int totalRegistros = 0;

            using (var sn = factory.OpenSession())
            {
                IQueryable<Almacen> query = sn.Query<Almacen>();

                foreach (Filtro filtro in paginacion.Filtros)
                {
                    switch (filtro.K)
                    {
                        case Constantes.Uno:
                            query = query.Where(x => x.Nombre.Contains(filtro.V));
                            break;
                    }
                }

                totalRegistros = await query.CountAsync();

                query = query.OrderBy(x => x.Nombre);

                AsignarPaginacion(paginacion, ref query);

                lista = await query.ToListAsync();
            }

            return Ok(new
            {
                Lista = lista,
                TotalRegistros = totalRegistros
            });
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            List<Almacen> lista = null;

            using (var sn = factory.OpenSession())
            {
                lista = await sn.Query<Almacen>().ToListAsync();
            }

            return Ok(lista);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAlmacen([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Almacen almacen = null;

            using (var sn = factory.OpenSession())
            {
                almacen = await sn.GetAsync<Almacen>(id);
            }

            if (almacen == null)
            {
                return NotFound();
            }

            return Ok(almacen);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlmacen([FromRoute] int id, [FromBody] Almacen almacen)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != almacen.Id)
            {
                return BadRequest();
            }

            using (var sn = factory.OpenSession())
            {
                using (var tx = sn.BeginTransaction())
                {
                    try
                    {
                        sn.SaveOrUpdate(almacen);

                        await tx.CommitAsync();
                    }
                    catch (Exception ex)
                    {
                        await tx.RollbackAsync();
                        return StatusCode(500, ex.Message);
                    }
                }
            }

            return Ok(true);
        }

        [HttpPost]
        public async Task<IActionResult> PostAlmacen([FromBody] Almacen almacen)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (var sn = factory.OpenSession())
            {
                using (var tx = sn.BeginTransaction())
                {
                    try
                    {
                        sn.Save(almacen);

                        await tx.CommitAsync();
                    }
                    catch (Exception ex)
                    {
                        await tx.RollbackAsync();
                        return StatusCode(500, ex.Message);
                    }
                }
            }

            return Ok(true);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlmacen([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (var sn = factory.OpenSession())
            {
                using (var tx = sn.BeginTransaction())
                {
                    try
                    {
                        sn.Delete(new Almacen { Id = id });

                        await tx.CommitAsync();
                    }
                    catch (Exception ex)
                    {
                        await tx.RollbackAsync();
                        return StatusCode(500, ex.Message);
                    }
                }
            }

            return Ok(true);
        }
    }
}
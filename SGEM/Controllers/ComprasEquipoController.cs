using System;
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
    public class ComprasEquipoController : BaseController
    {
        public ComprasEquipoController(ISessionFactory factory) : base(factory) { }

        [HttpPost("GetComprasEquipo")]
        public async Task<IActionResult> GetComprasEquipo([FromBody] Paginacion paginacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<CompraEquipo> lista = null;
            int totalRegistros = 0;

            using (var sn = factory.OpenSession())
            {
                IQueryable<CompraEquipo> query = sn.Query<CompraEquipo>();

                foreach (Filtro filtro in paginacion.Filtros)
                {
                    switch (filtro.K)
                    {
                        case Constantes.Uno:
                            query = query.Where(x => x.FechaCreacion.Date == filtro.D.Date);
                            break;
                    }
                }

                totalRegistros = await query.CountAsync();

                query = query.OrderByDescending(x => x.FechaCreacion);

                AsignarPaginacion(paginacion, ref query);

                lista = await query.ToListAsync();
            }

            return Ok(new
            {
                Lista = lista,
                TotalRegistros = totalRegistros
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompraEquipo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            CompraEquipo compraEquipo = null;

            using (var sn = factory.OpenSession())
            {
                compraEquipo = await sn.GetAsync<CompraEquipo>(id);
                compraEquipo.Items = await sn.Query<CompraEquipoItem>().Where(x => x.IdCompraEquipo == id).ToListAsync();
            }

            if (compraEquipo == null)
            {
                return NotFound();
            }

            return Ok(compraEquipo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompraEquipo([FromRoute] int id, [FromBody] CompraEquipo compraEquipo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != compraEquipo.Id)
            {
                return BadRequest();
            }

            using (var sn = factory.OpenSession())
            {
                using (var tx = sn.BeginTransaction())
                {
                    try
                    {
                        List<CompraEquipoItem> items = await sn.Query<CompraEquipoItem>()
                            .Where(x => x.IdCompraEquipo == id)
                            .ToListAsync();

                        foreach (var item in items)
                        {
                            InventarioEquipo inventario = await sn.Query<InventarioEquipo>()
                                .Where(x => x.IdAlmacen == compraEquipo.Almacen.Id
                                    && x.IdEquipo == item.Equipo.Id)
                                .FirstOrDefaultAsync();

                            if (inventario != null && inventario.Stock >= item.Cantidad)
                            {
                                inventario.Stock -= item.Cantidad;
                            }
                            else
                            {
                                throw new Exception("Sin stock para el equipo: " + item.Equipo.Nombre);
                            }
                        }

                        sn.Delete(string.Format("FROM CompraEquipoItem WHERE IdCompraEquipo = {0}", id));

                        foreach (var item in compraEquipo.Items)
                        {
                            InventarioEquipo inventario = await sn.Query<InventarioEquipo>()
                                .Where(x => x.IdAlmacen == compraEquipo.Almacen.Id
                                    && x.IdEquipo == item.Equipo.Id)
                                .FirstOrDefaultAsync();

                            if (inventario == null)
                            {
                                sn.Save(new InventarioEquipo
                                {
                                    IdAlmacen = compraEquipo.Almacen.Id,
                                    IdEquipo = item.Equipo.Id,
                                    Stock = item.Cantidad
                                });
                            }
                            else
                            {
                                inventario.Stock += item.Cantidad;
                            }

                            item.IdCompraEquipo = id;

                            sn.Save(item);
                        }

                        CompraEquipo compraEquipoBD = sn.Get<CompraEquipo>(id);
                        compraEquipoBD.Comentario = compraEquipo.Comentario;
                        compraEquipoBD.Costo = compraEquipo.Items.Sum(x => x.Costo);

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
        public async Task<IActionResult> Post([FromBody] CompraEquipo compraEquipo)
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
                        compraEquipo.FechaCreacion = DateTime.Now;
                        compraEquipo.Costo = compraEquipo.Items.Sum(x => x.Costo);

                        sn.Save(compraEquipo);

                        foreach (var item in compraEquipo.Items)
                        {
                            InventarioEquipo inventario = await sn.Query<InventarioEquipo>()
                                .Where(x => x.IdAlmacen == compraEquipo.Almacen.Id
                                    && x.IdEquipo == item.Equipo.Id)
                                .FirstOrDefaultAsync();

                            if (inventario == null)
                            {
                                sn.Save(new InventarioEquipo
                                {
                                    IdAlmacen = compraEquipo.Almacen.Id,
                                    IdEquipo = item.Equipo.Id,
                                    Stock = item.Cantidad
                                });
                            }
                            else
                            {
                                inventario.Stock += item.Cantidad;
                            }

                            item.IdCompraEquipo = compraEquipo.Id;

                            sn.Save(item);
                        }

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
        public async Task<IActionResult> DeleteCompraEquipo([FromRoute] int id)
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
                        CompraEquipo compraEquipo = sn.Get<CompraEquipo>(id);

                        List<CompraEquipoItem> items = await sn.Query<CompraEquipoItem>()
                            .Where(x => x.IdCompraEquipo == id)
                            .ToListAsync();

                        foreach (var item in items)
                        {
                            InventarioEquipo inventario = await sn.Query<InventarioEquipo>()
                                .Where(x => x.IdAlmacen == compraEquipo.Almacen.Id
                                    && x.IdEquipo == item.Equipo.Id)
                                .FirstOrDefaultAsync();

                            if (inventario != null && inventario.Stock >= item.Cantidad)
                            {
                                inventario.Stock -= item.Cantidad;
                            }
                            else
                            {
                                throw new Exception("Sin stock para el equipo: " + item.Equipo.Nombre);
                            }
                        }

                        sn.Delete(string.Format("FROM CompraEquipoItem WHERE IdCompraEquipo = {0}", id));

                        sn.Delete(compraEquipo);

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
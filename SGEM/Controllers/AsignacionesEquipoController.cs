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
    public class AsignacionesEquipoController : BaseController
    {
        public AsignacionesEquipoController(ISessionFactory factory) : base(factory) { }

        [HttpPost("GetAsignacionesEquipo")]
        public async Task<IActionResult> GetAsignacionesEquipo([FromBody] Paginacion paginacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<AsignacionEquipo> lista = null;
            int totalRegistros = 0;

            using (var sn = factory.OpenSession())
            {
                IQueryable<AsignacionEquipo> query = sn.Query<AsignacionEquipo>();

                foreach (Filtro filtro in paginacion.Filtros)
                {
                    switch (filtro.K)
                    {
                        case Constantes.Uno:
                            query = query.Where(x => x.Empleado.Id == filtro.N);
                            break;
                        case Constantes.Dos:
                            query = query.Where(x => x.Empleado.Nombres.Contains(filtro.V) 
                                || x.Empleado.Apellidos.Contains(filtro.V));
                            break;
                        case Constantes.Tres:
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
        public async Task<IActionResult> GetAsignacionEquipo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AsignacionEquipo asignacionEquipo = null;

            using (var sn = factory.OpenSession())
            {
                asignacionEquipo = await sn.GetAsync<AsignacionEquipo>(id);
                asignacionEquipo.Items = await sn.Query<AsignacionEquipoItem>().Where(x => x.IdAsignacionEquipo == id).ToListAsync();
            }

            if (asignacionEquipo == null)
            {
                return NotFound();
            }

            return Ok(asignacionEquipo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsignacionEquipo([FromRoute] int id, [FromBody] AsignacionEquipo asignacionEquipo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != asignacionEquipo.Id)
            {
                return BadRequest();
            }

            using (var sn = factory.OpenSession())
            {
                using (var tx = sn.BeginTransaction())
                {
                    try
                    {
                        List<AsignacionEquipoItem> items = await sn.Query<AsignacionEquipoItem>()
                            .Where(x => x.IdAsignacionEquipo == id)
                            .ToListAsync();

                        foreach (var item in items)
                        {
                            InventarioEquipo inventario = await sn.Query<InventarioEquipo>()
                                .Where(x => x.IdAlmacen == asignacionEquipo.Almacen.Id
                                    && x.IdEquipo == item.Equipo.Id)
                                .FirstOrDefaultAsync();

                            inventario.Stock += item.Cantidad;
                        }

                        sn.Delete(string.Format("FROM AsignacionEquipoItem WHERE IdAsignacionEquipo = {0}", id));

                        foreach (var item in asignacionEquipo.Items)
                        {
                            InventarioEquipo inventario = await sn.Query<InventarioEquipo>()
                                .Where(x => x.IdAlmacen == asignacionEquipo.Almacen.Id
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

                            item.IdAsignacionEquipo = id;

                            sn.Save(item);
                        }

                        AsignacionEquipo asignacionEquipoBD = sn.Get<AsignacionEquipo>(id);
                        asignacionEquipoBD.Comentario = asignacionEquipo.Comentario;

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
        public async Task<IActionResult> Post([FromBody] AsignacionEquipo asignacionEquipo)
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
                        asignacionEquipo.FechaCreacion = DateTime.Now;

                        sn.Save(asignacionEquipo);

                        foreach (var item in asignacionEquipo.Items)
                        {
                            InventarioEquipo inventario = await sn.Query<InventarioEquipo>()
                                .Where(x => x.IdAlmacen == asignacionEquipo.Almacen.Id
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

                            item.IdAsignacionEquipo = asignacionEquipo.Id;

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
        public async Task<IActionResult> DeleteAsignacionEquipo([FromRoute] int id)
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
                        AsignacionEquipo asignacionEquipo = sn.Get<AsignacionEquipo>(id);

                        List<AsignacionEquipoItem> items = await sn.Query<AsignacionEquipoItem>()
                            .Where(x => x.IdAsignacionEquipo == id)
                            .ToListAsync();

                        foreach (var item in items)
                        {
                            InventarioEquipo inventario = await sn.Query<InventarioEquipo>()
                                .Where(x => x.IdAlmacen == asignacionEquipo.Almacen.Id
                                    && x.IdEquipo == item.Equipo.Id)
                                .FirstOrDefaultAsync();

                            inventario.Stock += item.Cantidad;
                        }

                        sn.Delete(string.Format("FROM AsignacionEquipoItem WHERE IdAsignacionEquipo = {0}", id));

                        sn.Delete(asignacionEquipo);

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

        [HttpPut("Aprobar/{id}")]
        public async Task<IActionResult> AprobarAsignacionEquipo([FromRoute] int id, [FromBody] AsignacionEquipo asignacionEquipo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != asignacionEquipo.Id)
            {
                return BadRequest();
            }

            using (var sn = factory.OpenSession())
            {
                using (var tx = sn.BeginTransaction())
                {
                    try
                    {
                        AsignacionEquipo asignacionEquipoBD = sn.Get<AsignacionEquipo>(id);
                        asignacionEquipoBD.FechaAprobacion = DateTime.Now;
                        asignacionEquipoBD.UsuarioAprobacion = asignacionEquipo.UsuarioAprobacion;

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
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
    public class UsuariosController : BaseController
    {
        public UsuariosController(ISessionFactory factory) : base(factory) { }

        [HttpPost("GetUsuarios")]
        public async Task<IActionResult> GetUsuarios([FromBody] Paginacion paginacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<Usuario> lista = null;
            int totalRegistros = 0;

            using (var sn = factory.OpenSession())
            {
                IQueryable<Usuario> query = sn.Query<Usuario>();

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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuario([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Usuario usuario = null;

            using (var sn = factory.OpenSession())
            {
                usuario = await sn.GetAsync<Usuario>(id);
            }

            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }

        [HttpGet("AuthUsuario/{nombre}/{clave}")]
        public async Task<IActionResult> AuthUsuario([FromRoute] string nombre, [FromRoute] string clave)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Usuario usuario = null;

            using (var sn = factory.OpenSession())
            {
                usuario = await sn.Query<Usuario>()
                    .Where(x => x.Nombre.Equals(nombre) && x.Clave.Equals(clave))
                    .FirstOrDefaultAsync();
            }

            if (usuario == null)
            {
                return NotFound();
            }

            return Ok(usuario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario([FromRoute] int id, [FromBody] Usuario usuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != usuario.Id)
            {
                return BadRequest();
            }

            using (var sn = factory.OpenSession())
            {
                using (var tx = sn.BeginTransaction())
                {
                    try
                    {
                        sn.SaveOrUpdate(usuario);

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
        public async Task<IActionResult> PostUsuario([FromBody] Usuario usuario)
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
                        sn.Save(usuario);

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
        public async Task<IActionResult> DeleteUsuario([FromRoute] int id)
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
                        sn.Delete(new Usuario { Id = id });

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
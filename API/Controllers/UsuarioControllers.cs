using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioControllers : ControllerBase
    
    {
       private readonly Contexto _contexto;

       public UsuarioControllers(Contexto contexto)
       {
           _contexto = contexto;
       } 
       [HttpGet]
       public async Task<ActionResult<IEnumerable<Usuario>>> PegarTodosAsync () {
            return await _contexto.Usuarios.ToListAsync ();
        }

        [HttpGet ("{UsuarioId}")]
        public async Task<ActionResult<Usuario>> PegarUsuarioPeloIdAsync (int usuarioId) {
            Usuario usuario = await _contexto.Usuarios.FindAsync (usuarioId);

            if (usuario == null)
                return NotFound ();

            return usuario;
        }

        [HttpPost]
        public async Task<ActionResult<Usuario>> SalvarUsuarioAsync (Usuario usuario) {
            await _contexto.Usuarios.AddAsync (usuario);
            await _contexto.SaveChangesAsync ();

            return Ok ();
        }

        [HttpPut]
        public async Task<ActionResult> AtualizarUsuarioAsync (Usuario usuario) {
            _contexto.Usuarios.Update (usuario);
            await _contexto.SaveChangesAsync ();

            return Ok ();
        }

       

    }
}
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EndereçoControllers : ControllerBase
    
    {
       private readonly Contexto _contexto;

       public EndereçoControllers(Contexto contexto)
       {
           _contexto = contexto;
       } 
       [HttpGet]
       public async Task<ActionResult<IEnumerable<Endereço>>> PegarTodosAsync () {
            return await _contexto.Endereços.ToListAsync ();
        }

        [HttpGet ("{EnderecoId}")]
        public async Task<ActionResult<Endereço>> PegarEnderecoPeloIdAsync (int enderecoId) {
            Endereço endereco = await _contexto.Endereços.FindAsync (enderecoId);

            if (endereco == null)
                return NotFound ();

            return endereco;
        }

        [HttpPost]
        public async Task<ActionResult<Endereço>> SalvarEndereçoAsync (Endereço endereco) {
            await _contexto.Endereços.AddAsync (endereco);
            await _contexto.SaveChangesAsync ();

            return Ok ();
        }

        [HttpPut]
        public async Task<ActionResult> AtualizarEndereçoAsync (Endereço endereco) {
            _contexto.Endereços.Update (endereco);
            await _contexto.SaveChangesAsync ();

            return Ok ();
        }

        [HttpDelete ("{enderecoId}")]
        public async Task<ActionResult> ExcluirEndereçoAsync (int enderecoId) {
            Endereço endereco= await _contexto.Endereços.FindAsync (enderecoId);
            if (endereco == null)
                return NotFound ();

            _contexto.Remove (endereco);
            await _contexto.SaveChangesAsync ();
            return Ok ();
        }

    }
}
using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class Contexto : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set;}
        public DbSet<Endereço> Endereços { get; set;}

        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes)
        {
            
        }
    }
}
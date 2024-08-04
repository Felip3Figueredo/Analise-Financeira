using Entities.Entidades;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infra.Configuracao
{
    public class ContextBase : IdentityDbContext<ApplicationUser>
    {
        public ContextBase(DbContextOptions options) : base(options)
        {
        }

        public DbSet<SistemaFinanceiro> SistemaFinanceiros { get; set; }

        public DbSet<UsuarioSistemaFinanceiro> UsuarioSistemaFinanceiros { get; set; }

        public DbSet<Categoria> Categoria { get; set; }

        public DbSet<Despesa> Despesa { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured) 
            {
                optionsBuilder.UseSqlServer(ObtenhaStringConexao());
                base.OnConfiguring(optionsBuilder);
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ApplicationUser>().ToTable("AspNetUsers").HasKey(t => t.Id);

            base.OnModelCreating(builder);
        }

        public string ObtenhaStringConexao()
        {
            return "Server=localhost\\SQLEXPRESS;Database=FINANCEIRO_2024;User Id=sa;Password=Murilo1023@;Connect Timeout=15;Encrypt=False;TrustServerCertificate=False";

        }
    }
}

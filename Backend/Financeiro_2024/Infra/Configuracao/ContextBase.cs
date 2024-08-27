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
                optionsBuilder.UseNpgsql(
                    "Host=localhost;Port=5432;Database=FINANCEIRO_2024;Username=postgres;Password=Murilo1023@"
                );

                base.OnConfiguring(optionsBuilder);
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<ApplicationUser>().ToTable("AspNetUsers").HasKey(t => t.Id);
            builder.Entity<Despesa>()
                   .Property(d => d.Valor)
                   .HasColumnType("decimal(18,2)");
            base.OnModelCreating(builder);
        }

        public string ObtenhaStringConexao()
        {
            return "Host=localhost;Port=5432;Database=FINANCEIRO_2024;Username=postgres;Password=Murilo1023@";

        }
    }
}

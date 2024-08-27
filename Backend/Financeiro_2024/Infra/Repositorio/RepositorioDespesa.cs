using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Interfaces.IDespesa;
using Entities.Entidades;
using Infra.Configuracao;
using Infra.Repositorio.Generics;
using Microsoft.EntityFrameworkCore;

namespace Infra.Repositorio
{
    public class RepositorioDespesa : RepositoryGenerics<Despesa>, InterfaceDespesas
    {
        private readonly DbContextOptions<ContextBase> _OptionBuilder;
        public RepositorioDespesa()
        {
            _OptionBuilder = new DbContextOptions<ContextBase>();
        }

        public async Task<List<Despesa>> ListaDespesaUsuario(string emailUsuario)
        {
            using (var banco = new ContextBase(_OptionBuilder))
            {
                var listaDespesas = await
                    (from s in banco.SistemaFinanceiros
                     join us in banco.UsuarioSistemaFinanceiros on s.Id equals us.IdSistema
                     join c in banco.Categoria on s.Id equals c.IdSistema
                     join d in banco.Despesa on c.Id equals d.IdCategoria
                     where us.EmailUsuario.Equals(emailUsuario) && s.Mes == d.Mes && s.Ano == d.Ano
                     select d).AsNoTracking().ToListAsync();
                
                return listaDespesas;
            }
        }

        public async Task<List<Despesa>> ListarDespesasPorCategoria(int id)
        {
            using (var banco = new ContextBase(_OptionBuilder))
            {
                var listaDespesas = await
                    (from s in banco.SistemaFinanceiros
                     join us in banco.UsuarioSistemaFinanceiros on s.Id equals us.IdSistema
                     join c in banco.Categoria on s.Id equals c.IdSistema
                     join d in banco.Despesa on c.Id equals d.IdCategoria
                     where c.Id.Equals(id) && s.Mes == d.Mes && s.Ano == d.Ano
                     select d).AsNoTracking().ToListAsync();

                return listaDespesas;
            }
        }

        public async Task<List<Despesa>> ListarDespesasUsuarioNaoPagasMesesAnteriores(string emailUsuario)
        {
            using (var banco = new ContextBase(_OptionBuilder))
            {
                return await
                    (from s in banco.SistemaFinanceiros
                     join us in banco.UsuarioSistemaFinanceiros on s.Id equals us.IdSistema
                     join c in banco.Categoria on s.Id equals c.IdSistema
                     join d in banco.Despesa on c.Id equals d.IdCategoria
                     where us.EmailUsuario.Equals(emailUsuario) && d.Mes < DateTime.Now.Month && !d.Pago
                     select d).AsNoTracking().ToListAsync();
            }
        }
    }
}

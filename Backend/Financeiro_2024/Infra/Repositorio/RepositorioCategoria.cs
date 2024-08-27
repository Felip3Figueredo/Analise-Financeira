using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Interfaces.ICategoria;
using Entities.Entidades;
using Infra.Configuracao;
using Infra.Repositorio.Generics;
using Microsoft.EntityFrameworkCore;

namespace Infra.Repositorio
{
    public class RepositorioCategoria : RepositoryGenerics<Categoria>, InterfaceCategoria
    {
        private readonly DbContextOptions<ContextBase> _OptionBuilder;
        public RepositorioCategoria() 
        { 
            _OptionBuilder = new DbContextOptions<ContextBase>();
        }

        public async Task<List<Categoria>> ListarCategoriaUsuario(string emailUsuario)
        {
            using (var banco = new ContextBase(_OptionBuilder))
            {
                var categoria = await
                    (from s in banco.SistemaFinanceiros
                     join us in banco.UsuarioSistemaFinanceiros on s.Id equals us.IdSistema
                     join c in banco.Categoria on s.Id equals c.IdSistema                     
                     where us.EmailUsuario.Equals(emailUsuario) && us.SistemaAtual
                     select c).AsNoTracking().ToListAsync();

                return categoria;
            }
        }

        public async Task<List<Categoria>> ListarCategoriasPorSistema(int id)
        {
            using (var banco = new ContextBase(_OptionBuilder))
            {
                var categoria = await
                    (from s in banco.SistemaFinanceiros
                     join us in banco.UsuarioSistemaFinanceiros on s.Id equals us.IdSistema
                     join c in banco.Categoria on s.Id equals c.IdSistema
                     where s.Id.Equals(id) && us.SistemaAtual
                     select c).AsNoTracking().ToListAsync();

                return categoria;
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Interfaces.ISistemaFinanceiro;
using Domain.Interfaces.IUsuarioSistemaFinanceiro;
using Entities.Entidades;
using Infra.Configuracao;
using Infra.Repositorio.Generics;
using Microsoft.EntityFrameworkCore;

namespace Infra.Repositorio
{


    public class RepositorioUsuarioSistemaFinanceiro : RepositoryGenerics<UsuarioSistemaFinanceiro>, InterfaceUsuarioSistemaFinanceiro
    {

        private readonly DbContextOptions<ContextBase> _OptionBuilder;
        public RepositorioUsuarioSistemaFinanceiro()
        {
            _OptionBuilder = new DbContextOptions<ContextBase>();
        }

        public async Task<IList<UsuarioSistemaFinanceiro>> ListaUsuariosSistemaFinanceiro(int IdSistema)
        {
            using (var banco = new ContextBase(_OptionBuilder))
            {
                return await
                    banco.UsuarioSistemaFinanceiros.Where(
                        s => s.IdSistema == IdSistema).AsNoTracking()
                    .ToListAsync();
            }
        }

        public async Task<UsuarioSistemaFinanceiro> ObterUsuarioSistemaFinanceiro(string emailUsuario)
        {
            using (var banco = new ContextBase(_OptionBuilder))
            {
                return await
                    banco.UsuarioSistemaFinanceiros.AsNoTracking().FirstOrDefaultAsync(x => x.EmailUsuario.Equals(emailUsuario));
            }
        }

        public async Task RemoverUsuarioSistemaFinanceiro(List<UsuarioSistemaFinanceiro> Usuarios)
        {
            using (var banco = new ContextBase(_OptionBuilder))
            {
                banco.UsuarioSistemaFinanceiros.RemoveRange(Usuarios);
                await banco.SaveChangesAsync();
            }
        }
    }
}

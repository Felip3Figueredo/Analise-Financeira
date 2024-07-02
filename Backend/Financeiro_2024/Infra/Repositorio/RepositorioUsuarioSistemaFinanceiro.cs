using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Interfaces.ISistemaFinanceiro;
using Domain.Interfaces.IUsuarioSistemaFinanceiro;
using Entities.Entidades;
using Infra.Repositorio.Generics;

namespace Infra.Repositorio
{
    public class RepositorioUsuarioSistemaFinanceiro : RepositoryGenerics<UsuarioSistemaFinanceiro>, InterfaceUsuarioSistemaFinanceiro
    {
        public Task<IList<UsuarioSistemaFinanceiro>> ListaUsuariosSistemaFinanceiro(int IdSistema)
        {
            throw new NotImplementedException();
        }

        public Task<UsuarioSistemaFinanceiro> ObterUsuarioSistemaFinanceiro(string emailUsuario)
        {
            throw new NotImplementedException();
        }

        public Task RemoverUsuarioSistemaFinanceiro(List<UsuarioSistemaFinanceiro> Usuarios)
        {
            throw new NotImplementedException();
        }
    }
}

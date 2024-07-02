using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Interfaces.Generics;
using Entities.Entidades;

namespace Domain.Interfaces.IUsuarioSistemaFinanceiro
{
    public interface InterfaceUsuarioSistemaFinanceiro : InterfaceGeneric<UsuarioSistemaFinanceiro>
    {
        Task<IList<UsuarioSistemaFinanceiro>> ListaUsuariosSistemaFinanceiro(int IdSistema);
        Task RemoverUsuarioSistemaFinanceiro(List<UsuarioSistemaFinanceiro> Usuarios);
        Task<UsuarioSistemaFinanceiro> ObterUsuarioSistemaFinanceiro(string emailUsuario);
    }
}

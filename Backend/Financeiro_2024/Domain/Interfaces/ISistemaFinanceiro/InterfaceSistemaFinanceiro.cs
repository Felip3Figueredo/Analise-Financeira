using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Interfaces.Generics;
using Entities.Entidades;

namespace Domain.Interfaces.ISistemaFinanceiro
{
    public interface InterfaceSistemaFinanceiro : InterfaceGeneric<SistemaFinanceiro>
    {
        Task<List<SistemaFinanceiro>> ListaSistemasUsuario(string emailUsuario);

        Task<Boolean> ExecuteCopiaDespesasSistemaFinanceiro();
    }
}

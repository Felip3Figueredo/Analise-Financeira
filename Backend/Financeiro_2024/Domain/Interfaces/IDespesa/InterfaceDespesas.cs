using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Interfaces.Generics;
using Entities.Entidades;

namespace Domain.Interfaces.IDespesa
{
    public interface InterfaceDespesas : InterfaceGeneric<Despesa>
    {
        Task <List<Despesa>> ListaDespesaUsuario (string emailUsuario);

        Task <List<Despesa>> ListarDespesasUsuarioNaoPagasMesesAnteriores (string emailUsuario);

        Task<List<Despesa>> ListarDespesasPorCategoria(int id);
    }
}

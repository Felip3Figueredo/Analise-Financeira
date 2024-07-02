using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Interfaces.IDespesa;
using Entities.Entidades;
using Infra.Repositorio.Generics;

namespace Infra.Repositorio
{
    public class RepositorioDespesa : RepositoryGenerics<Despesa>, InterfaceDespesas
    {
        public Task<List<Despesa>> ListaDespesaUsuario(string emailUsuario)
        {
            throw new NotImplementedException();
        }

        public Task<List<Despesa>> ListarDespesasUsuarioNaoPagasMesesAnteriores(string emailUsuario)
        {
            throw new NotImplementedException();
        }
    }
}

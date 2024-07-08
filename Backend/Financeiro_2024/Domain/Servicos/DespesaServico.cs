using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Interfaces.ICategoria;
using Domain.Interfaces.IDespesa;
using Domain.Interfaces.InterfaceServicos;
using Entities.Entidades;

namespace Domain.Servicos
{
    public class DespesaServico : IDespesaService
    {
        private readonly InterfaceDespesas _interfaceDespesa;

        public DespesaServico(InterfaceDespesas interfaceDespesa) 
        {
            _interfaceDespesa = interfaceDespesa;
        }

        public async Task AdicionarDespesa(Despesa despesa)
        {
            var data = DateTime.UtcNow;
            despesa.DataCadastro = data;
            despesa.Ano = data.Year;
            despesa.Mes = data.Month;

            var valido = despesa.ValidarPropriedadeString(despesa.Nome, "Nome");

            if (valido)
            {
               await _interfaceDespesa.Add(despesa);
            }
        }

        public async Task AtualizarDespesa(Despesa despesa)
        {
            var data = DateTime.UtcNow;
            despesa.DataAlteracao = data;
            
            if (despesa.Pago)
            {
                despesa.DataPagamento = data;
            }

            var valido = despesa.ValidarPropriedadeString(despesa.Nome, "Nome");

            if (valido)
            {
                await _interfaceDespesa.Update(despesa);
            }
        }

        public async Task<object> CarregaGraficos(string emailUsuario)
        {
            var despesasUsuario = await _interfaceDespesa.ListaDespesaUsuario(emailUsuario);
            var despesasAnteriores = await _interfaceDespesa.ListarDespesasUsuarioNaoPagasMesesAnteriores(emailUsuario);

            var despesas_naoPagasMesesAnteriores = despesasAnteriores.Any() ?
                despesasAnteriores.ToList().Sum(x => x.Valor): 0;

            var despesasPagas = despesasUsuario.Where(d => d.Pago && d.TipoDespesa == Entities.Enums.EnumTipoDespesa.Contas)
                .Sum(x => x.Valor);

            var despesasPendentes = despesasUsuario.Where(d => !d.Pago && d.TipoDespesa == Entities.Enums.EnumTipoDespesa.Contas)
                .Sum(x => x.Valor);

            var investimentos = despesasUsuario.Where(d => d.TipoDespesa == Entities.Enums.EnumTipoDespesa.Investimento)
                .Sum(x => x.Valor);

            return new
            {
                sucesso = "Ok",
                despesas_pagas = despesasPagas,
                despesas_pendentes = despesasPendentes,
                despesas_naoPagasMesesAnteriores = despesas_naoPagasMesesAnteriores,
                investimentos = investimentos
            };
        }
    }
}

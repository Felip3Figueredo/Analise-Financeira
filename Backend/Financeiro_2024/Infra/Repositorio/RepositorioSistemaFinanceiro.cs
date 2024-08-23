using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Interfaces.ISistemaFinanceiro;
using Entities.Entidades;
using Infra.Configuracao;
using Infra.Repositorio.Generics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Infra.Repositorio
{
    public class RepositorioSistemaFinanceiro : RepositoryGenerics<SistemaFinanceiro>, InterfaceSistemaFinanceiro
    {
        private readonly DbContextOptions<ContextBase> _OptionBuilder;
        public RepositorioSistemaFinanceiro()
        {
            _OptionBuilder = new DbContextOptions<ContextBase>();
        }

        public async Task<bool> ExecuteCopiaDespesasSistemaFinanceiro()
        {
            var listaSistemaFinanceiro = new List<SistemaFinanceiro>();

            try
            {
                using (var banco = new ContextBase(_OptionBuilder)) 
                {
                    listaSistemaFinanceiro = await banco.SistemaFinanceiros.Where(x => x.GerarCopiaDespesa).ToListAsync();

                    foreach (var item in listaSistemaFinanceiro)
                    {
                        var dataAtual = DateTime.Now;
                        var mes = dataAtual.Month;
                        var ano = dataAtual.Year;

                        var despesaJaExiste = await (from d in banco.Despesa
                                               join c in banco.Categoria on d.IdCategoria equals c.Id
                                               where c.IdSistema == item.Id
                                               && d.Mes == mes
                                               && d.Ano == ano
                                               select d.Id).AnyAsync();

                        if (!despesaJaExiste)
                        {
                            var despesaSistema = await (from d in banco.Despesa
                                                  join c in banco.Categoria on d.IdCategoria equals c.Id
                                                 where c.IdSistema == item.Id 
                                                 && d.Mes == item.MesCopia
                                                 && d.Ano == item.AnoCopia
                                                 select d).ToListAsync();

                            despesaSistema.ForEach(d =>
                            {
                                d.DataVencimento = new DateTime(ano, mes, d.DataVencimento.Day);
                                d.Mes = mes;
                                d.Ano = ano;
                                d.DataAlteracao = DateTime.MinValue;
                                d.DataCadastro = dataAtual;
                                d.DataPagamento = DateTime.MinValue;
                                d.Pago = false;
                            });

                            if (despesaSistema.Any())
                            {
                                banco.Despesa.AddRange(despesaSistema);
                                await banco.SaveChangesAsync();
                            }
                        }
                    }
                }

                
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        public async Task<List<SistemaFinanceiro>> ListaSistemasUsuario(string emailUsuario)
        {
            using (var banco = new ContextBase(_OptionBuilder))
            {
                return await
                    (from s in banco.SistemaFinanceiros
                     join us in banco.UsuarioSistemaFinanceiros on s.Id equals us.IdSistema
                     where us.EmailUsuario.Equals(emailUsuario)
                     select s).AsNoTracking().ToListAsync();
            }
        }
    }
}

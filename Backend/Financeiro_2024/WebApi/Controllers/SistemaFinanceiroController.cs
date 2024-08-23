using Domain.Interfaces.InterfaceServicos;
using Domain.Interfaces.ISistemaFinanceiro;
using Entities.Entidades;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SistemaFinanceiroController : ControllerBase
    {
        private readonly InterfaceSistemaFinanceiro _InterfaceSistemaFinanceiro;
        private readonly ISistemaFinanceiroServico _ISistemaFinanceiroServico;

        public SistemaFinanceiroController(InterfaceSistemaFinanceiro InterfaceSistemaFinanceiro, ISistemaFinanceiroServico ISistemaFinanceiroServico)
        {
            _InterfaceSistemaFinanceiro = InterfaceSistemaFinanceiro;
            _ISistemaFinanceiroServico = ISistemaFinanceiroServico;
        }

        [HttpGet("/api/ListaSistemasUsuario")]
        [Produces("application/json")]
        public async Task<object> ListaSistemasUsuario(string emailUsuario)
        {
            return await _InterfaceSistemaFinanceiro.ListaSistemasUsuario(emailUsuario); ;
        }

        [HttpPost("/api/AdicionarSistemaFinanceiro")]
        [Produces("application/json")]
        public async Task<object> AdicionarSistemaFinanceiro(SistemaFinanceiro sistemaFinanceiro)
        {
            await _ISistemaFinanceiroServico.AdicionarSistemaFinanceiro(sistemaFinanceiro);
            var teste = Task.FromResult(sistemaFinanceiro);
            return teste.Result;
        }

        [HttpPut("/api/AtualizarSistemaFinanceiro")]
        [Produces("application/json")]
        public async Task<object> AtualizarSistemaFinanceiro(SistemaFinanceiro sistemaFinanceiro)
        {
            await _ISistemaFinanceiroServico.AtualizarSistemaFinanceiro(sistemaFinanceiro);

            return Task.FromResult(sistemaFinanceiro);
        }

        [HttpGet("/api/ObterSistemaFinanceiro")]
        [Produces("application/json")]
        public async Task<object> ObterSistemaFinanceiro(int Id)
        {
            return await _InterfaceSistemaFinanceiro.GetEntityById(Id);
        }

        [HttpDelete("/api/DeletarSistemaFinanceiro")]
        [Produces("application/json")]
        public async Task<object> DeletarSistemaFinanceiro(int Id)
        {
            try
            {
                var sistemaFinanceiro = await _InterfaceSistemaFinanceiro.GetEntityById(Id);

                await _InterfaceSistemaFinanceiro.Delete(sistemaFinanceiro);
            }
            catch (Exception ex) 
            {
                return false;
            }
            return true;

            
        }

        [HttpGet("/api/ExecuteCopiaDespesasSistemaFinanceiro")]
        [Produces("application/json")]
        public async Task<object> ExecuteCopiaDespesasSistemaFinanceiro()
        {
            return await _InterfaceSistemaFinanceiro.ExecuteCopiaDespesasSistemaFinanceiro();
        }
    }
}

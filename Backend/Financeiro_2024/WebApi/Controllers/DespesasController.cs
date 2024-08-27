using Domain.Interfaces.IDespesa;
using Domain.Interfaces.InterfaceServicos;
using Entities.Entidades;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DespesasController : ControllerBase
    {
        private readonly InterfaceDespesas _InterfaceDespesas;
        private readonly IDespesaService _DespesaService;

        public DespesasController (InterfaceDespesas interfaceDespesas, IDespesaService despesaService)
        {
            _InterfaceDespesas = interfaceDespesas;
            _DespesaService = despesaService;
        }

        [HttpGet("/api/ListarDespesasUsuario")]
        [Produces("application/json")]
        public async Task<object> ListarDespesasUsuario(string emailUsuario)
        {
            return await _InterfaceDespesas.ListaDespesaUsuario(emailUsuario);
        }

        [HttpGet("api/ListarDespesasPorCategoria")]
        [Produces("application/json")]
        public async Task<Object> ListarDespesasPorCategoria(int id)
        {
            return await _InterfaceDespesas.ListarDespesasPorCategoria(id);
        }

        [HttpPost("/api/AdicionarDespesa")]
        [Produces("application/json")]
        public async Task<object> AdicionarDespesa(Despesa despesa)
        {
            await _DespesaService.AdicionarDespesa(despesa);

            return despesa;
        }

        [HttpPut("/api/AtualizarDespesa")]
        [Produces("application/json")]
        public async Task<object> AtualizarDespesa(Despesa despesa)
        {
            await _DespesaService.AtualizarDespesa(despesa);

            return despesa;
        }

        [HttpGet("/api/ObterDespesa")]
        [Produces("application/json")]
        public async Task<object> ObterDespesa(int id)
        {
            return await _InterfaceDespesas.GetEntityById(id);
        }

        [HttpDelete("/api/DeletarDespesa")]
        [Produces("application/json")]
        public async Task<object> DeletarDespesa(int id)
        {
            try
            {
                var despesa = await _InterfaceDespesas.GetEntityById(id);
                await _InterfaceDespesas.Delete(despesa);
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }

        [HttpGet("/api/CarregarGraficos")]
        [Produces("application/json")]
        public async Task<object> CarregarGraficos(string emailUsuario)
        {
            return await _DespesaService.CarregaGraficos(emailUsuario);
        }
    }
}

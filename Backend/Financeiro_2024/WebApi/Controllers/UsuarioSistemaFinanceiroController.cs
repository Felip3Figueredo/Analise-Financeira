using Domain.Interfaces.InterfaceServicos;
using Domain.Interfaces.IUsuarioSistemaFinanceiro;
using Entities.Entidades;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsuarioSistemaFinanceiroController : ControllerBase
    {
        private readonly InterfaceUsuarioSistemaFinanceiro _InterfaceUsuarioSistemaFinanceiro;
        private readonly IUsuarioSistemaFinanceiroServico _IUsuarioSistemaFinanceiroServico;

        public UsuarioSistemaFinanceiroController(InterfaceUsuarioSistemaFinanceiro InterfaceUsuarioSistemaFinanceiro, IUsuarioSistemaFinanceiroServico IUsuarioSistemaFinanceiroServico)
        {
            _InterfaceUsuarioSistemaFinanceiro = InterfaceUsuarioSistemaFinanceiro;
            _IUsuarioSistemaFinanceiroServico = IUsuarioSistemaFinanceiroServico;
        }

        [HttpGet("/api/ListarUsuariosSistema")]
        [Produces("application/json")]
        public async Task<object> ListarSistemasUsuario (int IdSistema)
        {
            return await _InterfaceUsuarioSistemaFinanceiro.ListaUsuariosSistemaFinanceiro(IdSistema);
        }

        [HttpPost("/api/CadatraUsuarioNoSistema")]
        [Produces("application/json")]
        public async Task<object> CadatraUsuarioNoSistema(int idSistema, string emailUsuario)
        {
            try
            {
                await _IUsuarioSistemaFinanceiroServico.CadatraUsuarioNoSistema(new UsuarioSistemaFinanceiro
                {
                    IdSistema = idSistema,
                    EmailUsuario = emailUsuario,
                    Administrador = false,
                    SistemaAtual = true
                });
            }
            catch (Exception ex) 
            {
                return Task.FromResult(false);
            }

            return Task.FromResult(true);
        }

        [HttpDelete("/api/DeletarUsuarioNoSistema")]
        [Produces("application/json")]
        public async Task<object> DeletarUsuarioNoSistema(int id)
        {
            try
            {
                var usuarioSistemaFinanceiro = await _InterfaceUsuarioSistemaFinanceiro.GetEntityById(id);
                await _InterfaceUsuarioSistemaFinanceiro.Delete(usuarioSistemaFinanceiro);
            }
            catch (Exception ex)
            {
                return Task.FromResult(false);
            }

            return Task.FromResult(true);
        }
    }
}

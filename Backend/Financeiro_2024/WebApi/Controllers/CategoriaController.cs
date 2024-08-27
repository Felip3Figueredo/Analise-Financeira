using Domain.Interfaces.ICategoria;
using Domain.Interfaces.InterfaceServicos;
using Entities.Entidades;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly InterfaceCategoria _InterfaceCategoria;
        private readonly ICategoriaService _CategoriaService;

        public CategoriaController(InterfaceCategoria InterfaceCategoria, ICategoriaService ICategoriaService)
        {
            _InterfaceCategoria = InterfaceCategoria;
            _CategoriaService = ICategoriaService;
        }

        [HttpGet("/api/ListarCategoriaUsuario")]
        [Produces("application/json")]
        public async Task<IActionResult> ListarCategoriaUsuario(string emailUsuario)
        {
            var categorias = await _InterfaceCategoria.ListarCategoriaUsuario(emailUsuario);
            return Ok(categorias);  
        }

        [HttpGet("/api/ListarCategoriasPorSistema")]
        [Produces("application/json")]
        public async Task<IActionResult> ListarCategoriasPorSistema(int id)
        {
            var categorias = await _InterfaceCategoria.ListarCategoriasPorSistema(id);
            return Ok(categorias);  
        }

        [HttpPost("/api/AdicionarCategoria")]
        [Produces("application/json")]
        public async Task<object> AdicionarCategoria(Categoria categoria)
        {
            await _CategoriaService.AdicionarCategoria(categoria);

            return categoria; 
        }

        [HttpPut("/api/AtualizarCategoria")]
        [Produces("application/json")]
        public async Task<object> AtualizarCategoria(Categoria categoria)
        {
            await _CategoriaService.AtualizarCategoria(categoria);

            return categoria;
        }

        [HttpGet("/api/ObterCategoria")]
        [Produces("application/json")]
        public async Task<object> ObterCategoria(int id)
        {
            return await _InterfaceCategoria.GetEntityById(id);
        }

        [HttpDelete("/api/DeletarCategoria")]
        [Produces("application/json")]
        public async Task<object> DeletarCategoria(int id)
        {
            try
            {
                var categoria = await _InterfaceCategoria.GetEntityById(id);
                await _InterfaceCategoria.Delete(categoria);
            }
            catch (Exception ex)
            {
                return false;
            }

            return true;
        }
    }
}

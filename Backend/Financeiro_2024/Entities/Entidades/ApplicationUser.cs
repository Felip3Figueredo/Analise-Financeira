using Microsoft.AspNet.Identity.EntityFramework;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Entidades
{
    public class ApplicationUser : IdentityUser
    {
        [Column("USR_CPF")]
        public string cpf { get; set; }


    }
}

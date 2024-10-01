using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace _17.PrivateInvestigationTechnology_PTC.Models
{
    public class ApplicationUser : IdentityUser
    {
       public string? FullName { get; set; } // Campo personalizado para el nombre completo
       public string? Sexo { get; set; }
    }
}

using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace _17.PrivateInvestigationTechnology_PTC.Models
{
    public class ApplicationUser : IdentityUser
    {
<<<<<<< HEAD
       public string? FullName { get; set; } // Campo personalizado para el nombre completo
       public string? Sexo { get; set; }
=======
        public string? FullName { get; set; } // Campo personalizado para el nombre completo

        public string? Sexo { get; set; }
>>>>>>> 66de8424dee4d51763ccbc09de5695d665fd3452
    }
}

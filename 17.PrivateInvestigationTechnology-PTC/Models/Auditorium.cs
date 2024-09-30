using Microsoft.AspNetCore.Identity;

namespace _17.PrivateInvestigationTechnology_PTC.Models
{
    public partial class Auditorium
    {
        public int Id { get; set; }

        public string Descripcion { get; set; }

        // Relación con ApplicationUser
        public string IdentityUserId { get; set; } // Foreign key a ApplicationUser
        public ApplicationUser IdentityUser { get; set; } // Propiedad de navegación hacia ApplicationUser
    }
}

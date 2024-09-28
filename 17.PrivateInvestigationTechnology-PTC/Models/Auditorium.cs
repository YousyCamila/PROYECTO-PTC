using Microsoft.AspNetCore.Identity;

namespace _17.PrivateInvestigationTechnology_PTC.Models
{
    public partial class Auditorium
    {
        public int Id { get; set; }

        public string Descripcion { get; set; }

        // Nueva relación con IdentityUser
        public string IdentityUserId { get; set; } // Foreign key a IdentityUser
        public IdentityUser IdentityUser { get; set; } // Propiedad de navegación hacia IdentityUser
    }
}

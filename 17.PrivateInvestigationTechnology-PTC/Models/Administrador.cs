using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models;

public partial class Administrador
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    // Relación con IdentityUser
    public string IdentityUserId { get; set; } // FK a IdentityUser
    public IdentityUser IdentityUser { get; set; } // Navegación hacia IdentityUser
    public virtual ICollection<RegistroMantenimiento> RegistroMantenimientos { get; set; } = new List<RegistroMantenimiento>();
}

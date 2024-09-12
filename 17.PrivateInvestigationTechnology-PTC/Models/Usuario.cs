using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public int RolId { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Auditorium> Auditoria { get; set; } = new List<Auditorium>();

    public virtual ICollection<Persona> Personas { get; set; } = new List<Persona>();

    public virtual Role Rol { get; set; } = null!;
}

using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models;

public partial class Auditorium
{
    public int Id { get; set; }

    public int IdUsuario { get; set; }

    public string? Descripcion { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}

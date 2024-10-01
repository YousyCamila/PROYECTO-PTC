using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models;

public partial class RegistroMantenimiento
{
    public int Id { get; set; }

    public string Descripcion { get; set; } = null!;

    public DateTime FechaInicio { get; set; }

    public DateTime? FechaFinal { get; set; }

    public bool Estado { get; set; }

    public int IdAdministrador { get; set; }

    public virtual Administrador IdAdministradorNavigation { get; set; } = null!;
}

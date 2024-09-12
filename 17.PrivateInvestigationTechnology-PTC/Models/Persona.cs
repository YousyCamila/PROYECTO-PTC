using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models;

public partial class Persona
{
    public int Id { get; set; }

    public int IdUsuario { get; set; }

    public string Nombre { get; set; } = null!;

    public int? IdAdministrador { get; set; }

    public int? IdDetective { get; set; }

    public int? IdCliente { get; set; }

    public virtual Administrador? IdAdministradorNavigation { get; set; }

    public virtual Cliente? IdClienteNavigation { get; set; }

    public virtual Detective? IdDetectiveNavigation { get; set; }

    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}

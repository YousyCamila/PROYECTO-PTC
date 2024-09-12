using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models;

public partial class Formulario
{
    public int Id { get; set; }

    public int IdCliente { get; set; }

    public string? Detalles { get; set; }

    public virtual Cliente IdClienteNavigation { get; set; } = null!;
}

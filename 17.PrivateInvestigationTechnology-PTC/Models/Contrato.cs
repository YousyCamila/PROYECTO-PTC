using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models;

public partial class Contrato
{
    public int Id { get; set; }

    public int IdCliente { get; set; }

    public int IdDetective { get; set; }

    public string? Detalles { get; set; }

    public virtual Cliente IdClienteNavigation { get; set; } = null!;

    public virtual Detective IdDetectiveNavigation { get; set; } = null!;
}

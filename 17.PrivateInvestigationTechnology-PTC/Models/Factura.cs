using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models;

public partial class Factura
{
    public int Id { get; set; }

    public int IdCliente { get; set; }

    public decimal Monto { get; set; }

    public virtual Cliente IdClienteNavigation { get; set; } = null!;
}

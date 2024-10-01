using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models;

public partial class RegistroCaso
{
    public int Id { get; set; }

    public int IdCaso { get; set; }

    public string? Descripcion { get; set; }

    public virtual Caso IdCasoNavigation { get; set; } = null!;
}

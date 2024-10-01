using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models;

public partial class TipoEvidencium
{
    public int Id { get; set; }

    public int IdEvidencia { get; set; }

    public string? Descripcion { get; set; }

    public virtual Evidencium IdEvidenciaNavigation { get; set; } = null!;
}

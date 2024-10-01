using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models;

public partial class Evidencium
{
    public int Id { get; set; }

    public int IdCaso { get; set; } 

    public string RutaArchivo { get; set; }

    public DateTime FechaSubida { get; set; }

    public string? Descripcion { get; set; }

    public virtual Caso IdCasoNavigation { get; set; } = null!;

    public virtual ICollection<TipoEvidencium> TipoEvidencia { get; set; } = new List<TipoEvidencium>();
}

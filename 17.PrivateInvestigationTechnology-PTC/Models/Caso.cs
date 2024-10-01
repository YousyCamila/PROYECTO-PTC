using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models;

public partial class Caso
{
    public int Id { get; set; }

    public decimal Progreso { get; set; }
    public int IdCliente { get; set; }

    public int IdDetective { get; set; }

    public string? Descripcion { get; set; }

    public virtual ICollection<Evidencium> Evidencia { get; set; } = new List<Evidencium>();

    public virtual Cliente IdClienteNavigation { get; set; } = null!;

    public virtual Detective IdDetectiveNavigation { get; set; } = null!;

    public virtual ICollection<RegistroCaso> RegistroCasos { get; set; } = new List<RegistroCaso>();
}

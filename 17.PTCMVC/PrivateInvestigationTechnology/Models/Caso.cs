using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Index("IdCliente", Name = "IX_CASOS_ID_Cliente")]
[Index("IdDetective", Name = "IX_CASOS_ID_Detective")]
public partial class Caso
{
    [Key]
    public int Id { get; set; }

    public string CadenaCustodia { get; set; } = null!;

    public string? InvestigacionExtorsion { get; set; }

    public string? EstudiosSeguridad { get; set; }

    public string? InvestigacionInfidelidades { get; set; }

    public string? InvestigacionRobosEmpresariales { get; set; }

    public string? Antecedentes { get; set; }

    public string? RecuperacionVehiculos { get; set; }

    public int IdCliente { get; set; }

    public int? IdDetective { get; set; }

    [InverseProperty("IdCasosNavigation")]
    public virtual ICollection<Evidencia> Evidencia { get; set; } = new List<Evidencia>();

    [ForeignKey("IdCliente")]
    [InverseProperty("Casos")]
    public virtual Cliente IdClienteNavigation { get; set; } = null!;

    [ForeignKey("IdDetective")]
    [InverseProperty("Casos")]
    public virtual Detective? IdDetectiveNavigation { get; set; }

    [InverseProperty("IdCasosNavigation")]
    public virtual ICollection<RegistroCaso> RegistroCasos { get; set; } = new List<RegistroCaso>();
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Table("Contrato")]
[Index("IdCliente", Name = "IX_CONTRATO_ID_Cliente")]
[Index("IdDetective", Name = "IX_CONTRATO_ID_Detective")]
public partial class Contrato
{
    [Key]
    public int Id { get; set; }

    [StringLength(255)]
    public string DescripcionServicio { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime FechaInicio { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime FechaCierre { get; set; }

    public string? Clausulas { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal Tarifa { get; set; }

    public bool Estado { get; set; }

    public int IdCliente { get; set; }

    public int? IdDetective { get; set; }

    [ForeignKey("IdCliente")]
    [InverseProperty("Contratos")]
    public virtual Cliente IdClienteNavigation { get; set; } = null!;

    [ForeignKey("IdDetective")]
    [InverseProperty("Contratos")]
    public virtual Detective? IdDetectiveNavigation { get; set; }
}

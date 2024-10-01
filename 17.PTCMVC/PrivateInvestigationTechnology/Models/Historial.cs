using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Table("Historial")]
[Index("IdCliente", Name = "IX_HISTORIAL_ID_Cliente")]
public partial class Historial
{
    [Key]
    public int Id { get; set; }

    public string Descripcion { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime FechaInicio { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaFinal { get; set; }

    public int IdCliente { get; set; }

    [ForeignKey("IdCliente")]
    [InverseProperty("Historials")]
    public virtual Cliente IdClienteNavigation { get; set; } = null!;
}

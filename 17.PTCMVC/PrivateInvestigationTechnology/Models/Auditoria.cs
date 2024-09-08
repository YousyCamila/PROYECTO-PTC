using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Index("IdUsuario", Name = "IX_AUDITORIA_ID_Usuario")]
public partial class Auditoria
{
    [Key]
    public int Id { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime FechaActividad { get; set; }

    public string DescripcionActividad { get; set; } = null!;

    public bool Estado { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime HoraActividad { get; set; }

    public string? DetallesAdicionales { get; set; }

    public int IdUsuario { get; set; }

    [ForeignKey("IdUsuario")]
    [InverseProperty("Auditoria")]
    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Index("IdCasos", Name = "IX_REGISTRO_CASOS_ID_Casos")]
public partial class RegistroCaso
{
    [Key]
    public int Id { get; set; }

    public string Descripcion { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime FechaInicio { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaFinalizacion { get; set; }

    [StringLength(50)]
    public string EstadoRegistro { get; set; } = null!;

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? SeguimientoPorcentaje { get; set; }

    public int IdCasos { get; set; }

    [ForeignKey("IdCasos")]
    [InverseProperty("RegistroCasos")]
    public virtual Caso IdCasosNavigation { get; set; } = null!;
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Index("IdCasos", Name = "IX_EVIDENCIA_ID_Casos")]
public partial class Evidencia
{
    [Key]
    public int Id { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime FechaEvidencia { get; set; }

    public string Descripcion { get; set; } = null!;

    public int IdCasos { get; set; }

    [ForeignKey("IdCasos")]
    [InverseProperty("Evidencia")]
    public virtual Caso IdCasosNavigation { get; set; } = null!;

    [InverseProperty("IdEvidenciaNavigation")]
    public virtual ICollection<TipoEvidencia> TipoEvidencia { get; set; } = new List<TipoEvidencia>();
}

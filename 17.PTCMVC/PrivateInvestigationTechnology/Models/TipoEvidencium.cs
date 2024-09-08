using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Index("IdEvidencia", Name = "IX_TIPO_EVIDENCIA_ID_Evidencia")]
public partial class TipoEvidencium
{
    [Key]
    public int Id { get; set; }

    [StringLength(50)]
    public string TipoDocumento { get; set; } = null!;

    [StringLength(50)]
    public string? TipoFotografia { get; set; }

    [StringLength(50)]
    public string? TipoVideo { get; set; }

    [StringLength(50)]
    public string? TipoAudio { get; set; }

    [StringLength(50)]
    public string? ArchivosDigitales { get; set; }

    public int IdEvidencia { get; set; }

    [ForeignKey("IdEvidencia")]
    [InverseProperty("TipoEvidencia")]
    public virtual Evidencium IdEvidenciaNavigation { get; set; } = null!;
}

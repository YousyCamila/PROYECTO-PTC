using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models;

[Table("DETECTIVE")]
public partial class DETECTIVE
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Detective { get; set; }

    [StringLength(100)]
    public string? Especialidad { get; set; }

    // Propiedad de navegación para CASO
    [InverseProperty("ID_DetectiveNavigation")]
    public virtual ICollection<CASOS> CASOS { get; set; } = new List<CASOS>();

    // Agregando la propiedad de navegación para CONTRATO
    [InverseProperty("ID_DetectiveNavigation")]
    public virtual ICollection<CONTRATO> CONTRATOS { get; set; } = new List<CONTRATO>();

    [ForeignKey("ID_Detective")]
    [InverseProperty("DETECTIVE")]
    public virtual PERSONA ID_DetectiveNavigation { get; set; } = null!;
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Table("Detective")]
public partial class Detective
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    public string? Especialidad { get; set; }

    [InverseProperty("IdDetectiveNavigation")]
    public virtual ICollection<Caso> Casos { get; set; } = new List<Caso>();

    [InverseProperty("IdDetectiveNavigation")]
    public virtual ICollection<Contrato> Contratos { get; set; } = new List<Contrato>();

    [ForeignKey("Id")]
    [InverseProperty("Detective")]
    public virtual Persona IdNavigation { get; set; } = null!;
}

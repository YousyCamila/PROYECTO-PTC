using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Table("Administrador")]
public partial class Administrador
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    public string? Especialidad { get; set; }

    [ForeignKey("Id")]
    [InverseProperty("Administrador")]
    public virtual Persona IdNavigation { get; set; } = null!;

    [InverseProperty("IdAdministradorNavigation")]
    public virtual ICollection<RegistroMantenimiento> RegistroMantenimientos { get; set; } = new List<RegistroMantenimiento>();
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Table("Persona")]
public partial class Persona
{
    [Key]
    public int Id { get; set; }

    [StringLength(20)]
    public string DNI { get; set; } = null!;

    [StringLength(100)]
    public string Nombres { get; set; } = null!;

    [StringLength(100)]
    public string Apellidos { get; set; } = null!;

    [StringLength(100)]
    public string Correo { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime FechaNacimiento { get; set; }

    public int? IdUsuario { get; set; }

    [InverseProperty("IdNavigation")]
    public virtual Administrador? Administrador { get; set; }

    [InverseProperty("IdNavigation")]
    public virtual Cliente? Cliente { get; set; }

    [InverseProperty("IdNavigation")]
    public virtual Detective? Detective { get; set; }

    [ForeignKey("IdUsuario")]
    [InverseProperty("Personas")]
    public virtual Usuario? IdUsuarioNavigation { get; set; }
}

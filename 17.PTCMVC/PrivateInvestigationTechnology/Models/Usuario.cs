using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Table("Usuario")]
[Index("RolId", Name = "IX_USUARIO_RolId")]
public partial class Usuario
{
    [Key]
    public int Id { get; set; }

    [StringLength(50)]
    public string Username { get; set; } = null!;

    [StringLength(100)]
    public string Email { get; set; } = null!;

    [StringLength(20)]
    public string Telefono { get; set; } = null!;

    [StringLength(255)]
    public string Password { get; set; } = null!;

    public int RolId { get; set; }

    [InverseProperty("IdUsuarioNavigation")]
    public virtual ICollection<Auditorium> Auditoria { get; set; } = new List<Auditorium>();

    [InverseProperty("IdUsuarioNavigation")]
    public virtual ICollection<Persona> Personas { get; set; } = new List<Persona>();

    [ForeignKey("RolId")]
    [InverseProperty("Usuarios")]
    public virtual Role Rol { get; set; } = null!;
}

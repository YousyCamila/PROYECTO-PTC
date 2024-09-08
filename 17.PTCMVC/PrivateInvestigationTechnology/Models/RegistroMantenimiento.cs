using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Table("RegistroMantenimiento")]
[Index("IdAdministrador", Name = "IX_REGISTRO_MANTENIMIENTO_ID_Administrador")]
public partial class RegistroMantenimiento
{
    [Key]
    public int Id { get; set; }

    public string Descripcion { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime FechaInicio { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaFinal { get; set; }

    public bool Estado { get; set; }

    public int IdAdministrador { get; set; }

    [ForeignKey("IdAdministrador")]
    [InverseProperty("RegistroMantenimientos")]
    public virtual Administrador IdAdministradorNavigation { get; set; } = null!;
}

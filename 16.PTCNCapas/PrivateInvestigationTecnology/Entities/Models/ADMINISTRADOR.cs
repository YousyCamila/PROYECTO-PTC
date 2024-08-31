using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

[Table("ADMINISTRADOR")]
public partial class ADMINISTRADOR
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Administrador { get; set; }

    [StringLength(100)]
    public string? Especialidad { get; set; }

    [ForeignKey("ID_Administrador")]
    [InverseProperty("ADMINISTRADOR")]
    public virtual PERSONA ID_AdministradorNavigation { get; set; } = null!;


    [InverseProperty("ID_AdministradorNavigation")]
    public virtual ICollection<REGISTRO_MANTENIMIENTO> REGISTRO_MANTENIMIENTOS { get; set; } = new List<REGISTRO_MANTENIMIENTO>();
}

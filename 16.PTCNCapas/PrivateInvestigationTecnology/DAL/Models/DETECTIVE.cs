using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

[Table("DETECTIVE")]
public partial class DETECTIVE
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Detective { get; set; }

    [StringLength(100)]
    public string? Especialidad { get; set; }

    [ForeignKey("ID_Detective")]
    [InverseProperty("DETECTIVE")]
    public virtual PERSONA Persona { get; set; } = null!; // Cambio de nombre para mayor claridad
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

[Table("ROLES")]
public partial class ROLE
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int RolId { get; set; }

    [StringLength(50)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Nombre { get; set; } = null!;

    public bool Estado { get; set; }

    [InverseProperty("Rol")]
    public virtual ICollection<USUARIO> USUARIOS { get; set; } = new List<USUARIO>();
}

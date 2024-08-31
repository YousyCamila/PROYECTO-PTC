using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

[Table("USUARIO")]
public partial class USUARIO
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Usuario { get; set; }

    [StringLength(50)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Username { get; set; } = null!;

    [StringLength(100)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Email { get; set; } = null!;

    [StringLength(20)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Telefono { get; set; } = null!;

    [StringLength(255)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Password { get; set; } = null!;

    public int RolId { get; set; }

    [InverseProperty("ID_UsuarioNavigation")]
    public virtual ICollection<AUDITORIA> AUDITORIAS{ get; set; } = new List<AUDITORIA>();

    [ForeignKey("RolId")]
    [InverseProperty("USUARIOS")] // Corrige el nombre de la propiedad inversa en ROLE
    public virtual ROLE Rol { get; set; } = null!;
}

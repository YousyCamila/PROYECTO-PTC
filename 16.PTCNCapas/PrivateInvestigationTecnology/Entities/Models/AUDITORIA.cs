using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
//using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

[Table("AUDITORIA")]
public partial class AUDITORIA
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Auditoria { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime Fecha_Actividad { get; set; }

    [Required] // Para asegurar que no es null en la base de datos
    public string Descrip_Actividad { get; set; } = null!;

    public bool Estado { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime Hora_Actividad { get; set; }

    public string? Detalles_Adicionales { get; set; }

    public int ID_Usuario { get; set; }

    [ForeignKey("ID_Usuario")]
    [InverseProperty("AUDITORIAS")] // Corrige el nombre de la propiedad inversa
    public virtual USUARIO ID_UsuarioNavigation { get; set; } = null!;
}

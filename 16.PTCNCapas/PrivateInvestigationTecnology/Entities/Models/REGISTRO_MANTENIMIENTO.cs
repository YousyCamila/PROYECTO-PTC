using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models;

[Table("REGISTRO_MANTENIMIENTO")]
public partial class REGISTRO_MANTENIMIENTO
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Mantenimiento { get; set; }

    [Required] // Para asegurar que no es null en la base de datos
    public string Descripcion { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime Fecha_Inicio { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_Final { get; set; }

    public bool Estado { get; set; }

    public int ID_Administrador { get; set; }

    [ForeignKey("ID_Administrador")]
    [InverseProperty("REGISTRO_MANTENIMIENTOS")] // Corrige el nombre de la propiedad inversa en ADMINISTRADOR
    public virtual ADMINISTRADOR ID_AdministradorNavigation { get; set; } = null!;
}

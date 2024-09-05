using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models;

[Table("HISTORIAL")]
public partial class HISTORIAL
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Historial { get; set; }

    [Required] // Para asegurar que no es null en la base de datos
    public string Descripcion { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime Fecha_Inicio_Histo { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_Final_Histo { get; set; }

    public int ID_Cliente { get; set; }

    [ForeignKey("ID_Cliente")]
    [InverseProperty("HISTORIALES")] // Corrige el nombre de la propiedad inversa en CLIENTE
    public virtual CLIENTE ID_ClienteNavigation { get; set; } = null!;
}

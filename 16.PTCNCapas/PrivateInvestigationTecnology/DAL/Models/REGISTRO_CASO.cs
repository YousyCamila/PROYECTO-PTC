using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

[Table("REGISTRO_CASOS")]
public partial class REGISTRO_CASO
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Registro_Casos { get; set; }

    [Required] // Para asegurar que no es null en la base de datos
    public string Descripcion { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime Fecha_Inicio { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha_Finalizacion { get; set; }

    [StringLength(50)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Estado_Registro { get; set; } = null!;

    [Column(TypeName = "decimal(5, 2)")]
    public decimal? Seguimiento_Porcentaje { get; set; }

    public int ID_Casos { get; set; }

    [ForeignKey("ID_Casos")]
    [InverseProperty("REGISTRO_CASOS")] // Corrige el nombre de la propiedad inversa en CASO
    public virtual CASO ID_CasosNavigation { get; set; } = null!;
}

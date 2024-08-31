using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

[Table("EVIDENCIA")]
public partial class EVIDENCIA
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Evidencia { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime Fecha_Evidencia { get; set; }

    [Required] // Para asegurar que no es null en la base de datos
    public string Descripcion { get; set; } = null!;

    public int ID_Casos { get; set; }

    [ForeignKey("ID_Casos")]
    [InverseProperty("EVIDENCIAS")] // Corrige el nombre de la propiedad inversa en CASO
    public virtual CASOS ID_CasosNavigation { get; set; } = null!;

    [InverseProperty("ID_EvidenciaNavigation")]
    public virtual ICollection<TIPO_EVIDENCIA> TIPO_EVIDENCIAS { get; set; } = new List<TIPO_EVIDENCIA>(); // Corrige el tipo de entidad
}

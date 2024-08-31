using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

[Table("TIPO_EVIDENCIA")]
public partial class TIPO_EVIDENCIA
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Tipo_Evidencia { get; set; }

    [StringLength(50)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Tipo_Documento { get; set; } = null!;

    [StringLength(50)]
    public string? Tipo_Fotografia { get; set; }

    [StringLength(50)]
    public string? Tipo_Video { get; set; }

    [StringLength(50)]
    public string? Tipo_Audio { get; set; }

    [StringLength(50)]
    public string? Archivos_Digitales { get; set; }

    public int ID_Evidencia { get; set; }

    [ForeignKey("ID_Evidencia")]
    [InverseProperty("TIPO_EVIDENCIAS")] // Corrige el nombre de la propiedad inversa en EVIDENCIA
    public virtual EVIDENCIA ID_EvidenciaNavigation { get; set; } = null!;
}

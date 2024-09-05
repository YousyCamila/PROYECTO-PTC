using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models;

[Table("CASOS")]
public partial class CASOS
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Casos { get; set; }

    [Required] // Para asegurar que no es null en la base de datos
    public string Cadena_Custodia { get; set; } = null!;

    public string? Investigacion_Extorsion { get; set; }

    public string? Estudios_Seguridad { get; set; }

    public string? Investigacion_Infidelidades { get; set; }

    public string? Investigacion_Robos_Empresariales { get; set; }

    public string? Antecedentes { get; set; }

    public string? Recuperacion_Vehiculos { get; set; }

    // Relación con Cliente
    public int ID_Cliente { get; set; }

    // Relación con DETECTIVE
    public int? ID_Detective { get; set; }  

    [ForeignKey("ID_Cliente")]
    [InverseProperty("CASOS")]
    public virtual CLIENTE ID_ClienteNavigation { get; set; } = null!;

    // Relación con Detective
 

    [ForeignKey("ID_Detective")]
    [InverseProperty("CASOS")]
    public virtual DETECTIVE? ID_DetectiveNavigation { get; set; }

    // Relación con Evidencias
    [InverseProperty("ID_CasosNavigation")]
    public virtual ICollection<EVIDENCIA> EVIDENCIAS { get; set; } = new List<EVIDENCIA>();

    // Relación con Registro de Casos
    [InverseProperty("ID_CasosNavigation")]
    public virtual ICollection<REGISTRO_CASO> REGISTRO_CASOS { get; set; } = new List<REGISTRO_CASO>();
}

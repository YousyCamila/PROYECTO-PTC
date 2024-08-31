using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Policy;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models;

[Table("CASOS")]
public partial class CASO
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

    public int ID_Cliente { get; set; }

    [ForeignKey("ID_Cliente")]
    [InverseProperty("CASOS")] // Corrige el nombre de la propiedad inversa en CLIENTE
    public virtual CLIENTE ID_ClienteNavigation { get; set; } = null!;

    [InverseProperty("ID_CasosNavigation")]
    public virtual ICollection<EVIDENCIA> EVIDENCIAS { get; set; } = new List<EVIDENCIA>(); // Corrige el tipo de entidad

    [InverseProperty("ID_CasosNavigation")]
    public virtual ICollection<REGISTRO_CASO> REGISTRO_CASOS { get; set; } = new List<REGISTRO_CASO>();
}

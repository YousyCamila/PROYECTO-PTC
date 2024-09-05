using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models;

[Table("CONTRATO")]
public partial class CONTRATO
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Contrato { get; set; }

    [StringLength(255)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Descrip_Servicio { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime Fecha_Inicio { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime Fecha_Cierre { get; set; }

    public string? Clausulas { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal Tarifa { get; set; }

    public bool Estado { get; set; }

    public int ID_Cliente { get; set; }

    public int? ID_Detective { get; set; }

    [ForeignKey("ID_Cliente")]
    [InverseProperty("CONTRATOS")]
    public virtual CLIENTE ID_ClienteNavigation { get; set; } = null!;

    [ForeignKey("ID_Detective")]
    [InverseProperty("CONTRATOS")]
    public virtual DETECTIVE? ID_DetectiveNavigation { get; set; }
}

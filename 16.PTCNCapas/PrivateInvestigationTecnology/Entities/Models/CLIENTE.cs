using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models;

[Table("CLIENTE")]
public partial class CLIENTE
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Asegura que es autoincrementable
    public int ID_Cliente { get; set; }

    [StringLength(255)]
    public string? Direccion { get; set; }

    [InverseProperty("ID_ClienteNavigation")]
    public virtual ICollection<CASOS> CASOS { get; set; } = new List<CASOS>();

    [InverseProperty("ID_ClienteNavigation")]
    public virtual ICollection<CONTRATO> CONTRATOS { get; set; } = new List<CONTRATO>();

    [InverseProperty("ID_ClienteNavigation")]
    public virtual ICollection<FACTURA> FACTURAS { get; set; } = new List<FACTURA>();

    [InverseProperty("ID_ClienteNavigation")]
    public virtual ICollection<FORMULARIO> FORMULARIOS { get; set; } = new List<FORMULARIO>();

    [InverseProperty("ID_ClienteNavigation")]
    public virtual ICollection<HISTORIAL> HISTORIALES { get; set; } = new List<HISTORIAL>();

    [ForeignKey("ID_Cliente")]
    [InverseProperty("CLIENTE")]
    public virtual PERSONA ID_ClienteNavigation { get; set; } = null!;  // Asegura la relación uno a uno con PERSONA
}

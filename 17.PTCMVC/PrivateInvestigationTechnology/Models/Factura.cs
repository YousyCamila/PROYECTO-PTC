using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Table("Factura")]
[Index("IdCliente", Name = "IX_FACTURA_ID_Cliente")]
public partial class Factura
{
    [Key]
    public int Id { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime FechaEmision { get; set; }

    [StringLength(50)]
    public string EstadoPago { get; set; } = null!;

    [StringLength(255)]
    public string DescripcionServicio { get; set; } = null!;

    [Column(TypeName = "decimal(10, 2)")]
    public decimal TotalPagar { get; set; }

    public int IdCliente { get; set; }

    [ForeignKey("IdCliente")]
    [InverseProperty("Facturas")]
    public virtual Cliente IdClienteNavigation { get; set; } = null!;
}

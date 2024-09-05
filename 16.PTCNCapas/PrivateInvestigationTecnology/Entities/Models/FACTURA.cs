using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models;

[Table("FACTURA")]
public partial class FACTURA
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Autoincrementable
    public int ID_Factura { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime Fecha_Emision { get; set; }

    [StringLength(50)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Estado_Pago { get; set; } = null!;

    [StringLength(255)]
    [Required] // Para asegurar que no es null en la base de datos
    public string Descripcion_Serv { get; set; } = null!;

    [Column(TypeName = "decimal(10, 2)")]
    public decimal Total_Pagar { get; set; }

    public int ID_Cliente { get; set; }

    [ForeignKey("ID_Cliente")]
    [InverseProperty("FACTURAS")] // Corrige el nombre de la propiedad inversa en CLIENTE
    public virtual CLIENTE ID_ClienteNavigation { get; set; } = null!;
}

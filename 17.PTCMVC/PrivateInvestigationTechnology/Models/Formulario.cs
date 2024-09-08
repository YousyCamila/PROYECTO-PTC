using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Table("Formulario")]
[Index("IdCliente", Name = "IX_FORMULARIO_ID_Cliente")]
public partial class Formulario
{
    [Key]
    public int Id { get; set; }

    [StringLength(100)]
    public string Nombre { get; set; } = null!;

    [StringLength(15)]
    public string NumeroCelular { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime FechaEnvio { get; set; }

    public int IdCliente { get; set; }

    [ForeignKey("IdCliente")]
    [InverseProperty("Formularios")]
    public virtual Cliente IdClienteNavigation { get; set; } = null!;
}

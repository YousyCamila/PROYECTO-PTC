using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PrivateInvestigationTechnology.Models;

[Table("Cliente")]
public partial class Cliente
{
    [Key]
    public int Id { get; set; }

    [StringLength(255)]
    public string? Direccion { get; set; }

    [InverseProperty("IdClienteNavigation")]
    public virtual ICollection<Caso> Casos { get; set; } = new List<Caso>();

    [InverseProperty("IdClienteNavigation")]
    public virtual ICollection<Contrato> Contratos { get; set; } = new List<Contrato>();

    [InverseProperty("IdClienteNavigation")]
    public virtual ICollection<Factura> Facturas { get; set; } = new List<Factura>();

    [InverseProperty("IdClienteNavigation")]
    public virtual ICollection<Formulario> Formularios { get; set; } = new List<Formulario>();

    [InverseProperty("IdClienteNavigation")]
    public virtual ICollection<Historial> Historials { get; set; } = new List<Historial>();

    [ForeignKey("Id")]
    [InverseProperty("Cliente")]
    public virtual Persona IdNavigation { get; set; } = null!;
}

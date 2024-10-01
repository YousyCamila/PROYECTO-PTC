using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models
{
    public partial class Cliente
    {
        public int Id { get; set; }

        // Relación opcional con ApplicationUser
        public string? IdentityUserId { get; set; } // FK a ApplicationUser
        public ApplicationUser? IdentityUser { get; set; } // Relación opcional hacia ApplicationUser

        // Relaciones opcionales con otras entidades
        public virtual ICollection<Caso> Casos { get; set; } = new List<Caso>();
        public virtual ICollection<Contrato> Contratos { get; set; } = new List<Contrato>();
        public virtual ICollection<Factura> Facturas { get; set; } = new List<Factura>();
        public virtual ICollection<Formulario> Formularios { get; set; } = new List<Formulario>();
        public virtual ICollection<Historial> Historials { get; set; } = new List<Historial>();
    }
}

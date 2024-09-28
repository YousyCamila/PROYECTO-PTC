using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models
{
    public partial class Detective
    {
        public int Id { get; set; }

        public string Nombre { get; set; } = null!;  // Este campo es obligatorio

        // Número de identidad opcional
        public string? NumeroIdentidad { get; set; }

        // Número de celular opcional
        public string? NumeroCelular { get; set; }

        // Fecha de nacimiento opcional
        public DateTime? FechaNacimiento { get; set; }

        // Campo para hoja de vida (puede ser opcional)
        public byte[]? HojaDeVida { get; set; } // Guardar archivo binario (PDF, DOC, etc.)

        // Relación opcional con IdentityUser
        public string? IdentityUserId { get; set; } // FK a IdentityUser
        public IdentityUser? IdentityUser { get; set; } // Relación opcional hacia IdentityUser

        // Relaciones opcionales con otras entidades
        public virtual ICollection<Caso> Casos { get; set; } = new List<Caso>();
        public virtual ICollection<Contrato> Contratos { get; set; } = new List<Contrato>();
    }
}

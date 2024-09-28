using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models
{
    public partial class Administrador
    {
        public int Id { get; set; }

        public string Nombre { get; set; } = null!;  // Este campo es obligatorio

        // Número de identidad opcional
        public string? NumeroIdentidad { get; set; }

        // Número de celular opcional
        public string? NumeroCelular { get; set; }

        // Hoja de vida opcional (almacenada como archivo binario)
        public byte[]? HojaDeVida { get; set; } // Archivo PDF, DOC, etc.

        // Relación opcional con IdentityUser
        public string? IdentityUserId { get; set; } // FK a IdentityUser
        public IdentityUser? IdentityUser { get; set; } // Relación opcional hacia IdentityUser

        // Relaciones opcionales con otras entidades
        public virtual ICollection<RegistroMantenimiento> RegistroMantenimientos { get; set; } = new List<RegistroMantenimiento>();
    }
}

using System;
using System.Collections.Generic;

namespace _17.PrivateInvestigationTechnology_PTC.Models
{
    public partial class Detective
    {
        public int Id { get; set; }

        // Número de identidad opcional
        public string? NumeroIdentidad { get; set; }

        // Campo para hoja de vida (puede ser opcional)
        public byte[]? HojaDeVida { get; set; } // Guardar archivo binario (PDF, DOC, etc.)

        // Campo para almacenar la foto de perfil opcional (almacenada como archivo binario)
        public byte[]? FotoPerfil { get; set; } // Imagen en formato binario (JPEG, PNG, etc.)

        // Relación opcional con ApplicationUser
        public string? IdentityUserId { get; set; } // FK a ApplicationUser
        public ApplicationUser? IdentityUser { get; set; } // Relación opcional hacia ApplicationUser

        // Relaciones opcionales con otras entidades
        public virtual ICollection<Caso> Casos { get; set; } = new List<Caso>();
        public virtual ICollection<Contrato> Contratos { get; set; } = new List<Contrato>();
    }
}

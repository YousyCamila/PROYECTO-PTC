using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _17.PrivateInvestigationTechnology_PTC.Logic
{
    public class RoleAssignmentService
    {
        private readonly ApplicationDbContext _context;

        public RoleAssignmentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AssignToEntityAsync(ApplicationUser user, List<string> selectedRoles)
        {
            // Obtener los datos de ApplicationUser como FullName, Email, PhoneNumber
            var email = user.Email;
            var phoneNumber = user.PhoneNumber;
            var fullName = user.FullName;

            foreach (var role in selectedRoles)
            {
                if (role == "Administrador")
                {
                    // Verificar si ya existe el administrador
                    if (!_context.Administradores.Any(a => a.IdentityUserId == user.Id))
                    {
                        var admin = new Administrador
                        {
                            IdentityUserId = user.Id,
                            IdentityUser = user,
                            NumeroIdentidad = "123456789", // Ajustar según sea necesario
                            HojaDeVida = null,
                            FotoPerfil = null
                        };
                        _context.Administradores.Add(admin);
                    }
                }
                else if (role == "Cliente")
                {
                    // Verificar si ya existe el cliente
                    if (!_context.Clientes.Any(c => c.IdentityUserId == user.Id))
                    {
                        var cliente = new Cliente
                        {
                            IdentityUserId = user.Id,
                            IdentityUser = user,
                        };
                        _context.Clientes.Add(cliente);
                    }
                }
                else if (role == "Detective")
                {
                    // Verificar si ya existe el detective
                    if (!_context.Detectives.Any(d => d.IdentityUserId == user.Id))
                    {
                        var detective = new Detective
                        {
                            IdentityUserId = user.Id,
                            IdentityUser = user,
                            NumeroIdentidad = "654987321", // Ajustar según sea necesario
                            HojaDeVida = null,
                            FotoPerfil = null
                        };
                        _context.Detectives.Add(detective);
                    }
                }
            }

            await _context.SaveChangesAsync(); // Guardar cambios en la base de datos
        }
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;
using Microsoft.Extensions.Logging;

namespace _17.PrivateInvestigationTechnology_PTC.Logic
{
    public class RoleAssignmentService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<RoleAssignmentService> _logger; // Para registro de errores

        // Constructor que inyecta el contexto de la base de datos y el logger
        public RoleAssignmentService(ApplicationDbContext context, ILogger<RoleAssignmentService> logger)
        {
            _context = context;
            _logger = logger;
        }

        // Método para asignar roles y crear las entidades correspondientes
        public async Task<bool> AssignToEntityAsync(ApplicationUser user, List<string> selectedRoles)
        {
            try
            {
                foreach (var role in selectedRoles)
                {
                    if (role == "Administrador")
                    {
                        await AssignAdminAsync(user);
                    }
                    else if (role == "Cliente")
                    {
                        await AssignClienteAsync(user);
                    }
                    else if (role == "Detective")
                    {
                        await AssignDetectiveAsync(user);
                    }
                }

                await _context.SaveChangesAsync(); // Guardar cambios en la base de datos
                return true;
            }
            catch (System.Exception ex)
            {
                _logger?.LogError(ex, $"Error al asignar roles al usuario con ID: {user.Id}");
                return false; // Retornar false en caso de error
            }
        }

        // Método para asignar el rol de Administrador y crear la entidad Administrador
        private async Task AssignAdminAsync(ApplicationUser user)
        {
            try
            {
                // Verificar si ya existe una entidad Administrador para este usuario
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
            catch (System.Exception ex)
            {
                _logger?.LogError(ex, $"Error al asignar el rol de Administrador al usuario con ID: {user.Id}");
                throw;
            }
        }

        // Método para asignar el rol de Cliente y crear la entidad Cliente
        private async Task AssignClienteAsync(ApplicationUser user)
        {
            try
            {
                // Verificar si ya existe una entidad Cliente para este usuario
                if (!_context.Clientes.Any(c => c.IdentityUserId == user.Id))
                {
                    var cliente = new Cliente
                    {
                        IdentityUserId = user.Id,
                        IdentityUser = user
                    };
                    _context.Clientes.Add(cliente);
                }
            }
            catch (System.Exception ex)
            {
                _logger?.LogError(ex, $"Error al asignar el rol de Cliente al usuario con ID: {user.Id}");
                throw;
            }
        }

        // Método para asignar el rol de Detective y crear la entidad Detective
        private async Task AssignDetectiveAsync(ApplicationUser user)
        {
            try
            {
                // Verificar si ya existe una entidad Detective para este usuario
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
            catch (System.Exception ex)
            {
                _logger?.LogError(ex, $"Error al asignar el rol de Detective al usuario con ID: {user.Id}");
                throw;
            }
        }
    }
}

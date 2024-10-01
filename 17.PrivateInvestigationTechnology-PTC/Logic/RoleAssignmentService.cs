using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;

public class RoleAssignmentService
{
    private readonly ApplicationDbContext _context;

    public RoleAssignmentService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task AssignToEntityAsync(ApplicationUser user, List<string> selectedRoles)
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
    }

    private async Task AssignAdminAsync(ApplicationUser user)
    {
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

    private async Task AssignClienteAsync(ApplicationUser user)
    {
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

    private async Task AssignDetectiveAsync(ApplicationUser user)
    {
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

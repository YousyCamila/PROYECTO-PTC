using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading.Tasks;
using _17.PrivateInvestigationTechnology_PTC.Models;
using _17.PrivateInvestigationTechnology_PTC.Data;

namespace _17.PrivateInvestigationTechnology_PTC.Seeds
{
    public static class IdentityDataInitializer
    {
        public static async Task SeedData(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var context = serviceProvider.GetRequiredService<ApplicationDbContext>();

            // Crear roles predefinidos
            await EnsureRoleAsync(roleManager, "Cliente");
            await EnsureRoleAsync(roleManager, "Administrador");
            await EnsureRoleAsync(roleManager, "Detective");
            await EnsureRoleAsync(roleManager, "Superusuario");

            // Crear usuarios predeterminados y asignarlos a roles
            await EnsureUserAsync(userManager, roleManager, context, "admin@example.com", "Admin@123", "Administrador", "Admin Nombre", "123456789", "3001234567");
            await EnsureUserAsync(userManager, roleManager, context, "cliente@example.com", "Cliente@123", "Cliente", "Cliente Nombre", null, "3009876543");
            await EnsureUserAsync(userManager, roleManager, context, "detective@example.com", "Detective@123", "Detective", "Detective Nombre", "567890123", "3005678901");

            // Crear Superusuario predeterminado
            await EnsureSuperUserAsync(userManager, roleManager);
        }

        private static async Task EnsureRoleAsync(RoleManager<IdentityRole> roleManager, string roleName)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                var roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
                if (!roleResult.Succeeded)
                {
                    throw new Exception($"Error creando el rol {roleName}: {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
                }
            }
        }

        private static async Task EnsureUserAsync(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ApplicationDbContext context,
            string email, string password, string roleName, string fullName,
            string numeroIdentidad, string phoneNumber)
        {
            // Verificar si el usuario ya existe
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                // Crear usuario si no existe
                user = new ApplicationUser
                {
                    FullName = fullName,
                    Email = email,
                    PhoneNumber = phoneNumber,
                    UserName = email // Esto es importante para que Identity use el email como UserName
                };

                var createResult = await userManager.CreateAsync(user, password);
                if (createResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, roleName);
                    await AssignUserToRoleEntity(context, user, roleName, numeroIdentidad);
                }
                else
                {
                    throw new Exception($"Error creando el usuario {email}: {string.Join(", ", createResult.Errors.Select(e => e.Description))}");
                }
            }
            else
            {
                // En caso de que el usuario ya exista, asegurarse de que esté en el rol
                await userManager.AddToRoleAsync(user, roleName);
            }
        }

        private static async Task EnsureSuperUserAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var superUserEmail = "SuperUsuario@SuperPTC.com";
            var password = "!5?Yp*F95PYQtAt";

            var superUser = await userManager.FindByEmailAsync(superUserEmail);
            if (superUser == null)
            {
                superUser = new ApplicationUser
                {
                    FullName = "Super Usuario",
                    Email = superUserEmail,
                    EmailConfirmed = true,
                    PhoneNumber = "3000000000",
                    UserName = superUserEmail
                };

                var createResult = await userManager.CreateAsync(superUser, password);
                if (createResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(superUser, "Superusuario");
                }
                else
                {
                    throw new Exception($"Error creando el superusuario {superUserEmail}: {string.Join(", ", createResult.Errors.Select(e => e.Description))}");
                }
            }
        }

        // Asignar al usuario a una entidad dependiendo del rol
        private static async Task AssignUserToRoleEntity(ApplicationDbContext context, ApplicationUser user, string roleName, string numeroIdentidad)
        {
            if (roleName == "Administrador")
            {
                if (!context.Administradores.Any(a => a.IdentityUserId == user.Id))
                {
                    var admin = new Administrador
                    {
                        NumeroIdentidad = numeroIdentidad,
                        IdentityUserId = user.Id
                    };
                    context.Administradores.Add(admin);
                }
            }
            else if (roleName == "Cliente")
            {
                if (!context.Clientes.Any(c => c.IdentityUserId == user.Id))
                {
                    var cliente = new Cliente
                    {
                        IdentityUserId = user.Id
                    };
                    context.Clientes.Add(cliente);
                }
            }
            else if (roleName == "Detective")
            {
                if (!context.Detectives.Any(d => d.IdentityUserId == user.Id))
                {
                    var detective = new Detective
                    {
                        NumeroIdentidad = numeroIdentidad,
                        IdentityUserId = user.Id
                    };
                    context.Detectives.Add(detective);
                }
            }

            await context.SaveChangesAsync(); // Guardar cambios
        }
    }
}

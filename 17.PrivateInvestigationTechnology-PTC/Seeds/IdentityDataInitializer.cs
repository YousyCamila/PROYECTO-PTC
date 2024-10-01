using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using _17.PrivateInvestigationTechnology_PTC.Models;


namespace _17.PrivateInvestigationTechnology_PTC.Seeds
{
    public static class IdentityDataInitializer
    {
        public static async Task SeedData(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            var logger = serviceProvider.GetRequiredService<ILogger>(); // Elimina el tipo genérico

            // Crear roles predefinidos
            await EnsureRoleAsync(roleManager, "Cliente", logger);
            await EnsureRoleAsync(roleManager, "Administrador", logger);
            await EnsureRoleAsync(roleManager, "Detective", logger);
            await EnsureRoleAsync(roleManager, "Superusuario", logger);

            // Crear usuarios predeterminados y asignarlos a roles
            await EnsureUserAsync(userManager, roleManager, logger, "admin@example.com", "Admin@123", "Administrador", "Admin Nombre", "123456789", "3001234567");
            await EnsureUserAsync(userManager, roleManager, logger, "cliente@example.com", "Cliente@123", "Cliente", "Cliente Nombre", null, "3009876543");
            await EnsureUserAsync(userManager, roleManager, logger, "detective@example.com", "Detective@123", "Detective", "Detective Nombre", "567890123", "3005678901");

            // Crear Superusuario predeterminado
            await EnsureSuperUserAsync(userManager, roleManager, logger);
        }

        private static async Task EnsureRoleAsync(RoleManager<IdentityRole> roleManager, string roleName, ILogger logger)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                var roleResult = await roleManager.CreateAsync(new IdentityRole(roleName));
                if (roleResult.Succeeded)
                {
                    logger.LogInformation($"Rol {roleName} creado exitosamente.");
                }
                else
                {
                    logger.LogError($"Error creando el rol {roleName}: {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
                }
            }
            else
            {
                logger.LogInformation($"El rol {roleName} ya existe.");
            }
        }

        private static async Task EnsureUserAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ILogger logger, string email, string password, string roleName, string fullName, string numeroIdentidad, string phoneNumber)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                user = new ApplicationUser
                {
                    FullName = fullName,
                    Email = email,
                    PhoneNumber = phoneNumber
                };

                var createResult = await userManager.CreateAsync(user, password);
                if (createResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, roleName);
                    logger.LogInformation($"Usuario {email} creado y asignado al rol {roleName}.");
                }
                else
                {
                    logger.LogError($"Error creando el usuario {email}: {string.Join(", ", createResult.Errors.Select(e => e.Description))}");
                }
            }
            else
            {
                logger.LogInformation($"El usuario {email} ya existe.");
            }
        }

        private static async Task EnsureSuperUserAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ILogger logger)
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
                    PhoneNumber = "3000000000"
                };

                var createResult = await userManager.CreateAsync(superUser, password);
                if (createResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(superUser, "Superusuario");
                    logger.LogInformation($"Superusuario {superUserEmail} creado y asignado al rol Superusuario.");
                }
                else
                {
                    logger.LogError($"Error creando el superusuario {superUserEmail}: {string.Join(", ", createResult.Errors.Select(e => e.Description))}");
                }
            }
            else
            {
                logger.LogInformation($"El superusuario {superUserEmail} ya existe.");
            }
        }
    }
}

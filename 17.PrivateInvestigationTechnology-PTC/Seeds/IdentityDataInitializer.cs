using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using _17.PrivateInvestigationTechnology_PTC.Models;

namespace _17.PrivateInvestigationTechnology_PTC.Data
{
    public static class IdentityDataInitializer
    {
        public static async Task SeedData(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();
            var context = serviceProvider.GetRequiredService<ApplicationDbContext>();

            // Crear roles predefinidos
            await EnsureRoleAsync(roleManager, "Cliente");
            await EnsureRoleAsync(roleManager, "Administrador");
            await EnsureRoleAsync(roleManager, "Detective");
            await EnsureRoleAsync(roleManager, "Superusuario"); // Añadido el rol de Superusuario

            // Crear usuarios predeterminados y asignarlos a roles
            await EnsureUserAsync(userManager, roleManager, context, "admin@example.com", "Admin@123", "Administrador", "Admin Nombre", "123456789", "3001234567", new DateTime(1990, 1, 1), "admin_cv.pdf");
            await EnsureUserAsync(userManager, roleManager, context, "cliente@example.com", "Cliente@123", "Cliente", "Cliente Nombre", "987654321", "3009876543", new DateTime(1985, 5, 5), null);
            await EnsureUserAsync(userManager, roleManager, context, "detective@example.com", "Detective@123", "Detective", "Detective Nombre", "567890123", "3005678901", new DateTime(1992, 2, 2), "detective_cv.pdf");

            // Crear Superusuario predeterminado
            await EnsureSuperUserAsync(userManager, roleManager);
        }

        private static async Task EnsureRoleAsync(RoleManager<IdentityRole> roleManager, string roleName)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        private static async Task EnsureUserAsync(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext context, string email, string password, string roleName, string nombre, string numeroIdentidad, string numeroCelular, DateTime fechaNacimiento, string hojaDeVida)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                user = new IdentityUser { UserName = email, Email = email };
                var result = await userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, roleName);

                    if (roleName == "Administrador")
                    {
                        var admin = new Administrador
                        {
                            Nombre = nombre,
                            NumeroIdentidad = numeroIdentidad,
                            NumeroCelular = numeroCelular,
                            HojaDeVida = new byte[] { }, // Inicializa con un array vacío o asigna bytes válidos aquí
                            IdentityUserId = user.Id
                        };
                        context.Administradores.Add(admin);
                    }
                    else if (roleName == "Cliente")
                    {
                        var cliente = new Cliente
                        {
                            Nombre = nombre,
                            NumeroIdentidad = numeroIdentidad,
                            NumeroCelular = numeroCelular,
                            IdentityUserId = user.Id
                        };
                        context.Clientes.Add(cliente);
                    }
                    else if (roleName == "Detective")
                    {
                        var detective = new Detective
                        {
                            Nombre = nombre,
                            NumeroIdentidad = numeroIdentidad,
                            NumeroCelular = numeroCelular,
                            FechaNacimiento = fechaNacimiento,
                            HojaDeVida = new byte[] { }, // Inicializa con un array vacío o asigna bytes válidos aquí
                            IdentityUserId = user.Id
                        };
                        context.Detectives.Add(detective);
                    }

                    await context.SaveChangesAsync();  // Guardar los cambios en la base de datos
                }
            }
        }

        // Método para asegurar la creación del Superusuario
        private static async Task EnsureSuperUserAsync(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var superUserEmail = "SuperUsuario@SuperPTC.com";
            var password = "!5?Yp*F95PYQtAt";

            var superUser = await userManager.FindByEmailAsync(superUserEmail);
            if (superUser == null)
            {
                superUser = new IdentityUser
                {
                    UserName = superUserEmail,
                    Email = superUserEmail,
                    EmailConfirmed = true
                };

                var result = await userManager.CreateAsync(superUser, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(superUser, "Superusuario");
                }
            }
        }
    }
}

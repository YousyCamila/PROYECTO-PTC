using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Linq;
using _17.PrivateInvestigationTechnology_PTC.Models;

namespace _17.PrivateInvestigationTechnology_PTC.Data
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
            await EnsureUserAsync(userManager, roleManager, context, "admin@example.com", "Admin@123", "Administrador", "Admin Nombre", "123456789", "3001234567", new DateTime(1990, 1, 1), "admin_cv.pdf");
            await EnsureUserAsync(userManager, roleManager, context, "cliente@example.com", "Cliente@123", "Cliente", "Cliente Nombre", null, "3009876543", new DateTime(1985, 5, 5), null);
            await EnsureUserAsync(userManager, roleManager, context, "detective@example.com", "Detective@123", "Detective", "Detective Nombre", "567890123", "3005678901", new DateTime(1992, 2, 2), "detective_cv.pdf");

            // Crear Superusuario predeterminado
            await EnsureSuperUserAsync(userManager, roleManager);
        }

        // Método para asegurar la creación de roles
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

        // Método para asegurar la creación de usuarios
        private static async Task EnsureUserAsync(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ApplicationDbContext context,
            string email, string password, string roleName, string fullName,
            string numeroIdentidad, string phoneNumber, DateTime fechaNacimiento, string hojaDeVidaFilePath)
        {
            try
            {
                var user = await userManager.FindByEmailAsync(email);
                if (user == null)
                {
                    // Crear usuario con FullName en vez de UserName
                    user = new ApplicationUser
                    {
                        FullName = fullName, // Aquí usamos FullName en lugar de UserName
                        Email = email,
                        PhoneNumber = phoneNumber
                    };

                    var createResult = await userManager.CreateAsync(user, password);
                    if (createResult.Succeeded)
                    {
                        await userManager.AddToRoleAsync(user, roleName);

                        // Crear registros adicionales según el rol
                        await AssignUserToRoleEntity(context, user, roleName, fullName, numeroIdentidad, phoneNumber, fechaNacimiento, hojaDeVidaFilePath);
                    }
                    else
                    {
                        throw new Exception($"Error creando el usuario {email}: {string.Join(", ", createResult.Errors.Select(e => e.Description))}");
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error en el proceso de creación del usuario {email}: {ex.Message}", ex);
            }
        }

        // Método para asegurar la creación del Superusuario
        private static async Task EnsureSuperUserAsync(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            var superUserEmail = "SuperUsuario@SuperPTC.com";
            var password = "!5?Yp*F95PYQtAt";

            try
            {
                var superUser = await userManager.FindByEmailAsync(superUserEmail);
                if (superUser == null)
                {
                    superUser = new ApplicationUser
                    {
                        FullName = "Super Usuario", // Aquí usamos FullName en lugar de UserName
                        Email = superUserEmail,
                        EmailConfirmed = true,
                        PhoneNumber = "3000000000"
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
            catch (Exception ex)
            {
                throw new Exception($"Error en el proceso de creación del superusuario: {ex.Message}", ex);
            }
        }

        // Método para asignar al usuario a una entidad según el rol
        private static async Task AssignUserToRoleEntity(
            ApplicationDbContext context,
            ApplicationUser user,
            string roleName,
            string fullName,
            string numeroIdentidad,
            string phoneNumber,
            DateTime fechaNacimiento,
            string hojaDeVidaFilePath)
        {
            if (roleName == "Administrador")
            {
                if (!context.Administradores.Any(a => a.IdentityUserId == user.Id))
                {
                    var admin = new Administrador
                    {
                        NumeroIdentidad = numeroIdentidad,
                        HojaDeVida = !string.IsNullOrEmpty(hojaDeVidaFilePath) ? ConvertirArchivoABytes(hojaDeVidaFilePath) : null,
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
                        HojaDeVida = !string.IsNullOrEmpty(hojaDeVidaFilePath) ? ConvertirArchivoABytes(hojaDeVidaFilePath) : null,
                        IdentityUserId = user.Id
                    };
                    context.Detectives.Add(detective);
                }
            }

            await context.SaveChangesAsync();
        }

        // Método para convertir el archivo de hoja de vida a un array de bytes
        private static byte[] ConvertirArchivoABytes(string filePath)
        {
            try
            {
                if (!string.IsNullOrEmpty(filePath) && File.Exists(filePath))
                {
                    return File.ReadAllBytes(filePath); // Leer el archivo y convertirlo en array de bytes
                }
            }
            catch (Exception ex)
            {
                // Manejar posibles excepciones al leer el archivo
                throw new Exception($"Error al leer el archivo {filePath}: {ex.Message}", ex);
            }
            return null; // Retornar null si el archivo no existe o no es accesible
        }
    }
}

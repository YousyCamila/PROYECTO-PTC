using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace _17.PrivateInvestigationTechnology_PTC.Data
{
    public static class IdentityDataInitializer
    {
        public static async Task SeedData(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();

            // Crear roles predefinidos
            await EnsureRoleAsync(roleManager, "Cliente");
            await EnsureRoleAsync(roleManager, "Administrador");
            await EnsureRoleAsync(roleManager, "Detective");

            // Crear usuarios predeterminados y asignarlos a roles
            await EnsureUserAsync(userManager, "admin@example.com", "Admin@123", "Administrador");
            await EnsureUserAsync(userManager, "cliente@example.com", "Cliente@123", "Cliente");
            await EnsureUserAsync(userManager, "detective@example.com", "Detective@123", "Detective");
        }

        private static async Task EnsureRoleAsync(RoleManager<IdentityRole> roleManager, string roleName)
        {
            if (!await roleManager.RoleExistsAsync(roleName))
            {
                await roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }

        private static async Task EnsureUserAsync(UserManager<IdentityUser> userManager, string userName, string password, string roleName)
        {
            var user = await userManager.FindByEmailAsync(userName);
            if (user == null)
            {
                user = new IdentityUser { UserName = userName, Email = userName };
                var result = await userManager.CreateAsync(user, password);
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, roleName);
                }
            }
        }
    }
}

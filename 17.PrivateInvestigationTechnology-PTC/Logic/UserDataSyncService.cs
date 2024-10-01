using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;

namespace _17.PrivateInvestigationTechnology_PTC.Logic
{
    public class UserDataSyncService
    {
        private readonly ApplicationDbContext _context;

        // Constructor que recibe el contexto de base de datos
        public UserDataSyncService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Método para actualizar los campos PhoneNumber, Email y FullName en ApplicationUser
        public async Task<bool> UpdateUserContactInfoAsync(string userId, string phoneNumber, string email, string fullName)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return false; // Retorna false si no se encuentra el usuario
            }

            // Actualizar los campos del usuario
            user.PhoneNumber = phoneNumber;
            user.Email = email;
            user.FullName = fullName;

            // Guardar cambios en la base de datos
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return true; // Retorna true si la operación fue exitosa
        }

        // Método para obtener un usuario por ID
        public async Task<ApplicationUser> GetUserByIdAsync(string userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }
    }
}

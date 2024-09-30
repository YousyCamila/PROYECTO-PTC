using _17.PrivateInvestigationTechnology_PTC.Data;
using _17.PrivateInvestigationTechnology_PTC.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _17.PrivateInvestigationTechnology_PTC.Logic
{
    public class EntityManagementService
    {
        private readonly ApplicationDbContext _context;

        public EntityManagementService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Métodos para Detectives
        public async Task<List<Detective>> GetAllDetectivesAsync()
        {
            return await _context.Detectives.Include(d => d.IdentityUser).ToListAsync();
        }

        public async Task<Detective> GetDetectiveByIdAsync(int id)
        {
            return await _context.Detectives.Include(d => d.IdentityUser).FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<bool> UpdateDetectiveAsync(Detective detective)
        {
            var existingDetective = await _context.Detectives.FindAsync(detective.Id);
            if (existingDetective == null)
            {
                return false;
            }

            existingDetective.NumeroIdentidad = detective.NumeroIdentidad;
            existingDetective.HojaDeVida = detective.HojaDeVida;

            _context.Detectives.Update(existingDetective);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteDetectiveAsync(int id)
        {
            var detective = await _context.Detectives.FindAsync(id);
            if (detective == null)
            {
                return false;
            }

            _context.Detectives.Remove(detective);
            await _context.SaveChangesAsync();

            return true;
        }

        // Métodos para Administradores
        public async Task<List<Administrador>> GetAllAdministratorsAsync()
        {
            return await _context.Administradores.Include(a => a.IdentityUser).ToListAsync();
        }

        public async Task<Administrador> GetAdministratorByIdAsync(int id)
        {
            return await _context.Administradores.Include(a => a.IdentityUser).FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<bool> UpdateAdministratorAsync(Administrador admin)
        {
            var existingAdmin = await _context.Administradores.FindAsync(admin.Id);
            if (existingAdmin == null)
            {
                return false;
            }

            existingAdmin.NumeroIdentidad = admin.NumeroIdentidad;
            existingAdmin.HojaDeVida = admin.HojaDeVida;

            _context.Administradores.Update(existingAdmin);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAdministratorAsync(int id)
        {
            var admin = await _context.Administradores.FindAsync(id);
            if (admin == null)
            {
                return false;
            }

            _context.Administradores.Remove(admin);
            await _context.SaveChangesAsync();

            return true;
        }

        // Métodos para Clientes
        public async Task<List<Cliente>> GetAllClientsAsync()
        {
            return await _context.Clientes.Include(c => c.IdentityUser).ToListAsync();
        }

        public async Task<Cliente> GetClientByIdAsync(int id)
        {
            return await _context.Clientes.Include(c => c.IdentityUser).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<bool> UpdateClientAsync(Cliente client)
        {
            var existingClient = await _context.Clientes.FindAsync(client.Id);
            if (existingClient == null)
            {
                return false;
            }

            // Aquí actualizas los campos que necesites para la entidad Cliente
            _context.Clientes.Update(existingClient);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteClientAsync(int id)
        {
            var client = await _context.Clientes.FindAsync(id);
            if (client == null)
            {
                return false;
            }

            _context.Clientes.Remove(client);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

using Entities.Models;
using System.Linq.Expressions;
using DAL;
using BLL.Exceptions;


namespace BLL
{
    public class Administrador
    {
        public async Task<ADMINISTRADOR> CreateAsync(ADMINISTRADOR administrador)
        {
            ADMINISTRADOR adminResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Buscar si el administrador ya existe por alguna propiedad relevante
                ADMINISTRADOR adminSearch = await repository.RetrieveAsync<ADMINISTRADOR>(a => a.Especialidad == administrador.Especialidad);
                if (adminSearch == null)
                {
                    // No existe, podemos crearlo
                    adminResult = await repository.CreateAsync(administrador);
                }
                else
                {
                    // Lanzar excepción si el Administrador ya existe
                    AdministratorExceptions.ThrowAdministratorAlreadyExistsException(adminSearch.Especialidad);
                }
            }
            return adminResult!;
        }

        public async Task<ADMINISTRADOR> RetrieveByIDAsync(int id)
        {
            ADMINISTRADOR result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                ADMINISTRADOR admin = await repository.RetrieveAsync<ADMINISTRADOR>(a => a.ID_Administrador == id);

                // Verificar si se encontró al administrador
                if (admin == null)
                {
                    // Lanzar una excepción si no se encontró
                    AdministratorExceptions.ThrowInvalidAdministratorIdException(id);
                }

                return admin;
            }
        }

        public async Task<List<ADMINISTRADOR>> RetrieveAllAsync()
        {
            List<ADMINISTRADOR> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Criterio para obtener todos los administradores
                Expression<Func<ADMINISTRADOR, bool>> allAdminsCriteria = x => true;
                result = await repository.FilterAsync<ADMINISTRADOR>(allAdminsCriteria);
            }

            return result;
        }

        public async Task<bool> UpdateAsync(ADMINISTRADOR administrador)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si el administrador ya existe
                ADMINISTRADOR adminSearch =
                    await repository.RetrieveAsync<ADMINISTRADOR>
                    (a => a.Especialidad == administrador.Especialidad && a.ID_Administrador != administrador.ID_Administrador);
                if (adminSearch == null)
                {
                    // No existe, podemos actualizarlo
                    result = await repository.UpdateAsync(administrador);
                }
                else
                {
                    // Lanzar excepción si el Administrador ya existe con esa especialidad
                    AdministratorExceptions.ThrowAdministratorAlreadyExistsException(adminSearch.Especialidad);
                }
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;
            // Buscar un administrador para eliminar
            var admin = await RetrieveByIDAsync(id);
            if (admin != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(admin);
                }
            }
            else
            {
                // Lanzar excepción si el administrador no existe
                AdministratorExceptions.ThrowInvalidAdministratorIdException(id);
            }
            return result;
        }
    }
}


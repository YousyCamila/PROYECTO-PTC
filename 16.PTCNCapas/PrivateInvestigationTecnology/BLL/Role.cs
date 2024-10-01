using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.Exceptions;
using DAL;
using Entities.Models;

namespace BLL
{
    public class Role
    {
        public async Task<ROLE> CreateAsync(ROLE role)
        {
            ROLE roleResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Verificar si ya existe un rol con el mismo nombre
                ROLE roleSearch = await repository.RetrieveAsync<ROLE>(r => r.Nombre == role.Nombre);

                if (roleSearch == null)
                {
                    // No existe, podemos crearlo
                    roleResult = await repository.CreateAsync(role);
                }
                else
                {
                    // Lanzar una excepción si el rol ya existe
                    RoleExceptions.ThrowRoleAlreadyExistsException(role.Nombre);
                }
            }
            return roleResult!;
        }

        public async Task<ROLE> RetrieveByIDAsync(int id)
        {
            ROLE result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                ROLE role = await repository.RetrieveAsync<ROLE>(r => r.RolId == id);

                // Verificar si el rol fue encontrado
                if (role == null)
                {
                    // Lanzar una excepción si no se encuentra el rol
                    RoleExceptions.ThrowInvalidRoleIdException(id);
                }

                return role;
            }
        }

        public async Task<List<ROLE>> RetrieveAllAsync()
        {
            List<ROLE> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<ROLE>(r => true); // Devuelve todos los roles
            }

            return result;
        }

        public async Task<bool> UpdateAsync(ROLE role)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si ya existe un rol con el mismo nombre, excluyendo el actual
                ROLE roleSearch = await repository.RetrieveAsync<ROLE>(r => r.Nombre == role.Nombre && r.RolId != role.RolId);

                if (roleSearch == null)
                {
                    // No existe otro rol con el mismo nombre
                    result = await repository.UpdateAsync(role);
                }
                else
                {
                    // Lanzar una excepción si ya existe otro rol con el mismo nombre
                    RoleExceptions.ThrowRoleAlreadyExistsException(role.Nombre);
                }
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;

            var role = await RetrieveByIDAsync(id);

            if (role != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(role);
                }
            }
            else
            {
                // Lanzar una excepción si el rol no existe
                RoleExceptions.ThrowInvalidRoleIdException(id);
            }

            return result;
        }
    }
}

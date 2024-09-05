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
    public class Usuario
    {
        public async Task<USUARIO> CreateAsync(USUARIO usuario)
        {
            USUARIO usuarioResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Verificar si ya existe un usuario con el mismo nombre de usuario o email
                USUARIO usuarioSearch = await repository.RetrieveAsync<USUARIO>(u => u.Username == usuario.Username || u.Email == usuario.Email);

                if (usuarioSearch == null)
                {
                    // No existe, podemos crearlo
                    usuarioResult = await repository.CreateAsync(usuario);
                }
                else
                {
                    // Lanzar una excepción si el usuario ya existe
                    UsuarioExceptions.ThrowUsuarioAlreadyExistsException(usuario.Username, usuario.Email);
                }
            }
            return usuarioResult!;
        }

        public async Task<USUARIO> RetrieveByIDAsync(int id)
        {
            USUARIO result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                USUARIO usuario = await repository.RetrieveAsync<USUARIO>(u => u.ID_Usuario == id);

                // Verificar si el usuario fue encontrado
                if (usuario == null)
                {
                    // Lanzar una excepción si no se encuentra el usuario
                    UsuarioExceptions.ThrowInvalidUsuarioIdException(id);
                }

                return usuario;
            }
        }

        public async Task<List<USUARIO>> RetrieveAllAsync()
        {
            List<USUARIO> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<USUARIO>(u => true); // Devuelve todos los usuarios
            }

            return result;
        }

        public async Task<bool> UpdateAsync(USUARIO usuario)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si ya existe un usuario con el mismo nombre de usuario o email, excluyendo el actual
                USUARIO usuarioSearch = await repository.RetrieveAsync<USUARIO>(u => (u.Username == usuario.Username || u.Email == usuario.Email) && u.ID_Usuario != usuario.ID_Usuario);

                if (usuarioSearch == null)
                {
                    // No existe otro usuario con el mismo nombre de usuario o email
                    result = await repository.UpdateAsync(usuario);
                }
                else
                {
                    // Lanzar una excepción si ya existe otro usuario con el mismo nombre de usuario o email
                    UsuarioExceptions.ThrowUsuarioAlreadyExistsException(usuario.Username, usuario.Email);
                }
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;

            var usuario = await RetrieveByIDAsync(id);

            if (usuario != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(usuario);
                }
            }
            else
            {
                // Lanzar una excepción si el usuario no existe
                UsuarioExceptions.ThrowInvalidUsuarioIdException(id);
            }

            return result;
        }
    }
}

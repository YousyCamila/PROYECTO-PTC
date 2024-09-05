using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System;

namespace BLL
{
    public class UsuarioExceptions : Exception
    {
        private UsuarioExceptions(string message) : base(message) { }

        public static void ThrowUsuarioAlreadyExistsException(string username, string email)
        {
            throw new UsuarioExceptions($"Ya existe un usuario con el nombre de usuario: {username} o el email: {email}.");
        }

        public static void ThrowInvalidUsuarioIdException(int id)
        {
            throw new UsuarioExceptions($"El usuario con ID {id} no existe.");
        }

        public static void ThrowInvalidUsuarioDataException(string message)
        {
            throw new UsuarioExceptions(message);
        }
    }
}


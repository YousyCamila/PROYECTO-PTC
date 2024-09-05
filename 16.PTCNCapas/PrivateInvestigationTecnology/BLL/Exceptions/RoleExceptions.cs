using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System;

namespace BLL.Exceptions
{
    public class RoleExceptions : Exception
    {
        private RoleExceptions(string message) : base(message) { }

        public static void ThrowRoleAlreadyExistsException(string nombre)
        {
            throw new RoleExceptions($"Ya existe un rol con el nombre: {nombre}.");
        }

        public static void ThrowInvalidRoleIdException(int id)
        {
            throw new RoleExceptions($"El rol con ID {id} no existe.");
        }

        public static void ThrowInvalidRoleDataException(string message)
        {
            throw new RoleExceptions(message);
        }
    }
}


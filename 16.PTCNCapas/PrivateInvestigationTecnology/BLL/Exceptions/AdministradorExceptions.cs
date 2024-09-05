using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Exceptions
{
    public class AdministratorExceptions : Exception
    {
        private AdministratorExceptions(string message) : base(message)
        {
        }

        public static void ThrowAdministratorAlreadyExistsException(string especialidad)
        {
            throw new AdministratorExceptions($"Un administrador con la especialidad '{especialidad}' ya existe.");
        }

        public static void ThrowInvalidAdministratorIdException(int id)
        {
            throw new AdministratorExceptions($"Administrador con ID {id} no existe.");
        }

        public static void ThrowInvalidAdministratorDataException(string message)
        {
            throw new AdministratorExceptions(message);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class PersonaExceptions : Exception
    {
        private PersonaExceptions(string message) : base(message) { }

        public static void ThrowPersonaAlreadyExistsException(string dni)
        {
            throw new PersonaExceptions($"Ya existe una persona con el DNI: {dni}.");
        }

        public static void ThrowInvalidPersonaIdException(int id)
        {
            throw new PersonaExceptions($"La persona con ID {id} no existe.");
        }

        public static void ThrowInvalidPersonaDataException(string message)
        {
            throw new PersonaExceptions(message);
        }
    }
}

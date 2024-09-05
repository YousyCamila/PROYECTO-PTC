using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BLL.Exceptions
{
    public class RegistroCasoExceptions : Exception
    {
        private RegistroCasoExceptions(string message) : base(message) { }

        public static void ThrowRegistroCasoAlreadyExistsException(string descripcion, int idCasos)
        {
            throw new RegistroCasoExceptions($"Ya existe un registro de casos con la descripción: {descripcion} para el caso ID: {idCasos}.");
        }

        public static void ThrowInvalidRegistroCasoIdException(int id)
        {
            throw new RegistroCasoExceptions($"El registro de casos con ID {id} no existe.");
        }

        public static void ThrowInvalidRegistroCasoDataException(string message)
        {
            throw new RegistroCasoExceptions(message);
        }
    }
}


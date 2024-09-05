using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BLL
{
    public class DetectiveExceptions : Exception
    {
        private DetectiveExceptions(string message) : base(message) { }

        public static void ThrowDetectiveAlreadyExistsException(string? especialidad)
        {
            throw new DetectiveExceptions($"Ya existe un detective con la especialidad: {especialidad}.");
        }

        public static void ThrowInvalidDetectiveIdException(int id)
        {
            throw new DetectiveExceptions($"El detective con ID {id} no existe.");
        }

        public static void ThrowInvalidDetectiveDataException(string message)
        {
            throw new DetectiveExceptions(message);
        }
    }
}


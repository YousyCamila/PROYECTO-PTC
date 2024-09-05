using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BLL.Exceptions
{
    public class EvidenciaExceptions : Exception
    {
        private EvidenciaExceptions(string message) : base(message) { }

        public static void ThrowEvidenciaAlreadyExistsException(string descripcion, DateTime fechaEvidencia)
        {
            throw new EvidenciaExceptions($"Ya existe una evidencia con la descripción: {descripcion} y fecha: {fechaEvidencia}.");
        }

        public static void ThrowInvalidEvidenciaIdException(int id)
        {
            throw new EvidenciaExceptions($"La evidencia con ID {id} no existe.");
        }

        public static void ThrowInvalidEvidenciaDataException(string message)
        {
            throw new EvidenciaExceptions(message);
        }
    }
}


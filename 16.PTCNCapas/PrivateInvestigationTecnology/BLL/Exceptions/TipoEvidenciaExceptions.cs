using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BLL.Exceptions
{
    public class TipoEvidenciaExceptions : Exception
    {
        private TipoEvidenciaExceptions(string message) : base(message) { }

        public static void ThrowTipoEvidenciaAlreadyExistsException(string tipoDocumento)
        {
            throw new TipoEvidenciaExceptions($"Ya existe un tipo de evidencia con el documento: {tipoDocumento}.");
        }

        public static void ThrowInvalidTipoEvidenciaIdException(int id)
        {
            throw new TipoEvidenciaExceptions($"El tipo de evidencia con ID {id} no existe.");
        }

        public static void ThrowInvalidTipoEvidenciaDataException(string message)
        {
            throw new TipoEvidenciaExceptions(message);
        }
    }
}

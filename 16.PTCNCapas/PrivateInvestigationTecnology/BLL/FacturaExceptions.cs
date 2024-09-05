using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BLL
{
    public class FacturaExceptions : Exception
    {
        private FacturaExceptions(string message) : base(message) { }

        public static void ThrowFacturaAlreadyExistsException(string descripcion, DateTime fechaEmision)
        {
            throw new FacturaExceptions($"Ya existe una factura con la descripción: {descripcion} y fecha de emisión: {fechaEmision}.");
        }

        public static void ThrowInvalidFacturaIdException(int id)
        {
            throw new FacturaExceptions($"La factura con ID {id} no existe.");
        }

        public static void ThrowInvalidFacturaDataException(string message)
        {
            throw new FacturaExceptions(message);
        }
    }
}


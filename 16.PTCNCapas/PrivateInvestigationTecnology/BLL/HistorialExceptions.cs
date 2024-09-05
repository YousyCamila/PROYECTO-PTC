using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace BLL
{
    public class HistorialExceptions : Exception
    {
        private HistorialExceptions(string message) : base(message) { }

        public static void ThrowHistorialAlreadyExistsException(string descripcion, int idCliente)
        {
            throw new HistorialExceptions($"Ya existe un historial con la descripción: {descripcion} para el cliente con ID {idCliente}.");
        }

        public static void ThrowInvalidHistorialIdException(int id)
        {
            throw new HistorialExceptions($"El historial con ID {id} no existe.");
        }

        public static void ThrowInvalidHistorialDataException(string message)
        {
            throw new HistorialExceptions(message);
        }
    }
}


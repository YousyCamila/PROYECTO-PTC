using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace BLL.Exceptions
{
    public class ClienteExceptions : Exception
    {
        private ClienteExceptions(string message) : base(message) { }

        public static void ThrowClienteAlreadyExistsException(string direccion)
        {
            throw new ClienteExceptions($"Ya existe un cliente con la dirección: {direccion}.");
        }

        public static void ThrowInvalidClienteIdException(int id)
        {
            throw new ClienteExceptions($"El cliente con ID {id} no existe.");
        }

        public static void ThrowInvalidClienteDataException(string message)
        {
            throw new ClienteExceptions(message);
        }
    }
}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace BLL.Exceptions
{
    public class ContratoExceptions : Exception
    {
        private ContratoExceptions(string message) : base(message) { }

        public static void ThrowContratoAlreadyExistsException(string descripServicio)
        {
            throw new ContratoExceptions($"Ya existe un contrato con la descripción: {descripServicio}.");
        }

        public static void ThrowInvalidContratoIdException(int id)
        {
            throw new ContratoExceptions($"El contrato con ID {id} no existe.");
        }

        public static void ThrowInvalidContratoDataException(string message)
        {
            throw new ContratoExceptions(message);
        }
    }
}


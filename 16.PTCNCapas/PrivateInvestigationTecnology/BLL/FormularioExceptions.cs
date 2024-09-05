using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace BLL
{
    public class FormularioExceptions : Exception
    {
        private FormularioExceptions(string message) : base(message) { }

        public static void ThrowFormularioAlreadyExistsException(string nombre, string numeroCelular)
        {
            throw new FormularioExceptions($"Ya existe un formulario con el nombre: {nombre} y número de celular: {numeroCelular}.");
        }

        public static void ThrowInvalidFormularioIdException(int id)
        {
            throw new FormularioExceptions($"El formulario con ID {id} no existe.");
        }

        public static void ThrowInvalidFormularioDataException(string message)
        {
            throw new FormularioExceptions(message);
        }
    }
}


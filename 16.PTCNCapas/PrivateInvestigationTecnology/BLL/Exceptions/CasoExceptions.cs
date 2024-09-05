using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BLL.Exceptions
{
    public class CasosExceptions : Exception
    {
        private CasosExceptions(string message) : base(message) { }

        public static void ThrowInvalidCasosIdException(int id)
        {
            throw new CasosExceptions($"Caso con ID {id} no existe.");
        }

        public static void ThrowInvalidCasosDataException(string message)
        {
            throw new CasosExceptions(message);
        }
    }
}

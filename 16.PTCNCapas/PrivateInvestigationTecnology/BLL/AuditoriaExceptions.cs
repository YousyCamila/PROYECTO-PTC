using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace BLL
{
    public class AuditoriaExceptions : Exception
    {
        private AuditoriaExceptions(string message) : base(message) { }

        public static void ThrowInvalidAuditoriaIdException(int id)
        {
            throw new AuditoriaExceptions($"Auditoría con ID {id} no existe.");
        }

        public static void ThrowInvalidAuditoriaDataException(string message)
        {
            throw new AuditoriaExceptions(message);
        }
    }
}

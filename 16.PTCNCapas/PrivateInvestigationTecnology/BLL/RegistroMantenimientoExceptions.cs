using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BLL
{
    public class RegistroMantenimientoExceptions : Exception
    {
        private RegistroMantenimientoExceptions(string message) : base(message) { }

        public static void ThrowRegistroMantenimientoAlreadyExistsException(string descripcion, int idAdministrador)
        {
            throw new RegistroMantenimientoExceptions($"Ya existe un registro de mantenimiento con la descripción: {descripcion} para el administrador ID: {idAdministrador}.");
        }

        public static void ThrowInvalidRegistroMantenimientoIdException(int id)
        {
            throw new RegistroMantenimientoExceptions($"El registro de mantenimiento con ID {id} no existe.");
        }

        public static void ThrowInvalidRegistroMantenimientoDataException(string message)
        {
            throw new RegistroMantenimientoExceptions(message);
        }
    }
}


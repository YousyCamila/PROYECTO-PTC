using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities.Models;

namespace BLL
{
    public class RegistroMantenimiento
    {
        public async Task<REGISTRO_MANTENIMIENTO> CreateAsync(REGISTRO_MANTENIMIENTO registroMantenimiento)
        {
            REGISTRO_MANTENIMIENTO registroMantenimientoResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Verificar si ya existe un registro de mantenimiento con la misma descripción y administrador
                REGISTRO_MANTENIMIENTO registroMantenimientoSearch = await repository.RetrieveAsync<REGISTRO_MANTENIMIENTO>(
                    r => r.Descripcion == registroMantenimiento.Descripcion && r.ID_Administrador == registroMantenimiento.ID_Administrador);

                if (registroMantenimientoSearch == null)
                {
                    // No existe, podemos crearlo
                    registroMantenimientoResult = await repository.CreateAsync(registroMantenimiento);
                }
                else
                {
                    // Lanzar una excepción si el registro ya existe
                    RegistroMantenimientoExceptions.ThrowRegistroMantenimientoAlreadyExistsException(registroMantenimiento.Descripcion, registroMantenimiento.ID_Administrador);
                }
            }
            return registroMantenimientoResult!;
        }

        public async Task<REGISTRO_MANTENIMIENTO> RetrieveByIDAsync(int id)
        {
            REGISTRO_MANTENIMIENTO result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                REGISTRO_MANTENIMIENTO registroMantenimiento = await repository.RetrieveAsync<REGISTRO_MANTENIMIENTO>(r => r.ID_Mantenimiento == id);

                // Verificar si el registro fue encontrado
                if (registroMantenimiento == null)
                {
                    // Lanzar una excepción si no se encuentra el registro
                    RegistroMantenimientoExceptions.ThrowInvalidRegistroMantenimientoIdException(id);
                }

                return registroMantenimiento;
            }
        }

        public async Task<List<REGISTRO_MANTENIMIENTO>> RetrieveAllAsync()
        {
            List<REGISTRO_MANTENIMIENTO> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<REGISTRO_MANTENIMIENTO>(r => true); // Devuelve todos los registros de mantenimiento
            }

            return result;
        }

        public async Task<bool> UpdateAsync(REGISTRO_MANTENIMIENTO registroMantenimiento)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si ya existe un registro con la misma descripción y administrador, excluyendo el actual
                REGISTRO_MANTENIMIENTO registroMantenimientoSearch = await repository.RetrieveAsync<REGISTRO_MANTENIMIENTO>(
                    r => r.Descripcion == registroMantenimiento.Descripcion && r.ID_Administrador == registroMantenimiento.ID_Administrador && r.ID_Mantenimiento != registroMantenimiento.ID_Mantenimiento);

                if (registroMantenimientoSearch == null)
                {
                    // No existe otro registro con los mismos detalles
                    result = await repository.UpdateAsync(registroMantenimiento);
                }
                else
                {
                    // Lanzar una excepción si ya existe otro registro con la misma descripción y administrador
                    RegistroMantenimientoExceptions.ThrowRegistroMantenimientoAlreadyExistsException(registroMantenimiento.Descripcion, registroMantenimiento.ID_Administrador);
                }
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;

            var registroMantenimiento = await RetrieveByIDAsync(id);

            if (registroMantenimiento != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(registroMantenimiento);
                }
            }
            else
            {
                // Lanzar una excepción si el registro no existe
                RegistroMantenimientoExceptions.ThrowInvalidRegistroMantenimientoIdException(id);
            }

            return result;
        }
    }
}


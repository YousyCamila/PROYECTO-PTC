using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities.Models;

namespace BLL
{
    public class RegistroCaso
    {
        public async Task<REGISTRO_CASO> CreateAsync(REGISTRO_CASO registroCaso)
        {
            REGISTRO_CASO registroCasoResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Verificar si ya existe un registro de casos con la misma descripción y caso
                REGISTRO_CASO registroCasoSearch = await repository.RetrieveAsync<REGISTRO_CASO>(
                    r => r.Descripcion == registroCaso.Descripcion && r.ID_Casos == registroCaso.ID_Casos);

                if (registroCasoSearch == null)
                {
                    // No existe, podemos crearlo
                    registroCasoResult = await repository.CreateAsync(registroCaso);
                }
                else
                {
                    // Lanzar una excepción si el registro ya existe
                    RegistroCasoExceptions.ThrowRegistroCasoAlreadyExistsException(registroCaso.Descripcion, registroCaso.ID_Casos);
                }
            }
            return registroCasoResult!;
        }

        public async Task<REGISTRO_CASO> RetrieveByIDAsync(int id)
        {
            REGISTRO_CASO result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                REGISTRO_CASO registroCaso = await repository.RetrieveAsync<REGISTRO_CASO>(r => r.ID_Registro_Casos == id);

                // Verificar si el registro fue encontrado
                if (registroCaso == null)
                {
                    // Lanzar una excepción si no se encuentra el registro
                    RegistroCasoExceptions.ThrowInvalidRegistroCasoIdException(id);
                }

                return registroCaso;
            }
        }

        public async Task<List<REGISTRO_CASO>> RetrieveAllAsync()
        {
            List<REGISTRO_CASO> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<REGISTRO_CASO>(r => true); // Devuelve todos los registros de casos
            }

            return result;
        }

        public async Task<bool> UpdateAsync(REGISTRO_CASO registroCaso)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si ya existe un registro con la misma descripción y caso, excluyendo el actual
                REGISTRO_CASO registroCasoSearch = await repository.RetrieveAsync<REGISTRO_CASO>(
                    r => r.Descripcion == registroCaso.Descripcion && r.ID_Casos == registroCaso.ID_Casos && r.ID_Registro_Casos != registroCaso.ID_Registro_Casos);

                if (registroCasoSearch == null)
                {
                    // No existe otro registro con los mismos detalles
                    result = await repository.UpdateAsync(registroCaso);
                }
                else
                {
                    // Lanzar una excepción si ya existe otro registro con la misma descripción y caso
                    RegistroCasoExceptions.ThrowRegistroCasoAlreadyExistsException(registroCaso.Descripcion, registroCaso.ID_Casos);
                }
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;

            var registroCaso = await RetrieveByIDAsync(id);

            if (registroCaso != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(registroCaso);
                }
            }
            else
            {
                // Lanzar una excepción si el registro no existe
                RegistroCasoExceptions.ThrowInvalidRegistroCasoIdException(id);
            }

            return result;
        }
    }
}


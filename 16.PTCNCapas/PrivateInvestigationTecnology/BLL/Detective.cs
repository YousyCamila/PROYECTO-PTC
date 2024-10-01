using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.Exceptions;
using DAL;
using Entities.Models;

namespace BLL
{
    public class Detective
    {
        public async Task<DETECTIVE> CreateAsync(DETECTIVE detective)
        {
            DETECTIVE detectiveResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Verificar si ya existe un detective con la misma especialidad
                DETECTIVE detectiveSearch = await repository.RetrieveAsync<DETECTIVE>(d => d.Especialidad == detective.Especialidad);
                if (detectiveSearch == null)
                {
                    // No existe, podemos crearlo
                    detectiveResult = await repository.CreateAsync(detective);
                }
                else
                {
                    // Lanzar una excepción si el detective ya existe
                    DetectiveExceptions.ThrowDetectiveAlreadyExistsException(detective.Especialidad);
                }
            }
            return detectiveResult!;
        }

        public async Task<DETECTIVE> RetrieveByIDAsync(int id)
        {
            DETECTIVE result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                DETECTIVE detective = await repository.RetrieveAsync<DETECTIVE>(d => d.ID_Detective == id);

                // Verificar si el detective fue encontrado
                if (detective == null)
                {
                    // Lanzar una excepción si no se encuentra el detective
                    DetectiveExceptions.ThrowInvalidDetectiveIdException(id);
                }

                return detective;
            }
        }

        public async Task<List<DETECTIVE>> RetrieveAllAsync()
        {
            List<DETECTIVE> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<DETECTIVE>(d => true); // Devuelve todos los detectives
            }

            return result;
        }

        public async Task<bool> UpdateAsync(DETECTIVE detective)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si ya existe un detective con la misma especialidad, excluyendo el actual
                DETECTIVE detectiveSearch = await repository.RetrieveAsync<DETECTIVE>(
                    d => d.Especialidad == detective.Especialidad && d.ID_Detective != detective.ID_Detective);

                if (detectiveSearch == null)
                {
                    // No existe otro detective con la misma especialidad
                    result = await repository.UpdateAsync(detective);
                }
                else
                {
                    // Lanzar una excepción si ya existe otro detective con la misma especialidad
                    DetectiveExceptions.ThrowDetectiveAlreadyExistsException(detective.Especialidad);
                }
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;

            var detective = await RetrieveByIDAsync(id);

            if (detective != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(detective);
                }
            }
            else
            {
                // Lanzar una excepción si el detective no existe
                DetectiveExceptions.ThrowInvalidDetectiveIdException(id);
            }

            return result;
        }
    }
}


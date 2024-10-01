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
    public class Evidencia
    {
        public async Task<EVIDENCIA> CreateAsync(EVIDENCIA evidencia)
        {
            EVIDENCIA evidenciaResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Verificar si ya existe una evidencia con la misma descripción y fecha
                EVIDENCIA evidenciaSearch = await repository.RetrieveAsync<EVIDENCIA>(e => e.Descripcion == evidencia.Descripcion && e.Fecha_Evidencia == evidencia.Fecha_Evidencia);
                if (evidenciaSearch == null)
                {
                    // No existe, podemos crearlo
                    evidenciaResult = await repository.CreateAsync(evidencia);
                }
                else
                {
                    // Lanzar una excepción si la evidencia ya existe
                    EvidenciaExceptions.ThrowEvidenciaAlreadyExistsException(evidencia.Descripcion, evidencia.Fecha_Evidencia);
                }
            }
            return evidenciaResult!;
        }

        public async Task<EVIDENCIA> RetrieveByIDAsync(int id)
        {
            EVIDENCIA result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                EVIDENCIA evidencia = await repository.RetrieveAsync<EVIDENCIA>(e => e.ID_Evidencia == id);

                // Verificar si la evidencia fue encontrada
                if (evidencia == null)
                {
                    // Lanzar una excepción si no se encuentra la evidencia
                    EvidenciaExceptions.ThrowInvalidEvidenciaIdException(id);
                }

                return evidencia;
            }
        }

        public async Task<List<EVIDENCIA>> RetrieveAllAsync()
        {
            List<EVIDENCIA> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<EVIDENCIA>(e => true); // Devuelve todas las evidencias
            }

            return result;
        }

        public async Task<bool> UpdateAsync(EVIDENCIA evidencia)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si ya existe una evidencia con la misma descripción y fecha, excluyendo la actual
                EVIDENCIA evidenciaSearch = await repository.RetrieveAsync<EVIDENCIA>(
                    e => e.Descripcion == evidencia.Descripcion && e.Fecha_Evidencia == evidencia.Fecha_Evidencia && e.ID_Evidencia != evidencia.ID_Evidencia);

                if (evidenciaSearch == null)
                {
                    // No existe otra evidencia con la misma descripción y fecha
                    result = await repository.UpdateAsync(evidencia);
                }
                else
                {
                    // Lanzar una excepción si ya existe otra evidencia con los mismos detalles
                    EvidenciaExceptions.ThrowEvidenciaAlreadyExistsException(evidencia.Descripcion, evidencia.Fecha_Evidencia);
                }
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;

            var evidencia = await RetrieveByIDAsync(id);

            if (evidencia != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(evidencia);
                }
            }
            else
            {
                // Lanzar una excepción si la evidencia no existe
                EvidenciaExceptions.ThrowInvalidEvidenciaIdException(id);
            }

            return result;
        }
    }
}

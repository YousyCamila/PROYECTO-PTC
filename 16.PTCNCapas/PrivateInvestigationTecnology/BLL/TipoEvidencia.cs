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
    public class TipoEvidencia
    {
        public async Task<TIPO_EVIDENCIA> CreateAsync(TIPO_EVIDENCIA tipoEvidencia)
        {
            TIPO_EVIDENCIA tipoEvidenciaResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Verificar si ya existe un tipo de evidencia con el mismo nombre
                TIPO_EVIDENCIA tipoEvidenciaSearch = await repository.RetrieveAsync<TIPO_EVIDENCIA>(t => t.Tipo_Documento == tipoEvidencia.Tipo_Documento);

                if (tipoEvidenciaSearch == null)
                {
                    // No existe, podemos crearlo
                    tipoEvidenciaResult = await repository.CreateAsync(tipoEvidencia);
                }
                else
                {
                    // Lanzar una excepción si el tipo de evidencia ya existe
                    TipoEvidenciaExceptions.ThrowTipoEvidenciaAlreadyExistsException(tipoEvidencia.Tipo_Documento);
                }
            }
            return tipoEvidenciaResult!;
        }

        public async Task<TIPO_EVIDENCIA> RetrieveByIDAsync(int id)
        {
            TIPO_EVIDENCIA result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                TIPO_EVIDENCIA tipoEvidencia = await repository.RetrieveAsync<TIPO_EVIDENCIA>(t => t.ID_Tipo_Evidencia == id);

                // Verificar si el tipo de evidencia fue encontrado
                if (tipoEvidencia == null)
                {
                    // Lanzar una excepción si no se encuentra el tipo de evidencia
                    TipoEvidenciaExceptions.ThrowInvalidTipoEvidenciaIdException(id);
                }

                return tipoEvidencia;
            }
        }

        public async Task<List<TIPO_EVIDENCIA>> RetrieveAllAsync()
        {
            List<TIPO_EVIDENCIA> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<TIPO_EVIDENCIA>(t => true); // Devuelve todos los tipos de evidencia
            }

            return result;
        }

        public async Task<bool> UpdateAsync(TIPO_EVIDENCIA tipoEvidencia)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si ya existe un tipo de evidencia con el mismo nombre, excluyendo el actual
                TIPO_EVIDENCIA tipoEvidenciaSearch = await repository.RetrieveAsync<TIPO_EVIDENCIA>(t => t.Tipo_Documento == tipoEvidencia.Tipo_Documento && t.ID_Tipo_Evidencia != tipoEvidencia.ID_Tipo_Evidencia);

                if (tipoEvidenciaSearch == null)
                {
                    // No existe otro tipo de evidencia con el mismo nombre
                    result = await repository.UpdateAsync(tipoEvidencia);
                }
                else
                {
                    // Lanzar una excepción si ya existe otro tipo de evidencia con el mismo nombre
                    TipoEvidenciaExceptions.ThrowTipoEvidenciaAlreadyExistsException(tipoEvidencia.Tipo_Documento);
                }
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;

            var tipoEvidencia = await RetrieveByIDAsync(id);

            if (tipoEvidencia != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(tipoEvidencia);
                }
            }
            else
            {
                // Lanzar una excepción si el tipo de evidencia no existe
                TipoEvidenciaExceptions.ThrowInvalidTipoEvidenciaIdException(id);
            }

            return result;
        }
    }
}

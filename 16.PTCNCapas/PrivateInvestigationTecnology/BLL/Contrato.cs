using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entities.Models;

namespace BLL
{
    public class Contrato
    {
        public async Task<CONTRATO> CreateAsync(CONTRATO contrato)
        {
            CONTRATO contratoResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si el contrato ya existe basado en algún criterio (por ejemplo, Descripción y Fecha de Inicio)
                CONTRATO contratoSearch = await repository.RetrieveAsync<CONTRATO>(c => c.Descrip_Servicio == contrato.Descrip_Servicio && c.Fecha_Inicio == contrato.Fecha_Inicio);
                if (contratoSearch == null)
                {
                    // No existe, podemos crearlo
                    contratoResult = await repository.CreateAsync(contrato);
                }
                else
                {
                    // Lanzar una excepción si el contrato ya existe
                    ContratoExceptions.ThrowContratoAlreadyExistsException(contrato.Descrip_Servicio);
                }
            }
            return contratoResult!;
        }

        public async Task<CONTRATO> RetrieveByIDAsync(int id)
        {
            CONTRATO result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                CONTRATO contrato = await repository.RetrieveAsync<CONTRATO>(c => c.ID_Contrato == id);

                // Verificar si el contrato fue encontrado
                if (contrato == null)
                {
                    // Lanzar una excepción si no se encuentra el contrato
                    ContratoExceptions.ThrowInvalidContratoIdException(id);
                }

                return contrato;
            }
        }

        public async Task<List<CONTRATO>> RetrieveAllAsync()
        {
            List<CONTRATO> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<CONTRATO>(c => true); // Devuelve todos los contratos
            }

            return result;
        }

        public async Task<bool> UpdateAsync(CONTRATO contrato)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Validar si el contrato ya existe, excluyendo al contrato actual (por ejemplo, por descripción y fecha)
                CONTRATO contratoSearch = await repository.RetrieveAsync<CONTRATO>(
                    c => c.Descrip_Servicio == contrato.Descrip_Servicio && c.Fecha_Inicio == contrato.Fecha_Inicio && c.ID_Contrato != contrato.ID_Contrato);

                if (contratoSearch == null)
                {
                    // No existe otro contrato con la misma descripción y fecha
                    result = await repository.UpdateAsync(contrato);
                }
                else
                {
                    // Lanzar una excepción si ya existe otro contrato con los mismos detalles
                    ContratoExceptions.ThrowContratoAlreadyExistsException(contrato.Descrip_Servicio);
                }
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;

            var contrato = await RetrieveByIDAsync(id);

            if (contrato != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(contrato);
                }
            }
            else
            {
                // Lanzar una excepción si el contrato no existe
                ContratoExceptions.ThrowInvalidContratoIdException(id);
            }

            return result;
        }
    }
}

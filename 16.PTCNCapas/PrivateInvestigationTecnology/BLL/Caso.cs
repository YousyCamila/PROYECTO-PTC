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
    public class Casos
    {
        public async Task<CASOS> CreateAsync(CASOS caso)
        {
            CASOS casoResult = null;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                // Crear un nuevo caso
                casoResult = await repository.CreateAsync(caso);
            }
            return casoResult!;
        }

        public async Task<CASOS> RetrieveByIDAsync(int id)
        {
            CASOS result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                CASOS caso = await repository.RetrieveAsync<CASOS>(c => c.ID_Casos == id);

                // Verificar si el caso fue encontrado
                if (caso == null)
                {
                    // Lanza una excepción personalizada
                    CasosExceptions.ThrowInvalidCasosIdException(id);
                }

                return caso;
            }
        }

        public async Task<List<CASOS>> RetrieveAllAsync()
        {
            List<CASOS> result = null;

            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.FilterAsync<CASOS>(c => true);
            }

            return result;
        }

        public async Task<bool> UpdateAsync(CASOS caso)
        {
            bool result = false;
            using (var repository = RepositoryFactory.CreateRepository())
            {
                result = await repository.UpdateAsync(caso);
            }
            return result;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool result = false;
            var caso = await RetrieveByIDAsync(id);

            if (caso != null)
            {
                using (var repository = RepositoryFactory.CreateRepository())
                {
                    result = await repository.DeleteAsync(caso);
                }
            }
            else
            {
                CasosExceptions.ThrowInvalidCasosIdException(id);
            }

            return result;
        }
    }
}

